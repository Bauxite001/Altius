import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation, Link } from 'react-router-dom';

import Navigation from './components/Navigation';
import Footer from './components/Footer';
import FloatingButtons from './components/FloatingButtons';
import ChatBot from './components/ChatBot';
import { ToastProvider } from './components/Toast';

import Home from './pages/Home';
import About from './pages/About';
import Properties from './pages/Properties';
import PropertyDetail from './pages/PropertyDetail';
import ShortLets from './pages/ShortLets';
import { Development, Construction, Advisory } from './pages/ServicePages';
import Investment from './pages/Investment';
import { NewsList, NewsArticle } from './pages/News';
import FAQ from './pages/FAQ';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Booking from './pages/Booking';
import UserDashboard from './pages/UserDashboard';
import AdminDashboard from './pages/AdminDashboard';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const [chatOpen, setChatOpen] = useState(false);

  const isAdminPage = location.pathname.startsWith('/admin');
  const isAuthPage = location.pathname === '/login' || location.pathname === '/admin/login';

  if (isAdminPage) {
    return <>{children}</>;
  }

  return (
    <>
      {!isAuthPage && <Navigation />}
      <div className={!isAuthPage ? '' : ''}>
        {children}
      </div>
      {!isAuthPage && (
        <>
          <Footer />
          <FloatingButtons onOpenChat={() => setChatOpen(true)} />
          <ChatBot open={chatOpen} onClose={() => setChatOpen(false)} />
        </>
      )}
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter basename="/altius">
      <ToastProvider>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Layout><Home /></Layout>} />
          <Route path="/about" element={<Layout><About /></Layout>} />
          <Route path="/properties" element={<Layout><Properties /></Layout>} />
          <Route path="/properties/:id" element={<Layout><PropertyDetail /></Layout>} />
          <Route path="/short-lets" element={<Layout><ShortLets /></Layout>} />
          <Route path="/development" element={<Layout><Development /></Layout>} />
          <Route path="/construction" element={<Layout><Construction /></Layout>} />
          <Route path="/investment" element={<Layout><Investment /></Layout>} />
          <Route path="/advisory" element={<Layout><Advisory /></Layout>} />
          <Route path="/news" element={<Layout><NewsList /></Layout>} />
          <Route path="/news/:id" element={<Layout><NewsArticle /></Layout>} />
          <Route path="/faqs" element={<Layout><FAQ /></Layout>} />
          <Route path="/contact" element={<Layout><Contact /></Layout>} />
          <Route path="/booking" element={<Layout><Booking /></Layout>} />
          <Route path="/login" element={<Layout><Login /></Layout>} />
          <Route path="/dashboard" element={<Layout><UserDashboard /></Layout>} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/login" element={<Layout><Login /></Layout>} />
          <Route path="*" element={
            <Layout>
              <main className="pt-32 min-h-screen flex flex-col items-center justify-center text-center px-6">
                <div className="font-display text-8xl font-bold text-gray-100 mb-4">404</div>
                <h1 className="font-display text-2xl font-bold text-gray-800 mb-3">Page Not Found</h1>
                <p className="text-gray-500 mb-8">The page you're looking for doesn't exist or has been moved.</p>
                <Link to="/" className="btn-primary px-6 py-3 rounded-xl text-sm font-semibold">Back to Home</Link>
              </main>
            </Layout>
          } />
        </Routes>
      </ToastProvider>
    </BrowserRouter>
  );
}
