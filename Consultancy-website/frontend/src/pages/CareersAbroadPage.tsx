import React, { useState } from 'react';
import { Search, Filter, Briefcase, MapPin, Building2, ShieldCheck, DollarSign, Calendar, ChevronRight } from 'lucide-react';
import { INITIAL_JOBS } from '../data/initialData';
import { Job } from '../types';

interface CareersAbroadPageProps {
  onSelectJob: (job: Job) => void;
  onOpenCounselling: (service?: string) => void;
}

export const CareersAbroadPage: React.FC<CareersAbroadPageProps> = ({ onSelectJob, onOpenCounselling }) => {
  const [selectedCountry, setSelectedCountry] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const countries = ['All', 'Germany', 'Singapore', 'Australia', 'United Kingdom', 'Canada', 'United States'];
  const categories = ['All', 'Information Technology', 'Cloud & Infrastructure', 'Healthcare & Nursing', 'Engineering', 'Data & Analytics', 'Artificial Intelligence'];

  const filteredJobs = INITIAL_JOBS.filter(j => {
    const matchesCountry = selectedCountry === 'All' || (j.country || '').toLowerCase() === selectedCountry.toLowerCase();
    const matchesCategory = selectedCategory === 'All' || (j.category || '').toLowerCase() === selectedCategory.toLowerCase();
    const matchesSearch = !searchQuery ||
      (j.title || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (j.company || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (j.skills || []).some(s => (s || '').toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCountry && matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12 space-y-10 animate-fadeIn">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-900 to-slate-950 text-white p-8 sm:p-12 rounded-3xl shadow-xl space-y-4">
        <div className="inline-flex items-center space-x-2 bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-xs px-3 py-1 rounded-full font-bold uppercase tracking-wider">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Verified Employer Visa Sponsorship</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black tracking-tight">
          Overseas Career Directory
        </h1>
        <p className="text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed">
          Explore current job openings across Germany, Singapore, Australia, UK, Canada, and USA. All listed positions include employer sponsorship guidance and work permit assistance.
        </p>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center space-x-2 text-slate-900 font-bold text-sm border-b border-slate-100 pb-3">
          <Filter className="w-4 h-4 text-blue-700" />
          <span>Filter Job Openings</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Search Keywords</label>
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="e.g. Engineer, Nurse, React, AWS"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-9 pr-3 py-2 text-sm text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Target Country</label>
            <select
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-sm text-slate-900 focus:outline-none focus:border-blue-600 font-medium"
            >
              {countries.map(c => (
                <option key={c} value={c}>{c === 'All' ? 'All Countries' : c}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Job Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-sm text-slate-900 focus:outline-none focus:border-blue-600 font-medium"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat === 'All' ? 'All Categories' : cat}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex justify-between items-center text-xs text-slate-500 pt-2">
          <span>Showing <strong className="text-slate-900 font-bold">{filteredJobs.length}</strong> active openings</span>
          {(selectedCountry !== 'All' || selectedCategory !== 'All' || searchQuery) && (
            <button
              onClick={() => { setSelectedCountry('All'); setSelectedCategory('All'); setSearchQuery(''); }}
              className="text-blue-700 font-bold hover:underline"
            >
              Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* Job Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredJobs.length === 0 ? (
          <div className="col-span-full text-center py-12 bg-white rounded-2xl border border-slate-200 p-8 space-y-3">
            <Briefcase className="w-12 h-12 text-slate-300 mx-auto" />
            <h3 className="text-lg font-bold text-slate-800">No Job Openings Matched Your Search</h3>
            <p className="text-slate-500 text-xs max-w-sm mx-auto">
              Try adjusting your country or category filters, or request a custom profile assessment from our team.
            </p>
            <button
              onClick={() => onOpenCounselling('Careers Abroad')}
              className="mt-2 bg-blue-700 text-white font-bold text-xs px-5 py-2.5 rounded-lg"
            >
              Request Custom Job Search Assistance
            </button>
          </div>
        ) : (
          filteredJobs.map((job) => (
            <div
              key={job.id}
              className="bg-white rounded-2xl p-6 border border-slate-200 hover:border-blue-500 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="bg-sky-50 text-sky-800 border border-sky-200 text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-md flex items-center space-x-1">
                    <MapPin className="w-3.5 h-3.5 text-sky-600" />
                    <span>{job.country}</span>
                  </span>
                  <span className="text-[11px] text-slate-400 flex items-center space-x-1">
                    <Calendar className="w-3 h-3" />
                    <span>{job.postedDate}</span>
                  </span>
                </div>

                <div>
                  <h3 className="font-bold text-slate-900 text-base leading-snug group-hover:text-blue-700 transition-colors">
                    {job.title}
                  </h3>
                  <div className="text-xs text-slate-500 font-medium flex items-center space-x-1 mt-1">
                    <Building2 className="w-3.5 h-3.5 text-slate-400" />
                    <span>{job.company}</span>
                  </div>
                </div>

                <div className="bg-slate-50 p-3 rounded-xl space-y-1.5 border border-slate-100">
                  <div className="text-sm font-black text-blue-900 flex items-center space-x-1">
                    <DollarSign className="w-4 h-4 text-emerald-600" />
                    <span>{job.salary}</span>
                  </div>
                  <div className="text-xs text-slate-600 flex flex-wrap gap-2">
                    <span>Exp: <strong>{job.experience}</strong></span>
                    <span>•</span>
                    <span>Type: <strong>{job.employmentType}</strong></span>
                  </div>
                </div>

                <div>
                  <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Required Skills</div>
                  <div className="flex flex-wrap gap-1">
                    {job.skills.map((skill, idx) => (
                      <span key={idx} className="bg-slate-100 text-slate-700 text-[11px] px-2 py-0.5 rounded font-medium">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <p className="text-slate-600 text-xs line-clamp-2 leading-relaxed">
                  {job.description}
                </p>
              </div>

              <div className="pt-5 mt-4 border-t border-slate-100 flex items-center justify-between">
                {job.visaSponsorship && (
                  <span className="text-[11px] bg-emerald-50 text-emerald-800 font-bold px-2.5 py-1 rounded-md border border-emerald-200">
                    ✓ Visa Sponsorship
                  </span>
                )}
                <button
                  onClick={() => onSelectJob(job)}
                  className="bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs px-5 py-2.5 rounded-lg shadow-sm hover:shadow-md transition-all flex items-center space-x-1"
                >
                  <span>Apply Now</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
