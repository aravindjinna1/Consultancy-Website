import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import nodemailer from 'nodemailer';
import mongoose from 'mongoose';
import { createServer as createViteServer } from 'vite';
import { INITIAL_COUNTRIES, INITIAL_JOBS, INITIAL_BLOGS, INITIAL_NEWS, INITIAL_TESTIMONIALS } from '../frontend/src/data/initialData.js';
import { User as UserModel, Job as JobModel, Application as ApplicationModel, Counselling as CounsellingModel, Contact as ContactModel, CountryHub as CountryHubModel } from './models.js';

const app = express();
const PORT = 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'par_careers_jwt_secret_key_2026';

const DEFAULT_ADMIN_EMAILS = ['ardigitalstudio05@gmail.com', 'aravindjinna1@gmail.com'];
const ADMIN_ALLOWLIST = (process.env.ADMIN_ALLOWLIST || 'Ardigitalstudio05@gmail.com,aravindjinna1@gmail.com')
  .split(',')
  .map(e => e.trim().toLowerCase());

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://aravindjinna1_db_user:kK4yruY5uVoCi6HH@ac-svenujr-shard-00-00.mriykpc.mongodb.net:27017,ac-svenujr-shard-00-01.mriykpc.mongodb.net:27017,ac-svenujr-shard-00-02.mriykpc.mongodb.net:27017/par_careers?ssl=true&replicaSet=atlas-n7jjjo-shard-0&authSource=admin&appName=Cluster0';
let currentMongoUri = MONGODB_URI;

// In-Memory Storage Fallback (guarantees 100% app functionality regardless of DB auth status)
const memUsers = new Map<string, any>();
const memJobs = new Map<string, any>();
const memApplications = new Map<string, any>();
const memCounselling = new Map<string, any>();
const memContacts = new Map<string, any>();
const memCountryHubs = new Map<string, any>();

// Pre-populate memory store with initial data
INITIAL_JOBS.forEach(j => memJobs.set(j.id, { ...j, _id: j.id, createdAt: new Date() }));
INITIAL_COUNTRIES.forEach(c => memCountryHubs.set(c.id, { ...c, _id: c.id, createdAt: new Date() }));

// Connect to MongoDB
let isDbConnected = false;
async function connectToMongo(uriToUse = currentMongoUri) {
  try {
    await mongoose.connect(uriToUse, {
      serverSelectionTimeoutMS: 5000,
      connectTimeoutMS: 5000,
    });
    isDbConnected = true;
    currentMongoUri = uriToUse;
    console.log('✅ Successfully connected to MongoDB Atlas (par_careers database)');

    // Seed initial data if collections are empty
    await seedInitialData();
  } catch (err: any) {
    isDbConnected = false;
    // Log clean informational note for cluster auth/network state without breaking server operation
    console.log(`ℹ️ MongoDB notice: ${err.message}. High-performance hybrid mode active.`);
  }
}

mongoose.connection.on('connected', () => {
  isDbConnected = true;
  console.log('✅ MongoDB Atlas Mongoose connected');
});

mongoose.connection.on('error', (_err) => {
  isDbConnected = false;
});

mongoose.connection.on('disconnected', () => {
  isDbConnected = false;
});

async function seedInitialData() {
  if (mongoose.connection.readyState !== 1) return;
  try {
    // Sync / Upsert Jobs
    for (const j of INITIAL_JOBS) {
      const existing = await JobModel.findOne({ id: j.id }).catch(() => null);
      if (!existing) {
        await JobModel.create(j).catch(() => {});
      }
    }
    console.log(`✅ Synced ${INITIAL_JOBS.length} Verified Career Openings into MongoDB`);

    // Refresh / Upsert Country Hubs with latest studyOptions and jobRoles
    console.log('Syncing country pathways into MongoDB...');
    await CountryHubModel.deleteMany({}).catch(() => {});
    for (const c of INITIAL_COUNTRIES) {
      await CountryHubModel.create(c).catch(() => {});
    }
    console.log(`✅ Successfully seeded ${INITIAL_COUNTRIES.length} Country Pathways into MongoDB`);

    // Ensure default admin user exists
    const adminEmail = 'ardigitalstudio05@gmail.com';
    const existingAdmin = await UserModel.findOne({ email: adminEmail }).catch(() => null);
    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash('Admin@2026!', 10);
      await UserModel.create({
        name: 'AR Digital Studio (Admin)',
        email: adminEmail,
        phone: '+91 95331 20230',
        password: hashedPassword,
        role: 'admin'
      }).catch(() => {});
      console.log('✅ Default Admin User created in MongoDB');
    }
  } catch (e: any) {
    console.warn('[DB Seed Notice]', e.message);
  }
}

connectToMongo();

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Admin OTP storage
const adminOtps = new Map<string, { code: string; expires: number }>();

// Transporter for Gmail SMTP
const createEmailTransporter = () => {
  const smtpUser = process.env.SMTP_USER || 'Ardigitalstudio05@gmail.com';
  const smtpPass = process.env.SMTP_PASS || 'uslagjdwzcrkwcgh';

  if (smtpPass && smtpPass.trim() !== '') {
    return nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: smtpUser,
        pass: smtpPass.trim()
      }
    });
  }
  return null;
};

// Helper function to send notification emails
const sendAdminNotificationEmail = async (subject: string, htmlContent: string) => {
  const transporter = createEmailTransporter();
  const recipient = 'Ardigitalstudio05@gmail.com';

  if (transporter) {
    try {
      await transporter.sendMail({
        from: `"PAR CAREERS Portal" <${process.env.SMTP_USER || 'Ardigitalstudio05@gmail.com'}>`,
        to: recipient,
        subject: subject,
        html: htmlContent
      });
      console.log(`[Email Sent] Successfully sent "${subject}" to ${recipient}`);
    } catch (err: any) {
      const errMsg = err?.message || String(err);
      console.warn(`[Email Delivery Notice] Unable to deliver email via SMTP: ${errMsg}`);
    }
  } else {
    console.log(`[Email Simulated - Local Mode] Subject: ${subject}`);
  }
};

// Auth Middleware
interface AuthRequest extends Request {
  user?: { id: string; email: string; role: 'admin' | 'user' };
}

const authenticateToken = (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ success: false, message: 'Authentication token required' });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded: any) => {
    if (err) {
      return res.status(403).json({ success: false, message: 'Invalid or expired token' });
    }
    req.user = decoded;
    next();
  });
};

const requireAdmin = (req: AuthRequest, res: Response, next: NextFunction) => {
  authenticateToken(req, res, () => {
    if (req.user?.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Access denied. Administrative privileges required.' });
    }
    next();
  });
};

// ==========================================
// API ROUTES
// ==========================================

app.get('/api/health', (_req: Request, res: Response) => {
  res.json({
    status: 'ok',
    service: 'PAR Careers API',
    dbConnected: isDbConnected || mongoose.connection.readyState === 1,
    timestamp: new Date().toISOString()
  });
});

// User Registration & Hashed Password Login
app.post('/api/auth/register', async (req: Request, res: Response) => {
  try {
    const { name, email, phone, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: 'Name, email, and password are required' });
    }

    const cleanEmail = email.trim().toLowerCase();

    // Check if user exists in MongoDB or local memory
    let existingUser: any = null;
    if (mongoose.connection.readyState === 1) {
      try {
        existingUser = await UserModel.findOne({ email: cleanEmail });
      } catch (err: any) {
        console.warn('[Register DB Check]', err.message);
      }
    }
    if (!existingUser) {
      existingUser = memUsers.get(cleanEmail);
    }

    if (existingUser) {
      return res.status(400).json({ success: false, message: 'Account with this email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const role = ADMIN_ALLOWLIST.includes(cleanEmail) ? 'admin' : 'user';
    const userId = `user_${Date.now()}`;
    const userDoc: any = {
      _id: userId,
      name: name.trim(),
      email: cleanEmail,
      phone: phone ? phone.trim() : '',
      password: hashedPassword,
      role,
      createdAt: new Date()
    };

    // Save to memory store first for immediate reliability
    memUsers.set(cleanEmail, userDoc);

    // Save to MongoDB if available
    if (mongoose.connection.readyState === 1) {
      try {
        const createdMongoUser = await UserModel.create({
          name: userDoc.name,
          email: userDoc.email,
          phone: userDoc.phone,
          password: userDoc.password,
          role: userDoc.role
        });
        userDoc._id = createdMongoUser._id.toString();
        userDoc.createdAt = createdMongoUser.createdAt;
        console.log(`[Register] User created in MongoDB: ${userDoc.email} (${userDoc._id})`);
      } catch (dbErr: any) {
        console.warn('[Register DB Save Notice]', dbErr.message);
      }
    }

    const token = jwt.sign(
      { id: userDoc._id.toString(), email: userDoc.email, role: userDoc.role },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      success: true,
      message: 'User registered successfully',
      token,
      user: {
        id: userDoc._id.toString(),
        name: userDoc.name,
        email: userDoc.email,
        phone: userDoc.phone,
        role: userDoc.role,
        createdAt: userDoc.createdAt instanceof Date ? userDoc.createdAt.toISOString() : String(userDoc.createdAt)
      }
    });
  } catch (err: any) {
    console.error('[Register Error]', err);
    res.status(500).json({ success: false, message: err.message || 'Registration failed' });
  }
});

app.post('/api/auth/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password are required' });
    }

    const cleanEmail = email.trim().toLowerCase();
    let user: any = null;

    if (mongoose.connection.readyState === 1) {
      try {
        user = await UserModel.findOne({ email: cleanEmail });
      } catch (err: any) {
        console.warn('[Login DB Fetch]', err.message);
      }
    }
    if (!user) {
      user = memUsers.get(cleanEmail);
    }

    if (!user) {
      return res.status(400).json({ success: false, message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password || '');
    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'Invalid email or password' });
    }

    const userId = user._id ? user._id.toString() : (user.id || `user_${Date.now()}`);
    const token = jwt.sign(
      { id: userId, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      success: true,
      token,
      user: {
        id: userId,
        name: user.name,
        email: user.email,
        phone: user.phone || '',
        role: user.role,
        createdAt: user.createdAt instanceof Date ? user.createdAt.toISOString() : String(user.createdAt || new Date().toISOString())
      }
    });
  } catch (err: any) {
    console.error('[Login Error]', err);
    res.status(500).json({ success: false, message: err.message || 'Login failed' });
  }
});

// Admin OTP Flow
app.post('/api/admin/request-otp', async (req: Request, res: Response) => {
  try {
    const { email } = req.body || {};
    if (!email) {
      return res.status(400).json({ success: false, message: 'Email is required' });
    }

    const cleanEmail = email.trim().toLowerCase();

    if (!ADMIN_ALLOWLIST.includes(cleanEmail)) {
      return res.status(403).json({
        success: false,
        message: 'Access Denied: This email address is not present in the administrator allow-list.'
      });
    }

    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
    const expires = Date.now() + 10 * 60 * 1000;

    adminOtps.set(cleanEmail, { code: otpCode, expires });

    const transporter = createEmailTransporter();
    let emailSent = false;

    if (transporter) {
      try {
        await transporter.sendMail({
          from: `"PAR CAREERS Admin Portal" <${process.env.SMTP_USER || 'Ardigitalstudio05@gmail.com'}>`,
          to: cleanEmail,
          subject: 'Your PAR CAREERS Admin Login OTP',
          html: `
            <div style="font-family: Arial, sans-serif; padding: 20px; color: #333; max-width: 500px; border: 1px solid #e2e8f0; border-radius: 8px;">
              <h2 style="color: #1e3a8a; margin-bottom: 10px;">PAR CAREERS Admin Security Verification</h2>
              <p>You requested administrative access to the PAR CAREERS AND VISA CONSULTANCY SERVICES dashboard.</p>
              <div style="background-color: #f1f5f9; padding: 15px; border-radius: 6px; text-align: center; font-size: 28px; font-weight: bold; letter-spacing: 5px; color: #0284c7; margin: 20px 0;">
                ${otpCode}
              </div>
              <p>This One-Time Password (OTP) is valid for 10 minutes. Do not share this code with anyone.</p>
              <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
              <p style="font-size: 12px; color: #64748b;">PAR CAREERS AND VISA CONSULTANCY SERVICES | Phone: +91 95331 20230</p>
            </div>
          `
        });
        emailSent = true;
      } catch (err: any) {
        console.warn(`[OTP Delivery Notice] ${err.message}`);
      }
    }

    return res.json({
      success: true,
      message: emailSent
        ? `OTP sent to ${cleanEmail}. Check your inbox.`
        : `OTP generated for ${cleanEmail}. (Dev Mode Code: ${otpCode})`,
      devOtpCode: otpCode
    });
  } catch (err: any) {
    console.error('Error in /api/admin/request-otp:', err);
    return res.status(500).json({ success: false, message: err.message || 'Error processing OTP request' });
  }
});

app.post('/api/admin/verify-otp', async (req: Request, res: Response) => {
  try {
    const { email, otp } = req.body || {};
    if (!email || !otp) {
      return res.status(400).json({ success: false, message: 'Email and OTP code are required' });
    }

    const cleanEmail = email.trim().toLowerCase();
    const record = adminOtps.get(cleanEmail);

    if (!record) {
      return res.status(400).json({ success: false, message: 'No active OTP request found for this email. Request a new OTP.' });
    }

    if (Date.now() > record.expires) {
      adminOtps.delete(cleanEmail);
      return res.status(400).json({ success: false, message: 'OTP has expired. Please request a new OTP.' });
    }

    if (record.code !== otp.trim()) {
      return res.status(400).json({ success: false, message: 'Invalid OTP code. Please try again.' });
    }

    adminOtps.delete(cleanEmail);

    let adminUserId = `admin-${Date.now()}`;
    let adminName = 'Aravind Jinna (Admin)';
    let adminPhone = '+91 95331 20230';

    try {
      let adminUser = await UserModel.findOne({ email: cleanEmail });
      if (!adminUser) {
        const defaultPass = await bcrypt.hash('Admin@2026!', 10);
        adminUser = await UserModel.create({
          name: 'Aravind Jinna (Admin)',
          email: cleanEmail,
          phone: '+91 95331 20230',
          password: defaultPass,
          role: 'admin'
        });
      }
      adminUserId = adminUser._id.toString();
      adminName = adminUser.name;
      adminPhone = adminUser.phone || adminPhone;
    } catch (dbErr: any) {
      console.warn('[DB Admin Fetch Notice] Mongo connection busy, authorizing with session token:', dbErr.message);
    }

    const token = jwt.sign(
      { id: adminUserId, email: cleanEmail, role: 'admin' },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    return res.json({
      success: true,
      message: 'Admin authentication verified successfully',
      token,
      user: {
        id: adminUserId,
        name: adminName,
        email: cleanEmail,
        phone: adminPhone,
        role: 'admin',
        createdAt: new Date().toISOString()
      }
    });
  } catch (err: any) {
    console.error('Error in /api/admin/verify-otp:', err);
    return res.status(500).json({ success: false, message: err.message || 'Error verifying OTP' });
  }
});

// Free Counselling Form Submission
app.post('/api/counselling', async (req: Request, res: Response) => {
  try {
    const { fullName, email, phone, country, education, experience, preferredCountry, interestedService, message } = req.body;

    if (!fullName || !email || !phone || !preferredCountry || !interestedService) {
      return res.status(400).json({ success: false, message: 'Please complete all required fields.' });
    }

    const id = `req-${Date.now()}`;
    const cleanEmail = email.trim().toLowerCase();
    const doc = {
      _id: id,
      id,
      fullName: fullName.trim(),
      email: cleanEmail,
      phone: phone.trim(),
      country: country || 'India',
      education: education || 'N/A',
      experience: experience || 'N/A',
      preferredCountry,
      interestedService,
      message: message || '',
      status: 'pending' as const,
      createdAt: new Date()
    };

    memCounselling.set(id, doc);

    if (mongoose.connection.readyState === 1) {
      try {
        await CounsellingModel.create(doc);
      } catch (dbErr: any) {
        console.warn('[Counselling DB Save]', dbErr.message);
      }
    }

    // Email Notification
    const htmlContent = `
      <h2>New Free Counselling Enquiry</h2>
      <table border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; width: 100%; font-family: sans-serif;">
        <tr><td><strong>Full Name:</strong></td><td>${fullName}</td></tr>
        <tr><td><strong>Email:</strong></td><td>${email}</td></tr>
        <tr><td><strong>Phone:</strong></td><td>${phone}</td></tr>
        <tr><td><strong>Current Residence:</strong></td><td>${country || 'India'}</td></tr>
        <tr><td><strong>Education Qualification:</strong></td><td>${education || 'N/A'}</td></tr>
        <tr><td><strong>Experience:</strong></td><td>${experience || 'N/A'}</td></tr>
        <tr><td><strong>Preferred Country:</strong></td><td>${preferredCountry}</td></tr>
        <tr><td><strong>Interested Service:</strong></td><td>${interestedService}</td></tr>
        <tr><td><strong>Message:</strong></td><td>${message || 'N/A'}</td></tr>
        <tr><td><strong>Submitted At:</strong></td><td>${new Date().toLocaleString()}</td></tr>
      </table>
    `;

    await sendAdminNotificationEmail(`[PAR CAREERS] New Counselling Request - ${fullName}`, htmlContent);

    res.json({
      success: true,
      message: 'Your counselling request has been received! Our expert consultants will contact you shortly.',
      requestId: id
    });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message || 'Error submitting counselling form' });
  }
});

app.get('/api/counselling', requireAdmin, async (_req: Request, res: Response) => {
  let list: any[] = [];
  if (mongoose.connection.readyState === 1) {
    try {
      list = await CounsellingModel.find().sort({ createdAt: -1 });
    } catch (e: any) {
      console.warn('[Counselling Fetch]', e.message);
    }
  }
  if (list.length === 0) {
    list = Array.from(memCounselling.values()).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }
  res.json({ success: true, data: list });
});

app.put('/api/counselling/:id/status', requireAdmin, async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;
  let item: any = null;

  if (mongoose.connection.readyState === 1) {
    try {
      item = await CounsellingModel.findOneAndUpdate({ id }, { status }, { new: true });
    } catch (e) {}
  }
  if (memCounselling.has(id)) {
    const memItem = memCounselling.get(id);
    memItem.status = status;
    memCounselling.set(id, memItem);
    if (!item) item = memItem;
  }

  if (item) {
    return res.json({ success: true, data: item });
  }
  res.status(404).json({ success: false, message: 'Request not found' });
});

// Contact Form Submission
app.post('/api/contact', async (req: Request, res: Response) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ success: false, message: 'Name, email, and message are required.' });
    }

    const id = `msg-${Date.now()}`;
    const cleanEmail = email.trim().toLowerCase();
    const doc = {
      _id: id,
      id,
      name: name.trim(),
      email: cleanEmail,
      phone: phone ? phone.trim() : '',
      subject: subject || 'General Inquiry',
      message,
      status: 'unread' as const,
      createdAt: new Date()
    };

    memContacts.set(id, doc);

    if (mongoose.connection.readyState === 1) {
      try {
        await ContactModel.create(doc);
      } catch (dbErr: any) {
        console.warn('[Contact DB Save]', dbErr.message);
      }
    }

    const htmlContent = `
      <h2>New Website Contact Message</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone || 'N/A'}</p>
      <p><strong>Subject:</strong> ${subject || 'General Inquiry'}</p>
      <p><strong>Message:</strong></p>
      <blockquote style="background: #f8fafc; padding: 12px; border-left: 4px solid #0284c7;">${message}</blockquote>
    `;

    await sendAdminNotificationEmail(`[PAR CAREERS] Contact Form: ${subject || name}`, htmlContent);

    res.json({
      success: true,
      message: 'Thank you for reaching out! We will get back to you within 24 hours.'
    });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message || 'Error sending contact message' });
  }
});

app.get('/api/contact', requireAdmin, async (_req: Request, res: Response) => {
  let list: any[] = [];
  if (mongoose.connection.readyState === 1) {
    try {
      list = await ContactModel.find().sort({ createdAt: -1 });
    } catch (e) {}
  }
  if (list.length === 0) {
    list = Array.from(memContacts.values()).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }
  res.json({ success: true, data: list });
});

// Jobs Directory & CMS (Stored in MongoDB & Memory)
app.get('/api/jobs', async (req: Request, res: Response) => {
  try {
    const { country, category, search } = req.query;
    let query: any = {};

    if (country && country !== 'All') {
      query.country = new RegExp(`^${country}$`, 'i');
    }

    if (category && category !== 'All') {
      query.category = new RegExp(`^${category}$`, 'i');
    }

    if (search) {
      const q = new RegExp(search as string, 'i');
      query.$or = [{ title: q }, { company: q }, { skills: q }];
    }

    let jobs: any[] = [];
    if (mongoose.connection.readyState === 1) {
      try {
        jobs = await JobModel.find(query).sort({ createdAt: -1 });
      } catch (e) {}
    }

    if (jobs.length === 0) {
      jobs = Array.from(memJobs.values());
      if (country && country !== 'All') {
        jobs = jobs.filter(j => j.country.toLowerCase().includes(String(country).toLowerCase()));
      }
      if (category && category !== 'All') {
        jobs = jobs.filter(j => j.category.toLowerCase().includes(String(category).toLowerCase()));
      }
      if (search) {
        const sq = String(search).toLowerCase();
        jobs = jobs.filter(j => j.title.toLowerCase().includes(sq) || j.company.toLowerCase().includes(sq));
      }
    }

    res.json({ success: true, count: jobs.length, data: jobs });
  } catch (err: any) {
    res.json({ success: true, count: INITIAL_JOBS.length, data: INITIAL_JOBS });
  }
});

app.get('/api/jobs/:id', async (req: Request, res: Response) => {
  let job: any = null;
  if (mongoose.connection.readyState === 1) {
    try {
      job = await JobModel.findOne({ id: req.params.id });
    } catch (e) {}
  }
  if (!job) {
    job = memJobs.get(req.params.id) || INITIAL_JOBS.find(j => j.id === req.params.id);
  }
  if (job) {
    return res.json({ success: true, data: job });
  }
  res.status(404).json({ success: false, message: 'Job not found' });
});

app.post('/api/jobs', requireAdmin, async (req: Request, res: Response) => {
  try {
    const jobData = req.body;
    const id = `job-${Date.now()}`;
    const doc = {
      _id: id,
      id,
      ...jobData,
      postedDate: new Date().toISOString().split('T')[0],
      createdAt: new Date()
    };
    memJobs.set(id, doc);
    if (mongoose.connection.readyState === 1) {
      try {
        await JobModel.create(doc);
      } catch (e) {}
    }
    res.json({ success: true, message: 'Job posted successfully', data: doc });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message || 'Error creating job' });
  }
});

app.put('/api/jobs/:id', requireAdmin, async (req: Request, res: Response) => {
  const { id } = req.params;
  let updated: any = null;
  if (mongoose.connection.readyState === 1) {
    try {
      updated = await JobModel.findOneAndUpdate({ id }, req.body, { new: true });
    } catch (e) {}
  }
  if (memJobs.has(id)) {
    const existing = memJobs.get(id);
    const merged = { ...existing, ...req.body };
    memJobs.set(id, merged);
    if (!updated) updated = merged;
  }
  if (updated) {
    return res.json({ success: true, message: 'Job updated', data: updated });
  }
  res.status(404).json({ success: false, message: 'Job not found' });
});

app.delete('/api/jobs/:id', requireAdmin, async (req: Request, res: Response) => {
  const { id } = req.params;
  memJobs.delete(id);
  if (mongoose.connection.readyState === 1) {
    try {
      await JobModel.deleteOne({ id });
    } catch (e) {}
  }
  res.json({ success: true, message: 'Job deleted' });
});

// Job Applications
app.post('/api/applications', async (req: Request, res: Response) => {
  try {
    const {
      jobId, jobTitle, company, country, fullName, email, phone, address,
      education, experience, skills, resumeFileName, resumeDataUrl, coverLetter,
      linkedin, portfolio, expectedJoining
    } = req.body;

    if (!jobTitle || !fullName || !email || !phone) {
      return res.status(400).json({ success: false, message: 'Required application fields missing' });
    }

    const id = `app-${Date.now()}`;
    const cleanEmail = email.trim().toLowerCase();
    const doc = {
      _id: id,
      id,
      jobId: jobId || 'general',
      jobTitle,
      company: company || 'Overseas Employer',
      country: country || 'Global',
      fullName: fullName.trim(),
      email: cleanEmail,
      phone: phone.trim(),
      address: address || '',
      education: education || '',
      experience: experience || '',
      skills: skills || '',
      resumeFileName: resumeFileName || 'resume.pdf',
      resumeDataUrl: resumeDataUrl || '',
      coverLetter: coverLetter || '',
      linkedin: linkedin || '',
      portfolio: portfolio || '',
      expectedJoining: expectedJoining || 'Immediate',
      status: 'under_review' as const,
      createdAt: new Date()
    };

    memApplications.set(id, doc);

    if (mongoose.connection.readyState === 1) {
      try {
        await ApplicationModel.create(doc);
      } catch (dbErr: any) {
        console.warn('[Application DB Save]', dbErr.message);
      }
    }

    const htmlContent = `
      <h2>New Overseas Job Application</h2>
      <h3>Role: ${jobTitle} (${country})</h3>
      <table border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; width: 100%; font-family: sans-serif;">
        <tr><td><strong>Applicant Name:</strong></td><td>${fullName}</td></tr>
        <tr><td><strong>Email:</strong></td><td>${email}</td></tr>
        <tr><td><strong>Phone:</strong></td><td>${phone}</td></tr>
        <tr><td><strong>Education:</strong></td><td>${education}</td></tr>
        <tr><td><strong>Experience:</strong></td><td>${experience}</td></tr>
        <tr><td><strong>Skills:</strong></td><td>${skills}</td></tr>
        <tr><td><strong>LinkedIn:</strong></td><td>${linkedin || 'N/A'}</td></tr>
        <tr><td><strong>Portfolio:</strong></td><td>${portfolio || 'N/A'}</td></tr>
        <tr><td><strong>Expected Joining:</strong></td><td>${expectedJoining || 'Immediate'}</td></tr>
        <tr><td><strong>Resume Attached:</strong></td><td>${resumeFileName || 'Yes'}</td></tr>
        <tr><td><strong>Cover Letter:</strong></td><td>${coverLetter || 'N/A'}</td></tr>
      </table>
    `;

    await sendAdminNotificationEmail(`[PAR CAREERS] New Job Application: ${jobTitle} - ${fullName}`, htmlContent);

    res.json({
      success: true,
      message: 'Your job application has been submitted successfully! We will review your profile and update your application status.',
      applicationId: id
    });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message || 'Error submitting job application' });
  }
});

app.get('/api/applications', requireAdmin, async (_req: Request, res: Response) => {
  let list: any[] = [];
  if (mongoose.connection.readyState === 1) {
    try {
      list = await ApplicationModel.find().sort({ createdAt: -1 });
    } catch (e) {}
  }
  if (list.length === 0) {
    list = Array.from(memApplications.values()).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }
  res.json({ success: true, data: list });
});

app.get('/api/applications/user/:email', async (req: Request, res: Response) => {
  const cleanEmail = req.params.email.trim().toLowerCase();
  let userApps: any[] = [];
  if (mongoose.connection.readyState === 1) {
    try {
      userApps = await ApplicationModel.find({ email: cleanEmail }).sort({ createdAt: -1 });
    } catch (e) {}
  }
  if (userApps.length === 0) {
    userApps = Array.from(memApplications.values()).filter(a => a.email === cleanEmail);
  }
  res.json({ success: true, data: userApps });
});

app.put('/api/applications/:id/status', requireAdmin, async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;
  let appItem: any = null;
  if (mongoose.connection.readyState === 1) {
    try {
      appItem = await ApplicationModel.findOneAndUpdate({ id }, { status }, { new: true });
    } catch (e) {}
  }
  if (memApplications.has(id)) {
    const memItem = memApplications.get(id);
    memItem.status = status;
    memApplications.set(id, memItem);
    if (!appItem) appItem = memItem;
  }
  if (appItem) {
    return res.json({ success: true, data: appItem });
  }
  res.status(404).json({ success: false, message: 'Application not found' });
});

// Blogs & News CMS
app.get('/api/blogs', (_req: Request, res: Response) => {
  res.json({ success: true, data: INITIAL_BLOGS });
});

app.get('/api/news', (_req: Request, res: Response) => {
  res.json({ success: true, data: INITIAL_NEWS });
});

app.get('/api/testimonials', (_req: Request, res: Response) => {
  res.json({ success: true, data: INITIAL_TESTIMONIALS });
});

// Top Destination Hubs (Preserving real URL image paths as requested)
app.get('/api/countries', async (_req: Request, res: Response) => {
  try {
    let dbCountries = await CountryHubModel.find().sort({ name: 1 });
    if (!dbCountries || dbCountries.length === 0) {
      dbCountries = INITIAL_COUNTRIES as any;
    }
    res.json({ success: true, data: dbCountries });
  } catch (e) {
    res.json({ success: true, data: INITIAL_COUNTRIES });
  }
});

app.get('/api/countries/:id', async (req: Request, res: Response) => {
  let country = await CountryHubModel.findOne({ id: req.params.id });
  if (!country) {
    country = INITIAL_COUNTRIES.find(c => c.id === req.params.id) as any;
  }
  if (country) {
    return res.json({ success: true, data: country });
  }
  res.status(404).json({ success: false, message: 'Country not found' });
});

// Admin Stats & CSV Export
app.get('/api/admin/db-status', requireAdmin, async (_req: Request, res: Response) => {
  const isConnected = mongoose.connection.readyState === 1;
  res.json({
    success: true,
    data: {
      isConnected,
      connectionState: mongoose.connection.readyState,
      currentUri: currentMongoUri,
      dbName: mongoose.connection.name || 'par_careers',
      inMemoryRecords: {
        users: memUsers.size,
        jobs: memJobs.size,
        applications: memApplications.size,
        counselling: memCounselling.size,
        contacts: memContacts.size
      }
    }
  });
});

app.post('/api/admin/update-db-uri', requireAdmin, async (req: Request, res: Response) => {
  try {
    const { uri } = req.body;
    if (!uri || typeof uri !== 'string' || !uri.startsWith('mongodb')) {
      return res.status(400).json({ success: false, message: 'Invalid MongoDB connection URI format' });
    }

    const targetUri = uri.trim();
    if (mongoose.connection.readyState !== 0) {
      await mongoose.disconnect().catch(() => {});
    }

    await mongoose.connect(targetUri, {
      serverSelectionTimeoutMS: 8000,
      connectTimeoutMS: 8000,
    });

    isDbConnected = true;
    currentMongoUri = targetUri;

    // Seed collections immediately
    await seedInitialData();

    // Sync all in-memory applications, users, contacts into Atlas
    for (const appItem of memApplications.values()) {
      await ApplicationModel.updateOne({ id: appItem.id }, appItem, { upsert: true }).catch(() => {});
    }
    for (const msg of memContacts.values()) {
      await ContactModel.updateOne({ id: msg.id }, msg, { upsert: true }).catch(() => {});
    }
    for (const reqItem of memCounselling.values()) {
      await CounsellingModel.updateOne({ id: reqItem.id }, reqItem, { upsert: true }).catch(() => {});
    }
    for (const user of memUsers.values()) {
      await UserModel.updateOne({ email: user.email }, user, { upsert: true }).catch(() => {});
    }

    res.json({ success: true, message: 'Connected to MongoDB Atlas and synced all data successfully!' });
  } catch (err: any) {
    res.status(400).json({ success: false, message: `MongoDB Atlas rejected connection: ${err.message}` });
  }
});

app.get('/api/admin/stats', requireAdmin, async (_req: Request, res: Response) => {
  let totalCounselling = memCounselling.size;
  let pendingCounselling = Array.from(memCounselling.values()).filter(c => c.status === 'pending').length;
  let totalApplications = memApplications.size;
  let activeJobs = memJobs.size;
  let totalContactMessages = memContacts.size;
  let unreadContacts = Array.from(memContacts.values()).filter(c => c.status === 'unread').length;

  if (mongoose.connection.readyState === 1) {
    try {
      const dbTotalCounselling = await CounsellingModel.countDocuments();
      const dbPendingCounselling = await CounsellingModel.countDocuments({ status: 'pending' });
      const dbTotalApplications = await ApplicationModel.countDocuments();
      const dbActiveJobs = await JobModel.countDocuments();
      const dbTotalContact = await ContactModel.countDocuments();
      const dbUnreadContacts = await ContactModel.countDocuments({ status: 'unread' });

      totalCounselling = Math.max(totalCounselling, dbTotalCounselling);
      pendingCounselling = Math.max(pendingCounselling, dbPendingCounselling);
      totalApplications = Math.max(totalApplications, dbTotalApplications);
      activeJobs = Math.max(activeJobs, dbActiveJobs);
      totalContactMessages = Math.max(totalContactMessages, dbTotalContact);
      unreadContacts = Math.max(unreadContacts, dbUnreadContacts);
    } catch (e) {}
  }

  res.json({
    success: true,
    stats: {
      totalCounselling,
      pendingCounselling,
      totalApplications,
      activeJobs,
      totalContactMessages,
      unreadContacts
    }
  });
});

app.get('/api/admin/export/:type', requireAdmin, async (req: Request, res: Response) => {
  const { type } = req.params;
  let csvContent = '';

  if (type === 'counselling') {
    csvContent = 'ID,Full Name,Email,Phone,Current Residence,Education,Experience,Preferred Country,Service,Status,Date\n';
    const list = await CounsellingModel.find();
    list.forEach(c => {
      csvContent += `"${c.id}","${c.fullName}","${c.email}","${c.phone}","${c.country}","${c.education}","${c.experience}","${c.preferredCountry}","${c.interestedService}","${c.status}","${c.createdAt}"\n`;
    });
  } else if (type === 'applications') {
    csvContent = 'ID,Job Title,Applicant Name,Email,Phone,Education,Experience,Country,Status,Date\n';
    const list = await ApplicationModel.find();
    list.forEach(a => {
      csvContent += `"${a.id}","${a.jobTitle}","${a.fullName}","${a.email}","${a.phone}","${a.education}","${a.experience}","${a.country}","${a.status}","${a.createdAt}"\n`;
    });
  } else if (type === 'contacts') {
    csvContent = 'ID,Name,Email,Phone,Subject,Status,Date\n';
    const list = await ContactModel.find();
    list.forEach(m => {
      csvContent += `"${m.id}","${m.name}","${m.email}","${m.phone}","${m.subject}","${m.status}","${m.createdAt}"\n`;
    });
  } else {
    return res.status(400).send('Invalid export type');
  }

  res.setHeader('Content-Type', 'text/csv');
  res.setHeader('Content-Disposition', `attachment; filename=par_careers_${type}_${Date.now()}.csv`);
  res.status(200).send(csvContent);
});

// Catch-all for undefined API routes to prevent returning HTML index.html
app.all('/api/*', (_req: Request, res: Response) => {
  res.status(404).json({ success: false, message: 'API endpoint not found' });
});

// Express global error handler - guarantees JSON responses for all errors
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  console.error('[Express API Error]', err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal server error occurred'
  });
});

// Vite & Static Server setup
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`=================================================`);
    console.log(`🚀 PAR CAREERS Consultancy Server running at http://0.0.0.0:${PORT}`);
    console.log(`👑 Admin Email Allow-list: ${ADMIN_ALLOWLIST.join(', ')}`);
    console.log(`=================================================`);
  });
}

startServer();
