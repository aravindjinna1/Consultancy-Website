import React from 'react';
import { INITIAL_NEWS } from '../data/initialData';
import { Newspaper, Calendar, ArrowRight } from 'lucide-react';

export const NewsPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12 space-y-10 animate-fadeIn">
      <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white p-8 sm:p-12 rounded-3xl shadow-xl space-y-3">
        <h1 className="text-3xl sm:text-5xl font-black tracking-tight">Latest Overseas News & Draws</h1>
        <p className="text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed">
          Real-time news updates on immigration policy amendments, consular processing timelines, and overseas recruitment drives.
        </p>
      </div>

      <div className="space-y-6">
        {INITIAL_NEWS.map(news => (
          <div key={news.id} className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <div className="flex items-center space-x-3 text-xs text-sky-700 font-bold">
              <span className="bg-sky-50 px-2.5 py-1 rounded-md">{news.category}</span>
              <span>•</span>
              <span className="text-slate-400 font-normal">{news.date}</span>
              <span>•</span>
              <span className="text-slate-500 font-medium">Source: {news.source}</span>
            </div>

            <h2 className="text-xl font-bold text-slate-900">{news.title}</h2>
            <p className="text-slate-600 text-sm leading-relaxed">{news.excerpt}</p>
            <div className="bg-slate-50 p-4 rounded-xl text-xs text-slate-700 leading-relaxed border border-slate-100">
              {news.content}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
