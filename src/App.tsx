import React, { useState, useEffect } from 'react';
import { AuthProvider } from './context/AuthContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { FreeCounsellingModal } from './components/FreeCounsellingModal';
import { AdminLoginModal } from './components/AdminLoginModal';
import { UserAuthModal } from './components/UserAuthModal';
import { JobApplyModal } from './components/JobApplyModal';

import { HomePage } from './pages/HomePage';
import { WorkVisaPage } from './pages/WorkVisaPage';
import { StudentVisaPage } from './pages/StudentVisaPage';
import { CareersAbroadPage } from './pages/CareersAbroadPage';
import { ReferralsPage } from './pages/ReferralsPage';
import { CountriesHubPage } from './pages/CountriesHubPage';
import { CountryDetailPage } from './pages/CountryDetailPage';
import { TrustStandardPage } from './pages/TrustStandardPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { BlogsPage } from './pages/BlogsPage';
import { BlogDetailPage } from './pages/BlogDetailPage';
import { NewsPage } from './pages/NewsPage';
import { PoliciesPages } from './pages/PoliciesPages';
import { UserDashboardPage } from './pages/UserDashboardPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { NotFoundPage } from './pages/NotFoundPage';

import { INITIAL_COUNTRIES } from './data/initialData';
import { Job, Blog } from './types';

export function App() {
  const [activeTab, setActiveTab] = useState<string>('home');

  // Modals
  const [isCounsellingOpen, setIsCounsellingOpen] = useState(false);
  const [counsellingService, setCounsellingService] = useState<string | undefined>();
  const [counsellingCountry, setCounsellingCountry] = useState<string | undefined>();

  const [isAdminLoginOpen, setIsAdminLoginOpen] = useState(false);
  const [isUserAuthOpen, setIsUserAuthOpen] = useState(false);

  const [selectedJobForApply, setSelectedJobForApply] = useState<Job | null>(null);
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);

  // Scroll to top on tab change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab]);

  const handleOpenCounselling = (service?: string, country?: string) => {
    setCounsellingService(service);
    setCounsellingCountry(country);
    setIsCounsellingOpen(true);
  };

  const handleSelectJob = (job: Job) => {
    setSelectedJobForApply(job);
  };

  const handleSelectBlog = (blog: Blog) => {
    setSelectedBlog(blog);
    setActiveTab('blog-detail');
  };

  const renderContent = () => {
    if (activeTab === 'home') {
      return (
        <HomePage
          onNavClick={setActiveTab}
          onOpenCounselling={handleOpenCounselling}
          onSelectJob={handleSelectJob}
        />
      );
    }

    if (activeTab === 'work-visa') {
      return (
        <WorkVisaPage
          onNavClick={setActiveTab}
          onOpenCounselling={handleOpenCounselling}
        />
      );
    }

    if (activeTab === 'student-visa') {
      return (
        <StudentVisaPage
          onNavClick={setActiveTab}
          onOpenCounselling={handleOpenCounselling}
        />
      );
    }

    if (activeTab === 'careers') {
      return (
        <CareersAbroadPage
          onSelectJob={handleSelectJob}
          onOpenCounselling={handleOpenCounselling}
        />
      );
    }

    if (activeTab === 'referrals') {
      return <ReferralsPage />;
    }

    if (activeTab === 'countries') {
      return (
        <CountriesHubPage
          onNavClick={setActiveTab}
          onOpenCounselling={handleOpenCounselling}
        />
      );
    }

    if (activeTab?.startsWith('country-')) {
      const countryId = activeTab.replace('country-', '');
      const countryData = INITIAL_COUNTRIES.find(c => c.id === countryId);
      if (countryData) {
        return (
          <CountryDetailPage
            country={countryData}
            onOpenCounselling={handleOpenCounselling}
            onNavClick={setActiveTab}
          />
        );
      }
      return <NotFoundPage onNavClick={setActiveTab} />;
    }

    if (activeTab === 'trust-standard') {
      return <TrustStandardPage onOpenCounselling={() => handleOpenCounselling()} />;
    }

    if (activeTab === 'about') {
      return <AboutPage onOpenCounselling={() => handleOpenCounselling()} />;
    }

    if (activeTab === 'contact') {
      return <ContactPage />;
    }

    if (activeTab === 'blogs') {
      return <BlogsPage onSelectBlog={handleSelectBlog} />;
    }

    if (activeTab === 'blog-detail' && selectedBlog) {
      return (
        <BlogDetailPage
          blog={selectedBlog}
          onBack={() => setActiveTab('blogs')}
          onOpenCounselling={() => handleOpenCounselling()}
        />
      );
    }

    if (activeTab === 'news') {
      return <NewsPage />;
    }

    if (activeTab === 'privacy') {
      return <PoliciesPages type="privacy" />;
    }

    if (activeTab === 'refund') {
      return <PoliciesPages type="refund" />;
    }

    if (activeTab === 'terms') {
      return <PoliciesPages type="terms" />;
    }

    if (activeTab === 'user-dashboard') {
      return <UserDashboardPage />;
    }

    if (activeTab === 'admin-dashboard') {
      return <AdminDashboardPage />;
    }

    return <NotFoundPage onNavClick={setActiveTab} />;
  };

  return (
    <AuthProvider>
      <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col selection:bg-sky-500 selection:text-white">
        <Header
          activeTab={activeTab}
          onNavClick={setActiveTab}
          onOpenCounselling={() => handleOpenCounselling()}
          onOpenAdminLogin={() => setIsAdminLoginOpen(true)}
          onOpenUserAuth={() => setIsUserAuthOpen(true)}
        />

        <main className="flex-grow">
          {renderContent()}
        </main>

        <Footer
          onNavClick={setActiveTab}
          onOpenAdminLogin={() => setIsAdminLoginOpen(true)}
        />

        {/* Modals */}
        <FreeCounsellingModal
          isOpen={isCounsellingOpen}
          onClose={() => setIsCounsellingOpen(false)}
          defaultService={counsellingService}
          defaultCountry={counsellingCountry}
        />

        <AdminLoginModal
          isOpen={isAdminLoginOpen}
          onClose={() => setIsAdminLoginOpen(false)}
          onSuccess={() => setActiveTab('admin-dashboard')}
        />

        <UserAuthModal
          isOpen={isUserAuthOpen}
          onClose={() => setIsUserAuthOpen(false)}
        />

        <JobApplyModal
          job={selectedJobForApply}
          onClose={() => setSelectedJobForApply(null)}
        />
      </div>
    </AuthProvider>
  );
}

export default App;
