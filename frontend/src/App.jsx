import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import React from 'react'
import './App.css'
import Navbar from './Components/Navbar/Navbar'
import HeroSection from './Components/Hero/HeroSection'
import Services from './Components/Services/Services'
import FeaturedWorks from './Components/FeaturedWorks/FeaturedWorks'
import Testimonials from './Components/Testimonials/Testimonials'
import Contact from './Components/Contact/Contact'
import Footer from './Components/Footer/Footer'
import About from './Pages/About'
import AboutSection from './Components/About/About'
import Gallery from './Pages/Gallery'
import ServicesPage from './Pages/Services'
import Booking from './Pages/Booking'
import ContactPage from './Pages/Contact'
import PageTransition from './Components/PageTransition'


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
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={
          <PageTransition>
            <Home />
          </PageTransition>
        } />
        <Route path="/about" element={
          <PageTransition>
            <About />
          </PageTransition>
        } />
        <Route path="/services" element={
          <PageTransition>
            <ServicesPage />
          </PageTransition>
        } />
        <Route path="/gallery" element={
          <PageTransition>
            <Gallery />
          </PageTransition>
        } />
        <Route path="/booking" element={
          <PageTransition>
            <Booking />
          </PageTransition>
        } />
        <Route path="/contact" element={
          <PageTransition>
            <ContactPage />
          </PageTransition>
        } />
      </Routes>
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
