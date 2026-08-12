import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import nodemailer from 'nodemailer';
import { createServer as createViteServer } from 'vite';
import { INITIAL_COUNTRIES, INITIAL_JOBS, INITIAL_BLOGS, INITIAL_NEWS, INITIAL_TESTIMONIALS } from './src/data/initialData.js';
import { CounsellingRequest, ContactMessage, Job, JobApplication, Blog, NewsItem, Testimonial, Referral, User } from './src/types.js';

const app = express();
const PORT = 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'par_careers_jwt_secret_key_2026';
const ADMIN_ALLOWLIST = (process.env.ADMIN_ALLOWLIST || 'aravindjinna1@gmail.com').split(',').map(e => e.trim().toLowerCase());

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// In-Memory Database collections (pre-populated)
let counsellingStore: CounsellingRequest[] = [
  {
    id: 'req-1',
    fullName: 'Anil Kumar',
    email: 'anilkumar@example.com',
    phone: '+91 9876543210',
    country: 'India',
    education: 'B.Tech Computer Science',
    experience: '4 Years',
    preferredCountry: 'Germany',
    interestedService: 'Work Visa (EU Blue Card)',
    message: 'I am interested in Chancenkarte or EU Blue Card options for Germany.',
    status: 'pending',
    createdAt: new Date().toISOString()
  }
];

let contactStore: ContactMessage[] = [
  {
    id: 'msg-1',
    name: 'Priya Sharma',
    email: 'priyasharma@example.com',
    phone: '+91 9123456789',
    subject: 'Inquiry regarding UK Student Visa Process',
    message: 'Hello, I want to know about intake deadlines and tuition deposit requirements for UK universities.',
    status: 'unread',
    createdAt: new Date().toISOString()
  }
];

let jobsStore: Job[] = [...INITIAL_JOBS];
let applicationsStore: JobApplication[] = [];
let blogsStore: Blog[] = [...INITIAL_BLOGS];
let newsStore: NewsItem[] = [...INITIAL_NEWS];
let testimonialsStore: Testimonial[] = [...INITIAL_TESTIMONIALS];
let referralsStore: Referral[] = [];
let usersStore: User[] = [
  {
    id: 'user-admin',
    name: 'Aravind Jinna (Admin)',
    email: 'aravindjinna1@gmail.com',
    phone: '+91 8106023616',
    role: 'admin',
    createdAt: new Date().toISOString()
  }
];

// Admin OTP storage: email -> { code: string, expires: number }
const adminOtps = new Map<string, { code: string; expires: number }>();

// Transporter for Gmail SMTP if credentials provided
const createEmailTransporter = () => {
  const smtpUser = process.env.SMTP_USER || 'aravindjinna1@gmail.com';
  const smtpPass = process.env.SMTP_PASS || 'uslagjdwzcrkwcgh';

  if (smtpPass && smtpPass.trim() !== '') {
    return nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: smtpUser,
        pass: smtpPass
      }
    });
  }
  return null;
};

// Helper function to send notification emails
const sendAdminNotificationEmail = async (subject: string, htmlContent: string) => {
  const transporter = createEmailTransporter();
  const recipient = 'aravindjinna1@gmail.com';

  if (transporter) {
    try {
      await transporter.sendMail({
        from: `"PAR CAREERS Portal" <${process.env.SMTP_USER || 'aravindjinna1@gmail.com'}>`,
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

// Authentication Middleware
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

// Health Check
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok', service: 'PAR Careers API', timestamp: new Date().toISOString() });
});

// User Auth Routes
app.post('/api/auth/register', async (req: Request, res: Response) => {
  const { name, email, phone, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ success: false, message: 'Name, email, and password are required' });
  }

  const existingUser = usersStore.find(u => u.email.toLowerCase() === email.toLowerCase());
  if (existingUser) {
    return res.status(400).json({ success: false, message: 'Account with this email already exists' });
  }

  const role = ADMIN_ALLOWLIST.includes(email.toLowerCase()) ? 'admin' : 'user';
  const newUser: User = {
    id: `user-${Date.now()}`,
    name,
    email: email.toLowerCase(),
    phone: phone || '',
    role,
    createdAt: new Date().toISOString()
  };

  usersStore.push(newUser);
  const token = jwt.sign({ id: newUser.id, email: newUser.email, role: newUser.role }, JWT_SECRET, { expiresIn: '7d' });

  res.json({
    success: true,
    message: 'User registered successfully',
    token,
    user: newUser
  });
});

app.post('/api/auth/login', (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Email and password are required' });
  }

  const user = usersStore.find(u => u.email.toLowerCase() === email.toLowerCase());
  if (!user) {
    return res.status(400).json({ success: false, message: 'Invalid email or password' });
  }

  const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: '7d' });

  res.json({
    success: true,
    token,
    user
  });
});

// Admin OTP Authentication Flow
app.post('/api/admin/request-otp', async (req: Request, res: Response) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ success: false, message: 'Email is required' });
  }

  const cleanEmail = email.trim().toLowerCase();

  // Strict Allow-list check
  if (!ADMIN_ALLOWLIST.includes(cleanEmail)) {
    return res.status(403).json({
      success: false,
      message: 'Access Denied: This email address is not present in the administrator allow-list.'
    });
  }

  // Generate 6-digit OTP
  const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
  const expires = Date.now() + 10 * 60 * 1000; // 10 minutes

  adminOtps.set(cleanEmail, { code: otpCode, expires });

  // Send email if SMTP is configured
  const transporter = createEmailTransporter();
  let emailSent = false;

  if (transporter) {
    try {
      await transporter.sendMail({
        from: `"PAR CAREERS Admin Portal" <${process.env.SMTP_USER || 'aravindjinna1@gmail.com'}>`,
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
            <p style="font-size: 12px; color: #64748b;">PAR CAREERS AND VISA CONSULTANCY SERVICES | Phone: +91 8106023616</p>
          </div>
        `
      });
      emailSent = true;
    } catch (err: any) {
      const errMsg = err?.message || String(err);
      console.warn(`[OTP Delivery Notice] ${errMsg}`);
    }
  }

  res.json({
    success: true,
    message: emailSent
      ? `OTP sent to ${cleanEmail}. Check your inbox.`
      : `OTP generated for ${cleanEmail}. (Dev Mode Code: ${otpCode})`,
    devOtpCode: otpCode // Provided in dev preview so admin testing is seamless
  });
});

app.post('/api/admin/verify-otp', (req: Request, res: Response) => {
  const { email, otp } = req.body;
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

  // OTP verified successfully
  adminOtps.delete(cleanEmail);

  // Ensure admin user exists
  let adminUser = usersStore.find(u => u.email === cleanEmail);
  if (!adminUser) {
    adminUser = {
      id: `admin-${Date.now()}`,
      name: 'Aravind Jinna (Admin)',
      email: cleanEmail,
      phone: '+91 8106023616',
      role: 'admin',
      createdAt: new Date().toISOString()
    };
    usersStore.push(adminUser);
  }

  const token = jwt.sign(
    { id: adminUser.id, email: adminUser.email, role: 'admin' },
    JWT_SECRET,
    { expiresIn: '24h' }
  );

  res.json({
    success: true,
    message: 'Admin authentication verified successfully',
    token,
    user: adminUser
  });
});

// Free Counselling Form Submission
app.post('/api/counselling', async (req: Request, res: Response) => {
  const { fullName, email, phone, country, education, experience, preferredCountry, interestedService, message } = req.body;

  if (!fullName || !email || !phone || !preferredCountry || !interestedService) {
    return res.status(400).json({ success: false, message: 'Please complete all required fields.' });
  }

  const newRequest: CounsellingRequest = {
    id: `req-${Date.now()}`,
    fullName,
    email,
    phone,
    country: country || 'India',
    education: education || 'N/A',
    experience: experience || 'N/A',
    preferredCountry,
    interestedService,
    message: message || '',
    status: 'pending',
    createdAt: new Date().toISOString()
  };

  counsellingStore.unshift(newRequest);

  // Send Email Notification to Admin (aravindjinna1@gmail.com)
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
    requestId: newRequest.id
  });
});

app.get('/api/counselling', requireAdmin, (_req: Request, res: Response) => {
  res.json({ success: true, data: counsellingStore });
});

app.put('/api/counselling/:id/status', requireAdmin, (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;
  const item = counsellingStore.find(c => c.id === id);
  if (item) {
    item.status = status;
    return res.json({ success: true, data: item });
  }
  res.status(404).json({ success: false, message: 'Request not found' });
});

// Contact Form Submission
app.post('/api/contact', async (req: Request, res: Response) => {
  const { name, email, phone, subject, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ success: false, message: 'Name, email, and message are required.' });
  }

  const newMessage: ContactMessage = {
    id: `msg-${Date.now()}`,
    name,
    email,
    phone: phone || '',
    subject: subject || 'General Inquiry',
    message,
    status: 'unread',
    createdAt: new Date().toISOString()
  };

  contactStore.unshift(newMessage);

  // Email to Admin
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
});

app.get('/api/contact', requireAdmin, (_req: Request, res: Response) => {
  res.json({ success: true, data: contactStore });
});

// Jobs Directory & CMS
app.get('/api/jobs', (req: Request, res: Response) => {
  const { country, category, search } = req.query;
  let filtered = [...jobsStore];

  if (country && country !== 'All') {
    filtered = filtered.filter(j => j.country.toLowerCase() === (country as string).toLowerCase());
  }

  if (category && category !== 'All') {
    filtered = filtered.filter(j => j.category.toLowerCase() === (category as string).toLowerCase());
  }

  if (search) {
    const q = (search as string).toLowerCase();
    filtered = filtered.filter(j =>
      j.title.toLowerCase().includes(q) ||
      j.company.toLowerCase().includes(q) ||
      j.skills.some(s => s.toLowerCase().includes(q))
    );
  }

  res.json({ success: true, count: filtered.length, data: filtered });
});

app.get('/api/jobs/:id', (req: Request, res: Response) => {
  const job = jobsStore.find(j => j.id === req.params.id);
  if (job) {
    return res.json({ success: true, data: job });
  }
  res.status(404).json({ success: false, message: 'Job not found' });
});

app.post('/api/jobs', requireAdmin, (req: Request, res: Response) => {
  const jobData = req.body;
  const newJob: Job = {
    id: `job-${Date.now()}`,
    ...jobData,
    postedDate: new Date().toISOString().split('T')[0]
  };
  jobsStore.unshift(newJob);
  res.json({ success: true, message: 'Job posted successfully', data: newJob });
});

app.put('/api/jobs/:id', requireAdmin, (req: Request, res: Response) => {
  const { id } = req.params;
  const index = jobsStore.findIndex(j => j.id === id);
  if (index !== -1) {
    jobsStore[index] = { ...jobsStore[index], ...req.body };
    return res.json({ success: true, message: 'Job updated', data: jobsStore[index] });
  }
  res.status(404).json({ success: false, message: 'Job not found' });
});

app.delete('/api/jobs/:id', requireAdmin, (req: Request, res: Response) => {
  const { id } = req.params;
  jobsStore = jobsStore.filter(j => j.id !== id);
  res.json({ success: true, message: 'Job deleted' });
});

// Job Applications
app.post('/api/applications', async (req: Request, res: Response) => {
  const {
    jobId, jobTitle, company, country, fullName, email, phone, address,
    education, experience, skills, resumeFileName, resumeDataUrl, coverLetter,
    linkedin, portfolio, expectedJoining
  } = req.body;

  if (!jobTitle || !fullName || !email || !phone) {
    return res.status(400).json({ success: false, message: 'Required application fields missing' });
  }

  const newApp: JobApplication = {
    id: `app-${Date.now()}`,
    jobId: jobId || 'general',
    jobTitle,
    company: company || 'Overseas Employer',
    country: country || 'Global',
    fullName,
    email,
    phone,
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
    status: 'under_review',
    createdAt: new Date().toISOString()
  };

  applicationsStore.unshift(newApp);

  // Email Notification to Admin
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
      <tr><td><strong>Resume Attached/Uploaded:</strong></td><td>${resumeFileName || 'Yes'}</td></tr>
      <tr><td><strong>Cover Letter:</strong></td><td>${coverLetter || 'N/A'}</td></tr>
    </table>
  `;

  await sendAdminNotificationEmail(`[PAR CAREERS] New Job Application: ${jobTitle} - ${fullName}`, htmlContent);

  res.json({
    success: true,
    message: 'Your job application has been submitted successfully! We will review your profile and update your application status.',
    applicationId: newApp.id
  });
});

app.get('/api/applications', requireAdmin, (_req: Request, res: Response) => {
  res.json({ success: true, data: applicationsStore });
});

app.get('/api/applications/user/:email', (req: Request, res: Response) => {
  const { email } = req.params;
  const userApps = applicationsStore.filter(a => a.email.toLowerCase() === email.toLowerCase());
  res.json({ success: true, data: userApps });
});

app.put('/api/applications/:id/status', requireAdmin, (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;
  const appItem = applicationsStore.find(a => a.id === id);
  if (appItem) {
    appItem.status = status;
    return res.json({ success: true, data: appItem });
  }
  res.status(404).json({ success: false, message: 'Application not found' });
});

// Referrals
app.post('/api/referrals', async (req: Request, res: Response) => {
  const { referrerName, referrerEmail, referrerPhone, candidateName, candidateEmail, candidatePhone, interestedService, targetCountry } = req.body;

  if (!referrerName || !referrerEmail || !candidateName || !candidatePhone) {
    return res.status(400).json({ success: false, message: 'All referrer and candidate details are required.' });
  }

  const referralCode = `PAR-REF-${Math.floor(1000 + Math.random() * 9000)}`;

  const newRef: Referral = {
    id: `ref-${Date.now()}`,
    referrerName,
    referrerEmail,
    referrerPhone,
    candidateName,
    candidateEmail,
    candidatePhone,
    interestedService: interestedService || 'Work Visa',
    targetCountry: targetCountry || 'Germany',
    referralCode,
    status: 'submitted',
    createdAt: new Date().toISOString()
  };

  referralsStore.unshift(newRef);

  const htmlContent = `
    <h2>New Overseas Referral Submission</h2>
    <p><strong>Referrer:</strong> ${referrerName} (${referrerEmail}, ${referrerPhone})</p>
    <p><strong>Candidate:</strong> ${candidateName} (${candidateEmail}, ${candidatePhone})</p>
    <p><strong>Target Country:</strong> ${targetCountry}</p>
    <p><strong>Referral Code:</strong> ${referralCode}</p>
  `;

  await sendAdminNotificationEmail(`[PAR CAREERS] New Referral Code ${referralCode} from ${referrerName}`, htmlContent);

  res.json({
    success: true,
    message: `Referral submitted successfully! Your Referral Code is ${referralCode}.`,
    referralCode
  });
});

app.get('/api/referrals', requireAdmin, (_req: Request, res: Response) => {
  res.json({ success: true, data: referralsStore });
});

// Blogs & News CMS
app.get('/api/blogs', (_req: Request, res: Response) => {
  res.json({ success: true, data: blogsStore });
});

app.post('/api/blogs', requireAdmin, (req: Request, res: Response) => {
  const newBlog: Blog = {
    id: `blog-${Date.now()}`,
    slug: req.body.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    ...req.body,
    date: new Date().toISOString().split('T')[0]
  };
  blogsStore.unshift(newBlog);
  res.json({ success: true, message: 'Blog post created', data: newBlog });
});

app.get('/api/news', (_req: Request, res: Response) => {
  res.json({ success: true, data: newsStore });
});

app.get('/api/testimonials', (_req: Request, res: Response) => {
  res.json({ success: true, data: testimonialsStore });
});

app.get('/api/countries', (_req: Request, res: Response) => {
  res.json({ success: true, data: INITIAL_COUNTRIES });
});

app.get('/api/countries/:id', (req: Request, res: Response) => {
  const country = INITIAL_COUNTRIES.find(c => c.id === req.params.id);
  if (country) {
    return res.json({ success: true, data: country });
  }
  res.status(404).json({ success: false, message: 'Country not found' });
});

// Admin Stats & CSV Export
app.get('/api/admin/stats', requireAdmin, (_req: Request, res: Response) => {
  res.json({
    success: true,
    stats: {
      totalCounselling: counsellingStore.length,
      pendingCounselling: counsellingStore.filter(c => c.status === 'pending').length,
      totalApplications: applicationsStore.length,
      activeJobs: jobsStore.length,
      totalContactMessages: contactStore.length,
      unreadContacts: contactStore.filter(m => m.status === 'unread').length,
      totalReferrals: referralsStore.length
    }
  });
});

app.get('/api/admin/export/:type', requireAdmin, (req: Request, res: Response) => {
  const { type } = req.params;
  let csvContent = '';

  if (type === 'counselling') {
    csvContent = 'ID,Full Name,Email,Phone,Current Residence,Education,Experience,Preferred Country,Service,Status,Date\n';
    counsellingStore.forEach(c => {
      csvContent += `"${c.id}","${c.fullName}","${c.email}","${c.phone}","${c.country}","${c.education}","${c.experience}","${c.preferredCountry}","${c.interestedService}","${c.status}","${c.createdAt}"\n`;
    });
  } else if (type === 'applications') {
    csvContent = 'ID,Job Title,Applicant Name,Email,Phone,Education,Experience,Country,Status,Date\n';
    applicationsStore.forEach(a => {
      csvContent += `"${a.id}","${a.jobTitle}","${a.fullName}","${a.email}","${a.phone}","${a.education}","${a.experience}","${a.country}","${a.status}","${a.createdAt}"\n`;
    });
  } else if (type === 'contacts') {
    csvContent = 'ID,Name,Email,Phone,Subject,Status,Date\n';
    contactStore.forEach(m => {
      csvContent += `"${m.id}","${m.name}","${m.email}","${m.phone}","${m.subject}","${m.status}","${m.createdAt}"\n`;
    });
  } else {
    return res.status(400).send('Invalid export type');
  }

  res.setHeader('Content-Type', 'text/csv');
  res.setHeader('Content-Disposition', `attachment; filename=par_careers_${type}_${Date.now()}.csv`);
  res.status(200).send(csvContent);
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
