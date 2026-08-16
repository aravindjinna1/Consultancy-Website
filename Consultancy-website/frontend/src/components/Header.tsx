import React, { useState } from 'react';
import { Phone, Mail, MessageSquare, ShieldCheck, User as UserIcon, Lock, Menu, X, ChevronDown, GraduationCap, Briefcase, Globe, Award, HelpCircle, Instagram, Linkedin, UserPlus, LogIn, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import brandLogo from '../assets/logo.png';

interface HeaderProps {
  currentTab?: string;
  activeTab?: string;
  setCurrentTab?: (tab: string) => void;
  onNavClick?: (tab: string) => void;
  onOpenCounselling: () => void;
  onOpenAdminLogin?: () => void;
  onOpenUserAuth?: (mode?: 'login' | 'signup') => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  activeTab,
  setCurrentTab,
  onNavClick,
  onOpenCounselling,
  onOpenAdminLogin,
  onOpenUserAuth
}) => {
  const { user, isAdmin, logout, openUserAuth, setIsAdminModalOpen } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [countriesDropdownOpen, setCountriesDropdownOpen] = useState(false);

  const tab = activeTab || currentTab || 'home';

  const countries = [
    { id: 'germany', name: 'Germany', flag: '🇩🇪' },
    { id: 'singapore', name: 'Singapore', flag: '🇸🇬' },
    { id: 'australia', name: 'Australia', flag: '🇦🇺' },
    { id: 'united-kingdom', name: 'United Kingdom', flag: '🇬🇧' },
    { id: 'canada', name: 'Canada', flag: '🇨🇦' },
    { id: 'united-states', name: 'United States', flag: '🇺🇸' },
  ];

  const handleNavClick = (newTab: string) => {
    if (onNavClick) {
      onNavClick(newTab);
    } else if (setCurrentTab) {
      setCurrentTab(newTab);
    }
    setMobileMenuOpen(false);
    setCountriesDropdownOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenAuth = (mode: 'login' | 'signup') => {
    if (onOpenUserAuth) {
      onOpenUserAuth(mode);
    } else {
      openUserAuth(mode);
    }
  };

  return (
    <header className="w-full sticky top-0 z-40 bg-white shadow-sm border-b border-slate-100">
      {/* Top Contact Bar */}
      <div className="bg-slate-900 text-slate-200 text-xs py-2 px-4 sm:px-8 transition-colors">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center space-x-5 flex-wrap gap-y-1">
            <a
              href="tel:+918019021039"
              className="flex items-center space-x-1.5 hover:text-sky-400 transition-colors"
              title="Call PAR CAREERS"
            >
              <Phone className="w-3.5 h-3.5 text-sky-400" />
              <span>+91 8019021039</span>
            </a>
            <a
              href="https://wa.me/918019021039?text=Hello%20PAR%20CAREERS%2C%20I%20would%20like%20to%20inquire%20about%20overseas%20visas"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1.5 hover:text-emerald-400 transition-colors"
              title="WhatsApp PAR CAREERS"
            >
              <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
              <span className="font-medium">WhatsApp: +91 8019021039</span>
            </a>
            <a
              href="mailto:parvisaandcareer94@gmail.com"
              className="hidden md:flex items-center space-x-1.5 hover:text-sky-400 transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-slate-400" />
              <span>parvisaandcareer94@gmail.com</span>
            </a>

            {/* Social Media Header Icons */}
            <div className="flex items-center space-x-3 text-slate-400 pl-2 border-l border-slate-800">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-pink-400 transition-colors"
                title="Follow us on Instagram"
              >
                <Instagram className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-sky-400 transition-colors"
                title="Connect with us on LinkedIn"
              >
                <Linkedin className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => handleNavClick('trust-standard')}
              className="hidden lg:flex items-center space-x-1 text-slate-300 hover:text-sky-300 transition-colors"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-sky-400" />
              <span className="font-semibold tracking-wide">Trust Standard</span>
            </button>

            {user ? (
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleNavClick(isAdmin ? 'admin-dashboard' : 'user-dashboard')}
                  className="flex items-center space-x-1.5 px-2.5 py-1 rounded-lg bg-sky-950/80 border border-sky-700/60 text-sky-300 text-xs font-semibold hover:bg-sky-900 transition-colors"
                >
                  <UserIcon className="w-3.5 h-3.5 text-sky-400" />
                  <span>{user.name.split(' ')[0]} ({isAdmin ? 'Admin' : 'Dashboard'})</span>
                </button>

                {/* Prominent Logout Button when user is logged in */}
                <button
                  onClick={logout}
                  className="flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition-all shadow-sm transform hover:scale-105"
                  title="Logout from account"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                {/* Visible Login Button */}
                <button
                  onClick={() => handleOpenAuth('login')}
                  className="flex items-center space-x-1.5 px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-100 text-xs font-bold border border-slate-700 transition-all shadow-sm hover:border-slate-500"
                >
                  <LogIn className="w-3.5 h-3.5 text-sky-400" />
                  <span>Login</span>
                </button>

                {/* Visible Register / Signup Button */}
                <button
                  onClick={() => handleOpenAuth('signup')}
                  className="flex items-center space-x-1.5 px-3 py-1 rounded-lg bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-700 hover:to-sky-600 text-white text-xs font-bold shadow-md hover:shadow-lg transition-all transform hover:scale-105"
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  <span>Register</span>
                </button>

                {/* Discrete Admin verification door for direct authorization */}
                <button
                  onClick={() => {
                    if (onOpenAdminLogin) onOpenAdminLogin();
                    else setIsAdminModalOpen(true);
                  }}
                  className="text-slate-500 hover:text-slate-300 transition-colors p-1"
                  title="Staff Portal Verification"
                >
                  <Lock className="w-3 h-3" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Sticky Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3 flex justify-between items-center gap-4">
        {/* Brand Logo */}
        <div
          onClick={() => handleNavClick('home')}
          className="cursor-pointer flex items-center space-x-3 group flex-shrink-0"
        >
          <div className="relative flex items-center justify-center">
            <img
              src={brandLogo}
              alt="PAR CAREERS Logo"
              className="h-11 sm:h-12 w-auto max-w-[130px] sm:max-w-[150px] object-contain rounded-xl border-2 border-sky-400 shadow-lg shadow-sky-500/30 group-hover:scale-105 group-hover:shadow-sky-500/50 group-hover:border-sky-300 transition-all duration-300"
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/logo.png';
              }}
            />
          </div>
          <div className="whitespace-nowrap hidden sm:block">
            <div className="font-black text-base sm:text-lg text-slate-900 leading-tight tracking-tight group-hover:text-blue-900 transition-colors">
              PAR CAREERS
            </div>
            <div className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-sky-700">
              &amp; Visa Consultancy Services
            </div>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-3 xl:space-x-5 text-xs xl:text-sm font-medium text-slate-700 whitespace-nowrap">
          <button
            onClick={() => handleNavClick('home')}
            className={`transition-colors py-1 ${tab === 'home' ? 'text-blue-700 font-bold border-b-2 border-blue-700' : 'hover:text-blue-700'}`}
          >
            Home
          </button>
          <button
            onClick={() => handleNavClick('work-visa')}
            className={`transition-colors py-1 ${tab === 'work-visa' ? 'text-blue-700 font-bold border-b-2 border-blue-700' : 'hover:text-blue-700'}`}
          >
            Work Visa
          </button>
          <button
            onClick={() => handleNavClick('student-visa')}
            className={`transition-colors py-1 ${tab === 'student-visa' ? 'text-blue-700 font-bold border-b-2 border-blue-700' : 'hover:text-blue-700'}`}
          >
            Student Visa
          </button>
          <button
            onClick={() => handleNavClick('careers')}
            className={`transition-colors py-1 flex items-center space-x-1 ${tab === 'careers' ? 'text-blue-700 font-bold border-b-2 border-blue-700' : 'hover:text-blue-700'}`}
          >
            <span>Careers Abroad</span>
            <span className="bg-sky-100 text-sky-800 text-[9px] px-1.5 py-0.5 rounded font-bold uppercase">Jobs</span>
          </button>

          {/* Countries Dropdown */}
          <div className="relative group">
            <button
              onClick={() => setCountriesDropdownOpen(!countriesDropdownOpen)}
              className={`flex items-center space-x-1 transition-colors py-1 ${(tab && tab.startsWith('country-')) || tab === 'countries' ? 'text-blue-700 font-bold' : 'hover:text-blue-700'}`}
            >
              <span>Countries</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:rotate-180 transition-transform" />
            </button>
            <div className="absolute top-full left-0 mt-1 w-52 bg-white rounded-xl shadow-xl border border-slate-100 py-2 hidden group-hover:block z-50 animate-fadeIn">
              <button
                onClick={() => handleNavClick('countries')}
                className="w-full text-left px-4 py-2 text-xs font-bold text-sky-700 hover:bg-slate-50 border-b border-slate-100 uppercase tracking-wider"
              >
                All Destinations →
              </button>
              {countries.map(c => (
                <button
                  key={c.id}
                  onClick={() => handleNavClick(`country-${c.id}`)}
                  className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-blue-700 flex items-center space-x-2 transition-colors"
                >
                  <span className="text-base">{c.flag}</span>
                  <span>{c.name}</span>
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={() => handleNavClick('trust-standard')}
            className={`transition-colors py-1 ${tab === 'trust-standard' ? 'text-blue-700 font-bold border-b-2 border-blue-700' : 'hover:text-blue-700'}`}
          >
            Trust Standard
          </button>
          <button
            onClick={() => handleNavClick('about')}
            className={`transition-colors py-1 ${tab === 'about' ? 'text-blue-700 font-bold border-b-2 border-blue-700' : 'hover:text-blue-700'}`}
          >
            About Us
          </button>
          <button
            onClick={() => handleNavClick('contact')}
            className={`transition-colors py-1 ${tab === 'contact' ? 'text-blue-700 font-bold border-b-2 border-blue-700' : 'hover:text-blue-700'}`}
          >
            Contact
          </button>
        </nav>

        {/* Action Button & Mobile Menu Toggle */}
        <div className="flex items-center space-x-2 sm:space-x-3 flex-shrink-0">
          <button
            onClick={onOpenCounselling}
            className="bg-gradient-to-r from-blue-700 to-sky-600 hover:from-blue-800 hover:to-sky-700 text-white font-semibold text-xs sm:text-sm px-3.5 sm:px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center space-x-1 whitespace-nowrap"
          >
            <span>Get Free Counselling</span>
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-slate-100 px-6 py-4 space-y-4 animate-fadeIn shadow-xl">
          {/* Mobile Auth Buttons */}
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
            {user ? (
              <div className="flex items-center justify-between gap-2">
                <button
                  onClick={() => handleNavClick(isAdmin ? 'admin-dashboard' : 'user-dashboard')}
                  className="flex items-center space-x-2 text-sm font-bold text-slate-800 hover:text-blue-700"
                >
                  <UserIcon className="w-4 h-4 text-sky-600" />
                  <span>{user.name}</span>
                </button>
                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition-colors flex items-center space-x-1"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    handleOpenAuth('login');
                    setMobileMenuOpen(false);
                  }}
                  className="flex-1 py-2 px-3 rounded-lg bg-slate-800 text-white text-xs font-bold flex items-center justify-center space-x-1.5 shadow-sm"
                >
                  <LogIn className="w-3.5 h-3.5 text-sky-400" />
                  <span>Login</span>
                </button>
                <button
                  onClick={() => {
                    handleOpenAuth('signup');
                    setMobileMenuOpen(false);
                  }}
                  className="flex-1 py-2 px-3 rounded-lg bg-blue-700 text-white text-xs font-bold flex items-center justify-center space-x-1.5 shadow-md"
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  <span>Register</span>
                </button>
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-2 text-sm font-medium text-slate-700 pb-2 border-b border-slate-100">
            <button
              onClick={() => handleNavClick('home')}
              className={`text-left py-2 px-3 rounded-lg ${tab === 'home' ? 'bg-blue-50 text-blue-700 font-bold' : 'hover:bg-slate-50'}`}
            >
              Home
            </button>
            <button
              onClick={() => handleNavClick('work-visa')}
              className={`text-left py-2 px-3 rounded-lg ${tab === 'work-visa' ? 'bg-blue-50 text-blue-700 font-bold' : 'hover:bg-slate-50'}`}
            >
              Work Visa
            </button>
            <button
              onClick={() => handleNavClick('student-visa')}
              className={`text-left py-2 px-3 rounded-lg ${tab === 'student-visa' ? 'bg-blue-50 text-blue-700 font-bold' : 'hover:bg-slate-50'}`}
            >
              Student Visa
            </button>
            <button
              onClick={() => handleNavClick('careers')}
              className={`text-left py-2 px-3 rounded-lg ${tab === 'careers' ? 'bg-blue-50 text-blue-700 font-bold' : 'hover:bg-slate-50'}`}
            >
              Careers Abroad
            </button>
            <button
              onClick={() => handleNavClick('countries')}
              className={`text-left py-2 px-3 rounded-lg ${tab === 'countries' ? 'bg-blue-50 text-blue-700 font-bold' : 'hover:bg-slate-50'}`}
            >
              All Countries
            </button>
            <button
              onClick={() => handleNavClick('trust-standard')}
              className={`text-left py-2 px-3 rounded-lg ${tab === 'trust-standard' ? 'bg-blue-50 text-blue-700 font-bold' : 'hover:bg-slate-50'}`}
            >
              Trust Standard
            </button>
            <button
              onClick={() => handleNavClick('about')}
              className={`text-left py-2 px-3 rounded-lg ${tab === 'about' ? 'bg-blue-50 text-blue-700 font-bold' : 'hover:bg-slate-50'}`}
            >
              About Us
            </button>
            <button
              onClick={() => handleNavClick('contact')}
              className={`text-left py-2 px-3 rounded-lg ${tab === 'contact' ? 'bg-blue-50 text-blue-700 font-bold' : 'hover:bg-slate-50'}`}
            >
              Contact Us
            </button>
            <button
              onClick={() => handleNavClick('blogs')}
              className={`text-left py-2 px-3 rounded-lg ${tab === 'blogs' ? 'bg-blue-50 text-blue-700 font-bold' : 'hover:bg-slate-50'}`}
            >
              Blogs & News
            </button>
          </div>

          <div>
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Destinations</div>
            <div className="grid grid-cols-2 gap-1.5">
              {countries.map(c => (
                <button
                  key={c.id}
                  onClick={() => handleNavClick(`country-${c.id}`)}
                  className="flex items-center space-x-2 text-xs text-slate-700 p-2 rounded-lg hover:bg-slate-100"
                >
                  <span>{c.flag}</span>
                  <span>{c.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
