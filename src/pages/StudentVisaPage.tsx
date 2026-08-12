import React from 'react';
import { GraduationCap, ArrowRight, CheckCircle2, BookOpen, Landmark, Clock, Award } from 'lucide-react';

interface StudentVisaPageProps {
  onNavClick: (tab: string) => void;
  onOpenCounselling: (service?: string, country?: string) => void;
}

export const StudentVisaPage: React.FC<StudentVisaPageProps> = ({ onNavClick, onOpenCounselling }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12 space-y-12 animate-fadeIn">
      {/* Banner */}
      <div className="bg-gradient-to-r from-sky-900 via-blue-900 to-slate-900 text-white p-8 sm:p-12 rounded-3xl shadow-xl space-y-4">
        <div className="inline-flex items-center space-x-2 bg-sky-500/20 text-sky-200 border border-sky-400/30 text-xs px-3 py-1 rounded-full font-bold uppercase tracking-wider">
          <GraduationCap className="w-4 h-4 text-sky-300" />
          <span>Global Higher Education & Scholarships</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black tracking-tight">
          Overseas Student Visas & Admissions
        </h1>
        <p className="text-sky-100 text-sm sm:text-base max-w-2xl leading-relaxed">
          Study at top world-ranked universities across Germany (Tuition-Free), UK, Australia, USA, Canada, and Singapore with full support for SOP writing, Blocked Accounts, and Post-Study Work Permits.
        </p>
        <div className="pt-2">
          <button
            onClick={() => onOpenCounselling('Student Visa')}
            className="bg-white hover:bg-slate-100 text-blue-900 font-extrabold text-sm px-6 py-3 rounded-xl shadow-lg transition-colors flex items-center space-x-2"
          >
            <span>Book Free Student Profile Assessment</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Country Comparison Cards for Students */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
          <div className="text-2xl">🇩🇪 Germany</div>
          <h3 className="font-bold text-lg text-slate-900">Tuition-Free Public Universities</h3>
          <p className="text-slate-600 text-xs sm:text-sm">
            €0 tuition fees at top public universities + 18-month stay-back work permit.
          </p>
          <div className="text-xs text-sky-700 font-semibold bg-sky-50 p-2 rounded">
            Blocked Account ~€11,208/yr required
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
          <div className="text-2xl">🇬🇧 United Kingdom</div>
          <h3 className="font-bold text-lg text-slate-900">1-Year Master Programs</h3>
          <p className="text-slate-600 text-xs sm:text-sm">
            Fast 1-year Master degrees + 2-Year unsponsored Graduate Route work visa.
          </p>
          <div className="text-xs text-sky-700 font-semibold bg-sky-50 p-2 rounded">
            Scholarships up to £5,000 available
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
          <div className="text-2xl">🇦🇺 Australia</div>
          <h3 className="font-bold text-lg text-slate-900">Extended Post-Study Rights</h3>
          <p className="text-slate-600 text-xs sm:text-sm">
            Up to 4-6 years work permit for graduates in regional university campuses.
          </p>
          <div className="text-xs text-sky-700 font-semibold bg-sky-50 p-2 rounded">
            Subclass 500 Student Visa + Part-Time Work
          </div>
        </div>
      </div>

      {/* Admission & Visa Assistance */}
      <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
        <h2 className="text-2xl font-bold text-slate-900 text-center">Complete University Application Suite</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 bg-blue-50 text-blue-700 rounded-xl flex items-center justify-center mx-auto">
              <BookOpen className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-slate-900 text-sm">Course & Campus Selection</h4>
            <p className="text-slate-500 text-xs">Matching academic budget, PR pathways, and career prospects.</p>
          </div>

          <div className="text-center space-y-2">
            <div className="w-12 h-12 bg-blue-50 text-blue-700 rounded-xl flex items-center justify-center mx-auto">
              <Award className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-slate-900 text-sm">SOP & LOR Editing</h4>
            <p className="text-slate-500 text-xs">Crafting compelling personal statements and reference letters.</p>
          </div>

          <div className="text-center space-y-2">
            <div className="w-12 h-12 bg-blue-50 text-blue-700 rounded-xl flex items-center justify-center mx-auto">
              <Landmark className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-slate-900 text-sm">Education Loan Assistance</h4>
            <p className="text-slate-500 text-xs">Partnered with trusted banks for collateral and non-collateral loans.</p>
          </div>

          <div className="text-center space-y-2">
            <div className="w-12 h-12 bg-blue-50 text-blue-700 rounded-xl flex items-center justify-center mx-auto">
              <Clock className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-slate-900 text-sm">Visa Filing & Mock Interview</h4>
            <p className="text-slate-500 text-xs">Filing CAS, Blocked Accounts, and embassy interview preparation.</p>
          </div>
        </div>

        <div className="text-center pt-4">
          <button
            onClick={() => onOpenCounselling('Student Visa')}
            className="bg-blue-700 hover:bg-blue-800 text-white font-bold text-sm px-8 py-3.5 rounded-xl shadow-md transition-colors"
          >
            Apply for Upcoming 2026/2027 Intakes
          </button>
        </div>
      </div>
    </div>
  );
};
