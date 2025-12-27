import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import React, { lazy, Suspense } from 'react'
import './App.css'
import Navbar from './Components/Navbar/Navbar'
import HeroSection from './Components/Hero/HeroSection'
import Services from './Components/Services/Services'
import FeaturedWorks from './Components/FeaturedWorks/FeaturedWorks'
import Testimonials from './Components/Testimonials/Testimonials'
import Contact from './Components/Contact/Contact'
import Footer from './Components/Footer/Footer'
import AboutSection from './Components/About/About'
import PageTransition from './Components/PageTransition'

// Lazy load pages for better performance
const About = lazy(() => import('./Pages/About'))
const Gallery = lazy(() => import('./Pages/Gallery'))
const ServicesPage = lazy(() => import('./Pages/Services'))
const Booking = lazy(() => import('./Pages/Booking'))
const ContactPage = lazy(() => import('./Pages/Contact'))

// Loading component
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-gray-100">
    <div className="text-center">
      <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
      <p className="text-gray-600">Loading...</p>
    </div>
  </div>
)


function Home() {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <AboutSection />
      <Services />
      <FeaturedWorks />
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  )
}

function AnimatedRoutes() {
  const location = useLocation();

  // Scroll to top on route change (instant, no animation)
  React.useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [location.pathname]);

  return (
    <AnimatePresence mode="wait">
      <Suspense fallback={<PageLoader />}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={
            <PageTransition>
              <Home />
            </PageTransition>
          } />
          <Route path="/about" element={
            <PageTransition>
              <Suspense fallback={<PageLoader />}>
                <About />
              </Suspense>
            </PageTransition>
          } />
          <Route path="/services" element={
            <PageTransition>
              <Suspense fallback={<PageLoader />}>
                <ServicesPage />
              </Suspense>
            </PageTransition>
          } />
          <Route path="/gallery" element={
            <PageTransition>
              <Suspense fallback={<PageLoader />}>
                <Gallery />
              </Suspense>
            </PageTransition>
          } />
          <Route path="/booking" element={
            <PageTransition>
              <Suspense fallback={<PageLoader />}>
                <Booking />
              </Suspense>
            </PageTransition>
          } />
          <Route path="/contact" element={
            <PageTransition>
              <Suspense fallback={<PageLoader />}>
                <ContactPage />
              </Suspense>
            </PageTransition>
          } />
        </Routes>
      </Suspense>
    </AnimatePresence>
  );
}

function App() {
  return (
    <Router>
      <AnimatedRoutes />
    </Router>
  )
}

export default App
