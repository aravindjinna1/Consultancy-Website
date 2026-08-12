import React, { useState } from 'react';
import { INITIAL_BLOGS } from '../data/initialData';
import { Blog } from '../types';
import { Calendar, User, Clock, ArrowRight, Tag } from 'lucide-react';

interface BlogsPageProps {
  onSelectBlog: (blog: Blog) => void;
}

export const BlogsPage: React.FC<BlogsPageProps> = ({ onSelectBlog }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Work Visa', 'Student Visa', 'Immigration Policy'];

  const filteredBlogs = INITIAL_BLOGS.filter(b => selectedCategory === 'All' || b.category === selectedCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12 space-y-10 animate-fadeIn">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-900 to-slate-950 text-white p-8 sm:p-12 rounded-3xl shadow-xl space-y-3">
        <h1 className="text-3xl sm:text-5xl font-black tracking-tight">Immigration Insights & Blogs</h1>
        <p className="text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed">
          Stay informed on Germany Chancenkarte updates, UK Skilled Worker salary thresholds, Australia points draws, and student visa regulations.
        </p>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
              selectedCategory === cat ? 'bg-blue-700 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Blog Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredBlogs.map(blog => (
          <div
            key={blog.id}
            onClick={() => onSelectBlog(blog)}
            className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="relative h-48 overflow-hidden">
                <img
                  src={blog.imageUrl}
                  alt={blog.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 bg-blue-900/90 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md backdrop-blur-md">
                  {blog.category}
                </span>
              </div>

              <div className="p-6 space-y-3">
                <div className="flex items-center space-x-3 text-xs text-slate-400">
                  <span className="flex items-center space-x-1">
                    <Calendar className="w-3.5 h-3.5 text-sky-600" />
                    <span>{blog.date}</span>
                  </span>
                  <span>•</span>
                  <span className="flex items-center space-x-1">
                    <Clock className="w-3.5 h-3.5 text-sky-600" />
                    <span>{blog.readTime}</span>
                  </span>
                </div>

                <h3 className="font-bold text-slate-900 text-base leading-snug group-hover:text-blue-700 transition-colors">
                  {blog.title}
                </h3>

                <p className="text-slate-600 text-xs line-clamp-3 leading-relaxed">
                  {blog.excerpt}
                </p>
              </div>
            </div>

            <div className="p-6 pt-0 flex items-center justify-between text-xs font-bold text-blue-700 border-t border-slate-100 mt-2">
              <span>Read Article</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
