import React from 'react';
import { Phone, Mail, Linkedin, ArrowUpRight, Code2, Sparkles } from 'lucide-react';

export const ArvioAttribution: React.FC = () => {
  return (
    <section 
      id="arvio-agency-attribution"
      aria-label="Agency Attribution & Tech Services by Arvio Infotech"
      className="max-w-7xl mx-auto px-4 sm:px-8 mt-12 mb-4"
    >
      <div className="relative overflow-hidden bg-gradient-to-br from-orange-50/90 via-amber-50/50 to-orange-100/40 border border-orange-200/90 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-sm transition-all duration-300">
        {/* Subtle decorative background glow */}
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-orange-400/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
          {/* Left Column: Heading, Subheading, Services & Supporting Text */}
          <div className="space-y-3.5 text-center lg:text-left max-w-2xl">
            {/* Top Subheading Badge */}
            <div className="inline-flex items-center space-x-2 bg-orange-100/80 text-orange-800 border border-orange-300/70 text-xs font-semibold px-3 py-1 rounded-full shadow-xs">
              <Code2 className="w-3.5 h-3.5 text-orange-600" />
              <span>Web &amp; Software Development Agency</span>
            </div>

            {/* Main Heading */}
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
              Designed, Developed &amp; Maintained by{' '}
              <span className="text-orange-600 underline decoration-orange-300 decoration-2 underline-offset-4">
                Arvio Infotech
              </span>
            </h2>

            {/* Short Service Description */}
            <p className="text-xs sm:text-sm font-medium text-slate-700">
              <span className="font-bold text-orange-950">Websites</span> •{' '}
              <span className="font-bold text-orange-950">Web Apps</span> •{' '}
              <span className="font-bold text-orange-950">E-commerce</span> •{' '}
              <span className="font-bold text-orange-950">AI Solutions</span> •{' '}
              <span className="font-bold text-orange-950">Automation</span>
            </p>

            {/* Supporting Text */}
            <p className="text-xs sm:text-sm text-slate-600 flex items-center justify-center lg:justify-start gap-1.5 font-medium">
              <Sparkles className="w-4 h-4 text-orange-500 flex-shrink-0" />
              <span>Have a project or business requirement? Let&apos;s build it.</span>
            </p>
          </div>

          {/* Right Column: Interactive Contacts & CTA */}
          <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row items-center gap-4 w-full lg:w-auto justify-center lg:justify-end">
            {/* Quick Contact Links Group */}
            <div className="flex flex-wrap items-center justify-center gap-2.5">
              {/* Phone Link */}
              <a
                href="tel:+918106023616"
                id="arvio-phone-contact"
                className="inline-flex items-center space-x-1.5 bg-white hover:bg-orange-50 text-slate-700 hover:text-orange-700 px-3.5 py-2 rounded-xl text-xs font-semibold border border-orange-200 shadow-xs transition-colors"
                title="Call Arvio Infotech"
              >
                <Phone className="w-3.5 h-3.5 text-orange-600" />
                <span>+91 8106023616</span>
              </a>

              {/* WhatsApp Link */}
              <a
                href="https://wa.me/918106023616"
                target="_blank"
                rel="noopener noreferrer"
                id="arvio-whatsapp-contact"
                className="inline-flex items-center space-x-1.5 bg-white hover:bg-emerald-50 text-slate-700 hover:text-emerald-700 px-3.5 py-2 rounded-xl text-xs font-semibold border border-orange-200 hover:border-emerald-300 shadow-xs transition-colors"
                title="WhatsApp Arvio Infotech"
              >
                {/* WhatsApp SVG Icon */}
                <svg
                  className="w-3.5 h-3.5 fill-emerald-600 flex-shrink-0"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                </svg>
                <span>+91 8106023616</span>
              </a>

              {/* Email Link */}
              <a
                href="mailto:aravindjinna1@gmail.com"
                id="arvio-email-contact"
                className="inline-flex items-center space-x-1.5 bg-white hover:bg-orange-50 text-slate-700 hover:text-orange-700 px-3.5 py-2 rounded-xl text-xs font-semibold border border-orange-200 shadow-xs transition-colors"
                title="Email Arvio Infotech"
              >
                <Mail className="w-3.5 h-3.5 text-orange-600" />
                <span>aravindjinna1@gmail.com</span>
              </a>

              {/* LinkedIn Icon Link */}
              <a
                href="https://www.linkedin.com/company/arvio-infotech/"
                target="_blank"
                rel="noopener noreferrer"
                id="arvio-linkedin-contact"
                className="w-8 h-8 flex items-center justify-center bg-white hover:bg-blue-50 text-slate-700 hover:text-blue-600 rounded-xl border border-orange-200 hover:border-blue-300 shadow-xs transition-all"
                aria-label="Arvio Infotech on LinkedIn"
                title="Arvio Infotech on LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>

            {/* CTA Button: Discuss Your Project */}
            <a
              href="https://wa.me/918106023616"
              target="_blank"
              rel="noopener noreferrer"
              id="arvio-discuss-project-cta"
              className="inline-flex items-center justify-center space-x-2 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white text-xs sm:text-sm font-bold px-5 py-2.5 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 flex-shrink-0 group w-full sm:w-auto text-center"
            >
              <span>Discuss Your Project</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
