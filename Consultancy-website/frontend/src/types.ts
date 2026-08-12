export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'admin' | 'user';
  createdAt: string;
}

export interface CounsellingRequest {
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
  createdAt: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  status: 'unread' | 'read';
  createdAt: string;
}

export interface Job {
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
}

export interface JobApplication {
  id: string;
  jobId: string;
  jobTitle: string;
  company: string;
  country: string;
  fullName: string;
  email: string;
  phone: string;
  address: string;
  education: string;
  experience: string;
  skills: string;
  resumeFileName?: string;
  resumeDataUrl?: string;
  coverLetter?: string;
  linkedin?: string;
  portfolio?: string;
  expectedJoining?: string;
  status: 'under_review' | 'shortlisted' | 'interview' | 'accepted' | 'rejected';
  createdAt: string;
}

export interface Blog {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  imageUrl: string;
  tags: string[];
  isFeatured: boolean;
}

export interface NewsItem {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  category: string;
  source: string;
}

export interface Testimonial {
  id: string;
  name: string;
  country: string;
  service: string;
  visaType: string;
  rating: number;
  text: string;
  year: string;
  photoUrl: string;
  verified: boolean;
}

export interface CountryInfo {
  id: string;
  name: string;
  code: string;
  flag: string;
  coverImage: string;
  description: string;
  benefits: string[];
  visaTypes: { title: string; description: string; duration: string }[];
  eligibility: string[];
  documents: string[];
  livingCost: string;
  topJobs: string[];
  topUniversities: string[];
  processingTime: string;
  faqs: { q: string; a: string }[];
}

export interface Referral {
  id: string;
  referrerName: string;
  referrerEmail: string;
  referrerPhone: string;
  candidateName: string;
  candidateEmail: string;
  candidatePhone: string;
  interestedService: string;
  targetCountry: string;
  referralCode: string;
  status: 'submitted' | 'verified' | 'reward_eligible' | 'completed';
  createdAt: string;
}
