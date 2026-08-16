import React, { useState } from 'react';
import { Phone, Mail, MessageSquare, MapPin, Send, CheckCircle2, AlertCircle, Loader2, Clock, Instagram, Linkedin } from 'lucide-react';
import { submitContactForm } from '../services/api';

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Inquiry',
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await submitContactForm(formData);
      setSuccess(true);
      setFormData({ name: '', email: '', phone: '', subject: 'General Inquiry', message: '' });
    } catch (err: any) {
      setError(err.message || 'Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12 space-y-12 animate-fadeIn">
      {/* Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-900 to-slate-950 text-white p-8 sm:p-12 rounded-3xl shadow-xl space-y-4">
        <h1 className="text-3xl sm:text-5xl font-black tracking-tight">Contact Our Advisory Desk</h1>
        <p className="text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed">
          Have questions about Germany Chancenkarte, Singapore Employment Pass, Australia PR, UK Skilled Worker, or Student Visas? Reach out to our senior team directly.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Contact Form */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
          <h2 className="text-2xl font-bold text-slate-900">Send an Online Message</h2>

          {success ? (
            <div className="bg-emerald-50 border border-emerald-200 p-6 rounded-2xl text-center space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
              <h3 className="font-bold text-lg text-slate-900">Message Delivered!</h3>
              <p className="text-slate-600 text-xs sm:text-sm">
                Your inquiry has been sent to our desk (<strong className="text-blue-700">parvisaandcareer94@gmail.com</strong>). We will respond within 24 business hours.
              </p>
              <button
                onClick={() => setSuccess(false)}
                className="text-xs text-blue-700 font-bold hover:underline"
              >
                Send Another Inquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="bg-red-50 text-red-700 text-xs p-3 rounded-lg flex items-center space-x-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ravi Yadav"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-sm text-slate-900 focus:outline-none focus:border-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-sm text-slate-900 focus:outline-none focus:border-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    placeholder="+91 8019021039"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-sm text-slate-900 focus:outline-none focus:border-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Inquiry Subject</label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-sm text-slate-900 focus:outline-none focus:border-blue-600 font-medium"
                  >
                    <option value="Work Visa Inquiry">Work Visa Inquiry</option>
                    <option value="Student Admission & Visa">Student Admission & Visa</option>
                    <option value="Overseas Career Job Opening">Overseas Career Job Opening</option>
                    <option value="General Inquiry">General Inquiry</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Message *</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Type your message or query details..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-sm text-slate-900 focus:outline-none focus:border-blue-600"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="bg-blue-700 hover:bg-blue-800 text-white font-bold text-sm px-7 py-3 rounded-xl transition-colors flex items-center space-x-2 disabled:opacity-50"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                <span>Send Contact Message</span>
              </button>
            </form>
          )}
        </div>

        {/* Contact Details & Map */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-slate-900 text-white p-6 rounded-2xl space-y-4 shadow-md">
            <h3 className="font-bold text-lg text-white border-b border-slate-800 pb-2">Direct Contact Details</h3>

            <div className="space-y-3 text-sm text-slate-300">
              <a href="tel:+918019021039" className="flex items-start space-x-3 hover:text-sky-400 transition-colors">
                <Phone className="w-5 h-5 text-sky-400 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs text-slate-400">Phone Consultation:</div>
                  <div className="font-bold text-white text-base">+91 8019021039</div>
                </div>
              </a>

              <a href="https://wa.me/918019021039" target="_blank" rel="noopener noreferrer" className="flex items-start space-x-3 hover:text-emerald-400 transition-colors">
                <MessageSquare className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs text-slate-400">WhatsApp Desk:</div>
                  <div className="font-bold text-emerald-400 text-base">+91 8019021039</div>
                </div>
              </a>

              <a href="mailto:parvisaandcareer94@gmail.com" className="flex items-start space-x-3 hover:text-sky-400 transition-colors">
                <Mail className="w-5 h-5 text-sky-400 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs text-slate-400">Official Desk Email:</div>
                  <div className="font-bold text-white text-sm">parvisaandcareer94@gmail.com</div>
                </div>
              </a>

              <div className="flex items-start space-x-3 pt-2">
                <Clock className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs text-slate-400">Office Working Hours:</div>
                  <div className="font-medium text-white text-xs">Monday – Saturday: 9:30 AM – 7:00 PM IST</div>
                </div>
              </div>
            </div>

            {/* Social Channels */}
            <div className="pt-4 border-t border-slate-800">
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Connect via Social Media</div>
              <div className="grid grid-cols-3 gap-2">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-slate-800 hover:bg-slate-700 text-slate-200 p-2.5 rounded-xl text-xs font-bold flex items-center justify-center space-x-1.5 transition-colors"
                >
                  <Instagram className="w-4 h-4 text-pink-400" />
                  <span>Instagram</span>
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-slate-800 hover:bg-slate-700 text-slate-200 p-2.5 rounded-xl text-xs font-bold flex items-center justify-center space-x-1.5 transition-colors"
                >
                  <Linkedin className="w-4 h-4 text-sky-400" />
                  <span>LinkedIn</span>
                </a>
                <a
                  href="https://wa.me/918019021039"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-slate-800 hover:bg-slate-700 text-slate-200 p-2.5 rounded-xl text-xs font-bold flex items-center justify-center space-x-1.5 transition-colors"
                >
                  <MessageSquare className="w-4 h-4 text-emerald-400" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          </div>

          {/* Google Maps View */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-2">
            <div className="flex items-center space-x-2 font-bold text-slate-800 text-xs">
              <MapPin className="w-4 h-4 text-blue-700" />
              <span>Office Location Map</span>
            </div>

            <div className="w-full h-48 bg-slate-100 rounded-xl overflow-hidden relative border border-slate-200 flex items-center justify-center text-center p-4">
              <iframe
                title="PAR CAREERS Location Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.495014382583!2d78.474441314877!3d17.385044000000003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTfCsDIzJzA2LjIiTiA3OMKwMjgnMzUuOSJF!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin"
                className="w-full h-full border-0 rounded-lg"
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
