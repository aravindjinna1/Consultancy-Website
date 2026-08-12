import React from 'react';
import { Compass, ArrowLeft } from 'lucide-react';

interface NotFoundPageProps {
  onNavClick: (tab: string) => void;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({ onNavClick }) => {
  return (
    <div className="max-w-md mx-auto my-20 text-center bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4 animate-fadeIn">
      <Compass className="w-16 h-16 text-blue-700 mx-auto animate-spin" style={{ animationDuration: '10s' }} />
      <h1 className="text-3xl font-black text-slate-900">404 - Page Not Found</h1>
      <p className="text-slate-600 text-xs sm:text-sm">
        The requested page or country guide could not be located in our directory.
      </p>
      <button
        onClick={() => onNavClick('home')}
        className="bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs px-6 py-3 rounded-xl transition-colors inline-flex items-center space-x-2"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Return to Home</span>
      </button>
    </div>
  );
};
