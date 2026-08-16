import React, { useState, useEffect } from 'react';
import { X, User, Mail, Phone, Lock, Loader2, AlertCircle, UserPlus, LogIn } from 'lucide-react';
import { apiFetch } from '../services/api';
import { useAuth } from '../context/AuthContext';

interface UserAuthModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  initialMode?: 'login' | 'signup';
}

export const UserAuthModal: React.FC<UserAuthModalProps> = ({ isOpen: propIsOpen, onClose: propOnClose, initialMode }) => {
  const { login, isAuthModalOpen, setIsAuthModalOpen, authMode, setAuthMode } = useAuth();
  
  const showModal = propIsOpen !== undefined ? propIsOpen : isAuthModalOpen;
  const activeMode = initialMode || authMode;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setError(null);
  }, [activeMode, showModal]);

  if (!showModal) return null;

  const handleClose = () => {
    if (propOnClose) propOnClose();
    setIsAuthModalOpen(false);
    setError(null);
  };

  const handleSwitchMode = (newMode: 'login' | 'signup') => {
    setAuthMode(newMode);
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const endpoint = activeMode === 'login' ? '/auth/login' : '/auth/register';
      const payload = activeMode === 'login' 
        ? { email: formData.email, password: formData.password }
        : formData;

      const res = await apiFetch(endpoint, {
        method: 'POST',
        body: JSON.stringify(payload)
      });

      login(res.token, res.user);
      handleClose();
    } catch (err: any) {
      setError(err.message || 'Authentication failed. Please check your details.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-sm p-4 animate-fadeIn">
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-100">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-sky-700 text-white p-6 flex justify-between items-center">
          <div>
            <h3 className="font-extrabold text-xl tracking-tight">
              {activeMode === 'login' ? 'Candidate Sign In' : 'Candidate Registration'}
            </h3>
            <p className="text-xs text-sky-100 mt-0.5">
              {activeMode === 'login' ? 'Access your overseas applications & visa dashboard' : 'Create an account to apply for overseas jobs'}
            </p>
          </div>
          <button 
            onClick={handleClose} 
            className="text-white/80 hover:text-white bg-white/10 hover:bg-white/20 p-1.5 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Mode Selector Tabs */}
        <div className="flex border-b border-slate-100 bg-slate-50 p-1.5 gap-1.5">
          <button
            type="button"
            onClick={() => handleSwitchMode('login')}
            className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-1.5 ${
              activeMode === 'login' 
                ? 'bg-white text-blue-700 shadow-sm border border-slate-200/60' 
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <LogIn className="w-3.5 h-3.5" />
            <span>Login</span>
          </button>
          <button
            type="button"
            onClick={() => handleSwitchMode('signup')}
            className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-1.5 ${
              activeMode === 'signup' 
                ? 'bg-blue-700 text-white shadow-sm' 
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>Register / Sign Up</span>
          </button>
        </div>

        {/* Modal Form */}
        <div className="p-6 space-y-4">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-xs p-3 rounded-xl flex items-center space-x-2 animate-fadeIn">
              <AlertCircle className="w-4 h-4 flex-shrink-0 text-red-600" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-3.5">
            {activeMode === 'signup' && (
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name</label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ravi Yadav"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-9 pr-3 py-2 text-sm text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white transition-colors"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-9 pr-3 py-2 text-sm text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white transition-colors"
                />
              </div>
            </div>

            {activeMode === 'signup' && (
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Phone Number</label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="tel"
                    required
                    placeholder="+91 8019021039"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-9 pr-3 py-2 text-sm text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white transition-colors"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-9 pr-3 py-2 text-sm text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white transition-colors"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-800 to-sky-600 hover:from-blue-900 hover:to-sky-700 text-white font-bold text-sm py-2.5 rounded-xl shadow-md transition-all flex items-center justify-center space-x-2 disabled:opacity-50 mt-3"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Authenticating...</span>
                </>
              ) : (
                <span>{activeMode === 'login' ? 'Sign In to Account' : 'Register New Account'}</span>
              )}
            </button>
          </form>

          <div className="text-center pt-2 text-xs text-slate-600 border-t border-slate-100">
            {activeMode === 'login' ? (
              <span>
                First time visiting?{' '}
                <button type="button" onClick={() => handleSwitchMode('signup')} className="text-blue-700 font-bold hover:underline">
                  Create a Free Account
                </button>
              </span>
            ) : (
              <span>
                Already registered?{' '}
                <button type="button" onClick={() => handleSwitchMode('login')} className="text-blue-700 font-bold hover:underline">
                  Sign In Here
                </button>
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

