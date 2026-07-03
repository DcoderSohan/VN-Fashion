import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getImageUrl } from './utils/helpers';
import api from './utils/api';
import { 
  LayoutDashboard,
  Image, 
  FileText, 
  Award, 
  Clock, 
  ShoppingBag, 
  Tag, 
  Calendar,
  MessageSquare,
  Menu,
  X,
  LogOut,
  User,
  ExternalLink,
  Settings,
  Tv,
  ChevronRight
} from 'lucide-react';
import Dashboard from './pages/Dashboard';
import GalleryManagement from './pages/GalleryManagement';
import ServicesManagement from './pages/ServicesManagement';
import CategoriesManagement from './pages/CategoriesManagement';
import BookingsManagement from './pages/BookingsManagement';
import ContactsManagement from './pages/ContactsManagement';
import SettingsManagement from './pages/SettingsManagement';
import SocialLinksManagement from './pages/SocialLinksManagement';
import ClassBannersManagement from './pages/ClassBannersManagement';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';

// Protected Route Component
function ProtectedRoute({ children }) {
  const adminToken = localStorage.getItem('adminToken');
  const currentAdmin = localStorage.getItem('currentAdmin');
  
  if (!adminToken || !currentAdmin) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
}

function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem('adminToken');
      if (!token) {
        navigate('/login');
        return;
      }
      
      try {
        const response = await api.get('/admin/profile');
        setCurrentUser(response.data);
      } catch (error) {
        console.error('Error fetching user profile:', error);
        const session = localStorage.getItem('currentAdmin');
        if (session) {
          setCurrentUser(JSON.parse(session));
        } else {
          navigate('/login');
        }
      }
    };

    fetchUserProfile();
  }, [navigate]);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, path: '/' },
    { id: 'gallery', label: 'Gallery', icon: Image, path: '/gallery' },
    { id: 'services', label: 'Services', icon: ShoppingBag, path: '/services' },
    { id: 'categories', label: 'Categories', icon: Tag, path: '/categories' },
    { id: 'class-banners', label: 'Class Banners', icon: Tv, path: '/class-banners' },
    { id: 'bookings', label: 'Bookings', icon: Calendar, path: '/bookings' },
    { id: 'contacts', label: 'Contacts', icon: MessageSquare, path: '/contacts' },
    { id: 'settings', label: 'Settings', icon: Settings, path: '/settings' },
    { id: 'profile', label: 'Profile', icon: User, path: '/profile' },
  ];

  const isActive = (path) => {
    return location.pathname === path;
  };

  const handleMenuClick = (path) => {
    navigate(path);
    setSidebarOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('currentAdmin');
    navigate('/login');
  };

  // Refresh user profile when navigating to profile page
  useEffect(() => {
    if (location.pathname === '/profile' && currentUser) {
      const refreshProfile = async () => {
        try {
          const response = await api.get('/admin/profile');
          setCurrentUser(response.data);
        } catch (error) {
          console.error('Error refreshing profile:', error);
        }
      };
      refreshProfile();
    }
  }, [location.pathname]);

  if (!currentUser) {
    return null;
  }

  const currentPage = menuItems.find(item => isActive(item.path));

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#f5f4f2', fontFamily: "'Unbounded', system-ui, sans-serif" }}>
      
      {/* Top Navigation Bar */}
      <nav className="bg-white border-b border-gray-200 fixed top-0 left-0 right-0 z-50 h-16 flex items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-4">
          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden p-2 text-gray-600 hover:text-black hover:bg-gray-100 rounded-md transition-colors"
          >
            <Menu size={20} />
          </button>

          {/* Logo */}
          <div className="flex items-center gap-3">
            <span 
              className="text-xl sm:text-2xl font-bold tracking-[0.2em] text-black uppercase"
              style={{ fontFamily: "'Cormorant Garamond', 'Times New Roman', serif" }}
            >
              VN FASHION
            </span>
            <div className="h-4 w-[1px] bg-gray-300 hidden sm:inline" />
            <span className="text-[10px] sm:text-xs text-gray-400 hidden sm:inline font-medium tracking-widest uppercase">
              Admin
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => window.open('http://localhost:5174', '_blank')}
            className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-black text-white text-xs font-medium tracking-wider uppercase hover:bg-gray-800 transition-colors duration-200"
          >
            <ExternalLink size={14} />
            <span className="hidden sm:inline">View Site</span>
          </button>

          {/* Profile Avatar */}
          <button
            onClick={() => navigate('/profile')}
            className="flex items-center gap-2 px-2 sm:px-3 py-2 text-gray-700 hover:bg-gray-100 transition-colors rounded-sm"
          >
            {currentUser?.avatar ? (
              <img
                key={currentUser.avatar}
                src={getImageUrl(currentUser.avatar)}
                alt="Profile"
                className="w-8 h-8 rounded-full object-cover border border-gray-300"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center border border-gray-200">
                <User size={16} className="text-white" />
              </div>
            )}
            <span className="hidden lg:inline text-xs font-medium text-gray-700 tracking-wider">
              {currentUser?.email?.split('@')[0] || 'Admin'}
            </span>
          </button>
        </div>
      </nav>

      <div className="flex pt-16">
        {/* Sidebar - Desktop */}
        <aside className="hidden lg:flex flex-col bg-white border-r border-gray-200 w-60 fixed left-0 top-16 h-[calc(100vh-4rem)] overflow-y-auto overflow-x-hidden">
          <div className="flex-1 py-4 px-3">
            <div className="space-y-0.5">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.path);
                return (
                  <button
                    key={item.id}
                    onClick={() => handleMenuClick(item.path)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 text-xs font-medium tracking-wider uppercase transition-all duration-150 rounded-sm ${
                      active
                        ? 'bg-black text-white'
                        : 'text-gray-500 hover:bg-gray-100 hover:text-black'
                    }`}
                  >
                    <Icon size={15} />
                    <span>{item.label}</span>
                    {active && <ChevronRight size={13} className="ml-auto" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Sidebar Footer */}
          <div className="border-t border-gray-200 p-3">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-3 py-2.5 text-xs font-medium tracking-wider uppercase text-gray-500 hover:bg-gray-100 hover:text-black transition-all duration-150 rounded-sm"
            >
              <LogOut size={15} />
              <span>Log Out</span>
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 w-full lg:ml-60 min-h-[calc(100vh-4rem)]">
          {/* Page Header Breadcrumb */}
          {currentPage && (
            <div className="bg-white border-b border-gray-200 px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-2">
              <span className="text-xs text-gray-400 tracking-wider uppercase">Admin</span>
              <ChevronRight size={12} className="text-gray-300" />
              <span className="text-xs text-black font-medium tracking-wider uppercase">{currentPage.label}</span>
            </div>
          )}
          <div className="p-4 sm:p-6 lg:p-8">
            {children}
          </div>
        </main>
      </div>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/40 z-40 lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
            />
            <motion.div
              className="fixed top-0 left-0 h-full w-72 bg-white z-50 lg:hidden flex flex-col"
              initial={{ x: -288 }}
              animate={{ x: 0 }}
              exit={{ x: -288 }}
              transition={{ type: 'tween', duration: 0.25 }}
            >
              {/* Mobile Sidebar Header */}
              <div className="h-16 border-b border-gray-200 flex items-center justify-between px-4">
                <span
                  className="text-xl font-bold tracking-[0.2em] text-black uppercase"
                  style={{ fontFamily: "'Cormorant Garamond', 'Times New Roman', serif" }}
                >
                  VN FASHION
                </span>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="p-2 text-gray-500 hover:text-black hover:bg-gray-100 rounded-sm transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Mobile Menu Items */}
              <div className="flex-1 overflow-y-auto py-4 px-3">
                <div className="space-y-0.5">
                  {menuItems.map((item) => {
                    const Icon = item.icon;
                    const active = isActive(item.path);
                    return (
                      <button
                        key={item.id}
                        onClick={() => handleMenuClick(item.path)}
                        className={`w-full flex items-center gap-3 px-3 py-3 text-xs font-medium tracking-wider uppercase transition-all duration-150 rounded-sm ${
                          active
                            ? 'bg-black text-white'
                            : 'text-gray-500 hover:bg-gray-100 hover:text-black'
                        }`}
                      >
                        <Icon size={15} />
                        <span>{item.label}</span>
                        {active && <ChevronRight size={13} className="ml-auto" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Mobile Sidebar Footer */}
              <div className="border-t border-gray-200 p-3">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-3 py-3 text-xs font-medium tracking-wider uppercase text-gray-500 hover:bg-gray-100 hover:text-black transition-all duration-150 rounded-sm"
                >
                  <LogOut size={15} />
                  <span>Log Out</span>
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

function App() {
  return (
    <Router
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        
        {/* Protected Routes */}
        <Route path="/" element={
          <ProtectedRoute>
            <DashboardLayout>
              <Dashboard />
            </DashboardLayout>
          </ProtectedRoute>
        } />
        <Route path="/gallery" element={
          <ProtectedRoute>
            <DashboardLayout>
              <GalleryManagement />
            </DashboardLayout>
          </ProtectedRoute>
        } />
        <Route path="/services" element={
          <ProtectedRoute>
            <DashboardLayout>
              <ServicesManagement />
            </DashboardLayout>
          </ProtectedRoute>
        } />
        <Route path="/categories" element={
          <ProtectedRoute>
            <DashboardLayout>
              <CategoriesManagement />
            </DashboardLayout>
          </ProtectedRoute>
        } />
        <Route path="/class-banners" element={
          <ProtectedRoute>
            <DashboardLayout>
              <ClassBannersManagement />
            </DashboardLayout>
          </ProtectedRoute>
        } />
        <Route path="/bookings" element={
          <ProtectedRoute>
            <DashboardLayout>
              <BookingsManagement />
            </DashboardLayout>
          </ProtectedRoute>
        } />
        <Route path="/contacts" element={
          <ProtectedRoute>
            <DashboardLayout>
              <ContactsManagement />
            </DashboardLayout>
          </ProtectedRoute>
        } />
        <Route path="/settings" element={
          <ProtectedRoute>
            <DashboardLayout>
              <SettingsManagement />
            </DashboardLayout>
          </ProtectedRoute>
        } />
        <Route path="/settings/social-links" element={
          <ProtectedRoute>
            <DashboardLayout>
              <SocialLinksManagement />
            </DashboardLayout>
          </ProtectedRoute>
        } />
        <Route path="/profile" element={
          <ProtectedRoute>
            <DashboardLayout>
              <Profile />
            </DashboardLayout>
          </ProtectedRoute>
        } />
        
        {/* Redirect unknown routes */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
