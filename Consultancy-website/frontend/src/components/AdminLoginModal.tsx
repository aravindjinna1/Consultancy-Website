import React, { useState } from 'react';
import { X, ShieldCheck, Lock, Mail, KeyRound, AlertCircle, Loader2, CheckCircle2 } from 'lucide-react';
import { requestAdminOTP, verifyAdminOTP } from '../services/api';
import { useAuth } from '../context/AuthContext';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const { login } = useAuth();
  const [step, setStep] = useState<'email' | 'otp'>('email');
  const [email, setEmail] = useState('Ardigitalstudio05@gmail.com');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [devOtpHint, setDevOtpHint] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleRequestOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setDevOtpHint(null);

    try {
      const res = await requestAdminOTP(email);
      setStep('otp');
      if (res.devOtpCode) {
        setDevOtpHint(res.devOtpCode);
      }
    } catch (err: any) {
      setError(err.message || 'Access Denied: Email is not authorized for administrative access.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await verifyAdminOTP(email, otp);
      login(res.token, res.user);
      onSuccess();
      onClose();
    } catch (err: any) {
      setError(err.message || 'Invalid OTP code.');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setStep('email');
    setError(null);
    setOtp('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4 animate-fadeIn">
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-100">
        {/* Header */}
        <div className="bg-slate-900 text-white p-6 flex justify-between items-center border-b border-slate-800">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-sky-500/20 text-sky-400 flex items-center justify-center border border-sky-400/30">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base text-white">Administrative Portal</h3>
              <p className="text-[11px] text-slate-400">Allow-list & OTP Verification</p>
            </div>
          </div>
          <button onClick={handleClose} className="text-slate-400 hover:text-white p-1 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-4">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-xs p-3 rounded-xl flex items-start space-x-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {step === 'email' ? (
            <form onSubmit={handleRequestOTP} className="space-y-4">
              <div className="bg-amber-50 border border-amber-200 text-amber-800 text-xs p-3 rounded-xl leading-relaxed">
                🔒 Access restricted to authorized PAR CAREERS administrative email allow-list (<span className="font-bold">Ardigitalstudio05@gmail.com</span>).
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Administrator Email
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="email"
                    required
                    placeholder="Ardigitalstudio05@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-9 pr-3 py-2 text-sm font-medium text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-900 hover:bg-slate-900 text-white font-semibold text-sm py-2.5 rounded-lg transition-colors flex items-center justify-center space-x-2 disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Verifying Allow-list...</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    <span>Request One-Time Password (OTP)</span>
                  </>
                )}
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOTP} className="space-y-4">
              <div className="bg-blue-50 border border-blue-200 text-blue-900 text-xs p-3 rounded-xl">
                An OTP has been dispatched to <strong className="font-semibold">{email}</strong>. Please enter the 6-digit code below.
              </div>

              {devOtpHint && (
                <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs p-2.5 rounded-lg flex items-center justify-between">
                  <span>Dev Helper Code: <strong className="font-mono text-sm tracking-wider">{devOtpHint}</strong></span>
                  <button
                    type="button"
                    onClick={() => setOtp(devOtpHint)}
                    className="text-[11px] bg-emerald-600 text-white font-bold px-2 py-1 rounded"
                  >
                    Auto-Fill
                  </button>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Enter 6-Digit Verification Code
                </label>
                <div className="relative">
                  <KeyRound className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    maxLength={6}
                    placeholder="123456"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-9 pr-3 py-2 text-base font-bold tracking-widest text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white"
                  />
                </div>
              </div>

              <div className="flex space-x-2">
                <button
                  type="button"
                  onClick={() => setStep('email')}
                  className="w-1/3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium text-xs py-2.5 rounded-lg transition-colors"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-2/3 bg-blue-700 hover:bg-blue-800 text-white font-semibold text-sm py-2.5 rounded-lg transition-colors flex items-center justify-center space-x-2 disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Verifying...</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Verify & Access Dashboard</span>
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
