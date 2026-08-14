import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import {
  fetchAdminStats,
  fetchAdminCounsellingRequests,
  updateCounsellingStatus,
  fetchAdminApplications,
  updateApplicationStatus,
  fetchAdminContacts,
  createJob,
  deleteJob,
  fetchJobs
} from '../services/api';
import { CounsellingRequest, JobApplication, ContactMessage, Job } from '../types';
import {
  ShieldCheck, Users, Briefcase, FileText, Download, Plus, Trash2, CheckCircle2,
  Clock, AlertCircle, RefreshCw, Eye, X, Filter
} from 'lucide-react';

export const AdminDashboardPage: React.FC = () => {
  const { user, isAdmin, token } = useAuth();
  const [activeTab, setActiveTab] = useState<'overview' | 'counselling' | 'applications' | 'jobs' | 'contacts'>('overview');

  const [stats, setStats] = useState<any>(null);
  const [counsellingList, setCounsellingList] = useState<CounsellingRequest[]>([]);
  const [applicationsList, setApplicationsList] = useState<JobApplication[]>([]);
  const [contactsList, setContactsList] = useState<ContactMessage[]>([]);
  const [jobsList, setJobsList] = useState<Job[]>([]);

  // Database Connection Inspector & Config State
  const [dbStatus, setDbStatus] = useState<any>(null);
  const [customUriInput, setCustomUriInput] = useState('');
  const [isUpdatingDb, setIsUpdatingDb] = useState(false);
  const [dbNotice, setDbNotice] = useState<string | null>(null);

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // New Job Modal State
  const [isNewJobOpen, setIsNewJobOpen] = useState(false);
  const [newJobData, setNewJobData] = useState({
    title: '',
    company: '',
    country: 'Germany',
    category: 'Information Technology',
    salary: '$70,000 - $85,000 / year',
    employmentType: 'Full-Time',
    experience: '3 - 5 Years',
    education: 'Bachelor Degree',
    skills: 'React, Node.js, TypeScript',
    visaSponsorship: true,
    description: '',
    requirements: ''
  });

  // Selected Application Detail View
  const [viewApp, setViewApp] = useState<JobApplication | null>(null);

  const loadData = async () => {
    setRefreshing(true);
    try {
      const [sRes, cRes, aRes, cntRes, jRes] = await Promise.all([
        fetchAdminStats(),
        fetchAdminCounsellingRequests(),
        fetchAdminApplications(),
        fetchAdminContacts(),
        fetchJobs()
      ]);

      setStats(sRes.stats);
      setCounsellingList(cRes.data || []);
      setApplicationsList(aRes.data || []);
      setContactsList(cntRes.data || []);
      setJobsList(jRes.data || []);

      // Fetch Live Database Status & Config
      try {
        const token = localStorage.getItem('par_auth_token');
        const dbRes = await fetch('/api/admin/db-status', {
          headers: { Authorization: `Bearer ${token}` }
        });
        const dbJson = await dbRes.json();
        if (dbJson.success) {
          setDbStatus(dbJson.data);
          if (dbJson.data.currentUri) {
            setCustomUriInput(dbJson.data.currentUri);
          }
        }
      } catch (e) {}
    } catch (err) {
      console.error('[Admin Load Error]', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleUpdateDatabaseUri = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customUriInput.trim()) return;
    setIsUpdatingDb(true);
    setDbNotice(null);
    try {
      const token = localStorage.getItem('par_auth_token');
      const res = await fetch('/api/admin/update-db-uri', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ uri: customUriInput.trim() })
      });
      const data = await res.json();
      if (data.success) {
        setDbNotice('✅ ' + data.message);
        loadData();
      } else {
        setDbNotice('❌ ' + (data.message || 'Failed connecting to database'));
      }
    } catch (err: any) {
      setDbNotice('❌ Connection request failed: ' + err.message);
    } finally {
      setIsUpdatingDb(false);
    }
  };

  useEffect(() => {
    if (isAdmin) {
      loadData();
    }
  }, [isAdmin]);

  if (!isAdmin) {
    return (
      <div className="max-w-md mx-auto my-16 text-center bg-white p-8 rounded-2xl border border-red-200 shadow-sm space-y-4">
        <ShieldCheck className="w-12 h-12 text-red-500 mx-auto" />
        <h2 className="text-xl font-bold text-slate-900">Access Denied</h2>
        <p className="text-slate-600 text-xs">
          You do not have administrative privileges. Admin access requires allow-list OTP verification (<span className="font-semibold text-blue-700">Ardigitalstudio05@gmail.com</span>).
        </p>
      </div>
    );
  }

  const handleCounsellingStatusUpdate = async (id: string, newStatus: string) => {
    await updateCounsellingStatus(id, newStatus);
    setCounsellingList(prev => prev.map(c => c.id === id ? { ...c, status: newStatus as any } : c));
  };

  const handleApplicationStatusUpdate = async (id: string, newStatus: string) => {
    await updateApplicationStatus(id, newStatus);
    setApplicationsList(prev => prev.map(a => a.id === id ? { ...a, status: newStatus as any } : a));
    if (viewApp && viewApp.id === id) {
      setViewApp({ ...viewApp, status: newStatus as any });
    }
  };

  const handleCreateJobSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const skillsArray = (newJobData.skills || '').split(',').map(s => s.trim()).filter(Boolean);
    const reqsArray = (newJobData.requirements || '').split('\n').filter(Boolean);

    await createJob({
      title: newJobData.title,
      company: newJobData.company,
      country: newJobData.country,
      category: newJobData.category,
      salary: newJobData.salary,
      employmentType: newJobData.employmentType,
      experience: newJobData.experience,
      education: newJobData.education,
      skills: skillsArray,
      visaSponsorship: newJobData.visaSponsorship,
      description: newJobData.description,
      requirements: reqsArray
    });

    setIsNewJobOpen(false);
    loadData();
  };

  const handleDeleteJob = async (id: string) => {
    if (confirm('Are you sure you want to delete this overseas job listing?')) {
      await deleteJob(id);
      setJobsList(prev => prev.filter(j => j.id !== id));
    }
  };

  const downloadCSV = (type: string) => {
    window.open(`/api/admin/export/${type}?token=${token}`, '_blank');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10 space-y-8 animate-fadeIn pb-16">
      {/* Dashboard Top Header */}
      <div className="bg-slate-900 text-white p-6 sm:p-8 rounded-3xl shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 bg-sky-500/20 text-sky-300 border border-sky-400/30 text-xs px-2.5 py-1 rounded-full font-bold uppercase mb-2">
            <ShieldCheck className="w-3.5 h-3.5 text-sky-400" />
            <span>Authenticated Admin Access</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black">Administrative Control Desk</h1>
          <p className="text-xs text-slate-400">Logged in as {user?.email}</p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={loadData}
            disabled={refreshing}
            className="bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold px-3.5 py-2 rounded-xl border border-slate-700 flex items-center space-x-1.5 transition-colors"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin' : ''}`} />
            <span>Refresh Data</span>
          </button>

          <button
            onClick={() => setIsNewJobOpen(true)}
            className="bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs px-4 py-2 rounded-xl flex items-center space-x-1 shadow-md"
          >
            <Plus className="w-4 h-4" />
            <span>Post New Job</span>
          </button>
        </div>
      </div>

      {/* Admin Nav Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-2">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-colors ${
            activeTab === 'overview' ? 'bg-blue-900 text-white shadow-md' : 'bg-white text-slate-700 hover:bg-slate-100'
          }`}
        >
          Overview & Export
        </button>
        <button
          onClick={() => setActiveTab('counselling')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-colors relative ${
            activeTab === 'counselling' ? 'bg-blue-900 text-white shadow-md' : 'bg-white text-slate-700 hover:bg-slate-100'
          }`}
        >
          <span>Counselling Enquiries</span>
          {stats?.pendingCounselling > 0 && (
            <span className="ml-2 bg-amber-500 text-slate-950 text-[10px] px-1.5 py-0.2 rounded-full font-black">
              {stats.pendingCounselling}
            </span>
          )}
        </button>
        <button
          onClick={() => setActiveTab('applications')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-colors ${
            activeTab === 'applications' ? 'bg-blue-900 text-white shadow-md' : 'bg-white text-slate-700 hover:bg-slate-100'
          }`}
        >
          Job Applications ({applicationsList.length})
        </button>
        <button
          onClick={() => setActiveTab('jobs')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-colors ${
            activeTab === 'jobs' ? 'bg-blue-900 text-white shadow-md' : 'bg-white text-slate-700 hover:bg-slate-100'
          }`}
        >
          Manage Jobs CMS ({jobsList.length})
        </button>
        <button
          onClick={() => setActiveTab('contacts')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-colors ${
            activeTab === 'contacts' ? 'bg-blue-900 text-white shadow-md' : 'bg-white text-slate-700 hover:bg-slate-100'
          }`}
        >
          Contact Messages ({contactsList.length})
        </button>
      </div>

      {/* Tab 1: Overview */}
      {activeTab === 'overview' && (
        <div className="space-y-8">
          {/* MongoDB Atlas Live Connection & URI Inspector Box */}
          <div className={`p-6 rounded-3xl border shadow-sm transition-all ${
            dbStatus?.isConnected ? 'bg-emerald-50/70 border-emerald-200' : 'bg-amber-50/70 border-amber-200'
          }`}>
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex items-start space-x-3.5">
                <div className={`w-3.5 h-3.5 mt-1 rounded-full shrink-0 ${
                  dbStatus?.isConnected ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500 animate-ping'
                }`} />
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                      {dbStatus?.isConnected ? 'MongoDB Atlas Database: Connected & Synchronized' : 'MongoDB Atlas Database: Authentication Pending'}
                    </h3>
                    <span className={`text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full ${
                      dbStatus?.isConnected ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-900'
                    }`}>
                      {dbStatus?.isConnected ? 'Live in Atlas' : 'Action Required'}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 mt-1 max-w-3xl leading-relaxed">
                    {dbStatus?.isConnected
                      ? `All registrations, jobs, applications, counselling requests, and contact inquiries are writing directly to your MongoDB Atlas database (${dbStatus?.dbName || 'par_careers'}).`
                      : 'Atlas cluster rejected the current database credentials with "bad auth : authentication failed". Inspect and update your connection string below to connect and seed Atlas.'}
                  </p>
                </div>
              </div>

              <button
                onClick={loadData}
                disabled={refreshing}
                className="text-xs font-bold px-3 py-1.5 rounded-xl bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 shadow-sm shrink-0"
              >
                Test & Refresh
              </button>
            </div>

            {/* Connection URI Form */}
            <form onSubmit={handleUpdateDatabaseUri} className="mt-5 pt-4 border-t border-slate-200/80 space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Active MongoDB Connection URI (MONGODB_URI):
                </label>
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="text"
                    value={customUriInput}
                    onChange={(e) => setCustomUriInput(e.target.value)}
                    placeholder="mongodb+srv://aravindjinna1_db_user:<password>@cluster0.mriykpc.mongodb.net/par_careers"
                    className="flex-1 px-3.5 py-2 text-xs font-mono rounded-xl border border-slate-300 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-inner"
                  />
                  <button
                    type="submit"
                    disabled={isUpdatingDb}
                    className="px-5 py-2 bg-blue-900 hover:bg-blue-800 text-white rounded-xl text-xs font-bold whitespace-nowrap shadow-md disabled:opacity-50 transition-colors"
                  >
                    {isUpdatingDb ? 'Connecting & Syncing...' : 'Save & Connect to Atlas'}
                  </button>
                </div>
              </div>

              {dbNotice && (
                <div className={`p-3 rounded-xl text-xs font-medium ${
                  dbNotice.startsWith('✅') ? 'bg-emerald-100 text-emerald-900 border border-emerald-300' : 'bg-red-100 text-red-900 border border-red-300'
                }`}>
                  {dbNotice}
                </div>
              )}
            </form>
          </div>

          {/* Key Metric Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
              <div className="text-xs text-slate-500 font-semibold">Total Counselling Leads</div>
              <div className="text-2xl font-black text-slate-900">{stats?.totalCounselling || 0}</div>
              <div className="text-[11px] text-amber-600 font-bold">{stats?.pendingCounselling || 0} Pending Review</div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
              <div className="text-xs text-slate-500 font-semibold">Job Applications</div>
              <div className="text-2xl font-black text-blue-900">{stats?.totalApplications || 0}</div>
              <div className="text-[11px] text-slate-400">Transmitted to desk</div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
              <div className="text-xs text-slate-500 font-semibold">Active Jobs Listed</div>
              <div className="text-2xl font-black text-emerald-700">{stats?.activeJobs || 0}</div>
              <div className="text-[11px] text-emerald-600 font-bold">Live in directory</div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
              <div className="text-xs text-slate-500 font-semibold">Contact Messages</div>
              <div className="text-2xl font-black text-purple-900">{stats?.totalContactMessages || 0}</div>
              <div className="text-[11px] text-purple-600 font-bold">{stats?.unreadContacts || 0} Unread</div>
            </div>
          </div>

          {/* Export CSV Section */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="font-bold text-slate-900 text-base flex items-center space-x-2">
              <Download className="w-5 h-5 text-blue-700" />
              <span>Export Candidate Data Records (CSV)</span>
            </h3>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => downloadCSV('counselling')}
                className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs px-4 py-2.5 rounded-xl transition-colors flex items-center space-x-1.5"
              >
                <Download className="w-3.5 h-3.5 text-blue-700" />
                <span>Export Counselling Leads CSV</span>
              </button>

              <button
                onClick={() => downloadCSV('applications')}
                className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs px-4 py-2.5 rounded-xl transition-colors flex items-center space-x-1.5"
              >
                <Download className="w-3.5 h-3.5 text-blue-700" />
                <span>Export Job Applications CSV</span>
              </button>

              <button
                onClick={() => downloadCSV('contacts')}
                className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs px-4 py-2.5 rounded-xl transition-colors flex items-center space-x-1.5"
              >
                <Download className="w-3.5 h-3.5 text-blue-700" />
                <span>Export Contact Inquiries CSV</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Counselling Requests */}
      {activeTab === 'counselling' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden space-y-4 p-6">
          <h3 className="font-bold text-slate-900 text-lg">Free Counselling Enquiries</h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-600 font-bold uppercase border-b border-slate-200">
                <tr>
                  <th className="p-3">Applicant Name</th>
                  <th className="p-3">Contact</th>
                  <th className="p-3">Target Country</th>
                  <th className="p-3">Service</th>
                  <th className="p-3">Education / Exp</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {counsellingList.map(req => (
                  <tr key={req.id} className="hover:bg-slate-50/80">
                    <td className="p-3 font-bold text-slate-900">{req.fullName}</td>
                    <td className="p-3 text-slate-600">
                      <div>{req.email}</div>
                      <div className="font-semibold text-slate-900">{req.phone}</div>
                    </td>
                    <td className="p-3 font-bold text-blue-900">{req.preferredCountry}</td>
                    <td className="p-3 text-slate-700 font-medium">{req.interestedService}</td>
                    <td className="p-3 text-slate-500">
                      <div>{req.education}</div>
                      <div>{req.experience}</div>
                    </td>
                    <td className="p-3">
                      <span className={`px-2.5 py-1 rounded-full font-bold uppercase text-[10px] ${
                        req.status === 'pending' ? 'bg-amber-100 text-amber-800' :
                        req.status === 'contacted' ? 'bg-blue-100 text-blue-800' : 'bg-emerald-100 text-emerald-800'
                      }`}>
                        {req.status}
                      </span>
                    </td>
                    <td className="p-3">
                      <select
                        value={req.status}
                        onChange={(e) => handleCounsellingStatusUpdate(req.id, e.target.value)}
                        className="bg-white border border-slate-200 rounded p-1 text-xs font-semibold text-slate-700"
                      >
                        <option value="pending">Pending</option>
                        <option value="contacted">Contacted</option>
                        <option value="completed">Completed</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 3: Applications */}
      {activeTab === 'applications' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden space-y-4 p-6">
          <h3 className="font-bold text-slate-900 text-lg">Job Applications Received</h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-600 font-bold uppercase border-b border-slate-200">
                <tr>
                  <th className="p-3">Job Role</th>
                  <th className="p-3">Applicant</th>
                  <th className="p-3">Phone</th>
                  <th className="p-3">Education / Skills</th>
                  <th className="p-3">Resume</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {applicationsList.map(app => (
                  <tr key={app.id} className="hover:bg-slate-50/80">
                    <td className="p-3 font-bold text-slate-900">
                      <div>{app.jobTitle}</div>
                      <div className="text-[10px] text-slate-400">{app.country}</div>
                    </td>
                    <td className="p-3 font-semibold text-slate-800">
                      <div>{app.fullName}</div>
                      <div className="text-[11px] text-slate-500 font-normal">{app.email}</div>
                    </td>
                    <td className="p-3 font-mono font-bold text-slate-700">{app.phone}</td>
                    <td className="p-3 text-slate-600">
                      <div>{app.education}</div>
                      <div className="text-[10px] text-blue-700 font-semibold">{app.skills}</div>
                    </td>
                    <td className="p-3">
                      <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded text-[10px] font-mono">
                        {app.resumeFileName || 'CV.pdf'}
                      </span>
                    </td>
                    <td className="p-3">
                      <select
                        value={app.status}
                        onChange={(e) => handleApplicationStatusUpdate(app.id, e.target.value)}
                        className="bg-white border border-slate-200 rounded p-1 text-xs font-semibold text-slate-700"
                      >
                        <option value="under_review">Under Review</option>
                        <option value="shortlisted">Shortlisted</option>
                        <option value="interview">Interview Scheduled</option>
                        <option value="accepted">Accepted</option>
                        <option value="rejected">Rejected</option>
                      </select>
                    </td>
                    <td className="p-3">
                      <button
                        onClick={() => setViewApp(app)}
                        className="bg-blue-50 text-blue-700 hover:bg-blue-100 font-bold px-2.5 py-1 rounded transition-colors flex items-center space-x-1"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>View</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 4: Jobs CMS */}
      {activeTab === 'jobs' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden space-y-4 p-6">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-slate-900 text-lg">Overseas Job Directory CMS</h3>
            <button
              onClick={() => setIsNewJobOpen(true)}
              className="bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs px-4 py-2 rounded-lg flex items-center space-x-1"
            >
              <Plus className="w-4 h-4" />
              <span>Post New Job</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {jobsList.map(job => (
              <div key={job.id} className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex justify-between items-start">
                <div className="space-y-1">
                  <span className="text-[10px] bg-sky-100 text-sky-800 font-bold px-2 py-0.5 rounded uppercase">
                    {job.country}
                  </span>
                  <h4 className="font-bold text-slate-900 text-sm pt-1">{job.title}</h4>
                  <div className="text-xs text-slate-500">{job.company} • {job.salary}</div>
                </div>

                <button
                  onClick={() => handleDeleteJob(job.id)}
                  className="text-red-500 hover:text-red-700 p-1 rounded hover:bg-red-50"
                  title="Delete Job"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 5: Contact Messages */}
      {activeTab === 'contacts' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden space-y-4 p-6">
          <h3 className="font-bold text-slate-900 text-lg">Website Contact Messages</h3>

          <div className="space-y-3">
            {contactsList.map(msg => (
              <div key={msg.id} className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-bold text-slate-900 text-sm">{msg.name} ({msg.email})</div>
                    <div className="text-xs text-slate-500">Phone: {msg.phone} • Subject: <strong>{msg.subject}</strong></div>
                  </div>
                  <span className="text-[10px] text-slate-400">{new Date(msg.createdAt).toLocaleString()}</span>
                </div>
                <p className="text-xs text-slate-700 bg-white p-3 rounded-lg border border-slate-100 leading-relaxed">
                  {msg.message}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Create Job Modal */}
      {isNewJobOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-100 max-w-2xl w-full p-6 space-y-4 my-8">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <h3 className="font-bold text-lg text-slate-900">Post Overseas Job Opening</h3>
              <button onClick={() => setIsNewJobOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateJobSubmit} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Job Title *</label>
                  <input
                    type="text"
                    required
                    placeholder="Senior Full Stack Engineer"
                    value={newJobData.title}
                    onChange={(e) => setNewJobData({ ...newJobData, title: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded p-2 text-xs"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Company Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="TechNovation GmbH"
                    value={newJobData.company}
                    onChange={(e) => setNewJobData({ ...newJobData, company: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded p-2 text-xs"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Country *</label>
                  <select
                    value={newJobData.country}
                    onChange={(e) => setNewJobData({ ...newJobData, country: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded p-2 text-xs"
                  >
                    <option value="Germany">Germany</option>
                    <option value="Singapore">Singapore</option>
                    <option value="Australia">Australia</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="Canada">Canada</option>
                    <option value="United States">United States</option>
                  </select>
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Category</label>
                  <input
                    type="text"
                    value={newJobData.category}
                    onChange={(e) => setNewJobData({ ...newJobData, category: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded p-2 text-xs"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Salary Package</label>
                  <input
                    type="text"
                    value={newJobData.salary}
                    onChange={(e) => setNewJobData({ ...newJobData, salary: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded p-2 text-xs"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Required Skills (Comma separated)</label>
                  <input
                    type="text"
                    value={newJobData.skills}
                    onChange={(e) => setNewJobData({ ...newJobData, skills: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded p-2 text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Job Description</label>
                <textarea
                  rows={3}
                  value={newJobData.description}
                  onChange={(e) => setNewJobData({ ...newJobData, description: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded p-2 text-xs"
                ></textarea>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Requirements (One per line)</label>
                <textarea
                  rows={3}
                  value={newJobData.requirements}
                  onChange={(e) => setNewJobData({ ...newJobData, requirements: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded p-2 text-xs"
                ></textarea>
              </div>

              <div className="flex justify-end space-x-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsNewJobOpen(false)}
                  className="bg-slate-100 text-slate-700 font-bold px-4 py-2 rounded text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-700 text-white font-bold px-5 py-2 rounded text-xs"
                >
                  Publish Job
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Application Detail View Modal */}
      {viewApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl p-6 max-w-lg w-full space-y-4">
            <div className="flex justify-between items-center border-b border-slate-100 pb-2">
              <h3 className="font-bold text-base text-slate-900">Application: {viewApp.fullName}</h3>
              <button onClick={() => setViewApp(null)} className="p-1 text-slate-400">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2 text-xs text-slate-700">
              <div><strong>Role:</strong> {viewApp.jobTitle} ({viewApp.country})</div>
              <div><strong>Email:</strong> {viewApp.email} | <strong>Phone:</strong> {viewApp.phone}</div>
              <div><strong>Education:</strong> {viewApp.education}</div>
              <div><strong>Experience:</strong> {viewApp.experience}</div>
              <div><strong>Skills:</strong> {viewApp.skills}</div>
              <div><strong>LinkedIn:</strong> {viewApp.linkedin || 'N/A'}</div>
              <div><strong>Portfolio:</strong> {viewApp.portfolio || 'N/A'}</div>
              <div><strong>Expected Joining:</strong> {viewApp.expectedJoining}</div>
              <div><strong>Resume File:</strong> {viewApp.resumeFileName || 'Uploaded'}</div>
              <div className="bg-slate-50 p-2 rounded border text-slate-600">
                <strong>Cover Letter:</strong> {viewApp.coverLetter || 'None'}
              </div>
            </div>

            <div className="pt-2 text-right">
              <button
                onClick={() => setViewApp(null)}
                className="bg-slate-800 text-white font-bold px-4 py-2 rounded text-xs"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
