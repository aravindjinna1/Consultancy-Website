import React from 'react';
import { ShieldCheck, Scale, FileText, CheckCircle, HeartHandshake, HelpCircle, PhoneCall, Award } from 'lucide-react';

interface TrustStandardSectionProps {
  onOpenCounselling: () => void;
  fullPage?: boolean;
}

export const TrustStandardSection: React.FC<TrustStandardSectionProps> = ({ onOpenCounselling, fullPage = false }) => {
  const trustPromises = [
    {
      title: '100% Transparent Fee Structure',
      desc: 'No hidden charges, retroactive fees, or unverified surprise costs. Clear written contracts from day one.',
      icon: Scale
    },
    {
      title: 'Zero Unrealistic Job/Visa Guarantees',
      desc: 'We strictly adhere to international migration ethics. Visas are granted by sovereign governments; we ensure 100% accurate petition documentation.',
      icon: ShieldCheck
    },
    {
      title: 'Direct Verified University & Employer Match',
      desc: 'All partner institutions, university admissions, and overseas job sponsors are verified for official accreditation.',
      icon: CheckCircle
    },
    {
      title: 'Dedicated 1-on-1 Senior Consultant',
      desc: 'Single point of contact from initial profile assessment through flight departure and post-landing orientation.',
      icon: HeartHandshake
    },
    {
      title: 'Prompt Concern Resolution Protocol',
      desc: 'Escalate any query directly to senior management (+91 8019021039 / parvisaandcareer94@gmail.com) with guaranteed 24-hour response.',
      icon: FileText
    }
  ];

  const faqs = [
    {
      q: 'Does PAR CAREERS guarantee visa approval?',
      a: 'No ethical agency can legally guarantee visa issuance because sovereign embassies make final decisions. However, our meticulous documentation verification minimizes rejection risks.'
    },
    {
      q: 'How are consulting fees structured?',
      a: 'We provide a clear written schedule of fees prior to agreement. Payments are milestone-based, giving you full control and transparency.'
    },
    {
      q: 'Can I verify the status of my application anytime?',
      a: 'Yes! Our candidates can contact their assigned counselor at +91 8019021039 or log into our dashboard to view real-time document tracking.'
    }
  ];

  return (
    <section className={`py-16 ${fullPage ? 'bg-slate-50' : 'bg-white'} border-y border-slate-100`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center space-x-2 bg-blue-50 text-blue-800 border border-blue-200 text-xs px-3 py-1.5 rounded-full font-bold uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-blue-700" />
            <span>The PAR CAREERS Trust Standard</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Ethical Guidance. Complete Transparency. Unmatched Quality.
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            In an industry often clouded by false promises, PAR CAREERS AND VISA CONSULTANCY SERVICES stands firm on uncompromising ethics, factual clarity, and personalized candidate success.
          </p>
        </div>

        {/* 5 Trust Promises Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trustPromises.map((p, idx) => {
            const Icon = p.icon;
            return (
              <div
                key={idx}
                className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:border-blue-500 hover:shadow-md transition-all group"
              >
                <div className="w-12 h-12 bg-blue-50 text-blue-700 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-slate-900 text-base mb-2">{p.title}</h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">{p.desc}</p>
              </div>
            );
          })}

          {/* Call-to-action Card */}
          <div className="bg-gradient-to-br from-blue-900 to-sky-800 text-white p-6 rounded-2xl shadow-md flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center mb-3">
                <Award className="w-6 h-6 text-sky-300" />
              </div>
              <h3 className="font-bold text-lg mb-2">Speak to Senior Counsel</h3>
              <p className="text-sky-100 text-xs leading-relaxed">
                Direct phone line for candidates seeking honest, zero-pressure profile assessment.
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-white/10">
              <div className="text-xs text-sky-200 mb-2">Direct Phone / WhatsApp:</div>
              <a
                href="tel:+918019021039"
                className="font-extrabold text-white text-base hover:text-sky-300 transition-colors flex items-center space-x-2"
              >
                <PhoneCall className="w-4 h-4 text-emerald-400" />
                <span>+91 8019021039</span>
              </a>
            </div>
          </div>
        </div>

        {/* FAQ Accordion Preview */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm max-w-4xl mx-auto space-y-6">
          <div className="flex items-center space-x-2 text-slate-900 font-bold text-lg border-b border-slate-100 pb-3">
            <HelpCircle className="w-5 h-5 text-blue-700" />
            <span>Trust Standard FAQs</span>
          </div>

          <div className="space-y-4">
            {faqs.map((f, i) => (
              <div key={i} className="bg-slate-50 p-4 rounded-xl">
                <h4 className="font-bold text-slate-900 text-sm mb-1">{f.q}</h4>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">{f.a}</p>
              </div>
            ))}
          </div>

          <div className="text-center pt-2">
            <button
              onClick={onOpenCounselling}
              className="bg-blue-700 hover:bg-blue-800 text-white font-semibold text-xs sm:text-sm px-6 py-3 rounded-xl shadow-md hover:shadow-lg transition-all"
            >
              Request Free Consultation Under Trust Standard
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
