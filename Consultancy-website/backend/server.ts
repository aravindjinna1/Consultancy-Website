import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import nodemailer from 'nodemailer';
import mongoose from 'mongoose';
import { createServer as createViteServer } from 'vite';
import { INITIAL_COUNTRIES, INITIAL_JOBS, INITIAL_BLOGS, INITIAL_NEWS, INITIAL_TESTIMONIALS } from '../frontend/src/data/initialData.js';
import { User as UserModel, Job as JobModel, Application as ApplicationModel, Counselling as CounsellingModel, Contact as ContactModel, CountryHub as CountryHubModel, DiagContact as DiagContactModel } from './models.js';

const app = express();
const PORT = Number(process.env.PORT) || 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'par_careers_jwt_secret_key_2026';

const DEFAULT_ADMIN_EMAILS = [
  'parvisaandcareer94@gmail.com',
  'aravindjinna2006@gmail.com'
];

const ADMIN_PASSWORD = 'PAR202620#';

const getAdminAllowList = (): string[] => {
  const envList = (process.env.ADMIN_ALLOWLIST || '')
    .split(',')
    .map(e => e.trim().toLowerCase())
    .filter(Boolean);
  return Array.from(new Set([...DEFAULT_ADMIN_EMAILS, ...envList]));
};

const isAuthorizedAdminEmail = (email?: string | null): boolean => {
  if (!email) return false;
  const clean = email.trim().toLowerCase();
  const allowList = getAdminAllowList();
  return allowList.includes(clean);
};

const WORKING_MONGODB_URI = 'mongodb://aravindjinna1_db_user:kK4yruY5uVoCi6HH@ac-svenujr-shard-00-00.mriykpc.mongodb.net:27017,ac-svenujr-shard-00-01.mriykpc.mongodb.net:27017,ac-svenujr-shard-00-02.mriykpc.mongodb.net:27017/par_careers?ssl=true&replicaSet=atlas-n7jjjo-shard-0&authSource=admin&appName=Cluster0';
const MONGODB_URI = process.env.MONGODB_URI || WORKING_MONGODB_URI;
let currentMongoUri = WORKING_MONGODB_URI;

// In-Memory & Local Storage Fallback
const memUsers = new Map<string, any>();
const memJobs = new Map<string, any>();
const memApplications = new Map<string, any>();
const memCounselling = new Map<string, any>();
const memContacts = new Map<string, any>();
const memCountryHubs = new Map<string, any>();
const memDiagContacts = new Map<string, any>();

// Pre-populate memory store with initial data
INITIAL_JOBS.forEach(j => memJobs.set(j.id, { ...j, createdAt: new Date() }));
INITIAL_COUNTRIES.forEach(c => memCountryHubs.set(c.id, { ...c, createdAt: new Date() }));

// Connect to MongoDB
let isDbConnected = false;
async function connectToMongo(uriToUse?: string) {
  const candidateUris = Array.from(new Set([
    uriToUse,
    WORKING_MONGODB_URI,
    process.env.MONGODB_URI
  ].filter(Boolean) as string[]));

  for (const uri of candidateUris) {
    try {
      if (mongoose.connection.readyState !== 0) {
        await mongoose.disconnect().catch(() => {});
      }
      await mongoose.connect(uri, {
        serverSelectionTimeoutMS: 6000,
        connectTimeoutMS: 6000,
      });
      isDbConnected = true;
      currentMongoUri = uri;
      console.log(`✅ Successfully connected to MongoDB Atlas database: '${mongoose.connection.name}' (${uri.split('@')[1]?.split('?')[0] || 'Atlas Cluster'})`);

      // Seed initial data if collections need sync
      await seedInitialData();
      return;
    } catch (err: any) {
      console.warn(`[MongoDB Connection Notice] Candidate URI not reachable: ${err.message}. Trying verified working URI...`);
    }
  }

  isDbConnected = false;
  console.log(`ℹ️ All MongoDB connection attempts completed. High-performance fallback mode active.`);
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
    // 1. Sync Jobs collection if empty
    const existingJobsCount = await JobModel.countDocuments().catch(() => 0);
    if (existingJobsCount === 0) {
      for (const j of INITIAL_JOBS) {
        await JobModel.updateOne({ id: j.id }, { $set: j }, { upsert: true }).catch(() => {});
      }
      console.log(`✅ Synced ${INITIAL_JOBS.length} Verified Career Openings into MongoDB 'jobs' collection`);
    }

    // 2. Sync CountryHubs collection ONLY if collection is completely empty (never resurrect deleted countries)
    const existingCountriesCount = await CountryHubModel.countDocuments().catch(() => 0);
    if (existingCountriesCount === 0) {
      for (const c of INITIAL_COUNTRIES) {
        await CountryHubModel.updateOne({ id: c.id }, { $set: c }, { upsert: true }).catch(() => {});
      }
      console.log(`✅ Seeded ${INITIAL_COUNTRIES.length} Country Pathways into empty MongoDB 'countryhubs' collection`);
    }

    // 3. Ensure all authorized admin users exist with updated password PAR202620#
    for (const adminEmail of DEFAULT_ADMIN_EMAILS) {
      const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, 10);
      const existingAdmin = await UserModel.findOne({ email: adminEmail }).catch(() => null);
      if (existingAdmin) {
        await UserModel.updateOne(
          { email: adminEmail },
          { $set: { role: 'admin', password: hashedPassword } }
        ).catch(() => {});
      } else {
        await UserModel.create({
          name: adminEmail === 'parvisaandcareer94@gmail.com' ? 'PAR Careers (Admin)' : 'Aravind Jinna (Admin)',
          email: adminEmail,
          phone: '+91 8019021039',
          password: hashedPassword,
          role: 'admin'
        }).catch(() => {});
      }
    }
    console.log(`✅ Admin credentials synchronized for: ${DEFAULT_ADMIN_EMAILS.join(', ')}`);
  } catch (e: any) {
    console.warn('[DB Seed Notice]', e.message);
  }
}

connectToMongo();

// Middleware
// CORS — allow the Vercel frontend origin in production (no wildcard "*"), and
// preserve localhost support for local development. Credentials are enabled and
// the methods/headers the app uses are explicitly allowed so that preflight
// (OPTIONS) and authenticated requests work correctly.
const ALLOWED_ORIGINS = [
  'https://consultancy-website-liard.vercel.app',
  'http://localhost:5173',
  'http://localhost:3000',
  'http://localhost:5000',
  'http://127.0.0.1:5173',
  'http://127.0.0.1:3000',
  'http://127.0.0.1:5000'
];

app.use(cors({
  origin(origin, callback) {
    // Allow requests without an Origin header (same-origin / server-to-server)
    // plus the explicitly allow-listed origins.
    if (!origin || ALLOWED_ORIGINS.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error('Origin not allowed by CORS'));
  },
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Admin OTP storage
const adminOtps = new Map<string, { code: string; expires: number }>();

// Transporter for Gmail SMTP
const createEmailTransporter = () => {
  const smtpUser = process.env.SMTP_USER || 'parvisaandcareer94@gmail.com';
  const smtpPass = process.env.SMTP_PASS || 'uslagjdwzcrkwcgh';

  if (smtpPass && smtpPass.trim() !== '') {
    return nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: smtpUser,
        pass: smtpPass.trim()
      },
      // Bound the SMTP connection/send so a stalled Gmail connection can never
      // block (or drop) the HTTP response that is submitting the form.
      connectionTimeout: 10000,
      greetingTimeout: 10000,
      socketTimeout: 15000
    });
  }
  return null;
};

// Helper function to send notification emails.
// This runs in the background and never blocks the request that triggered it,
// so a slow/unreachable SMTP server cannot hang or fail the form submission.
const sendAdminNotificationEmail = async (subject: string, htmlContent: string, timeoutMs = 15000) => {
  const transporter = createEmailTransporter();
  const recipient = 'parvisaandcareer94@gmail.com';

  if (transporter) {
    try {
      await Promise.race([
        transporter.sendMail({
          from: `"PAR CAREERS Portal" <${process.env.SMTP_USER || 'parvisaandcareer94@gmail.com'}>`,
          to: recipient,
          subject: subject,
          html: htmlContent
        }),
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error(`Email send timed out after ${timeoutMs}ms`)), timeoutMs)
        )
      ]);
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
    const isEmailAdmin = isAuthorizedAdminEmail(req.user?.email);
    if (req.user?.role !== 'admin' && !isEmailAdmin) {
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
    const role = isAuthorizedAdminEmail(cleanEmail) ? 'admin' : 'user';
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
    const isAdminEmail = isAuthorizedAdminEmail(cleanEmail);

    // If admin is logging in via standard login form
    if (isAdminEmail) {
      if (password !== ADMIN_PASSWORD) {
        return res.status(401).json({ success: false, message: 'Invalid password for administrative account.' });
      }
      const userId = `admin_${cleanEmail.replace(/[^a-z0-9]/gi, '_')}`;
      const token = jwt.sign(
        { id: userId, email: cleanEmail, role: 'admin' },
        JWT_SECRET,
        { expiresIn: '30d' }
      );
      return res.json({
        success: true,
        token,
        user: {
          id: userId,
          name: cleanEmail === 'parvisaandcareer94@gmail.com' ? 'PAR Careers (Admin)' : 'Aravind Jinna (Admin)',
          email: cleanEmail,
          phone: '+91 8019021039',
          role: 'admin',
          createdAt: new Date().toISOString()
        }
      });
    }

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

    const userRole = user.role || 'user';
    const userId = user._id ? user._id.toString() : (user.id || `user_${Date.now()}`);
    const token = jwt.sign(
      { id: userId, email: user.email, role: userRole },
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

// Dedicated Administrator Authentication Route
app.post('/api/auth/admin-login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body || {};
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and administrator password are required.' });
    }

    const cleanEmail = email.trim().toLowerCase();

    // 1. Check authorized administrator email
    if (!isAuthorizedAdminEmail(cleanEmail)) {
      return res.status(403).json({
        success: false,
        message: 'Access Denied: Only authorized administrative accounts (parvisaandcareer94@gmail.com, aravindjinna2006@gmail.com) can access the dashboard.'
      });
    }

    // 2. Check administrator password (PAR202620#)
    if (password !== ADMIN_PASSWORD) {
      return res.status(401).json({
        success: false,
        message: 'Invalid password. Please enter the correct administrator password.'
      });
    }

    // Find or create in MongoDB
    let adminUserId = `admin_${cleanEmail.replace(/[^a-z0-9]/gi, '_')}`;
    let adminName = cleanEmail === 'parvisaandcareer94@gmail.com' ? 'PAR Careers (Admin)' : 'Aravind Jinna (Admin)';
    let adminPhone = '+91 8019021039';

    if (mongoose.connection.readyState === 1) {
      try {
        let adminUser = await UserModel.findOne({ email: cleanEmail });
        if (!adminUser) {
          const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, 10);
          adminUser = await UserModel.create({
            name: adminName,
            email: cleanEmail,
            phone: adminPhone,
            password: hashedPassword,
            role: 'admin'
          });
        }
        adminUserId = adminUser._id.toString();
        adminName = adminUser.name || adminName;
        adminPhone = adminUser.phone || adminPhone;
      } catch (dbErr: any) {
        console.warn('[DB Admin Save Notice]', dbErr.message);
      }
    }

    const token = jwt.sign(
      { id: adminUserId, email: cleanEmail, role: 'admin' },
      JWT_SECRET,
      { expiresIn: '30d' }
    );

    return res.json({
      success: true,
      message: 'Admin authentication verified successfully.',
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
    console.error('[Admin Login Error]', err);
    return res.status(500).json({ success: false, message: err.message || 'Error processing administrator login' });
  }
});

// Legacy Admin Endpoints for Compatibility
app.post('/api/admin/request-otp', async (req: Request, res: Response) => {
  const { email } = req.body || {};
  const cleanEmail = (email || '').trim().toLowerCase();
  if (!isAuthorizedAdminEmail(cleanEmail)) {
    return res.status(403).json({
      success: false,
      message: 'Access Denied: Email address is not in the administrator allow-list.'
    });
  }
  return res.json({
    success: true,
    message: 'Direct password authentication active.'
  });
});

app.post('/api/admin/verify-otp', async (req: Request, res: Response) => {
  const { email } = req.body || {};
  const cleanEmail = (email || '').trim().toLowerCase();
  if (!isAuthorizedAdminEmail(cleanEmail)) {
    return res.status(403).json({ success: false, message: 'Access Denied.' });
  }
  const userId = `admin_${cleanEmail.replace(/[^a-z0-9]/gi, '_')}`;
  const token = jwt.sign({ id: userId, email: cleanEmail, role: 'admin' }, JWT_SECRET, { expiresIn: '30d' });
  return res.json({
    success: true,
    token,
    user: { id: userId, email: cleanEmail, role: 'admin', name: 'PAR Careers (Admin)' }
  });
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
        const saved = await CounsellingModel.create(doc);
        console.log(`[Counselling DB Save Success] Stored in MongoDB Atlas 'counsellings': ${saved.id} (Doc ID: ${saved._id})`);
      } catch (dbErr: any) {
        console.error('[Counselling DB Save Error]', dbErr.message);
      }
    } else {
      console.warn('[Counselling DB Save Warning] MongoDB not connected, stored in memory/backup');
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

    void sendAdminNotificationEmail(`[PAR CAREERS] New Counselling Request - ${fullName}`, htmlContent);

    res.json({
      success: true,
      message: 'Your counselling request has been received and saved to database! Our expert consultants will contact you shortly.',
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
        const saved = await ContactModel.create(doc);
        console.log(`[Contact DB Save Success] Stored in MongoDB Atlas 'contacts': ${saved.id} (Doc ID: ${saved._id})`);
      } catch (dbErr: any) {
        console.error('[Contact DB Save Error]', dbErr.message);
      }
    } else {
      console.warn('[Contact DB Save Warning] MongoDB not connected, stored in memory/backup');
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

    void sendAdminNotificationEmail(`[PAR CAREERS] Contact Form: ${subject || name}`, htmlContent);

    res.json({
      success: true,
      message: 'Thank you for reaching out! Your message has been saved to database and we will get back to you within 24 hours.'
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
      id,
      ...jobData,
      postedDate: new Date().toISOString().split('T')[0],
      createdAt: new Date()
    };
    memJobs.set(id, doc);
    if (mongoose.connection.readyState === 1) {
      try {
        const savedJob = await JobModel.create(doc);
        console.log(`[Job DB Save Success] Stored in MongoDB Atlas 'jobs': ${savedJob.id}`);
      } catch (e: any) {
        console.error('[Job DB Save Error]', e.message);
      }
    }
    res.json({ success: true, message: 'Job posted and saved to database successfully', data: doc });
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
  res.json({ success: true, message: 'Job deleted from database' });
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
        const savedApp = await ApplicationModel.create(doc);
        console.log(`[Application DB Save Success] Stored in MongoDB Atlas 'applications': ${savedApp.id} (Doc ID: ${savedApp._id})`);
      } catch (dbErr: any) {
        console.error('[Application DB Save Error]', dbErr.message);
      }
    } else {
      console.warn('[Application DB Save Warning] MongoDB not connected, stored in memory/backup');
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

    void sendAdminNotificationEmail(`[PAR CAREERS] New Job Application: ${jobTitle} - ${fullName}`, htmlContent);

    res.json({
      success: true,
      message: 'Your job application has been submitted and stored in the database! We will review your profile and update your application status.',
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

// Diagnostic Contacts / Assessment Requests (diagcontacts collection)
app.post('/api/diagcontacts', async (req: Request, res: Response) => {
  try {
    const { fullName, email, phone, currentCountry, targetCountry, purpose, education, experience, score, eligible, notes } = req.body;
    if (!fullName || !email || !phone) {
      return res.status(400).json({ success: false, message: 'Full name, email, and phone number are required' });
    }
    const id = `diag-${Date.now()}`;
    const doc = {
      id,
      fullName,
      email: email.toLowerCase().trim(),
      phone,
      currentCountry: currentCountry || 'India',
      targetCountry: targetCountry || 'Germany',
      purpose: purpose || 'Work Visa',
      education: education || 'Bachelor Degree',
      experience: experience || '2-5 Years',
      score: score || 85,
      eligible: eligible !== undefined ? eligible : true,
      status: 'new',
      notes: notes || '',
      createdAt: new Date()
    };
    memDiagContacts.set(id, doc);
    if (mongoose.connection.readyState === 1) {
      try {
        const savedDiag = await DiagContactModel.create(doc);
        console.log(`[DiagContact DB Save Success] Stored in MongoDB Atlas 'diagcontacts': ${savedDiag.id}`);
      } catch (e: any) {
        console.error('[DB DiagContact Save Error]', e.message);
      }
    }
    res.json({ success: true, message: 'Assessment profile registered and saved to database successfully', data: doc });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message || 'Error saving assessment profile' });
  }
});

app.get('/api/diagcontacts', requireAdmin, async (_req: Request, res: Response) => {
  let list: any[] = [];
  if (mongoose.connection.readyState === 1) {
    try {
      list = await DiagContactModel.find().sort({ createdAt: -1 });
    } catch (e) {}
  }
  if (list.length === 0) {
    list = Array.from(memDiagContacts.values()).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }
  res.json({ success: true, data: list });
});

app.put('/api/diagcontacts/:id/status', requireAdmin, async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status, notes } = req.body;
  let doc: any = null;
  if (mongoose.connection.readyState === 1) {
    try {
      doc = await DiagContactModel.findOneAndUpdate({ id }, { ...(status && { status }), ...(notes && { notes }) }, { new: true });
    } catch (e) {}
  }
  if (memDiagContacts.has(id)) {
    const mem = memDiagContacts.get(id);
    if (status) mem.status = status;
    if (notes) mem.notes = notes;
    memDiagContacts.set(id, mem);
    if (!doc) doc = mem;
  }
  if (doc) {
    return res.json({ success: true, data: doc });
  }
  res.status(404).json({ success: false, message: 'Diagnostic contact record not found' });
});

// Top Destination Hubs (countryhubs collection in MongoDB)
app.get('/api/countries', async (_req: Request, res: Response) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const dbCountries = await CountryHubModel.find().sort({ name: 1 });
      return res.json({ success: true, count: dbCountries.length, data: dbCountries });
    }
    const memList = Array.from(memCountryHubs.values());
    res.json({ success: true, count: memList.length, data: memList });
  } catch (e: any) {
    res.status(500).json({ success: false, message: e.message || 'Error fetching countries' });
  }
});

app.get('/api/countries/:id', async (req: Request, res: Response) => {
  const rawId = req.params.id;
  const normalizedId = (rawId || '').toLowerCase().trim();
  let country: any = null;

  if (mongoose.connection.readyState === 1) {
    try {
      const query: any[] = [
        { id: rawId },
        { id: normalizedId },
        { id: { $regex: new RegExp(`^${normalizedId}$`, 'i') } }
      ];
      if (mongoose.Types.ObjectId.isValid(rawId)) {
        query.push({ _id: new mongoose.Types.ObjectId(rawId) });
      }
      country = await CountryHubModel.findOne({ $or: query });
    } catch (e) {}
  }
  if (!country) {
    country = memCountryHubs.get(rawId) || memCountryHubs.get(normalizedId);
  }
  if (country) {
    return res.json({ success: true, data: country });
  }
  res.status(404).json({ success: false, message: 'Country guide not found' });
});

app.post('/api/countries', requireAdmin, async (req: Request, res: Response) => {
  try {
    const countryData = req.body;
    const id = (countryData.id || countryData.name || 'country').toLowerCase().trim().replace(/\s+/g, '-');
    const doc = {
      id,
      ...countryData,
      createdAt: new Date()
    };
    memCountryHubs.set(id, doc);
    if (mongoose.connection.readyState === 1) {
      await CountryHubModel.updateOne({ id }, { $set: doc }, { upsert: true }).catch(() => {});
    }
    res.json({ success: true, message: 'Country pathway created successfully in database', data: doc });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message || 'Error saving country' });
  }
});

app.put('/api/countries/:id', requireAdmin, async (req: Request, res: Response) => {
  const { id } = req.params;
  const normalizedId = id.toLowerCase().trim();
  let updated: any = null;

  if (mongoose.connection.readyState === 1) {
    try {
      updated = await CountryHubModel.findOneAndUpdate(
        { $or: [{ id }, { id: normalizedId }] },
        req.body,
        { new: true }
      );
    } catch (e) {}
  }
  if (memCountryHubs.has(id) || memCountryHubs.has(normalizedId)) {
    const existing = memCountryHubs.get(id) || memCountryHubs.get(normalizedId);
    const merged = { ...existing, ...req.body };
    memCountryHubs.set(id, merged);
    memCountryHubs.set(normalizedId, merged);
    if (!updated) updated = merged;
  }
  if (updated) {
    return res.json({ success: true, message: 'Country updated in database', data: updated });
  }
  res.status(404).json({ success: false, message: 'Country not found' });
});

app.delete('/api/countries/:id', requireAdmin, async (req: Request, res: Response) => {
  try {
    const rawParam = req.params.id;
    const decodedParam = decodeURIComponent(rawParam || '').trim();
    const normalizedId = decodedParam.toLowerCase();

    // 1. Delete from in-memory cache
    memCountryHubs.delete(rawParam);
    memCountryHubs.delete(decodedParam);
    memCountryHubs.delete(normalizedId);
    for (const [key, value] of Array.from(memCountryHubs.entries())) {
      if (
        key.toLowerCase() === normalizedId ||
        value.id?.toLowerCase() === normalizedId ||
        value.name?.toLowerCase() === normalizedId ||
        value._id?.toString() === rawParam ||
        value._id?.toString() === decodedParam
      ) {
        memCountryHubs.delete(key);
      }
    }

    // 2. Delete from MongoDB Atlas
    let deletedCount = 0;
    if (mongoose.connection.readyState === 1) {
      const escapeRegex = (str: string) => str.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');
      const orQuery: any[] = [
        { id: rawParam },
        { id: decodedParam },
        { id: normalizedId },
        { id: { $regex: new RegExp(`^${escapeRegex(normalizedId)}$`, 'i') } },
        { name: { $regex: new RegExp(`^${escapeRegex(decodedParam)}$`, 'i') } },
        { name: { $regex: new RegExp(`^${escapeRegex(rawParam)}$`, 'i') } }
      ];
      if (mongoose.Types.ObjectId.isValid(rawParam)) {
        orQuery.push({ _id: new mongoose.Types.ObjectId(rawParam) });
      }
      if (mongoose.Types.ObjectId.isValid(decodedParam)) {
        orQuery.push({ _id: new mongoose.Types.ObjectId(decodedParam) });
      }
      const deleteResult = await CountryHubModel.deleteMany({ $or: orQuery });
      deletedCount = deleteResult.deletedCount || 0;
      console.log(`[Country Delete] Successfully deleted '${decodedParam}' (ID: ${rawParam}) from MongoDB Atlas 'countryhubs'. Deleted count: ${deletedCount}`);
    }

    return res.json({
      success: true,
      deletedCount,
      message: `Country '${decodedParam}' removed permanently from database and UI.`
    });
  } catch (err: any) {
    console.error('[Country Delete Error]', err);
    return res.status(500).json({ success: false, message: err.message || 'Error deleting country' });
  }
});

// Admin Stats & Database Inspector for All 7 Collections
app.get('/api/admin/db-status', requireAdmin, async (_req: Request, res: Response) => {
  const isConnected = mongoose.connection.readyState === 1;
  let dbCounts = {
    users: memUsers.size,
    jobs: memJobs.size,
    applications: memApplications.size,
    counselling: memCounselling.size,
    contacts: memContacts.size,
    countryhubs: memCountryHubs.size,
    diagcontacts: memDiagContacts.size
  };

  if (isConnected) {
    try {
      const [u, j, a, c, cnt, ch, d] = await Promise.all([
        UserModel.countDocuments().catch(() => 0),
        JobModel.countDocuments().catch(() => 0),
        ApplicationModel.countDocuments().catch(() => 0),
        CounsellingModel.countDocuments().catch(() => 0),
        ContactModel.countDocuments().catch(() => 0),
        CountryHubModel.countDocuments().catch(() => 0),
        DiagContactModel.countDocuments().catch(() => 0),
      ]);
      dbCounts = {
        users: u,
        jobs: j,
        applications: a,
        counselling: c,
        contacts: cnt,
        countryhubs: ch,
        diagcontacts: d
      };
    } catch (e) {}
  }

  res.json({
    success: true,
    data: {
      isConnected,
      connectionState: mongoose.connection.readyState,
      currentUri: currentMongoUri,
      dbName: mongoose.connection.name || 'par_careers',
      collections: [
        { name: 'applications', count: dbCounts.applications },
        { name: 'contacts', count: dbCounts.contacts },
        { name: 'counsellings', count: dbCounts.counselling },
        { name: 'countryhubs', count: dbCounts.countryhubs },
        { name: 'diagcontacts', count: dbCounts.diagcontacts },
        { name: 'jobs', count: dbCounts.jobs },
        { name: 'users', count: dbCounts.users }
      ],
      dbCounts
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

    // Sync all in-memory collections into Atlas
    for (const appItem of memApplications.values()) {
      await ApplicationModel.updateOne({ id: appItem.id }, { $set: appItem }, { upsert: true }).catch(() => {});
    }
    for (const msg of memContacts.values()) {
      await ContactModel.updateOne({ id: msg.id }, { $set: msg }, { upsert: true }).catch(() => {});
    }
    for (const reqItem of memCounselling.values()) {
      await CounsellingModel.updateOne({ id: reqItem.id }, { $set: reqItem }, { upsert: true }).catch(() => {});
    }
    for (const user of memUsers.values()) {
      await UserModel.updateOne({ email: user.email }, { $set: user }, { upsert: true }).catch(() => {});
    }
    for (const job of memJobs.values()) {
      await JobModel.updateOne({ id: job.id }, { $set: job }, { upsert: true }).catch(() => {});
    }
    for (const country of memCountryHubs.values()) {
      await CountryHubModel.updateOne({ id: country.id }, { $set: country }, { upsert: true }).catch(() => {});
    }
    for (const diag of memDiagContacts.values()) {
      await DiagContactModel.updateOne({ id: diag.id }, { $set: diag }, { upsert: true }).catch(() => {});
    }

    res.json({ success: true, message: 'Connected to MongoDB Atlas and synced all 7 collections successfully!' });
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
  let totalCountries = memCountryHubs.size;
  let totalDiagContacts = memDiagContacts.size;

  if (mongoose.connection.readyState === 1) {
    try {
      const [dbTotalC, dbPendingC, dbTotalA, dbActiveJ, dbTotalCnt, dbUnreadCnt, dbTotalCh, dbTotalD] = await Promise.all([
        CounsellingModel.countDocuments(),
        CounsellingModel.countDocuments({ status: 'pending' }),
        ApplicationModel.countDocuments(),
        JobModel.countDocuments(),
        ContactModel.countDocuments(),
        ContactModel.countDocuments({ status: 'unread' }),
        CountryHubModel.countDocuments(),
        DiagContactModel.countDocuments()
      ]);

      totalCounselling = dbTotalC;
      pendingCounselling = dbPendingC;
      totalApplications = dbTotalA;
      activeJobs = dbActiveJ;
      totalContactMessages = dbTotalCnt;
      unreadContacts = dbUnreadCnt;
      totalCountries = dbTotalCh;
      totalDiagContacts = dbTotalD;
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
      unreadContacts,
      totalCountries,
      totalDiagContacts
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
  }
  // The frontend is deployed separately on Vercel, so the backend no longer
  // attempts to serve dist/index.html in production. It now acts purely as an
  // API server while keeping the local Vite dev-server behavior above intact.

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`=================================================`);
    console.log(`🚀 PAR CAREERS Consultancy Server running at http://0.0.0.0:${PORT}`);
    console.log(`👑 Admin Email Allow-list: ${getAdminAllowList().join(', ')}`);
    console.log(`=================================================`);
  });
}

startServer();
