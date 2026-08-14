import React from 'react';
import { Globe, ArrowRight, ChevronRight, Clock, ShieldCheck } from 'lucide-react';
import { INITIAL_COUNTRIES } from '../data/initialData';

interface CountriesHubPageProps {
  onNavClick: (tab: string) => void;
  onOpenCounselling: (service?: string, country?: string) => void;
}

export const CountriesHubPage: React.FC<CountriesHubPageProps> = ({ onNavClick, onOpenCounselling }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12 space-y-10 animate-fadeIn">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-900 to-slate-950 text-white p-8 sm:p-12 rounded-3xl shadow-xl space-y-4">
        <div className="inline-flex items-center space-x-2 bg-sky-500/20 text-sky-300 border border-sky-400/30 text-xs px-3 py-1 rounded-full font-bold uppercase tracking-wider">
          <Globe className="w-4 h-4 text-sky-400" />
          <span>Global Work & Education Hubs</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black tracking-tight">
          Destination Country Guides
        </h1>
        <p className="text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed">
          Comprehensive immigration, living cost, visa processing times, and university guides for Germany, Singapore, Australia, UK, Canada, and USA.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {INITIAL_COUNTRIES.map((country) => (
          <div
            key={country.id}
            className="bg-white rounded-2xl overflow-hidden border border-slate-200 hover:border-blue-500 shadow-sm hover:shadow-xl transition-all group flex flex-col justify-between"
          >
            <div className="relative h-52 overflow-hidden">
              <img
                src={country.coverImage}
                alt={country.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent"></div>
              <div className="absolute bottom-3 left-4 right-4 flex justify-between items-end text-white">
                <div className="flex items-center space-x-2">
                  <span className="text-3xl">{country.flag}</span>
                  <span className="font-black text-2xl">{country.name}</span>
                </div>
                <span className="text-xs bg-white/20 backdrop-blur-md px-2.5 py-1 rounded-md font-semibold flex items-center space-x-1">
                  <Clock className="w-3 h-3" />
                  <span>{country.processingTime}</span>
                </span>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                {country.description}
              </p>

              {/* Study Options */}
              {country.studyOptions && country.studyOptions.length > 0 && (
                <div className="space-y-1.5 pt-2 border-t border-slate-100 text-xs">
                  <div className="font-bold text-sky-800 flex items-center space-x-1">
                    <span>Study Options:</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {country.studyOptions.map((opt, idx) => (
                      <span key={idx} className="bg-sky-50 text-sky-900 border border-sky-200/60 px-2 py-0.5 rounded font-semibold text-[11px]">
                        {opt}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* In-Demand Job Roles */}
              {country.jobRoles && country.jobRoles.length > 0 && (
                <div className="space-y-1.5 text-xs">
                  <div className="font-bold text-emerald-800 flex items-center space-x-1">
                    <span>In-Demand Job Roles:</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {country.jobRoles.map((role, idx) => (
                      <span key={idx} className="bg-emerald-50 text-emerald-900 border border-emerald-200/60 px-2 py-0.5 rounded font-semibold text-[11px]">
                        {role}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs flex justify-between items-center">
                <span className="text-slate-500 font-medium">Est. Living Cost:</span>
                <span className="font-bold text-slate-900">{country.livingCost}</span>
              </div>
            </div>

            <div className="p-6 pt-0 flex space-x-2">
              <button
                onClick={() => onNavClick(`country-${country.id}`)}
                className="w-full bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs py-3 rounded-xl transition-colors flex items-center justify-center space-x-1"
              >
                <span>Read Full {country.name} Guide</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
