import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { apiFetch } from '../services/api';
import { JobApplication, CounsellingRequest } from '../types';
import { User, Briefcase, FileText, CheckCircle2, Clock, AlertCircle } from 'lucide-react';

export const UserDashboardPage: React.FC = () => {
  const { user } = useAuth();
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      apiFetch(`/applications/user/${user.email}`)
        .then(res => setApplications(res.data || []))
        .catch(err => console.error(err))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [user]);

  if (!user) {
    return (
      <div className="max-w-md mx-auto my-16 text-center bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <User className="w-12 h-12 text-slate-400 mx-auto" />
        <h2 className="text-xl font-bold text-slate-800">Please Sign In</h2>
        <p className="text-slate-500 text-xs">Sign in to view your candidate applications and document tracking status.</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12 space-y-8 animate-fadeIn">
      {/* Profile Header */}
      <div className="bg-slate-900 text-white p-6 sm:p-8 rounded-3xl shadow-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center space-x-4">
          <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-sky-400 rounded-2xl flex items-center justify-center font-black text-2xl text-white shadow-lg">
            {user.name[0]}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">{user.name}</h1>
            <p className="text-xs text-slate-400">{user.email} • {user.phone || 'No phone'}</p>
            <span className="inline-block bg-sky-500/20 text-sky-300 text-[10px] font-bold uppercase px-2 py-0.5 rounded mt-1">
              Candidate Account
            </span>
          </div>
        </div>

        <div className="bg-slate-800 p-3 rounded-xl border border-slate-700 text-xs space-y-1">
          <div className="text-slate-400">Total Applications Submitted:</div>
          <div className="text-xl font-extrabold text-sky-400">{applications.length}</div>
        </div>
      </div>

      {/* Applications Track */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
        <h2 className="text-xl font-bold text-slate-900 flex items-center space-x-2">
          <Briefcase className="w-5 h-5 text-blue-700" />
          <span>My Overseas Job Applications</span>
        </h2>

        {loading ? (
          <div className="text-center py-8 text-slate-500 text-xs">Loading application records...</div>
        ) : applications.length === 0 ? (
          <div className="bg-slate-50 p-8 text-center rounded-xl border border-slate-200 space-y-2">
            <Clock className="w-10 h-10 text-slate-300 mx-auto" />
            <h3 className="font-bold text-slate-700 text-sm">No Applications Submitted Yet</h3>
            <p className="text-slate-500 text-xs max-w-sm mx-auto">
              Browse our Careers Abroad directory to apply for positions in Germany, Singapore, Australia, UK, Canada, and USA.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {applications.map(app => (
              <div key={app.id} className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">{app.jobTitle}</h3>
                  <div className="text-xs text-slate-500 mt-0.5">
                    {app.company} • {app.country} • Submitted on {new Date(app.createdAt).toLocaleDateString()}
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <span className={`text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider ${
                    app.status === 'under_review' ? 'bg-amber-100 text-amber-800' :
                    app.status === 'shortlisted' ? 'bg-blue-100 text-blue-800' :
                    app.status === 'accepted' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-700'
                  }`}>
                    {(app.status || '').replace('_', ' ')}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
