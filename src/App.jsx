import { useState } from 'react'
import './App.css'
import Navbar from './Components/Navbar/Navbar'
import HeroSection from './Components/Hero/HeroSection'
import About from "./Components/About/About"
import Services from './Components/Services/Services'
import Gallery from './Components/Gallery/Gallery'
import Contact from './Components/Contact/Contact'
import Footer from './Components/Footer/Footer'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div>
      <Navbar />
      <HeroSection />
      <About />
      <Services />
      <Gallery />
      <Contact />
      <Footer />
    </div>
    </>
  )
}

export default App
