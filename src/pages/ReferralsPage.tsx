import React, { useState } from 'react';
import { Users, Gift, CheckCircle2, Copy, Send, Sparkles, ShieldCheck } from 'lucide-react';
import { submitReferral } from '../services/api';

export const ReferralsPage: React.FC = () => {
  const [formData, setFormData] = useState({
    referrerName: '',
    referrerEmail: '',
    referrerPhone: '',
    candidateName: '',
    candidateEmail: '',
    candidatePhone: '',
    interestedService: 'Work Visa',
    targetCountry: 'Germany'
  });

  const [loading, setLoading] = useState(false);
  const [referralCode, setReferralCode] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await submitReferral(formData);
      setReferralCode(res.referralCode);
    } catch (err: any) {
      setError(err.message || 'Failed to submit referral. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const copyCode = () => {
    if (referralCode) {
      navigator.clipboard.writeText(referralCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12 space-y-12 animate-fadeIn">
      {/* Banner */}
      <div className="bg-gradient-to-r from-purple-950 via-blue-900 to-slate-900 text-white p-8 sm:p-12 rounded-3xl shadow-xl space-y-4">
        <div className="inline-flex items-center space-x-2 bg-purple-500/20 text-purple-200 border border-purple-400/30 text-xs px-3 py-1 rounded-full font-bold uppercase tracking-wider">
          <Gift className="w-4 h-4 text-purple-300" />
          <span>PAR CAREERS Partner Network</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black tracking-tight">
          Refer Friends & Earn Rewards
        </h1>
        <p className="text-purple-100 text-sm sm:text-base max-w-2xl leading-relaxed">
          Know someone planning to study or work overseas in Germany, Singapore, Australia, UK, Canada, or USA? Refer them to PAR CAREERS and track rewards upon candidate enrolment.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Referral Submission Form */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
          <h2 className="text-2xl font-bold text-slate-900 flex items-center space-x-2">
            <Users className="w-6 h-6 text-purple-600" />
            <span>Submit Candidate Referral</span>
          </h2>

          {referralCode ? (
            <div className="bg-purple-50 border border-purple-200 p-6 rounded-2xl text-center space-y-4">
              <div className="w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-lg text-slate-900">Referral Successfully Registered!</h3>
              <p className="text-slate-600 text-xs sm:text-sm">
                Unique Referral Code generated for <strong className="text-slate-900">{formData.candidateName}</strong>:
              </p>

              <div className="bg-white border border-purple-300 rounded-xl p-3 inline-flex items-center space-x-3 max-w-xs mx-auto">
                <span className="font-mono font-bold text-lg text-purple-900 tracking-wider">{referralCode}</span>
                <button
                  onClick={copyCode}
                  className="bg-purple-600 hover:bg-purple-700 text-white p-2 rounded-lg text-xs font-bold transition-colors"
                >
                  {copied ? 'Copied!' : <Copy className="w-4 h-4" />}
                </button>
              </div>

              <div className="text-xs text-slate-500">
                Our team will contact {formData.candidateName} at {formData.candidatePhone}. Notifications sent to {formData.referrerEmail}.
              </div>

              <button
                onClick={() => setReferralCode(null)}
                className="text-xs text-purple-700 font-bold hover:underline block mx-auto"
              >
                + Submit Another Referral
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && <div className="bg-red-50 text-red-700 text-xs p-3 rounded-lg">{error}</div>}

              <div className="border-b border-slate-100 pb-3">
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">1. Your Details (Referrer)</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Your Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="Your Full Name"
                      value={formData.referrerName}
                      onChange={(e) => setFormData({ ...formData, referrerName: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs text-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Your Email *</label>
                    <input
                      type="email"
                      required
                      placeholder="yourname@gmail.com"
                      value={formData.referrerEmail}
                      onChange={(e) => setFormData({ ...formData, referrerEmail: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs text-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Your Phone *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 8106023616"
                      value={formData.referrerPhone}
                      onChange={(e) => setFormData({ ...formData, referrerPhone: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs text-slate-900"
                    />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">2. Candidate Details</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Candidate Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="Friend / Relative Name"
                      value={formData.candidateName}
                      onChange={(e) => setFormData({ ...formData, candidateName: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs text-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Candidate Phone *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 Candidate Phone"
                      value={formData.candidatePhone}
                      onChange={(e) => setFormData({ ...formData, candidatePhone: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs text-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Candidate Email</label>
                    <input
                      type="email"
                      placeholder="candidate@gmail.com"
                      value={formData.candidateEmail}
                      onChange={(e) => setFormData({ ...formData, candidateEmail: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs text-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Target Country</label>
                    <select
                      value={formData.targetCountry}
                      onChange={(e) => setFormData({ ...formData, targetCountry: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs text-slate-900"
                    >
                      <option value="Germany">Germany</option>
                      <option value="Singapore">Singapore</option>
                      <option value="Australia">Australia</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="Canada">Canada</option>
                      <option value="United States">United States</option>
                    </select>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-purple-700 hover:bg-purple-800 text-white font-bold text-sm py-3 rounded-xl transition-colors flex items-center justify-center space-x-2"
              >
                <span>Generate Referral Code & Submit</span>
                <Send className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>

        {/* Benefits Sidebar */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-sm space-y-4">
            <h3 className="font-bold text-lg flex items-center space-x-2 text-purple-300">
              <Sparkles className="w-5 h-5" />
              <span>How the Referral Scheme Works</span>
            </h3>

            <ol className="space-y-3 text-xs text-slate-300">
              <li className="flex items-start space-x-3">
                <span className="w-5 h-5 bg-purple-600 rounded-full font-bold text-white flex items-center justify-center flex-shrink-0 text-[10px]">1</span>
                <span>Submit your friend's contact details using the form.</span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="w-5 h-5 bg-purple-600 rounded-full font-bold text-white flex items-center justify-center flex-shrink-0 text-[10px]">2</span>
                <span>Our senior counselor contacts them for a free profile assessment.</span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="w-5 h-5 bg-purple-600 rounded-full font-bold text-white flex items-center justify-center flex-shrink-0 text-[10px]">3</span>
                <span>Upon successful visa processing or university admission, your reward incentive is released.</span>
              </li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};
