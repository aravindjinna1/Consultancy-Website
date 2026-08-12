import React, { useState } from 'react';
import { X, Upload, CheckCircle2, AlertCircle, Loader2, Send, Briefcase, Building2, MapPin } from 'lucide-react';
import { Job } from '../types';
import { submitJobApplication } from '../services/api';

interface JobApplyModalProps {
  job: Job | null;
  isOpen: boolean;
  onClose: () => void;
}

export const JobApplyModal: React.FC<JobApplyModalProps> = ({ job, isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    education: 'Bachelor Degree',
    experience: '3 - 5 Years',
    skills: '',
    coverLetter: '',
    linkedin: '',
    portfolio: '',
    expectedJoining: '1 - 2 Months'
  });

  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [resumeFileName, setResumeFileName] = useState<string>('');
  const [resumeDataUrl, setResumeDataUrl] = useState<string>('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  if (!isOpen || !job) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError('Resume file size must be less than 5MB.');
        return;
      }
      setResumeFile(file);
      setResumeFileName(file.name);

      const reader = new FileReader();
      reader.onloadend = () => {
        setResumeDataUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await submitJobApplication({
        jobId: job.id,
        jobTitle: job.title,
        company: job.company,
        country: job.country,
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        education: formData.education,
        experience: formData.experience,
        skills: formData.skills,
        resumeFileName: resumeFileName || 'Applicant_Resume.pdf',
        resumeDataUrl,
        coverLetter: formData.coverLetter,
        linkedin: formData.linkedin,
        portfolio: formData.portfolio,
        expectedJoining: formData.expectedJoining
      });

      setSuccess(true);
    } catch (err: any) {
      setError(err.message || 'Application submission failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setSuccess(false);
    setError(null);
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      address: '',
      education: 'Bachelor Degree',
      experience: '3 - 5 Years',
      skills: '',
      coverLetter: '',
      linkedin: '',
      portfolio: '',
      expectedJoining: '1 - 2 Months'
    });
    setResumeFile(null);
    setResumeFileName('');
    setResumeDataUrl('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-sm p-4 overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-100 my-8">
        {/* Header */}
        <div className="bg-slate-900 text-white p-6 sm:p-8 flex justify-between items-start">
          <div>
            <div className="inline-flex items-center space-x-2 text-sky-400 text-xs font-semibold uppercase tracking-wider mb-1">
              <Building2 className="w-4 h-4" />
              <span>{job.company}</span>
              <span>•</span>
              <MapPin className="w-4 h-4" />
              <span>{job.country}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight">{job.title}</h2>
            <div className="mt-2 text-xs text-slate-300 flex flex-wrap gap-2">
              <span className="bg-slate-800 px-2.5 py-1 rounded-md text-emerald-400 font-medium">{job.salary}</span>
              <span className="bg-slate-800 px-2.5 py-1 rounded-md">{job.employmentType}</span>
              {job.visaSponsorship && (
                <span className="bg-blue-900/60 text-sky-300 px-2.5 py-1 rounded-md font-semibold border border-sky-400/30">
                  ✓ Visa Sponsorship Included
                </span>
              )}
            </div>
          </div>
          <button onClick={handleClose} className="p-1.5 text-slate-400 hover:text-white rounded-lg">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 sm:p-8 max-h-[75vh] overflow-y-auto">
          {success ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Application Submitted!</h3>
              <p className="text-slate-600 text-sm max-w-md mx-auto leading-relaxed">
                Your application for <strong className="text-slate-900">{job.title}</strong> has been transmitted to our recruitment desk (<span className="text-blue-700 font-medium">aravindjinna1@gmail.com</span>).
              </p>
              <button
                onClick={handleClose}
                className="mt-4 bg-blue-700 hover:bg-blue-800 text-white font-semibold text-sm px-6 py-2.5 rounded-lg transition-colors"
              >
                Done & Return to Jobs
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 text-xs p-3 rounded-xl flex items-center space-x-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {/* Prepopulated Role Field */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-3">
                <label className="block text-xs font-semibold text-slate-500 mb-1">
                  Applying For (Role)
                </label>
                <input
                  type="text"
                  readOnly
                  value={`${job.title} — ${job.company} (${job.country})`}
                  className="w-full bg-transparent font-bold text-slate-900 text-sm focus:outline-none cursor-not-allowed"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Aravind Jinna"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2 text-sm text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2 text-sm text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Phone Number (with Country Code) *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 8106023616"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2 text-sm text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Current Residential Address / Location
                  </label>
                  <input
                    type="text"
                    placeholder="City, State, Country"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2 text-sm text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Highest Qualification
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. B.Tech Computer Science"
                    value={formData.education}
                    onChange={(e) => setFormData({ ...formData, education: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2 text-sm text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Total Experience
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 4.5 Years"
                    value={formData.experience}
                    onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2 text-sm text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Key Technical / Professional Skills
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. React, Node.js, TypeScript, AWS"
                    value={formData.skills}
                    onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2 text-sm text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Expected Joining Timeline
                  </label>
                  <select
                    value={formData.expectedJoining}
                    onChange={(e) => setFormData({ ...formData, expectedJoining: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-900 focus:outline-none focus:border-blue-600"
                  >
                    <option value="Immediate">Immediate / 15 Days</option>
                    <option value="1 Month">1 Month</option>
                    <option value="2 Months">2 Months</option>
                    <option value="3 Months">3 Months</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    LinkedIn Profile URL
                  </label>
                  <input
                    type="url"
                    placeholder="https://linkedin.com/in/username"
                    value={formData.linkedin}
                    onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2 text-sm text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Portfolio / GitHub URL
                  </label>
                  <input
                    type="url"
                    placeholder="https://github.com/username"
                    value={formData.portfolio}
                    onChange={(e) => setFormData({ ...formData, portfolio: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2 text-sm text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white"
                  />
                </div>
              </div>

              {/* Resume Upload */}
              <div className="border-2 border-dashed border-slate-300 hover:border-blue-500 rounded-xl p-4 text-center bg-slate-50/50 transition-colors">
                <input
                  type="file"
                  id="resume-upload"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <label htmlFor="resume-upload" className="cursor-pointer flex flex-col items-center">
                  <Upload className="w-8 h-8 text-blue-600 mb-1" />
                  <span className="text-xs font-semibold text-slate-800">
                    {resumeFileName ? `Selected: ${resumeFileName}` : 'Click to Upload Resume / CV (PDF, DOCX up to 5MB)'}
                  </span>
                  <span className="text-[10px] text-slate-500 mt-0.5">
                    Your CV is securely transmitted and reviewed by PAR CAREERS recruitment leads
                  </span>
                </label>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Cover Letter / Brief Profile Note
                </label>
                <textarea
                  rows={3}
                  placeholder="Summarize your overseas career motivations and suitability..."
                  value={formData.coverLetter}
                  onChange={(e) => setFormData({ ...formData, coverLetter: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-sm text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white"
                ></textarea>
              </div>

              <div className="pt-2 flex items-center justify-between border-t border-slate-100">
                <span className="text-[11px] text-slate-500">
                  Direct submission to aravindjinna1@gmail.com
                </span>
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-blue-700 hover:bg-blue-800 text-white font-semibold text-sm px-6 py-2.5 rounded-lg shadow-md hover:shadow-lg transition-all flex items-center space-x-2 disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <>
                      <span>Submit Application</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
