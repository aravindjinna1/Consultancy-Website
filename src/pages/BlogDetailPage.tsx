import React from 'react';
import { Blog } from '../types';
import { Calendar, User, Clock, ArrowLeft, Share2 } from 'lucide-react';

interface BlogDetailPageProps {
  blog: Blog;
  onBack: () => void;
  onOpenCounselling: () => void;
}

export const BlogDetailPage: React.FC<BlogDetailPageProps> = ({ blog, onBack, onOpenCounselling }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-8 py-12 space-y-8 animate-fadeIn">
      <button
        onClick={onBack}
        className="text-xs font-bold text-blue-700 hover:text-blue-900 flex items-center space-x-1"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to All Blogs</span>
      </button>

      <div className="space-y-4">
        <span className="bg-blue-100 text-blue-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
          {blog.category}
        </span>

        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 leading-tight">
          {blog.title}
        </h1>

        <div className="flex items-center space-x-4 text-xs text-slate-500 pb-4 border-b border-slate-100">
          <span className="flex items-center space-x-1">
            <User className="w-4 h-4 text-blue-700" />
            <span>{blog.author}</span>
          </span>
          <span>•</span>
          <span className="flex items-center space-x-1">
            <Calendar className="w-4 h-4 text-blue-700" />
            <span>{blog.date}</span>
          </span>
          <span>•</span>
          <span className="flex items-center space-x-1">
            <Clock className="w-4 h-4 text-blue-700" />
            <span>{blog.readTime}</span>
          </span>
        </div>
      </div>

      <div className="rounded-2xl overflow-hidden shadow-md">
        <img src={blog.imageUrl} alt={blog.title} className="w-full h-80 object-cover" />
      </div>

      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm text-slate-700 text-sm sm:text-base leading-relaxed space-y-4">
        <p className="font-semibold text-slate-900 text-lg">{blog.excerpt}</p>
        <div className="whitespace-pre-line text-slate-600 leading-relaxed">{blog.content}</div>
      </div>

      <div className="bg-gradient-to-r from-blue-900 to-sky-800 text-white p-8 rounded-2xl shadow-lg text-center space-y-4">
        <h3 className="text-xl font-bold">Have Questions About This Visa Category?</h3>
        <p className="text-xs sm:text-sm text-sky-100 max-w-xl mx-auto">
          Get direct clarity on eligibility, document attestation, and university admission deadlines.
        </p>
        <button
          onClick={onOpenCounselling}
          className="bg-white text-blue-900 font-extrabold text-xs sm:text-sm px-6 py-3 rounded-xl shadow hover:bg-slate-100 transition-colors"
        >
          Request Free Profile Review
        </button>
      </div>
    </div>
  );
};
