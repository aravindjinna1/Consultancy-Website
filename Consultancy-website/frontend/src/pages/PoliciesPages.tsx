import React from 'react';
import { ShieldCheck, FileText } from 'lucide-react';

interface PoliciesPagesProps {
  type: 'privacy' | 'refund' | 'terms';
}

export const PoliciesPages: React.FC<PoliciesPagesProps> = ({ type }) => {
  const contentMap = {
    privacy: {
      title: 'Privacy Policy',
      subtitle: 'How PAR CAREERS AND VISA CONSULTANCY SERVICES collects, protects, and handles your personal data.',
      body: [
        'PAR CAREERS AND VISA CONSULTANCY SERVICES ("we", "our", "us") respects applicant privacy and is committed to protecting personal data submitted through our website and consultancy desks.',
        '1. Information We Collect: Full name, contact details (email, phone, address), educational qualifications, work experience records, passport data, and payment verification details.',
        '2. Use of Information: Data collected is used solely for evaluating visa eligibility, processing university applications, submitting job petitions to verified overseas employers, and communicating updates.',
        '3. Confidentiality: We strictly do not sell, rent, or trade candidate personal data to third-party marketing companies. Data is shared exclusively with authorized embassies, credential evaluation bodies (Anabin, WES, ACS), and verified employers with candidate consent.',
        '4. Security: All candidate profile records are protected with industry-standard encryption and secure database access protocols.'
      ]
    },
    refund: {
      title: 'Refund & Cancellation Policy',
      subtitle: 'Clear, transparent guidelines regarding consultancy retainers and milestone payments.',
      body: [
        'In alignment with our Trust Standard, PAR CAREERS maintains a transparent written agreement for all advisory services.',
        '1. Evaluation Retainers: Profile evaluation and document auditing fees are non-refundable once initial analysis reports have been compiled.',
        '2. Milestone Refunds: If PAR CAREERS fails to deliver agreed contractual document filing milestones due to internal oversight, milestone refunds will be processed as specified in the signed service agreement.',
        '3. Sovereign Embassy Decisions: Embassy visa fees, government filing charges, VFS appointment costs, and credential evaluation fees (WES/ACS) paid directly to external authorities are non-refundable by those respective bodies.',
        '4. Disagreements & Escalations: Candidates can request concern resolution directly by emailing Ardigitalstudio05@gmail.com or calling +91 95331 20230.'
      ]
    },
    terms: {
      title: 'Terms & Conditions',
      subtitle: 'General terms of website usage and consultancy engagement.',
      body: [
        'By accessing or utilizing the services of PAR CAREERS AND VISA CONSULTANCY SERVICES (+91 95331 20230), you agree to comply with the following terms:',
        '1. Scope of Service: We provide expert documentation assistance, job petition guidance, university application support, and visa interview coaching. Final visa issuance decisions rest solely with sovereign government embassies.',
        '2. Candidate Obligations: Applicants must provide genuine, non-fraudulent academic transcripts, work experience certificates, and financial proof.',
        '3. Intellectual Property: All content, guides, and materials on this platform are owned by PAR CAREERS AND VISA CONSULTANCY SERVICES.',
        '4. Jurisdiction: All agreements are governed in accordance with applicable laws in India.'
      ]
    }
  };

  const currentPolicy = contentMap[type];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-8 py-12 space-y-8 animate-fadeIn">
      <div className="bg-slate-900 text-white p-8 sm:p-12 rounded-3xl shadow-xl space-y-3">
        <div className="inline-flex items-center space-x-2 bg-blue-500/20 text-sky-300 text-xs px-3 py-1 rounded-full font-bold uppercase">
          <ShieldCheck className="w-4 h-4 text-sky-400" />
          <span>PAR CAREERS Legal Compliance</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black">{currentPolicy.title}</h1>
        <p className="text-slate-300 text-sm">{currentPolicy.subtitle}</p>
      </div>

      <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6 text-slate-700 text-sm leading-relaxed">
        {currentPolicy.body.map((para, i) => (
          <p key={i}>{para}</p>
        ))}

        <div className="pt-6 border-t border-slate-100 text-xs text-slate-500">
          For questions regarding policy terms, contact our senior team at <a href="mailto:Ardigitalstudio05@gmail.com" className="text-blue-700 font-bold underline">Ardigitalstudio05@gmail.com</a> or Call/WhatsApp <a href="tel:+919533120230" className="text-blue-700 font-bold underline">+91 95331 20230</a>.
        </div>
      </div>
    </div>
  );
};
