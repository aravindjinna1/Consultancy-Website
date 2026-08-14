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
});

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
});

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
});

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
});

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
});

// Country Hub Schema (Storing real path/URL strings for images as requested)
export interface ICountryHub extends Document {
  id: string;
  name: string;
  flag: string;
  bannerImage: string;
  overview: string;
  keyVisas: any[];
  topUniversities: any[];
  jobMarket: any;
  livingExpenses: any;
  createdAt: Date;
}

const CountryHubSchema = new Schema<ICountryHub>({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  flag: { type: String, required: true },
  bannerImage: { type: String, required: true }, // Real URL path string
  overview: { type: String, default: '' },
  keyVisas: { type: Schema.Types.Mixed, default: [] },
  topUniversities: { type: Schema.Types.Mixed, default: [] },
  jobMarket: { type: Schema.Types.Mixed, default: {} },
  livingExpenses: { type: Schema.Types.Mixed, default: {} },
  createdAt: { type: Date, default: Date.now }
});

export const User = mongoose.model<IUser>('User', UserSchema);
export const Job = mongoose.model<IJob>('Job', JobSchema);
export const Application = mongoose.model<IApplication>('Application', ApplicationSchema);
export const Counselling = mongoose.model<ICounselling>('Counselling', CounsellingSchema);
export const Contact = mongoose.model<IContact>('Contact', ContactSchema);
export const CountryHub = mongoose.model<ICountryHub>('CountryHub', CountryHubSchema);
