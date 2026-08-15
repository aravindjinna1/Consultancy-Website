import React, { useState, useEffect } from 'react';
import { ShieldCheck, ArrowRight, Globe, GraduationCap, Briefcase, Users, Search, CheckCircle2, Star, MessageSquare, ChevronRight, Phone, Sparkles } from 'lucide-react';
import { TrustStandardSection } from '../components/TrustStandardSection';
import { INITIAL_COUNTRIES, INITIAL_JOBS, INITIAL_BLOGS, INITIAL_TESTIMONIALS } from '../data/initialData';
import { Job, Testimonial, CountryInfo } from '../types';

interface HomePageProps {
  onNavClick: (tab: string) => void;
  onOpenCounselling: (service?: string, country?: string) => void;
  onSelectJob: (job: Job) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavClick, onOpenCounselling, onSelectJob }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCountryFilter, setSelectedCountryFilter] = useState('All');

  const filteredJobs = INITIAL_JOBS.filter(j => {
    const matchesCountry = selectedCountryFilter === 'All' || (j.country || '').toLowerCase() === selectedCountryFilter.toLowerCase();
    const matchesSearch = !searchQuery || (j.title || '').toLowerCase().includes(searchQuery.toLowerCase()) || (j.skills || []).some(s => (s || '').toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCountry && matchesSearch;
  });

  return (
    <div className="space-y-16 animate-fadeIn pb-12">
      {/* 1. Hero Section */}
      <section className="relative bg-slate-900 text-white overflow-hidden py-16 lg:py-24 border-b border-slate-800">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/40 via-slate-900 to-slate-950 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Hero Left Content */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center space-x-2 bg-blue-500/10 text-sky-300 border border-sky-400/30 text-xs px-3.5 py-1.5 rounded-full font-semibold backdrop-blur-md">
              <Sparkles className="w-4 h-4 text-sky-400" />
              <span>Certified Overseas Career & Visa Advisory</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight text-white">
              Empowering Overseas <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-blue-300 to-emerald-300">
                Careers & Global Visas
              </span>
            </h1>

            <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl">
              PAR CAREERS AND VISA CONSULTANCY SERVICES provides ethical, transparent, and proven guidance for Work Visas, Student Visas, and Direct Job Placements across Germany, Singapore, Australia, UK, Canada, and the USA.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 pt-2">
              <button
                onClick={() => onOpenCounselling()}
                className="bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-700 hover:to-sky-600 text-white font-bold text-sm sm:text-base px-8 py-3.5 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 flex items-center space-x-2"
              >
                <span>Get Free Counselling</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <button
                onClick={() => onNavClick('careers')}
                className="bg-slate-800 hover:bg-slate-700 text-slate-100 font-semibold text-sm sm:text-base px-7 py-3.5 rounded-xl border border-slate-700 transition-colors flex items-center space-x-2"
              >
                <Briefcase className="w-5 h-5 text-sky-400" />
                <span>Explore Overseas Jobs</span>
              </button>
            </div>

            {/* Quick Stats Trust Banner */}
            <div className="pt-6 grid grid-cols-3 gap-4 border-t border-slate-800 text-slate-300 text-xs sm:text-sm">
              <div>
                <div className="text-xl sm:text-2xl font-black text-white">100%</div>
                <div className="text-slate-400 text-xs">Transparent Process</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-black text-sky-400">6+</div>
                <div className="text-slate-400 text-xs">Key Destination Hubs</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-black text-emerald-400">Ethical</div>
                <div className="text-slate-400 text-xs">Zero False Promises</div>
              </div>
            </div>
          </div>

          {/* Hero Right Student Studying Visual */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-slate-700/60 shadow-2xl group bg-slate-800">
              <img
                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80"
                alt="Student studying on laptop for overseas university admissions & visas"
                className="w-full h-[380px] sm:h-[440px] object-cover group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>

              {/* Floating Badge 1 - Top Right */}
              <div className="absolute top-4 right-4 bg-slate-900/90 backdrop-blur-md border border-slate-700/80 rounded-xl p-3 shadow-lg flex items-center space-x-2.5">
                <div className="w-8 h-8 rounded-lg bg-sky-500/20 text-sky-400 flex items-center justify-center font-bold text-lg">
                  🎓
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Global University Admissions</div>
                  <div className="text-[10px] text-sky-300 font-medium">Germany, UK, Aus, USA & SG</div>
                </div>
              </div>

              {/* Floating Badge 2 - Bottom Banner */}
              <div className="absolute bottom-4 left-4 right-4 bg-slate-900/90 backdrop-blur-md border border-slate-700/80 rounded-xl p-4 shadow-xl space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-400 flex items-center space-x-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Certified Overseas Education & Visa Advisory</span>
                  </span>
                  <span className="text-[10px] bg-sky-500/20 text-sky-300 px-2 py-0.5 rounded font-bold uppercase">100% Free Consultation</span>
                </div>
                <p className="text-xs text-slate-300 leading-snug">
                  Expert assistance for university shortlisting, SOP crafting, tuition-free public universities in Germany, and visa processing.
                </p>
                <div className="pt-1 flex items-center justify-between text-xs">
                  <span className="text-slate-400 text-[11px]">Direct Support: <a href="tel:+918019021039" className="text-sky-300 font-bold underline">+91 8019021039</a></span>
                  <button
                    onClick={() => onNavClick('student-visa')}
                    className="bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs px-3 py-1.5 rounded-lg transition-colors flex items-center space-x-1"
                  >
                    <span>Student Visa Guide</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Core Services Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Our Core Consultancy Services
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            End-to-end guidance tailored for professionals, students, and skilled migrants.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Work Visa */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 hover:border-blue-500 shadow-sm hover:shadow-lg transition-all group flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <Briefcase className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg text-slate-900">Work Visa Guidance</h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                EU Blue Cards, Chancenkarte (Germany), Employment Passes (Singapore), Subclass 482/189 (Australia), and UK Skilled Worker visas.
              </p>
            </div>
            <div className="pt-6 border-t border-slate-100 mt-4">
              <button
                onClick={() => onNavClick('work-visa')}
                className="text-blue-700 font-bold text-xs hover:text-blue-900 flex items-center space-x-1"
              >
                <span>Learn More & Eligibility</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Student Visa */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 hover:border-blue-500 shadow-sm hover:shadow-lg transition-all group flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-sky-50 text-sky-700 flex items-center justify-center group-hover:bg-sky-600 group-hover:text-white transition-colors">
                <GraduationCap className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg text-slate-900">Student Visa & Admissions</h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                University selection, SOP editing, tuition-free public university applications in Germany, scholarship guidance, and post-study work permits.
              </p>
            </div>
            <div className="pt-6 border-t border-slate-100 mt-4">
              <button
                onClick={() => onNavClick('student-visa')}
                className="text-blue-700 font-bold text-xs hover:text-blue-900 flex items-center space-x-1"
              >
                <span>Explore Universities & Visas</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Careers Abroad */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 hover:border-blue-500 shadow-sm hover:shadow-lg transition-all group flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                <Globe className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg text-slate-900">Careers Abroad</h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                Access curated overseas job openings with employer visa sponsorship across Germany, UK, Australia, Singapore, and Canada.
              </p>
            </div>
            <div className="pt-6 border-t border-slate-100 mt-4">
              <button
                onClick={() => onNavClick('careers')}
                className="text-blue-700 font-bold text-xs hover:text-blue-900 flex items-center space-x-1"
              >
                <span>View Job Openings</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Popular Destinations */}
      <section className="bg-slate-50 py-16 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="text-sky-700 font-bold text-xs uppercase tracking-wider mb-1">Top Destination Hubs</div>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900">Explore Overseas Pathways</h2>
            </div>
            <button
              onClick={() => onNavClick('countries')}
              className="text-blue-700 hover:text-blue-900 font-bold text-sm flex items-center space-x-1"
            >
              <span>View All Country Guides</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {INITIAL_COUNTRIES.map((country) => (
              <div
                key={country.id}
                className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-200 hover:shadow-xl transition-all group flex flex-col justify-between"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={country.coverImage}
                    alt={country.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
                  <div className="absolute bottom-3 left-4 right-4 flex justify-between items-end text-white">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl">{country.flag}</span>
                      <span className="font-extrabold text-xl">{country.name}</span>
                    </div>
                    <span className="text-xs bg-white/20 backdrop-blur-md px-2.5 py-1 rounded-md font-medium">
                      {country.processingTime}
                    </span>
                  </div>
                </div>

                <div className="p-5 space-y-3">
                  <p className="text-slate-600 text-xs sm:text-sm line-clamp-2 leading-relaxed">
                    {country.description}
                  </p>

                  <div className="space-y-1.5 pt-2 border-t border-slate-100 text-xs">
                    <div className="font-bold text-slate-800">Key Visas:</div>
                    <div className="flex flex-wrap gap-1">
                      {country.visaTypes.map((vt, idx) => (
                        <span key={idx} className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-medium text-[11px]">
                          {vt.title}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <button
                    onClick={() => onNavClick(`country-${country.id}`)}
                    className="w-full bg-slate-900 hover:bg-blue-700 text-white font-semibold text-xs py-2.5 rounded-lg transition-colors flex items-center justify-center space-x-1"
                  >
                    <span>Explore {country.name} Guide</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Featured Overseas Jobs Preview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="text-emerald-700 font-bold text-xs uppercase tracking-wider mb-1">Direct Visa Sponsorship Jobs</div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Featured Overseas Openings</h2>
          </div>
          <button
            onClick={() => onNavClick('careers')}
            className="text-blue-700 hover:text-blue-900 font-bold text-sm flex items-center space-x-1"
          >
            <span>Browse All Jobs</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {INITIAL_JOBS.slice(0, 3).map((job) => (
            <div
              key={job.id}
              className="bg-white rounded-2xl p-6 border border-slate-200 hover:border-blue-500 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex justify-between items-start">
                  <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md">
                    {job.country}
                  </span>
                  <span className="text-[11px] text-slate-500">{job.postedDate}</span>
                </div>

                <h3 className="font-bold text-slate-900 text-base leading-snug">{job.title}</h3>
                <div className="text-xs text-slate-500 font-medium">{job.company}</div>

                <div className="text-sm font-extrabold text-blue-900 bg-blue-50/80 p-2.5 rounded-lg">
                  {job.salary}
                </div>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {job.skills.slice(0, 3).map((sk, i) => (
                    <span key={i} className="bg-slate-100 text-slate-600 text-[11px] px-2 py-0.5 rounded">
                      {sk}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-5 mt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-sky-700 font-semibold">✓ Visa Sponsorship</span>
                <button
                  onClick={() => onSelectJob(job)}
                  className="bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs px-4 py-2 rounded-lg transition-colors"
                >
                  Apply Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Trust Standard Section */}
      <TrustStandardSection onOpenCounselling={() => onOpenCounselling()} />

      {/* 6. Why Choose Us */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900">Why Choose PAR CAREERS</h2>
          <p className="text-slate-600 text-sm">
            Professionalism, integrity, and candidate-centric support at every step.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
            <div className="w-10 h-10 bg-blue-700 text-white rounded-xl flex items-center justify-center font-bold text-lg">1</div>
            <h3 className="font-bold text-slate-900 text-base">Experienced Consultants</h3>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
              In-depth knowledge of evolving immigration laws across Germany, Australia, UK, Singapore, Canada, and USA.
            </p>
          </div>

          <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
            <div className="w-10 h-10 bg-blue-700 text-white rounded-xl flex items-center justify-center font-bold text-lg">2</div>
            <h3 className="font-bold text-slate-900 text-base">Transparent Process</h3>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
              Every document evaluation, fee structure, and timeline is shared in writing before formal agreement.
            </p>
          </div>

          <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
            <div className="w-10 h-10 bg-blue-700 text-white rounded-xl flex items-center justify-center font-bold text-lg">3</div>
            <h3 className="font-bold text-slate-900 text-base">Ethical Guidance</h3>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
              We never fabricate stats or make unrealistic guarantees. We deliver factual, government-aligned immigration support.
            </p>
          </div>
        </div>
      </section>

      {/* 7. Testimonials */}
      <section className="bg-slate-900 text-white py-16 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <div className="text-sky-400 font-bold text-xs uppercase tracking-wider">Candidate Success Stories</div>
            <h2 className="text-2xl sm:text-4xl font-extrabold">Verified Candidate Testimonials</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {INITIAL_TESTIMONIALS.map((t) => (
              <div key={t.id} className="bg-slate-800/80 p-6 rounded-2xl border border-slate-700 space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center space-x-1 text-amber-400">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-slate-300 text-xs sm:text-sm italic leading-relaxed">
                    "{t.text}"
                  </p>
                </div>

                <div className="flex items-center space-x-3 pt-4 border-t border-slate-700">
                  <img src={t.photoUrl} alt={t.name} className="w-10 h-10 rounded-full object-cover border border-slate-600" />
                  <div>
                    <div className="font-bold text-white text-sm">{t.name}</div>
                    <div className="text-[11px] text-sky-400 font-medium">{t.visaType} • {t.country}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Call to Action Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-sky-700 text-white rounded-3xl p-8 sm:p-12 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-2xl text-center lg:text-left">
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight">Ready to Take Your Overseas Career Forward?</h2>
            <p className="text-sky-100 text-sm sm:text-base">
              Schedule a confidential 1-on-1 profile assessment with PAR CAREERS senior counselors.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
            <button
              onClick={() => onOpenCounselling()}
              className="bg-white hover:bg-slate-100 text-blue-900 font-extrabold text-sm px-8 py-3.5 rounded-xl shadow-lg transition-colors text-center"
            >
              Get Free Counselling
            </button>
            <a
              href="tel:+918019021039"
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm px-6 py-3.5 rounded-xl transition-colors flex items-center justify-center space-x-2"
            >
              <Phone className="w-4 h-4" />
              <span>Call +91 8019021039</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
