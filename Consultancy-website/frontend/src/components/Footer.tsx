import React, { useState } from 'react';
import { Phone, Mail, MessageSquare, MapPin, ShieldCheck, ArrowRight, CheckCircle2, Instagram, Linkedin } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import brandLogo from '../assets/logo.png';

interface FooterProps {
  onNavClick: (tab: string) => void;
  onOpenAdminLogin?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavClick, onOpenAdminLogin }) => {
  const { setIsAdminModalOpen } = useAuth();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setSubscribed(true);
      setNewsletterEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  const handleAdminTrigger = () => {
    if (onOpenAdminLogin) {
      onOpenAdminLogin();
    } else {
      setIsAdminModalOpen(true);
    }
  };

  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          {/* Col 1: About Company */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center space-x-3 cursor-pointer group" onClick={() => onNavClick('home')}>
              <img
                src={brandLogo}
                alt="PAR CAREERS Logo"
                className="h-12 w-auto max-w-[150px] object-contain rounded-xl border-2 border-sky-400 shadow-xl shadow-sky-500/30 group-hover:scale-105 group-hover:border-sky-300 transition-all duration-300"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/logo.png';
                }}
              />
              <div>
                <div className="font-black text-lg text-white tracking-tight group-hover:text-sky-300 transition-colors">
                  PAR CAREERS
                </div>
                <div className="text-[10px] font-semibold uppercase tracking-wider text-sky-400">
                  &amp; Visa Consultancy Services
                </div>
              </div>
            </div>

            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              PAR CAREERS AND VISA CONSULTANCY SERVICES provides ethical, transparent, and comprehensive overseas guidance for work visas, student admissions, and global career opportunities.
            </p>

            <div className="pt-2 space-y-2 text-sm text-slate-300">
              <a href="tel:+918019021039" className="flex items-center space-x-3 hover:text-sky-400 transition-colors">
                <Phone className="w-4 h-4 text-sky-400 flex-shrink-0" />
                <span>+91 8019021039</span>
              </a>
              <a href="https://wa.me/918019021039" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-3 hover:text-emerald-400 transition-colors">
                <MessageSquare className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>WhatsApp: +91 8019021039</span>
              </a>
              <a href="mailto:parvisaandcareer94@gmail.com" className="flex items-center space-x-3 hover:text-sky-400 transition-colors">
                <Mail className="w-4 h-4 text-sky-400 flex-shrink-0" />
                <span>parvisaandcareer94@gmail.com</span>
              </a>
            </div>

            {/* Social Media Links */}
            <div className="pt-3">
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Connect With Us</div>
              <div className="flex items-center space-x-3">
                <a
                  href="https://www.instagram.com/par_career/reels/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-pink-400 hover:border-pink-500/50 transition-colors"
                  title="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-sky-400 hover:border-sky-500/50 transition-colors"
                  title="LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a
                  href="https://wa.me/918019021039"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-emerald-400 hover:border-emerald-500/50 transition-colors"
                  title="WhatsApp"
                >
                  <MessageSquare className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Col 2: Services */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4 border-l-2 border-sky-500 pl-2">
              Services
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button onClick={() => onNavClick('work-visa')} className="hover:text-white transition-colors">
                  Work Visa Guidance
                </button>
              </li>
              <li>
                <button onClick={() => onNavClick('student-visa')} className="hover:text-white transition-colors">
                  Student Visa & Admissions
                </button>
              </li>
              <li>
                <button onClick={() => onNavClick('careers')} className="hover:text-white transition-colors flex items-center space-x-1">
                  <span>Careers Abroad</span>
                  <span className="text-[10px] bg-blue-900 text-sky-300 font-bold px-1.5 py-0.5 rounded">NEW</span>
                </button>
              </li>
              <li>
                <button onClick={() => onNavClick('trust-standard')} className="hover:text-white transition-colors text-sky-400 font-medium">
                  Our 5 Trust Promises
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Popular Countries */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4 border-l-2 border-sky-500 pl-2">
              Popular Destinations
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button onClick={() => onNavClick('country-germany')} className="hover:text-white transition-colors flex items-center space-x-1.5">
                  <span>🇩🇪</span> <span>Germany (Chancenkarte)</span>
                </button>
              </li>
              <li>
                <button onClick={() => onNavClick('country-singapore')} className="hover:text-white transition-colors flex items-center space-x-1.5">
                  <span>🇸🇬</span> <span>Singapore (EP / S Pass)</span>
                </button>
              </li>
              <li>
                <button onClick={() => onNavClick('country-australia')} className="hover:text-white transition-colors flex items-center space-x-1.5">
                  <span>🇦🇺</span> <span>Australia (PR / 482)</span>
                </button>
              </li>
              <li>
                <button onClick={() => onNavClick('country-united-kingdom')} className="hover:text-white transition-colors flex items-center space-x-1.5">
                  <span>🇬🇧</span> <span>United Kingdom</span>
                </button>
              </li>
              <li>
                <button onClick={() => onNavClick('country-canada')} className="hover:text-white transition-colors flex items-center space-x-1.5">
                  <span>🇨🇦</span> <span>Canada (Express Entry)</span>
                </button>
              </li>
              <li>
                <button onClick={() => onNavClick('country-united-states')} className="hover:text-white transition-colors flex items-center space-x-1.5">
                  <span>🇺🇸</span> <span>United States</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Newsletter & Resources */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4 border-l-2 border-sky-500 pl-2">
              Stay Informed
            </h4>
            <p className="text-slate-400 text-xs mb-3">
              Subscribe to official immigration policy updates and overseas job alerts.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2 mb-4">
              <input
                type="email"
                required
                placeholder="Enter your email address"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-sky-500"
              />
              <button
                type="submit"
                className="w-full bg-sky-600 hover:bg-sky-500 text-white font-semibold text-xs py-2 rounded-lg transition-colors flex items-center justify-center space-x-1"
              >
                <span>Subscribe Updates</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>

            {subscribed && (
              <div className="text-xs text-emerald-400 flex items-center space-x-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Successfully subscribed!</span>
              </div>
            )}

            <div className="pt-2 flex flex-wrap gap-2 text-xs">
              <button onClick={() => onNavClick('privacy')} className="text-slate-400 hover:text-white">
                Privacy Policy
              </button>
              <span className="text-slate-700">•</span>
              <button onClick={() => onNavClick('refund')} className="text-slate-400 hover:text-white">
                Refund Policy
              </button>
              <span className="text-slate-700">•</span>
              <button onClick={() => onNavClick('terms')} className="text-slate-400 hover:text-white">
                Terms & Conditions
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500 gap-4">
          <div>
            © {new Date().getFullYear()} PAR CAREERS AND VISA CONSULTANCY SERVICES. All rights reserved.
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-slate-600">Strict Ethical Standards • No Unverified Promises</span>
            <button
              onClick={handleAdminTrigger}
              className="text-slate-700 hover:text-slate-500 transition-colors"
              title="Admin Staff Verification"
            >
              [Staff Login]
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
