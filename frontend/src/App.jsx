import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import './App.css'
import Navbar from './Components/Navbar/Navbar'
import HeroSection from './Components/Hero/HeroSection'
import Introduction from './Components/Introduction/Introduction'
import Services from './Components/Services/Services'
import FeaturedWorks from './Components/FeaturedWorks/FeaturedWorks'
import Testimonials from './Components/Testimonials/Testimonials'
import Contact from './Components/Contact/Contact'
import Footer from './Components/Footer/Footer'
import About from './Pages/About'
import Gallery from './Pages/Gallery'
import ServicesPage from './Pages/Services'
import PageTransition from './Components/PageTransition'

function Home() {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <Introduction />
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
