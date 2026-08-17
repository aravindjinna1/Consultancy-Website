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
  fetchJobs,
  fetchCountries,
  createCountry,
  deleteCountry,
  fetchAdminDiagContacts,
  updateDiagContactStatus,
  API_BASE
} from '../services/api';
import { CounsellingRequest, JobApplication, ContactMessage, Job, CountryInfo } from '../types';
import {
  ShieldCheck, Users, Briefcase, FileText, Download, Plus, Trash2, CheckCircle2,
  Clock, AlertCircle, RefreshCw, Eye, X, Filter, Globe, Activity, Database
} from 'lucide-react';

export const AdminDashboardPage: React.FC = () => {
  const { user, isAdmin, token } = useAuth();
  const [activeTab, setActiveTab] = useState<'overview' | 'counselling' | 'applications' | 'jobs' | 'countries' | 'diagcontacts' | 'contacts'>('overview');

  const [stats, setStats] = useState<any>(null);
  const [counsellingList, setCounsellingList] = useState<CounsellingRequest[]>([]);
  const [applicationsList, setApplicationsList] = useState<JobApplication[]>([]);
  const [contactsList, setContactsList] = useState<ContactMessage[]>([]);
  const [jobsList, setJobsList] = useState<Job[]>([]);
  const [countriesList, setCountriesList] = useState<CountryInfo[]>([]);
  const [diagContactsList, setDiagContactsList] = useState<any[]>([]);

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

  // New Country Modal State
  const [isNewCountryOpen, setIsNewCountryOpen] = useState(false);
  const [newCountryData, setNewCountryData] = useState({
    id: '',
    name: '',
    code: '',
    flag: '🌍',
    coverImage: 'https://images.unsplash.com/photo-1486299267070-83823f5448dd?w=800',
    description: '',
    workVisaTypes: 'Job Seeker Visa, Skilled Worker Visa, EU Blue Card',
    studyOptions: 'Free / Low-Tuition Public Universities, English Taught Masters',
    jobRoles: 'Software Engineers, Healthcare / Nurses, Cloud Architects',
    processingTime: '4 - 8 Weeks',
    livingCost: '$900 - $1,300 / mo'
  });

  // Selected Application Detail View
  const [viewApp, setViewApp] = useState<JobApplication | null>(null);

  // In-App Deletion Confirmation Modal State
  const [deleteTarget, setDeleteTarget] = useState<{ type: 'country' | 'job'; id: string; name: string } | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [toastMessage, setToastMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const loadData = async () => {
    setRefreshing(true);
    try {
      const [sRes, cRes, aRes, cntRes, jRes, countryRes, diagRes] = await Promise.allSettled([
        fetchAdminStats(),
        fetchAdminCounsellingRequests(),
        fetchAdminApplications(),
        fetchAdminContacts(),
        fetchJobs(),
        fetchCountries(),
        fetchAdminDiagContacts()
      ]);

      if (sRes.status === 'fulfilled') setStats(sRes.value.stats);
      if (cRes.status === 'fulfilled') setCounsellingList(cRes.value.data || []);
      if (aRes.status === 'fulfilled') setApplicationsList(aRes.value.data || []);
      if (cntRes.status === 'fulfilled') setContactsList(cntRes.value.data || []);
      if (jRes.status === 'fulfilled') setJobsList(jRes.value.data || []);
      if (countryRes.status === 'fulfilled') setCountriesList(countryRes.value.data || []);
      if (diagRes.status === 'fulfilled') setDiagContactsList(diagRes.value.data || []);

      // Fetch Live Database Status & Config
      try {
        const token = localStorage.getItem('par_auth_token');
        const dbRes = await fetch(`${API_BASE}/admin/db-status`, {
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
      const res = await fetch(`${API_BASE}/admin/update-db-uri`, {
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
          You do not have administrative privileges. Admin access requires allow-list OTP verification (<span className="font-semibold text-blue-700">parvisaandcareer94@gmail.com</span>).
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

  const handleDiagContactStatusUpdate = async (id: string, newStatus: string) => {
    await updateDiagContactStatus(id, newStatus);
    setDiagContactsList(prev => prev.map(d => d.id === id ? { ...d, status: newStatus } : d));
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

  const handleDeleteJob = (id: string, name?: string) => {
    setDeleteTarget({
      type: 'job',
      id,
      name: name || 'Job Opening'
    });
  };

  const handleCreateCountrySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const countryId = newCountryData.id || newCountryData.name.toLowerCase().replace(/\s+/g, '-');
    const workVisas = (newCountryData.workVisaTypes || '').split(',').map(s => s.trim()).filter(Boolean);
    const studyOpts = (newCountryData.studyOptions || '').split(',').map(s => s.trim()).filter(Boolean);
    const jobs = (newCountryData.jobRoles || '').split(',').map(s => s.trim()).filter(Boolean);

    await createCountry({
      id: countryId,
      name: newCountryData.name,
      code: newCountryData.code || countryId.toUpperCase().slice(0, 2),
      flag: newCountryData.flag || '🌍',
      coverImage: newCountryData.coverImage,
      description: newCountryData.description,
      visaTypes: workVisas.map(v => ({ title: v, description: 'Standard Visa Pathway', duration: '1-3 Years' })),
      studyOptions: studyOpts,
      jobRoles: jobs,
      processingTime: newCountryData.processingTime,
      livingCost: newCountryData.livingCost
    });

    setIsNewCountryOpen(false);
    loadData();
  };

  const handleDeleteCountry = (targetId: string, countryName?: string) => {
    if (!targetId) return;
    setDeleteTarget({
      type: 'country',
      id: targetId,
      name: countryName || targetId
    });
  };

  const handleConfirmDelete = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);
    try {
      if (deleteTarget.type === 'country') {
        const targetId = deleteTarget.id;
        // Optimistic UI update
        setCountriesList(prev => prev.filter(c => c.id !== targetId && (c as any)._id !== targetId && c.name !== targetId));
        await deleteCountry(targetId);
        setToastMessage({
          type: 'success',
          text: `Destination guide for "${deleteTarget.name}" has been permanently removed from database and UI.`
        });
      } else if (deleteTarget.type === 'job') {
        const targetId = deleteTarget.id;
        setJobsList(prev => prev.filter(j => j.id !== targetId));
        await deleteJob(targetId);
        setToastMessage({
          type: 'success',
          text: `Job posting "${deleteTarget.name}" was removed from database.`
        });
      }
      await loadData();
    } catch (err: any) {
      setToastMessage({
        type: 'error',
        text: `Deletion notice: ${err.message || 'Could not complete deletion'}`
      });
      await loadData();
    } finally {
      setIsDeleting(false);
      setDeleteTarget(null);
      setTimeout(() => setToastMessage(null), 4500);
    }
  };

  const downloadCSV = (type: string) => {
    window.open(`${API_BASE}/admin/export/${type}?token=${token}`, '_blank');
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
            onClick={() => setIsNewCountryOpen(true)}
            className="bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs px-3.5 py-2 rounded-xl flex items-center space-x-1 shadow-md"
          >
            <Globe className="w-3.5 h-3.5" />
            <span>Add Country</span>
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
          Overview & DB ({dbStatus?.totalCollections || 7} Collections)
        </button>
        <button
          onClick={() => setActiveTab('counselling')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-colors relative ${
            activeTab === 'counselling' ? 'bg-blue-900 text-white shadow-md' : 'bg-white text-slate-700 hover:bg-slate-100'
          }`}
        >
          <span>Counselling ({counsellingList.length})</span>
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
          Jobs CMS ({jobsList.length})
        </button>
        <button
          onClick={() => setActiveTab('countries')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-colors ${
            activeTab === 'countries' ? 'bg-blue-900 text-white shadow-md' : 'bg-white text-slate-700 hover:bg-slate-100'
          }`}
        >
          Country Hubs ({countriesList.length})
        </button>
        <button
          onClick={() => setActiveTab('diagcontacts')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-colors ${
            activeTab === 'diagcontacts' ? 'bg-blue-900 text-white shadow-md' : 'bg-white text-slate-700 hover:bg-slate-100'
          }`}
        >
          Diagnostic Leads ({diagContactsList.length})
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
                      {dbStatus?.isConnected ? 'MongoDB Atlas Database: Connected & Synchronized' : 'MongoDB Atlas Database: Hybrid Memory Mode'}
                    </h3>
                    <span className={`text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full ${
                      dbStatus?.isConnected ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-900'
                    }`}>
                      {dbStatus?.isConnected ? 'Live in MongoDB' : 'Memory Synced'}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 mt-1 max-w-3xl leading-relaxed">
                    {dbStatus?.isConnected
                      ? `All 7 collections (applications, contacts, counsellings, countryhubs, diagcontacts, jobs, users) are stored directly in your MongoDB database (${dbStatus?.dbName || 'par_careers'}).`
                      : 'Connecting to MongoDB Atlas with auto-sync across all 7 collections. Update connection string below if required.'}
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
                    placeholder="mongodb+srv://admin_db_user:<password>@cluster0.mongodb.net/par_careers"
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

          {/* Database 7 Collections Grid */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="font-bold text-slate-900 text-base flex items-center space-x-2">
              <Database className="w-5 h-5 text-blue-700" />
              <span>MongoDB Collections Real-Time Summary</span>
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                <div className="text-[10px] text-slate-500 font-bold uppercase font-mono">counsellings</div>
                <div className="text-xl font-black text-slate-900 mt-1">{stats?.totalCounselling ?? counsellingList.length}</div>
                <div className="text-[10px] text-amber-600 font-semibold">{stats?.pendingCounselling ?? 0} pending</div>
              </div>

              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                <div className="text-[10px] text-slate-500 font-bold uppercase font-mono">applications</div>
                <div className="text-xl font-black text-blue-900 mt-1">{stats?.totalApplications ?? applicationsList.length}</div>
                <div className="text-[10px] text-blue-600 font-semibold">candidates</div>
              </div>

              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                <div className="text-[10px] text-slate-500 font-bold uppercase font-mono">jobs</div>
                <div className="text-xl font-black text-emerald-700 mt-1">{stats?.activeJobs ?? jobsList.length}</div>
                <div className="text-[10px] text-emerald-600 font-semibold">openings</div>
              </div>

              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                <div className="text-[10px] text-slate-500 font-bold uppercase font-mono">countryhubs</div>
                <div className="text-xl font-black text-sky-700 mt-1">{stats?.totalCountries ?? countriesList.length}</div>
                <div className="text-[10px] text-sky-600 font-semibold">guides live</div>
              </div>

              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                <div className="text-[10px] text-slate-500 font-bold uppercase font-mono">diagcontacts</div>
                <div className="text-xl font-black text-indigo-700 mt-1">{stats?.totalDiagContacts ?? diagContactsList.length}</div>
                <div className="text-[10px] text-indigo-600 font-semibold">diagnostics</div>
              </div>

              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                <div className="text-[10px] text-slate-500 font-bold uppercase font-mono">contacts</div>
                <div className="text-xl font-black text-purple-700 mt-1">{stats?.totalContactMessages ?? contactsList.length}</div>
                <div className="text-[10px] text-purple-600 font-semibold">{stats?.unreadContacts ?? 0} unread</div>
              </div>

              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                <div className="text-[10px] text-slate-500 font-bold uppercase font-mono">users</div>
                <div className="text-xl font-black text-slate-700 mt-1">{stats?.totalUsers ?? 1}</div>
                <div className="text-[10px] text-slate-500 font-semibold">registered</div>
              </div>
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
          <h3 className="font-bold text-slate-900 text-lg">Free Counselling Enquiries (counsellings collection)</h3>

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
          <h3 className="font-bold text-slate-900 text-lg">Job Applications Received (applications collection)</h3>

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
            <div>
              <h3 className="font-bold text-slate-900 text-lg">Overseas Job Directory CMS (jobs collection)</h3>
              <p className="text-xs text-slate-500">Add, edit, and delete job openings stored in MongoDB</p>
            </div>
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
                  <div className="flex items-center space-x-2">
                    <span className="text-[10px] bg-sky-100 text-sky-800 font-bold px-2 py-0.5 rounded uppercase">
                      {job.country}
                    </span>
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded">
                      {job.category}
                    </span>
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm pt-1">{job.title}</h4>
                  <div className="text-xs text-slate-600 font-medium">{job.company} • {job.salary}</div>
                  <div className="text-[11px] text-slate-400">Experience: {job.experience} | Skills: {(job.skills || []).join(', ')}</div>
                </div>

                <button
                  onClick={() => handleDeleteJob(job.id, job.title)}
                  className="text-red-500 hover:text-red-700 p-2 rounded hover:bg-red-50"
                  title="Delete Job"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 5: Country Hubs CMS */}
      {activeTab === 'countries' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden space-y-4 p-6">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-bold text-slate-900 text-lg">Country Hubs Guide CMS (countryhubs collection)</h3>
              <p className="text-xs text-slate-500">Manage work & study destination guide pages stored in MongoDB</p>
            </div>
            <button
              onClick={() => setIsNewCountryOpen(true)}
              className="bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs px-4 py-2 rounded-lg flex items-center space-x-1"
            >
              <Plus className="w-4 h-4" />
              <span>Add Destination Hub</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {countriesList.map(country => (
              <div key={country.id || (country as any)._id} className="bg-slate-50 rounded-xl border border-slate-200 overflow-hidden flex flex-col justify-between">
                <div className="relative h-28 overflow-hidden">
                  <img src={country.coverImage} alt={country.name} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-slate-950/40" />
                  <div className="absolute bottom-2 left-3 right-3 text-white flex justify-between items-center">
                    <span className="font-bold text-base">{country.flag} {country.name}</span>
                    <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded">{country.processingTime}</span>
                  </div>
                </div>
                <div className="p-3 space-y-2 text-xs">
                  <p className="text-slate-600 line-clamp-2">{country.description}</p>
                  <div className="text-[11px] text-slate-500">
                    <div><strong>Study:</strong> {(country.studyOptions || []).join(', ')}</div>
                    <div><strong>Jobs:</strong> {(country.jobRoles || []).join(', ')}</div>
                  </div>
                  <div className="pt-2 border-t border-slate-200 flex justify-between items-center">
                    <span className="text-[10px] font-mono text-slate-400">ID: {country.id || (country as any)._id}</span>
                    <button
                      onClick={() => handleDeleteCountry(country.id || (country as any)._id, country.name)}
                      className="text-red-600 hover:text-red-800 font-bold text-xs flex items-center space-x-1.5 bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-lg transition-colors border border-red-200"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Remove</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 6: Diagnostic Assessment Leads */}
      {activeTab === 'diagcontacts' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden space-y-4 p-6">
          <h3 className="font-bold text-slate-900 text-lg">Diagnostic Profile Leads (diagcontacts collection)</h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-600 font-bold uppercase border-b border-slate-200">
                <tr>
                  <th className="p-3">Candidate</th>
                  <th className="p-3">Target Country</th>
                  <th className="p-3">Experience</th>
                  <th className="p-3">Qualification</th>
                  <th className="p-3">Assessed Score</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {diagContactsList.map(diag => (
                  <tr key={diag.id} className="hover:bg-slate-50/80">
                    <td className="p-3">
                      <div className="font-bold text-slate-900">{diag.fullName}</div>
                      <div className="text-[11px] text-slate-500">{diag.email} • {diag.phone}</div>
                    </td>
                    <td className="p-3 font-bold text-blue-900">{diag.targetCountry}</td>
                    <td className="p-3 text-slate-700">{diag.experienceYears} Years</td>
                    <td className="p-3 text-slate-600">{diag.qualification} ({diag.ieltsScore ? `IELTS: ${diag.ieltsScore}` : 'No IELTS'})</td>
                    <td className="p-3">
                      <span className="font-black text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
                        {diag.diagnosticScore || 85}%
                      </span>
                    </td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded-full font-bold uppercase text-[10px] ${
                        diag.status === 'pending' ? 'bg-amber-100 text-amber-800' :
                        diag.status === 'evaluated' ? 'bg-blue-100 text-blue-800' : 'bg-emerald-100 text-emerald-800'
                      }`}>
                        {diag.status || 'pending'}
                      </span>
                    </td>
                    <td className="p-3">
                      <select
                        value={diag.status || 'pending'}
                        onChange={(e) => handleDiagContactStatusUpdate(diag.id, e.target.value)}
                        className="bg-white border border-slate-200 rounded p-1 text-xs font-semibold text-slate-700"
                      >
                        <option value="pending">Pending</option>
                        <option value="evaluated">Evaluated</option>
                        <option value="contacted">Contacted</option>
                        <option value="enrolled">Enrolled</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 7: Contact Messages */}
      {activeTab === 'contacts' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden space-y-4 p-6">
          <h3 className="font-bold text-slate-900 text-lg">Website Contact Messages (contacts collection)</h3>

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
              <h3 className="font-bold text-lg text-slate-900">Post Overseas Job Opening to MongoDB</h3>
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

      {/* Create Country Hub Modal */}
      {isNewCountryOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-100 max-w-2xl w-full p-6 space-y-4 my-8">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <h3 className="font-bold text-lg text-slate-900">Add Destination Country Hub (countryhubs collection)</h3>
              <button onClick={() => setIsNewCountryOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateCountrySubmit} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Country Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. New Zealand"
                    value={newCountryData.name}
                    onChange={(e) => setNewCountryData({ ...newCountryData, name: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded p-2 text-xs"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Flag Emoji / Code</label>
                  <input
                    type="text"
                    placeholder="🇳🇿"
                    value={newCountryData.flag}
                    onChange={(e) => setNewCountryData({ ...newCountryData, flag: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded p-2 text-xs"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Visa Processing Time</label>
                  <input
                    type="text"
                    placeholder="4 - 8 Weeks"
                    value={newCountryData.processingTime}
                    onChange={(e) => setNewCountryData({ ...newCountryData, processingTime: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded p-2 text-xs"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Average Living Cost</label>
                  <input
                    type="text"
                    placeholder="$1,000 - $1,500 / mo"
                    value={newCountryData.livingCost}
                    onChange={(e) => setNewCountryData({ ...newCountryData, livingCost: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded p-2 text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Cover Image URL</label>
                <input
                  type="text"
                  value={newCountryData.coverImage}
                  onChange={(e) => setNewCountryData({ ...newCountryData, coverImage: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded p-2 text-xs"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Description</label>
                <textarea
                  rows={2}
                  value={newCountryData.description}
                  onChange={(e) => setNewCountryData({ ...newCountryData, description: e.target.value })}
                  placeholder="Overview of opportunities, post-study work rights, immigration policies..."
                  className="w-full bg-slate-50 border border-slate-200 rounded p-2 text-xs"
                ></textarea>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Study Options (Comma separated)</label>
                <input
                  type="text"
                  value={newCountryData.studyOptions}
                  onChange={(e) => setNewCountryData({ ...newCountryData, studyOptions: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded p-2 text-xs"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">In-Demand Job Roles (Comma separated)</label>
                <input
                  type="text"
                  value={newCountryData.jobRoles}
                  onChange={(e) => setNewCountryData({ ...newCountryData, jobRoles: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded p-2 text-xs"
                />
              </div>

              <div className="flex justify-end space-x-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsNewCountryOpen(false)}
                  className="bg-slate-100 text-slate-700 font-bold px-4 py-2 rounded text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-700 text-white font-bold px-5 py-2 rounded text-xs"
                >
                  Save Country Hub
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

      {/* In-App Deletion Confirmation Modal (Reliable across all browser/iframe environments) */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-sm p-4 animate-fadeIn">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl border border-slate-100 space-y-5">
            <div className="flex items-start space-x-3">
              <div className="p-3 bg-red-100 text-red-600 rounded-xl flex-shrink-0">
                <Trash2 className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-base text-slate-900">
                  Delete {deleteTarget.type === 'country' ? 'Country Destination Hub' : 'Job Opening'}?
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Are you sure you want to permanently remove <strong className="text-slate-900">"{deleteTarget.name}"</strong> (ID: <code className="bg-slate-100 px-1 py-0.5 rounded text-[11px] font-mono">{deleteTarget.id}</code>) from the MongoDB database and public interface?
                </p>
              </div>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-[11px] text-amber-800 space-y-0.5">
              <div className="font-bold">⚠️ Irreversible Action</div>
              <div>This will delete the item from the live database and refresh the public website immediately.</div>
            </div>

            <div className="flex justify-end items-center space-x-3 pt-2">
              <button
                type="button"
                disabled={isDeleting}
                onClick={() => setDeleteTarget(null)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl text-xs transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={isDeleting}
                onClick={handleConfirmDelete}
                className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl text-xs shadow-lg shadow-red-600/30 flex items-center space-x-2 transition-all disabled:opacity-50"
              >
                {isDeleting ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Removing from Database...</span>
                  </>
                ) : (
                  <>
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Yes, Permanently Remove</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Action Toast Notification */}
      {toastMessage && (
        <div className={`fixed bottom-6 right-6 z-50 max-w-md px-4 py-3 rounded-xl shadow-2xl border flex items-center space-x-3 animate-slideUp ${
          toastMessage.type === 'success'
            ? 'bg-emerald-900 text-emerald-100 border-emerald-700'
            : 'bg-red-900 text-red-100 border-red-700'
        }`}>
          <div className="text-xs font-semibold">{toastMessage.text}</div>
          <button onClick={() => setToastMessage(null)} className="opacity-70 hover:opacity-100 text-xs font-bold">✕</button>
        </div>
      )}
    </div>
  );
};

