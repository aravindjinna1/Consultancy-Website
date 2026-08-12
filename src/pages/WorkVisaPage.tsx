import React from 'react';
import { Briefcase, Globe, CheckCircle2, FileText, ArrowRight, ShieldCheck, HelpCircle } from 'lucide-react';
import { INITIAL_COUNTRIES } from '../data/initialData';

interface WorkVisaPageProps {
  onNavClick: (tab: string) => void;
  onOpenCounselling: (service?: string, country?: string) => void;
}

export const WorkVisaPage: React.FC<WorkVisaPageProps> = ({ onNavClick, onOpenCounselling }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12 space-y-12 animate-fadeIn">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-blue-900 text-white p-8 sm:p-12 rounded-3xl shadow-xl space-y-4">
        <div className="inline-flex items-center space-x-2 bg-blue-500/20 text-sky-300 border border-sky-400/30 text-xs px-3 py-1 rounded-full font-bold uppercase tracking-wider">
          <Briefcase className="w-4 h-4 text-sky-400" />
          <span>Global Professional Mobility</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black tracking-tight">
          Overseas Work Visas & Job Seeker Permits
        </h1>
        <p className="text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed">
          Unlock global employment opportunities across Germany, Singapore, Australia, UK, Canada, and USA. Complete petition verification, degree equivalence, and employer sponsorship support.
        </p>
        <div className="pt-2">
          <button
            onClick={() => onOpenCounselling('Work Visa')}
            className="bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-sm px-6 py-3 rounded-xl shadow-lg transition-colors flex items-center space-x-2"
          >
            <span>Evaluate Work Visa Eligibility</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Overview & Key Pathways */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-2xl font-bold text-slate-900">Popular Overseas Work Visa Categories</h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              We specialize in point-based job seeker permits, high-skilled specialist passes, and permanent migration routes.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <div className="text-blue-700 font-bold text-sm">🇩🇪 Germany Chancenkarte & Blue Card</div>
                <p className="text-slate-600 text-xs mt-1">Opportunity Card for job seekers + fast-track PR via EU Blue Card in 21 months.</p>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <div className="text-blue-700 font-bold text-sm">🇸🇬 Singapore Employment Pass (EP)</div>
                <p className="text-slate-600 text-xs mt-1">For executives earning SGD $5,000+ under COMPASS framework evaluation.</p>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <div className="text-blue-700 font-bold text-sm">🇦🇺 Australia Subclass 482 & 189 PR</div>
                <p className="text-slate-600 text-xs mt-1">Skill assessment (ACS / Engineers Australia) + direct PR migration points.</p>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <div className="text-blue-700 font-bold text-sm">🇬🇧 UK Skilled Worker Visa</div>
                <p className="text-slate-600 text-xs mt-1">Certificate of Sponsorship (CoS) route leading to ILR permanent settlement in 5 years.</p>
              </div>
            </div>
          </div>

          {/* Visa Step-by-Step Process */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-2xl font-bold text-slate-900">Step-by-Step Work Visa Process</h2>
            <div className="space-y-4">
              {[
                { step: '1', title: 'Free Profile & Education Assessment', desc: 'Evaluating degree equivalency (Anabin, ECA, ACS) and language proficiency requirements.' },
                { step: '2', title: 'Employer / Opportunity Match', desc: 'Sponsorship verification or filing points application for Job Seeker / Chancenkarte permits.' },
                { step: '3', title: 'Document Legalization & Apostille', desc: 'Translating, attesting transcripts, PCC, and financial proof.' },
                { step: '4', title: 'Petition Submission & Embassy Interview', desc: 'Mock interview training and appointment scheduling with VFS / Embassy.' },
                { step: '5', title: 'Visa Stamping & Relocation Support', desc: 'Flight orientation, health insurance (Krankenkasse / NHS), and airport arrival guidance.' }
              ].map((s, idx) => (
                <div key={idx} className="flex space-x-4 items-start">
                  <div className="w-8 h-8 rounded-lg bg-blue-700 text-white font-bold flex items-center justify-center flex-shrink-0 text-sm">
                    {s.step}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-base">{s.title}</h3>
                    <p className="text-slate-600 text-xs sm:text-sm mt-0.5">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar Checklist & CTA */}
        <div className="space-y-6">
          <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-md space-y-4">
            <h3 className="font-bold text-lg flex items-center space-x-2">
              <ShieldCheck className="w-5 h-5 text-sky-400" />
              <span>Mandatory Documents</span>
            </h3>
            <ul className="space-y-2.5 text-xs text-slate-300">
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Valid Passport (12+ months validity)</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Degree Certificate & Transcripts</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Degree Equivalency (Anabin / WES / ACS)</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Experience Certificates & Salary Slips</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Language Scorecard (IELTS / German A2-B2)</span>
              </li>
            </ul>

            <button
              onClick={() => onOpenCounselling('Work Visa')}
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs py-3 rounded-lg transition-colors mt-2"
            >
              Get Free Document Review
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
