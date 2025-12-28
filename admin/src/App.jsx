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
  Settings
} from 'lucide-react';
import Dashboard from './pages/Dashboard';
import GalleryManagement from './pages/GalleryManagement';
import AboutManagement from './pages/AboutManagement';
import AchievementsManagement from './pages/AchievementsManagement';
import TimelineManagement from './pages/TimelineManagement';
import ServicesManagement from './pages/ServicesManagement';
import CategoriesManagement from './pages/CategoriesManagement';
import BookingsManagement from './pages/BookingsManagement';
import ContactsManagement from './pages/ContactsManagement';
import CertificatesManagement from './pages/CertificatesManagement';
import TestimonialManagement from './pages/TestimonialManagement';
import SettingsManagement from './pages/SettingsManagement';
import SocialLinksManagement from './pages/SocialLinksManagement';
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
  const [circularMenuOpen, setCircularMenuOpen] = useState(false);
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
        // Fetch user profile from MongoDB via API
        const response = await api.get('/admin/profile');
        setCurrentUser(response.data);
      } catch (error) {
        console.error('Error fetching user profile:', error);
        // If API fails, try localStorage as fallback
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
    { id: 'about', label: 'About Page', icon: FileText, path: '/about' },
    { id: 'achievements', label: 'Achievements', icon: Award, path: '/achievements' },
    { id: 'certificates', label: 'Certificates', icon: Award, path: '/certificates' },
    { id: 'timeline', label: 'Timeline', icon: Clock, path: '/timeline' },
    { id: 'testimonials', label: 'Testimonials', icon: MessageSquare, path: '/testimonials' },
    { id: 'services', label: 'Services', icon: ShoppingBag, path: '/services' },
    { id: 'categories', label: 'Categories', icon: Tag, path: '/categories' },
    { id: 'bookings', label: 'Bookings', icon: Calendar, path: '/bookings' },
    { id: 'contacts', label: 'Contacts', icon: MessageSquare, path: '/contacts' },
    { id: 'settings', label: 'Settings', icon: Settings, path: '/settings' },
    { id: 'profile', label: 'Profile', icon: User, path: '/profile' },
  ];

  const isActive = (path) => {
    return location.pathname === path;
  };

  // Calculate positions for circular menu items
  const getCircularPosition = (index, total, radius = 90) => {
    const angle = (index * 2 * Math.PI) / total - Math.PI / 2;
    return {
      x: Math.cos(angle) * radius,
      y: Math.sin(angle) * radius,
    };
  };

  const handleMenuClick = (path) => {
    navigate(path);
    setCircularMenuOpen(false);
    setSidebarOpen(false);
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Top Navigation Bar */}
      <nav className="bg-white shadow-lg border-b border-gray-100 fixed top-0 left-0 right-0 z-50 h-14 sm:h-16 flex items-center justify-between px-3 sm:px-4 md:px-6">
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Logo */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="morphing-square bg-black flex items-center justify-center overflow-hidden shadow-md" style={{ width: 32, height: 32 }}>
              <div
                style={{
                  width: 22,
                  height: 22,
                  WebkitMaskImage: 'url("/VN.png")',
                  maskImage: 'url("/VN.png")',
                  WebkitMaskRepeat: "no-repeat",
                  maskRepeat: "no-repeat",
                  WebkitMaskSize: "contain",
                  maskSize: "contain",
                  WebkitMaskPosition: "center",
                  maskPosition: "center",
                  background: "linear-gradient(90deg, #ff00cc, #3333ff, #00ffcc, #ffcc00)",
                  backgroundSize: "200% 200%",
                  animation: "rainbow 4s ease-in-out infinite",
                }}
              />
            </div>
            <span className="text-lg sm:text-xl font-bold text-gray-900 hidden sm:inline">VN FASHION</span>
            <span className="text-xs sm:text-sm text-gray-600 hidden lg:inline font-medium">Admin Dashboard</span>
          </div>
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={() => window.open('http://localhost:5174', '_blank')}
            className="flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all duration-300 font-medium text-xs sm:text-sm"
          >
            <ExternalLink size={16} className="sm:w-[18px] sm:h-[18px]" />
            <span className="hidden sm:inline">View Site</span>
          </button>
          {/* Profile Avatar */}
          <button
            onClick={() => navigate('/profile')}
            className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            {currentUser?.avatar ? (
              <img
                key={currentUser.avatar} // Force re-render when avatar changes
                src={getImageUrl(currentUser.avatar)}
                alt="Profile"
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full object-cover ring-2 ring-gray-200"
                onError={(e) => {
                  console.error('Avatar image failed to load:', currentUser.avatar);
                  e.target.style.display = 'none';
                }}
              />
            ) : (
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center ring-2 ring-gray-200">
                <User size={16} className="sm:w-[18px] sm:h-[18px] text-white" />
              </div>
            )}
            <span className="hidden lg:inline text-sm font-medium text-gray-700">{currentUser?.email?.split('@')[0] || 'Admin'}</span>
          </button>
        </div>
      </nav>

      <div className="flex pt-14 sm:pt-16 pb-20 sm:pb-24 lg:pb-0">
        {/* Sidebar - Desktop Only */}
        <aside
          className="hidden lg:block bg-white shadow-xl border-r border-gray-100 w-64 fixed left-0 top-14 sm:top-16 h-[calc(100vh-3.5rem)] sm:h-[calc(100vh-4rem)] overflow-y-auto overflow-x-hidden"
        >
          <div className="p-4 space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => handleMenuClick(item.path)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                    isActive(item.path)
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg transform scale-[1.02]'
                      : 'text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:text-gray-900'
                  }`}
                >
                  <Icon size={20} />
                  <span className="font-medium">{item.label}</span>
                </button>
              );
            })}
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 w-full lg:ml-64">
          <div className="bg-white rounded-xl shadow-xl p-3 sm:p-4 md:p-6 lg:p-8 min-h-[calc(100vh-6rem)] sm:min-h-[calc(100vh-8rem)] border border-gray-100">
            {children}
          </div>
        </main>
      </div>

      {/* Bottom Circular Menu - Mobile/Tablet Only */}
      <div className="lg:hidden fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50">
        {/* Menu Button / Close Button */}
        <motion.button
          onClick={() => setCircularMenuOpen(!circularMenuOpen)}
          className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full shadow-2xl flex items-center justify-center"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          {circularMenuOpen ? (
            <X size={24} className="sm:w-7 sm:h-7 text-white" />
          ) : (
            <Menu size={24} className="sm:w-7 sm:h-7 text-white" />
          )}
        </motion.button>
      </div>

      {/* Circular Menu - Mobile/Tablet Only */}
      <AnimatePresence>
        {circularMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setCircularMenuOpen(false)}
            />

            {/* Circular Menu Container - Centered */}
            <div
              className="fixed z-50 lg:hidden"
              style={{
                left: 0,
                top: 0,
                right: 0,
                bottom: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                pointerEvents: 'none',
              }}
            >
              <motion.div
                style={{
                  width: '280px',
                  height: '280px',
                  position: 'relative',
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
              >
                {/* Menu Items in Circle */}
                {menuItems.map((item, index) => {
                  const Icon = item.icon;
                  const pos = getCircularPosition(index, menuItems.length, 100);
                  const isItemActive = isActive(item.path);
                  
                  return (
                    <motion.button
                      key={item.id}
                      onClick={() => handleMenuClick(item.path)}
                      className={`absolute w-12 h-12 sm:w-14 sm:h-14 rounded-full font-semibold text-[10px] sm:text-xs shadow-xl flex flex-col items-center justify-center gap-0.5 sm:gap-1 pointer-events-auto transition-all ${
                        isItemActive
                          ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white scale-110"
                          : "bg-white text-gray-700 hover:bg-gray-50"
                      }`}
                      style={{
                        left: `calc(50% + ${pos.x}px)`,
                        top: `calc(50% + ${pos.y}px)`,
                        transform: 'translate(-50%, -50%)',
                      }}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ scale: 1.15 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Icon size={16} className="sm:w-[18px] sm:h-[18px]" />
                      <span className="leading-tight px-1">{item.label.length > 7 ? item.label.substring(0, 6) + '...' : item.label}</span>
                    </motion.button>
                  );
                })}
              </motion.div>
            </div>
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
        <Route path="/about" element={
          <ProtectedRoute>
            <DashboardLayout>
              <AboutManagement />
            </DashboardLayout>
          </ProtectedRoute>
        } />
        <Route path="/achievements" element={
          <ProtectedRoute>
            <DashboardLayout>
              <AchievementsManagement />
            </DashboardLayout>
          </ProtectedRoute>
        } />
        <Route path="/certificates" element={
          <ProtectedRoute>
            <DashboardLayout>
              <CertificatesManagement />
            </DashboardLayout>
          </ProtectedRoute>
        } />
        <Route path="/timeline" element={
          <ProtectedRoute>
            <DashboardLayout>
              <TimelineManagement />
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
        <Route path="/testimonials" element={
          <ProtectedRoute>
            <DashboardLayout>
              <TestimonialManagement />
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
