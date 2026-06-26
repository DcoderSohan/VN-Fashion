import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import React, { lazy, Suspense, useState } from 'react'
import InitialLoader from './Components/InitialLoader/InitialLoader'
import './App.css'
import Navbar from './Components/Navbar/Navbar'
import HeroSection from './Components/Hero/HeroSection'
import AboutSection from './Components/About/About'
import FeaturedWorks from './Components/FeaturedWorks/FeaturedWorks'
import JournalSection from './Components/Testimonials/JournalSection'
import Contact from './Components/Contact/Contact'
import Footer from './Components/Footer/Footer'
import PageTransition from './Components/PageTransition'

// Lazy load pages
const About = lazy(() => import('./Pages/About'))
const Gallery = lazy(() => import('./Pages/Gallery'))
const ServicesPage = lazy(() => import('./Pages/Services'))
const Booking = lazy(() => import('./Pages/Booking'))
const ContactPage = lazy(() => import('./Pages/Contact'))
const ClassesPage = lazy(() => import('./Pages/Classes'))

// Minimal inline loader — spins while lazy chunk loads
const PageLoader = () => (
  <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f5f4f2' }}>
    <div style={{ textAlign: 'center' }}>
      <div style={{
        width: 36, height: 36, border: '1.5px solid #0a0a0a',
        borderTopColor: 'transparent', borderRadius: '50%',
        animation: 'spin 0.75s linear infinite', margin: '0 auto 16px'
      }} />
      <p style={{ fontSize: '0.55rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#9ca3af', fontFamily: 'Unbounded, sans-serif' }}>
        Loading
      </p>
    </div>
    <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
  </div>
)

/* ---- Home page (all sections in one scroll) ---- */
function Home() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <AboutSection />
      <FeaturedWorks />
      {/* <JournalSection /> */}
      <Contact />
      <Footer />
    </>
  )
}

/* ---- All routes wrapped in PageTransition ---- */
function AnimatedRoutes() {
  const location = useLocation()

  return (
    <PageTransition key={location.pathname}>
      <Suspense fallback={<PageLoader />}>
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/classes" element={<ClassesPage />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </Suspense>
    </PageTransition>
  )
}

function App() {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <>
      {isLoading && (
        <InitialLoader onComplete={() => setIsLoading(false)} />
      )}
      <Router>
        <AnimatedRoutes />
      </Router>
    </>
  )
}

export default App
