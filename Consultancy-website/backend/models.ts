import mongoose, { Schema, Document } from 'mongoose';

// User Schema
export interface IUser extends Document {
  name: string;
  email: string;
  phone?: string;
  password?: string;
  role: 'admin' | 'user';
  createdAt: Date;
}

const UserSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  phone: { type: String, default: '' },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'user'], default: 'user' },
  createdAt: { type: Date, default: Date.now }
}, { collection: 'users' });

// Job Schema
export interface IJob extends Document {
  id: string;
  title: string;
  company: string;
  country: string;
  category: string;
  salary: string;
  employmentType: string;
  experience: string;
  education: string;
  skills: string[];
  visaSponsorship: boolean;
  description: string;
  requirements: string[];
  postedDate: string;
  createdAt: Date;
}

const JobSchema = new Schema<IJob>({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  company: { type: String, required: true },
  country: { type: String, required: true },
  category: { type: String, required: true },
  salary: { type: String, required: true },
  employmentType: { type: String, default: 'Full-Time' },
  experience: { type: String, default: '2+ Years' },
  education: { type: String, default: 'Bachelor Degree' },
  skills: { type: [String], default: [] },
  visaSponsorship: { type: Boolean, default: true },
  description: { type: String, default: '' },
  requirements: { type: [String], default: [] },
  postedDate: { type: String, default: () => new Date().toISOString().split('T')[0] },
  createdAt: { type: Date, default: Date.now }
}, { collection: 'jobs' });

// Application Schema
export interface IApplication extends Document {
  id: string;
  jobId: string;
  jobTitle: string;
  company: string;
  country: string;
  fullName: string;
  email: string;
  phone: string;
  address?: string;
  education?: string;
  experience?: string;
  skills?: string;
  resumeFileName?: string;
  resumeDataUrl?: string;
  coverLetter?: string;
  linkedin?: string;
  portfolio?: string;
  expectedJoining?: string;
  status: 'under_review' | 'shortlisted' | 'interview' | 'accepted' | 'rejected';
  createdAt: Date;
}

const ApplicationSchema = new Schema<IApplication>({
  id: { type: String, required: true, unique: true },
  jobId: { type: String, required: true },
  jobTitle: { type: String, required: true },
  company: { type: String, required: true },
  country: { type: String, required: true },
  fullName: { type: String, required: true },
  email: { type: String, required: true, lowercase: true },
  phone: { type: String, required: true },
  address: { type: String, default: '' },
  education: { type: String, default: '' },
  experience: { type: String, default: '' },
  skills: { type: String, default: '' },
  resumeFileName: { type: String, default: 'resume.pdf' },
  resumeDataUrl: { type: String, default: '' },
  coverLetter: { type: String, default: '' },
  linkedin: { type: String, default: '' },
  portfolio: { type: String, default: '' },
  expectedJoining: { type: String, default: 'Immediate' },
  status: { type: String, enum: ['under_review', 'shortlisted', 'interview', 'accepted', 'rejected'], default: 'under_review' },
  createdAt: { type: Date, default: Date.now }
}, { collection: 'applications' });

// Counselling Schema
export interface ICounselling extends Document {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  country: string;
  education: string;
  experience: string;
  preferredCountry: string;
  interestedService: string;
  message: string;
  status: 'pending' | 'contacted' | 'completed';
  createdAt: Date;
}

const CounsellingSchema = new Schema<ICounselling>({
  id: { type: String, required: true, unique: true },
  fullName: { type: String, required: true },
  email: { type: String, required: true, lowercase: true },
  phone: { type: String, required: true },
  country: { type: String, default: 'India' },
  education: { type: String, default: 'N/A' },
  experience: { type: String, default: 'N/A' },
  preferredCountry: { type: String, required: true },
  interestedService: { type: String, required: true },
  message: { type: String, default: '' },
  status: { type: String, enum: ['pending', 'contacted', 'completed'], default: 'pending' },
  createdAt: { type: Date, default: Date.now }
}, { collection: 'counsellings' });

// Contact Message Schema
export interface IContact extends Document {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  status: 'unread' | 'read' | 'replied';
  createdAt: Date;
}

const ContactSchema = new Schema<IContact>({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, lowercase: true },
  phone: { type: String, default: '' },
  subject: { type: String, default: 'General Inquiry' },
  message: { type: String, required: true },
  status: { type: String, enum: ['unread', 'read', 'replied'], default: 'unread' },
  createdAt: { type: Date, default: Date.now }
}, { collection: 'contacts' });

// Country Hub Schema
export interface ICountryHub extends Document {
  id: string;
  name: string;
  code?: string;
  flag: string;
  coverImage: string;
  bannerImage?: string;
  description: string;
  studyOptions: string[];
  jobRoles: string[];
  benefits: string[];
  visaTypes: any[];
  eligibility: string[];
  documents: string[];
  livingCost: string;
  topJobs: string[];
  topUniversities: string[];
  processingTime: string;
  faqs: any[];
  overview?: string;
  keyVisas?: any[];
  jobMarket?: any;
  livingExpenses?: any;
  createdAt: Date;
}

const CountryHubSchema = new Schema<ICountryHub>({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  code: { type: String, default: '' },
  flag: { type: String, required: true },
  coverImage: { type: String, required: true },
  bannerImage: { type: String, default: '' },
  description: { type: String, default: '' },
  studyOptions: { type: [String], default: [] },
  jobRoles: { type: [String], default: [] },
  benefits: { type: [String], default: [] },
  visaTypes: { type: Schema.Types.Mixed, default: [] },
  eligibility: { type: [String], default: [] },
  documents: { type: [String], default: [] },
  livingCost: { type: String, default: '' },
  topJobs: { type: [String], default: [] },
  topUniversities: { type: [String], default: [] },
  processingTime: { type: String, default: '' },
  faqs: { type: Schema.Types.Mixed, default: [] },
  overview: { type: String, default: '' },
  keyVisas: { type: Schema.Types.Mixed, default: [] },
  jobMarket: { type: Schema.Types.Mixed, default: {} },
  livingExpenses: { type: Schema.Types.Mixed, default: {} },
  createdAt: { type: Date, default: Date.now }
}, { collection: 'countryhubs' });

// Diagnostic Contact Schema
export interface IDiagContact extends Document {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  currentCountry: string;
  targetCountry: string;
  purpose: string;
  education: string;
  experience: string;
  score?: number;
  eligible?: boolean;
  status: string;
  notes?: string;
  createdAt: Date;
}

const DiagContactSchema = new Schema<IDiagContact>({
  id: { type: String, required: true, unique: true },
  fullName: { type: String, required: true },
  email: { type: String, required: true, lowercase: true, trim: true },
  phone: { type: String, required: true },
  currentCountry: { type: String, default: 'India' },
  targetCountry: { type: String, default: 'Germany' },
  purpose: { type: String, default: 'Work Visa' },
  education: { type: String, default: 'Bachelor' },
  experience: { type: String, default: '2-5 Years' },
  score: { type: Number, default: 85 },
  eligible: { type: Boolean, default: true },
  status: { type: String, default: 'pending' },
  notes: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now }
}, { collection: 'diagcontacts' });

export const User = mongoose.model<IUser>('User', UserSchema, 'users');
export const Job = mongoose.model<IJob>('Job', JobSchema, 'jobs');
export const Application = mongoose.model<IApplication>('Application', ApplicationSchema, 'applications');
export const Counselling = mongoose.model<ICounselling>('Counselling', CounsellingSchema, 'counsellings');
export const Contact = mongoose.model<IContact>('Contact', ContactSchema, 'contacts');
export const CountryHub = mongoose.model<ICountryHub>('CountryHub', CountryHubSchema, 'countryhubs');
export const DiagContact = mongoose.model<IDiagContact>('DiagContact', DiagContactSchema, 'diagcontacts');
