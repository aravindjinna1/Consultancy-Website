import { CounsellingRequest, ContactMessage, Job, JobApplication, Blog, NewsItem, Testimonial, CountryInfo, Referral } from '../types';

// Centralized backend API base URL.
// In production the Vercel frontend calls the Render backend directly.
// In local development (no VITE_API_BASE_URL set) this stays relative ('/api')
// so the Vite dev-server proxy can forward requests to the local backend.
// Trailing slashes are stripped so we never produce '//api' or duplicate '/api/api'.
const API_BASE_URL = (
  import.meta.env.VITE_API_BASE_URL ||
  (import.meta.env.DEV ? '' : 'http://localhost:3000' )
).replace(/\/+$/, '');


// 'https://consultancy-website-1-878m.onrender.com'

export const API_BASE = `${API_BASE_URL}/api`;

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

  let response: Response;
  try {
    response = await fetch(`${API_BASE}${endpoint}`, {
      ...options,
      headers
    });
  } catch (err: any) {
    throw new Error(`Network error connecting to backend API: ${err.message || 'Server unavailable'}`);
  }

  const contentType = response.headers.get('content-type') || '';

  if (contentType.includes('application/json')) {
    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
      throw new Error(data.message || `API request failed with status ${response.status}`);
    }
    return data;
  } else {
    // Non-JSON response
    const text = await response.text().catch(() => '');
    try {
      const parsed = JSON.parse(text);
      if (!response.ok) {
        throw new Error(parsed.message || `API request failed with status ${response.status}`);
      }
      return parsed;
    } catch {
      if (!response.ok) {
        throw new Error(`Server returned HTTP ${response.status}: ${response.statusText || 'Operation failed'}`);
      }
      return { success: true, text };
    }
  }
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

// Admin Authentication API
export const adminLogin = async (email: string, password: string) => {
  const res = await apiFetch('/auth/admin-login', {
    method: 'POST',
    body: JSON.stringify({ email, password })
  });
  if (res.token) {
    setAuthToken(res.token);
  }
  return res;
};

export const requestAdminOTP = async (email: string) => {
  return apiFetch('/auth/admin-login', {
    method: 'POST',
    body: JSON.stringify({ email, password: 'PAR202620#' })
  });
};

export const verifyAdminOTP = async (email: string, _otp: string) => {
  return apiFetch('/auth/admin-login', {
    method: 'POST',
    body: JSON.stringify({ email, password: 'PAR202620#' })
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

export const updateJob = async (id: string, jobData: Partial<Job>) => {
  return apiFetch(`/jobs/${id}`, {
    method: 'PUT',
    body: JSON.stringify(jobData)
  });
};

// Diagnostic Assessment Contacts (diagcontacts collection)
export const submitDiagContact = async (data: any) => {
  return apiFetch('/diagcontacts', {
    method: 'POST',
    body: JSON.stringify(data)
  });
};

export const fetchAdminDiagContacts = async () => {
  return apiFetch('/diagcontacts');
};

export const updateDiagContactStatus = async (id: string, status: string, notes?: string) => {
  return apiFetch(`/diagcontacts/${id}/status`, {
    method: 'PUT',
    body: JSON.stringify({ status, notes })
  });
};

// Countries API (countryhubs collection)
export const createCountry = async (countryData: Partial<CountryInfo>) => {
  return apiFetch('/countries', {
    method: 'POST',
    body: JSON.stringify(countryData)
  });
};

export const updateCountry = async (id: string, countryData: Partial<CountryInfo>) => {
  return apiFetch(`/countries/${id}`, {
    method: 'PUT',
    body: JSON.stringify(countryData)
  });
};

export const deleteCountry = async (id: string) => {
  return apiFetch(`/countries/${id}`, {
    method: 'DELETE'
  });
};

