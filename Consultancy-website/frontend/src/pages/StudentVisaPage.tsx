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
      <div className="space-y-4">
        <div className="text-center max-w-2xl mx-auto space-y-1">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Featured Study Abroad Destinations</h2>
          <p className="text-slate-500 text-xs sm:text-sm">Explore specialized course options, study permits, and stay-back work rights across our primary partner destinations.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* UK */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 hover:border-blue-500 shadow-sm space-y-3 flex flex-col justify-between">
            <div className="space-y-2.5">
              <div className="flex justify-between items-center">
                <span className="text-2xl">🇬🇧 UK</span>
                <span className="text-[11px] bg-blue-50 text-blue-800 font-bold px-2 py-0.5 rounded">2-Yr Graduate Route</span>
              </div>
              <h3 className="font-bold text-base text-slate-900">United Kingdom</h3>
              <div className="space-y-1 text-xs">
                <span className="font-bold text-sky-800 block">Popular Study Courses:</span>
                <div className="flex flex-wrap gap-1">
                  <span className="bg-sky-50 text-sky-900 px-2 py-0.5 rounded font-medium text-[11px]">Hotel Management</span>
                  <span className="bg-sky-50 text-sky-900 px-2 py-0.5 rounded font-medium text-[11px]">IT</span>
                  <span className="bg-sky-50 text-sky-900 px-2 py-0.5 rounded font-medium text-[11px]">B.Sc Nursing</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => onOpenCounselling('Student Visa', 'United Kingdom')}
              className="w-full mt-2 bg-slate-900 hover:bg-blue-700 text-white font-bold text-xs py-2 rounded-lg transition-colors"
            >
              Apply for UK Intake
            </button>
          </div>

          {/* Russia */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 hover:border-blue-500 shadow-sm space-y-3 flex flex-col justify-between">
            <div className="space-y-2.5">
              <div className="flex justify-between items-center">
                <span className="text-2xl">🇷🇺 Russia</span>
                <span className="text-[11px] bg-blue-50 text-blue-800 font-bold px-2 py-0.5 rounded">Affordable Fees</span>
              </div>
              <h3 className="font-bold text-base text-slate-900">Russia</h3>
              <div className="space-y-1 text-xs">
                <span className="font-bold text-sky-800 block">Popular Study Courses:</span>
                <div className="flex flex-wrap gap-1">
                  <span className="bg-sky-50 text-sky-900 px-2 py-0.5 rounded font-medium text-[11px]">Nursing</span>
                  <span className="bg-sky-50 text-sky-900 px-2 py-0.5 rounded font-medium text-[11px]">Hotel Management</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => onOpenCounselling('Student Visa', 'Russia')}
              className="w-full mt-2 bg-slate-900 hover:bg-blue-700 text-white font-bold text-xs py-2 rounded-lg transition-colors"
            >
              Apply for Russia Intake
            </button>
          </div>

          {/* Germany */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 hover:border-blue-500 shadow-sm space-y-3 flex flex-col justify-between">
            <div className="space-y-2.5">
              <div className="flex justify-between items-center">
                <span className="text-2xl">🇩🇪 Germany</span>
                <span className="text-[11px] bg-emerald-50 text-emerald-800 font-bold px-2 py-0.5 rounded">€0 Tuition Fees</span>
              </div>
              <h3 className="font-bold text-base text-slate-900">Germany</h3>
              <div className="space-y-1 text-xs">
                <span className="font-bold text-sky-800 block">Popular Study Courses:</span>
                <div className="flex flex-wrap gap-1">
                  <span className="bg-sky-50 text-sky-900 px-2 py-0.5 rounded font-medium text-[11px]">Doctors</span>
                  <span className="bg-sky-50 text-sky-900 px-2 py-0.5 rounded font-medium text-[11px]">Nursing</span>
                  <span className="bg-sky-50 text-sky-900 px-2 py-0.5 rounded font-medium text-[11px]">Aeronautical Engineering</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => onOpenCounselling('Student Visa', 'Germany')}
              className="w-full mt-2 bg-slate-900 hover:bg-blue-700 text-white font-bold text-xs py-2 rounded-lg transition-colors"
            >
              Apply for Germany Intake
            </button>
          </div>

          {/* Singapore */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 hover:border-blue-500 shadow-sm space-y-3 flex flex-col justify-between">
            <div className="space-y-2.5">
              <div className="flex justify-between items-center">
                <span className="text-2xl">🇸🇬 Singapore</span>
                <span className="text-[11px] bg-blue-50 text-blue-800 font-bold px-2 py-0.5 rounded">Top Asian Hub</span>
              </div>
              <h3 className="font-bold text-base text-slate-900">Singapore</h3>
              <div className="space-y-1 text-xs">
                <span className="font-bold text-sky-800 block">Popular Study Courses:</span>
                <div className="flex flex-wrap gap-1">
                  <span className="bg-sky-50 text-sky-900 px-2 py-0.5 rounded font-medium text-[11px]">B.Sc Nursing</span>
                  <span className="bg-sky-50 text-sky-900 px-2 py-0.5 rounded font-medium text-[11px]">ANM / GNM</span>
                  <span className="bg-sky-50 text-sky-900 px-2 py-0.5 rounded font-medium text-[11px]">IT</span>
                  <span className="bg-sky-50 text-sky-900 px-2 py-0.5 rounded font-medium text-[11px]">Hotel Management</span>
                  <span className="bg-sky-50 text-sky-900 px-2 py-0.5 rounded font-medium text-[11px]">Mechanical Engineering</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => onOpenCounselling('Student Visa', 'Singapore')}
              className="w-full mt-2 bg-slate-900 hover:bg-blue-700 text-white font-bold text-xs py-2 rounded-lg transition-colors"
            >
              Apply for Singapore Intake
            </button>
          </div>

          {/* Australia */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 hover:border-blue-500 shadow-sm space-y-3 flex flex-col justify-between">
            <div className="space-y-2.5">
              <div className="flex justify-between items-center">
                <span className="text-2xl">🇦🇺 Australia</span>
                <span className="text-[11px] bg-blue-50 text-blue-800 font-bold px-2 py-0.5 rounded">4-6 Yr Stay-Back</span>
              </div>
              <h3 className="font-bold text-base text-slate-900">Australia</h3>
              <div className="space-y-1 text-xs">
                <span className="font-bold text-sky-800 block">Popular Study Courses:</span>
                <div className="flex flex-wrap gap-1">
                  <span className="bg-sky-50 text-sky-900 px-2 py-0.5 rounded font-medium text-[11px]">IT</span>
                  <span className="bg-sky-50 text-sky-900 px-2 py-0.5 rounded font-medium text-[11px]">Hotel Management</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => onOpenCounselling('Student Visa', 'Australia')}
              className="w-full mt-2 bg-slate-900 hover:bg-blue-700 text-white font-bold text-xs py-2 rounded-lg transition-colors"
            >
              Apply for Australia Intake
            </button>
          </div>

          {/* Dubai (UAE) */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 hover:border-blue-500 shadow-sm space-y-3 flex flex-col justify-between">
            <div className="space-y-2.5">
              <div className="flex justify-between items-center">
                <span className="text-2xl">🇦🇪 Dubai</span>
                <span className="text-[11px] bg-amber-50 text-amber-900 font-bold px-2 py-0.5 rounded">Tax-Free & Trades</span>
              </div>
              <h3 className="font-bold text-base text-slate-900">Dubai (UAE)</h3>
              <div className="space-y-1 text-xs">
                <span className="font-bold text-sky-800 block">Popular Study / Trade Courses:</span>
                <div className="flex flex-wrap gap-1">
                  <span className="bg-sky-50 text-sky-900 px-2 py-0.5 rounded font-medium text-[11px]">Nursing</span>
                  <span className="bg-sky-50 text-sky-900 px-2 py-0.5 rounded font-medium text-[11px]">Electrical Trades</span>
                  <span className="bg-sky-50 text-sky-900 px-2 py-0.5 rounded font-medium text-[11px]">Crane & Heavy Equipment</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => onOpenCounselling('Student Visa', 'Dubai')}
              className="w-full mt-2 bg-slate-900 hover:bg-blue-700 text-white font-bold text-xs py-2 rounded-lg transition-colors"
            >
              Apply for Dubai Intake
            </button>
          </div>

          {/* Canada */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 hover:border-blue-500 shadow-sm space-y-3 flex flex-col justify-between">
            <div className="space-y-2.5">
              <div className="flex justify-between items-center">
                <span className="text-2xl">🇨🇦 Canada</span>
                <span className="text-[11px] bg-rose-50 text-rose-900 font-bold px-2 py-0.5 rounded">3-Yr PGWP & PR</span>
              </div>
              <h3 className="font-bold text-base text-slate-900">Canada</h3>
              <div className="space-y-1 text-xs">
                <span className="font-bold text-sky-800 block">Popular Study Courses:</span>
                <div className="flex flex-wrap gap-1">
                  <span className="bg-sky-50 text-sky-900 px-2 py-0.5 rounded font-medium text-[11px]">IT</span>
                  <span className="bg-sky-50 text-sky-900 px-2 py-0.5 rounded font-medium text-[11px]">B.Sc Nursing</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => onOpenCounselling('Student Visa', 'Canada')}
              className="w-full mt-2 bg-slate-900 hover:bg-blue-700 text-white font-bold text-xs py-2 rounded-lg transition-colors"
            >
              Apply for Canada Intake
            </button>
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
