import { CounsellingRequest, ContactMessage, Job, JobApplication, Blog, NewsItem, Testimonial, CountryInfo, Referral } from '../types';

const API_BASE = '/api';

export const getAuthToken = (): string | null => {
  return localStorage.getItem('par_auth_token');
};

export const setAuthToken = (token: string) => {
  localStorage.setItem('par_auth_token', token);
};

export const removeAuthToken = () => {
  localStorage.removeItem('par_auth_token');
};

export const apiFetch = async (endpoint: string, options: RequestInit = {}) => {
  const token = getAuthToken();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string> || {})
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'API request failed');
  }

  return data;
};

// Services API calls
export const submitCounsellingForm = async (formData: Partial<CounsellingRequest>) => {
  return apiFetch('/counselling', {
    method: 'POST',
    body: JSON.stringify(formData)
  });
};

export const submitContactForm = async (formData: Partial<ContactMessage>) => {
  return apiFetch('/contact', {
    method: 'POST',
    body: JSON.stringify(formData)
  });
};

export const fetchJobs = async (filters: { country?: string; category?: string; search?: string } = {}) => {
  const params = new URLSearchParams();
  if (filters.country) params.append('country', filters.country);
  if (filters.category) params.append('category', filters.category);
  if (filters.search) params.append('search', filters.search);

  const query = params.toString() ? `?${params.toString()}` : '';
  return apiFetch(`/jobs${query}`);
};

export const fetchJobById = async (id: string) => {
  return apiFetch(`/jobs/${id}`);
};

export const submitJobApplication = async (applicationData: Partial<JobApplication>) => {
  return apiFetch('/applications', {
    method: 'POST',
    body: JSON.stringify(applicationData)
  });
};

export const submitReferral = async (referralData: Partial<Referral>) => {
  return apiFetch('/referrals', {
    method: 'POST',
    body: JSON.stringify(referralData)
  });
};

export const fetchCountries = async () => {
  return apiFetch('/countries');
};

export const fetchCountryById = async (id: string) => {
  return apiFetch(`/countries/${id}`);
};

export const fetchBlogs = async () => {
  return apiFetch('/blogs');
};

export const fetchNews = async () => {
  return apiFetch('/news');
};

export const fetchTestimonials = async () => {
  return apiFetch('/testimonials');
};

// Admin API
export const requestAdminOTP = async (email: string) => {
  return apiFetch('/admin/request-otp', {
    method: 'POST',
    body: JSON.stringify({ email })
  });
};

export const verifyAdminOTP = async (email: string, otp: string) => {
  return apiFetch('/admin/verify-otp', {
    method: 'POST',
    body: JSON.stringify({ email, otp })
  });
};

export const fetchAdminStats = async () => {
  return apiFetch('/admin/stats');
};

export const fetchAdminCounsellingRequests = async () => {
  return apiFetch('/counselling');
};

export const updateCounsellingStatus = async (id: string, status: string) => {
  return apiFetch(`/counselling/${id}/status`, {
    method: 'PUT',
    body: JSON.stringify({ status })
  });
};

export const fetchAdminApplications = async () => {
  return apiFetch('/applications');
};

export const updateApplicationStatus = async (id: string, status: string) => {
  return apiFetch(`/applications/${id}/status`, {
    method: 'PUT',
    body: JSON.stringify({ status })
  });
};

export const fetchAdminContacts = async () => {
  return apiFetch('/contact');
};

export const createJob = async (jobData: Partial<Job>) => {
  return apiFetch('/jobs', {
    method: 'POST',
    body: JSON.stringify(jobData)
  });
};

export const deleteJob = async (id: string) => {
  return apiFetch(`/jobs/${id}`, {
    method: 'DELETE'
  });
};
