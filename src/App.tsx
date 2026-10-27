import React, { useState, useEffect } from 'react'
import { CosmicBackground } from './components/CosmicBackground'
import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { About } from './components/About'
import { EducationExperience } from './components/EducationExperience'
import { CertificatesSection } from './components/CertificatesSection'
import { PortfolioSection } from './components/PortfolioSection'
import { ContactSection } from './components/ContactSection'
import { Footer } from './components/Footer'
import { CVModal } from './components/CVModal'
import { PortfolioDeckModal } from './components/PortfolioDeckModal'
import { RocketBackToTop } from './components/RocketBackToTop'
import { CuteSpaceCompanions } from './components/CuteSpaceCompanions'
import { CosmicClickEffect } from './components/CosmicClickEffect'
import { MarvelCompanions } from './components/MarvelCompanions'
import { SpiderManUniverse } from './components/SpiderManUniverse'
import { IronManUniverse } from './components/IronManUniverse'

export default function App() {
  // Dark mode defaults to true for deep outer space theme
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('yogi_theme')
    return saved !== null ? saved === 'dark' : true
  })

  const [activeSection, setActiveSection] = useState<string>('hero')
  const [isCvModalOpen, setIsCvModalOpen] = useState<boolean>(false)
  const [isPortfolioModalOpen, setIsPortfolioModalOpen] = useState<boolean>(false)

  useEffect(() => {
    localStorage.setItem('yogi_theme', darkMode ? 'dark' : 'light')
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  // Active section observer on scroll
  useEffect(() => {
    const sectionIds = ['hero', 'about', 'experience', 'certificates', 'portfolio', 'contact']
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 250
      for (const id of sectionIds) {
        const el = document.getElementById(id)
        if (el) {
          const top = el.offsetTop
          const height = el.offsetHeight
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(id)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div
      className={`min-h-screen relative font-sans transition-colors duration-700 selection:bg-[#2c67ed] selection:text-white ${
        darkMode ? 'text-white' : 'text-slate-900'
      }`}
    >
      {/* Dynamic Interactive Outer Space Background */}
      <CosmicBackground darkMode={darkMode} />

      {/* Floating Centered Navbar with Blue Glow */}
      <Navbar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        onOpenCvModal={() => setIsCvModalOpen(true)}
        activeSection={activeSection}
      />

      {/* Main Content Sections */}
      <main className="relative z-10">
        <Hero
          darkMode={darkMode}
          onOpenCvModal={() => setIsCvModalOpen(true)}
          onOpenPortfolioModal={() => setIsPortfolioModalOpen(true)}
        />

        <About
          darkMode={darkMode}
          onOpenCvModal={() => setIsCvModalOpen(true)}
          onOpenPortfolioModal={() => setIsPortfolioModalOpen(true)}
        />

        <EducationExperience darkMode={darkMode} />

        <CertificatesSection darkMode={darkMode} />

        <PortfolioSection
          darkMode={darkMode}
          onOpenPortfolioModal={() => setIsPortfolioModalOpen(true)}
        />

        <ContactSection darkMode={darkMode} />
      </main>

      {/* Galaxy Footer */}
      <Footer darkMode={darkMode} />

      {/* Cute Interactive Space & Marvel Additions */}
      <CosmicClickEffect darkMode={darkMode} />
      <CuteSpaceCompanions darkMode={darkMode} />
      <MarvelCompanions darkMode={darkMode} />
      <SpiderManUniverse darkMode={darkMode} />
      <IronManUniverse darkMode={darkMode} />
      <RocketBackToTop darkMode={darkMode} />

      {/* Curriculum Vitae Modal */}
      <CVModal
        isOpen={isCvModalOpen}
        onClose={() => setIsCvModalOpen(false)}
        darkMode={darkMode}
      />

      {/* Portfolio Presentation Deck Modal */}
      <PortfolioDeckModal
        isOpen={isPortfolioModalOpen}
        onClose={() => setIsPortfolioModalOpen(false)}
        darkMode={darkMode}
      />
    </div>
  )
}
