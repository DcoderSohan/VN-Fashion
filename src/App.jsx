import { useState } from 'react'
import './App.css'
import Navbar from './Components/Navbar/Navbar'
import HeroSection from './Components/Hero/HeroSection'
import About from "./Components/About/About"
import Services from './Components/Services/Services'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div>
      <Navbar />
      <HeroSection />
      <About />
      <Services />
    </div>
    </>
  )
}

export default App
