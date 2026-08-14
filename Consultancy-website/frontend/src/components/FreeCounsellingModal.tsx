import React, { useState } from 'react';
import { X, CheckCircle2, AlertCircle, Loader2, Send, ShieldCheck, Phone } from 'lucide-react';
import { submitCounsellingForm } from '../services/api';

interface FreeCounsellingModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultService?: string;
  defaultCountry?: string;
}

export const FreeCounsellingModal: React.FC<FreeCounsellingModalProps> = ({
  isOpen,
  onClose,
  defaultService = 'Work Visa',
  defaultCountry = 'Germany'
}) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    country: 'India',
    education: 'Bachelor Degree',
    experience: '2 - 5 Years',
    preferredCountry: defaultCountry,
    interestedService: defaultService,
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await submitCounsellingForm(formData);
      setSuccess(true);
    } catch (err: any) {
      setError(err.message || 'Failed to submit form. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const resetAndClose = () => {
    setSuccess(false);
    setError(null);
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      country: 'India',
      education: 'Bachelor Degree',
      experience: '2 - 5 Years',
      preferredCountry: 'Germany',
      interestedService: 'Work Visa',
      message: ''
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-sm p-4 overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-100 my-8">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-sky-700 text-white p-6 sm:p-8 flex justify-between items-start">
          <div>
            <div className="inline-flex items-center space-x-1.5 bg-sky-500/20 text-sky-200 border border-sky-400/30 text-xs px-2.5 py-1 rounded-full font-medium mb-2">
              <ShieldCheck className="w-3.5 h-3.5 text-sky-300" />
              <span>Ethical & Transparent Consultation</span>
            </div>
            <h2 className="text-2xl font-bold tracking-tight">Get Free Profile Assessment</h2>
            <p className="text-sky-100 text-xs sm:text-sm mt-1">
              Speak directly with certified visa specialists at PAR CAREERS (+91 8106023616)
            </p>
          </div>
          <button
            onClick={resetAndClose}
            className="p-1.5 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8">
          {success ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Application Received!</h3>
              <p className="text-slate-600 text-sm max-w-md mx-auto leading-relaxed">
                Thank you, <strong className="text-slate-900">{formData.fullName}</strong>. Your assessment profile has been registered and sent directly to our senior consultancy team (<span className="text-blue-700 font-medium">aravindjinna1@gmail.com</span>).
              </p>
              <div className="bg-sky-50 border border-sky-100 rounded-xl p-4 text-xs text-sky-900 max-w-md mx-auto flex items-center space-x-3">
                <Phone className="w-5 h-5 text-sky-600 flex-shrink-0" />
                <div className="text-left">
                  <div className="font-bold">Need Immediate Assistance?</div>
                  <div>Call or WhatsApp us directly at <a href="tel:+918106023616" className="font-bold underline">+91 8106023616</a>.</div>
                </div>
              </div>
              <button
                onClick={resetAndClose}
                className="mt-4 bg-blue-700 hover:bg-blue-800 text-white font-semibold text-sm px-6 py-2.5 rounded-lg transition-colors"
              >
                Close & Return
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
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2 text-sm text-slate-900 focus:outline-none focus:bg-white focus:border-blue-600 transition-colors"
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
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2 text-sm text-slate-900 focus:outline-none focus:bg-white focus:border-blue-600 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Phone / WhatsApp Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 8106023616"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2 text-sm text-slate-900 focus:outline-none focus:bg-white focus:border-blue-600 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Current Country of Residence
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. India"
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2 text-sm text-slate-900 focus:outline-none focus:bg-white focus:border-blue-600 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Highest Education Qualification
                  </label>
                  <select
                    value={formData.education}
                    onChange={(e) => setFormData({ ...formData, education: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-900 focus:outline-none focus:bg-white focus:border-blue-600"
                  >
                    <option value="Bachelor Degree">Bachelor Degree (B.Tech / B.Sc / B.Com)</option>
                    <option value="Master Degree">Master Degree (M.Tech / M.Sc / MBA)</option>
                    <option value="Diploma / Vocational">Diploma / Vocational Certification</option>
                    <option value="Doctorate / PhD">Doctorate / PhD</option>
                    <option value="High School">High School (12th Grade)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Work Experience
                  </label>
                  <select
                    value={formData.experience}
                    onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-900 focus:outline-none focus:bg-white focus:border-blue-600"
                  >
                    <option value="Fresher / 0-1 Year">Fresher / 0-1 Year</option>
                    <option value="1 - 3 Years">1 - 3 Years</option>
                    <option value="3 - 5 Years">3 - 5 Years</option>
                    <option value="5+ Years">5+ Years</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Preferred Destination *
                  </label>
                  <select
                    required
                    value={formData.preferredCountry}
                    onChange={(e) => setFormData({ ...formData, preferredCountry: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-900 focus:outline-none focus:bg-white focus:border-blue-600 font-medium"
                  >
                    <option value="United Kingdom">🇬🇧 UK (Hotel Management, IT, B.Sc Nursing)</option>
                    <option value="Russia">🇷🇺 Russia (Nursing, Hotel Management)</option>
                    <option value="Germany">🇩🇪 Germany (Doctors, Nursing, Aeronautical Engineering)</option>
                    <option value="Singapore">🇸🇬 Singapore (B.Sc Nursing, ANM/GNM, IT, Hotel Management, Mechanical)</option>
                    <option value="Australia">🇦🇺 Australia (IT, Hotel Management)</option>
                    <option value="Dubai">🇦🇪 Dubai (Nursing, Crane Machine Operator, Electrician)</option>
                    <option value="Canada">🇨🇦 Canada (IT, B.Sc Nursing)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Interested Service *
                  </label>
                  <select
                    required
                    value={formData.interestedService}
                    onChange={(e) => setFormData({ ...formData, interestedService: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-900 focus:outline-none focus:bg-white focus:border-blue-600 font-medium"
                  >
                    <option value="Work Visa">Work Visa & Job Seeker Permits</option>
                    <option value="Student Visa">Student Visa & University Admissions</option>
                    <option value="Careers Abroad">Overseas Job Opportunities & Sponsorship</option>
                    <option value="Permanent Residency">Permanent Residency (PR Pathways)</option>
                    <option value="General Counselling">General Career Counselling</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Additional Details or Specific Questions
                </label>
                <textarea
                  rows={3}
                  placeholder="Share details about your background, career goals, or target timeline..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-sm text-slate-900 focus:outline-none focus:bg-white focus:border-blue-600"
                ></textarea>
              </div>

              <div className="pt-2 flex items-center justify-between border-t border-slate-100">
                <span className="text-[11px] text-slate-500">
                  🔒 Your information is confidential and never shared.
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
                      <span>Submit Enquiry</span>
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
