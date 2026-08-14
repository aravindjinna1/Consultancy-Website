import React from 'react';
import { Building2, Award, Users, ShieldCheck, Target, HeartHandshake, Phone } from 'lucide-react';

interface AboutPageProps {
  onOpenCounselling: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onOpenCounselling }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12 space-y-12 animate-fadeIn">
      {/* Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-900 to-slate-950 text-white p-8 sm:p-12 rounded-3xl shadow-xl space-y-4">
        <div className="inline-flex items-center space-x-2 bg-sky-500/20 text-sky-300 border border-sky-400/30 text-xs px-3 py-1 rounded-full font-bold uppercase tracking-wider">
          <Building2 className="w-4 h-4 text-sky-400" />
          <span>Our Leadership & Corporate Ethos</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black tracking-tight">
          About PAR CAREERS AND VISA CONSULTANCY SERVICES
        </h1>
        <p className="text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed">
          Founded on principles of unwavering transparency, zero false promises, and thorough candidate document evaluation.
        </p>
      </div>

      {/* Mission & Vision */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-3">
          <div className="w-12 h-12 bg-blue-50 text-blue-700 rounded-xl flex items-center justify-center font-bold">
            <Target className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-slate-900">Our Core Mission</h2>
          <p className="text-slate-600 text-sm leading-relaxed">
            To empower aspiring overseas candidates with authentic, government-aligned visa guidance and direct employer connectivity, demystifying international migration.
          </p>
        </div>

        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-3">
          <div className="w-12 h-12 bg-emerald-50 text-emerald-700 rounded-xl flex items-center justify-center font-bold">
            <HeartHandshake className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-slate-900">Ethical Promise</h2>
          <p className="text-slate-600 text-sm leading-relaxed">
            We reject the industry norm of artificial guarantees or hidden charges. We deliver clear contractual milestones and honest profile assessments.
          </p>
        </div>
      </div>

      {/* Corporate Info */}
      <div className="bg-slate-900 text-white p-8 sm:p-12 rounded-3xl space-y-6">
        <h2 className="text-2xl font-bold text-white">Direct Corporate Contact</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-slate-300">
          <div>
            <div className="text-xs text-sky-400 uppercase font-bold tracking-wider mb-1">Company Title</div>
            <div className="font-bold text-white text-base">PAR CAREERS AND VISA CONSULTANCY SERVICES</div>
          </div>
          <div>
            <div className="text-xs text-sky-400 uppercase font-bold tracking-wider mb-1">Direct Senior Phone / WhatsApp</div>
            <a href="tel:+919533120230" className="font-bold text-white text-base hover:text-sky-300">
              +91 95331 20230
            </a>
          </div>
          <div>
            <div className="text-xs text-sky-400 uppercase font-bold tracking-wider mb-1">Official Desk Email</div>
            <a href="mailto:Ardigitalstudio05@gmail.com" className="font-bold text-white text-base hover:text-sky-300">
              Ardigitalstudio05@gmail.com
            </a>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-800">
          <button
            onClick={onOpenCounselling}
            className="bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm px-8 py-3 rounded-xl transition-colors"
          >
            Connect with Senior Counselor
          </button>
        </div>
      </div>
    </div>
  );
};
