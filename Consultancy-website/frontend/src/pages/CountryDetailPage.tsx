import React from 'react';
import { CountryInfo } from '../types';
import { Clock, CheckCircle2, FileText, ArrowRight, ShieldCheck, HelpCircle, GraduationCap, Briefcase, Landmark } from 'lucide-react';

interface CountryDetailPageProps {
  country: CountryInfo;
  onOpenCounselling: (service?: string, country?: string) => void;
  onNavClick: (tab: string) => void;
}

export const CountryDetailPage: React.FC<CountryDetailPageProps> = ({ country, onOpenCounselling, onNavClick }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12 space-y-12 animate-fadeIn">
      {/* Country Hero */}
      <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-slate-950 text-white min-h-[320px] flex items-end p-8 sm:p-12">
        <img
          src={country.coverImage}
          alt={country.name}
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>

        <div className="relative z-10 space-y-4 max-w-3xl">
          <div className="flex items-center space-x-3">
            <span className="text-4xl">{country.flag}</span>
            <span className="bg-sky-500/20 text-sky-200 border border-sky-400/30 text-xs px-3 py-1 rounded-full font-bold uppercase tracking-wider">
              {country.code} • Processing: {country.processingTime}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight">
            Work, Study & Migrate to {country.name}
          </h1>

          <p className="text-slate-200 text-sm sm:text-base leading-relaxed">
            {country.description}
          </p>

          <div className="pt-2 flex flex-wrap gap-3">
            <button
              onClick={() => onOpenCounselling('Work Visa', country.name)}
              className="bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-xl shadow-lg transition-colors flex items-center space-x-2"
            >
              <span>Get Free {country.name} Visa Counselling</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onNavClick('careers')}
              className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white font-semibold text-xs sm:text-sm px-5 py-3 rounded-xl border border-white/20 transition-colors"
            >
              Browse Jobs in {country.name}
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols */}
        <div className="lg:col-span-2 space-y-8">
          {/* Visa Pathways */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-2xl font-bold text-slate-900 flex items-center space-x-2">
              <Briefcase className="w-6 h-6 text-blue-700" />
              <span>{country.name} Visa Categories</span>
            </h2>

            <div className="space-y-4">
              {country.visaTypes.map((vt, i) => (
                <div key={i} className="bg-slate-50 p-5 rounded-xl border border-slate-200 space-y-1">
                  <div className="flex justify-between items-center flex-wrap gap-2">
                    <h3 className="font-bold text-slate-900 text-base">{vt.title}</h3>
                    <span className="text-xs font-semibold bg-blue-100 text-blue-800 px-2.5 py-1 rounded">
                      Validity: {vt.duration}
                    </span>
                  </div>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed pt-1">
                    {vt.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Benefits & Eligibility */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
            <h2 className="text-2xl font-bold text-slate-900 flex items-center space-x-2">
              <ShieldCheck className="w-6 h-6 text-emerald-600" />
              <span>Key Benefits & Eligibility Criteria</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h3 className="font-bold text-slate-800 text-sm uppercase tracking-wider text-emerald-700">Benefits</h3>
                <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
                  {country.benefits.map((b, idx) => (
                    <li key={idx} className="flex items-start space-x-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-3">
                <h3 className="font-bold text-slate-800 text-sm uppercase tracking-wider text-blue-700">Eligibility Criteria</h3>
                <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
                  {country.eligibility.map((e, idx) => (
                    <li key={idx} className="flex items-start space-x-2">
                      <CheckCircle2 className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                      <span>{e}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Documents Checklist */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-2xl font-bold text-slate-900 flex items-center space-x-2">
              <FileText className="w-6 h-6 text-sky-600" />
              <span>Required Application Documents</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {country.documents.map((doc, idx) => (
                <div key={idx} className="bg-slate-50 p-3 rounded-lg border border-slate-100 text-xs sm:text-sm text-slate-800 font-medium flex items-center space-x-2">
                  <span className="w-2 h-2 bg-sky-500 rounded-full"></span>
                  <span>{doc}</span>
                </div>
              ))}
            </div>
          </div>

          {/* FAQs */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-2xl font-bold text-slate-900 flex items-center space-x-2">
              <HelpCircle className="w-6 h-6 text-purple-600" />
              <span>{country.name} Migration FAQs</span>
            </h2>

            <div className="space-y-3">
              {country.faqs.map((f, i) => (
                <div key={i} className="bg-slate-50 p-4 rounded-xl">
                  <h4 className="font-bold text-slate-900 text-sm">{f.q}</h4>
                  <p className="text-slate-600 text-xs sm:text-sm mt-1 leading-relaxed">{f.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-md space-y-4">
            <h3 className="font-bold text-lg border-b border-slate-800 pb-2">
              At a Glance: {country.name}
            </h3>

            <div className="space-y-3 text-xs">
              <div>
                <span className="text-slate-400 block">Est. Living Cost</span>
                <span className="font-extrabold text-white text-sm">{country.livingCost}</span>
              </div>

              <div>
                <span className="text-slate-400 block">Processing Window</span>
                <span className="font-extrabold text-sky-400 text-sm">{country.processingTime}</span>
              </div>

              <div>
                <span className="text-slate-400 block mb-1">In-Demand Job Sectors</span>
                <div className="flex flex-wrap gap-1">
                  {country.topJobs.map((j, idx) => (
                    <span key={idx} className="bg-slate-800 text-slate-200 px-2 py-0.5 rounded text-[11px]">
                      {j}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-slate-400 block mb-1">Top Universities</span>
                <ul className="space-y-1 text-slate-300">
                  {country.topUniversities.map((u, idx) => (
                    <li key={idx} className="flex items-center space-x-1.5">
                      <GraduationCap className="w-3.5 h-3.5 text-sky-400" />
                      <span>{u}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <button
              onClick={() => onOpenCounselling('Work Visa', country.name)}
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs py-3 rounded-xl transition-colors mt-2"
            >
              Start {country.name} Application
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
