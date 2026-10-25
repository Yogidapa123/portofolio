import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Moon, Sun, FileText, Menu, X, Sparkles, Orbit } from 'lucide-react'

interface NavbarProps {
  darkMode: boolean
  setDarkMode: (val: boolean) => void
  onOpenCvModal: () => void
  activeSection: string
}

export const Navbar: React.FC<NavbarProps> = ({
  darkMode,
  setDarkMode,
  onOpenCvModal,
  activeSection,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { name: 'Beranda', href: '#hero', id: 'hero' },
    { name: 'Tentang', href: '#about', id: 'about' },
    { name: 'Riwayat & Karir', href: '#experience', id: 'experience' },
    { name: 'Portofolio', href: '#portfolio', id: 'portfolio' },
    { name: 'Kontak', href: '#contact', id: 'contact' },
  ]

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false)
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <header className="fixed top-3 md:top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-4xl transition-all duration-300">
      {/* Floating Center Navbar with Intense Blue Glow */}
      <motion.nav
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`relative px-4 py-2.5 md:px-6 md:py-3 rounded-full flex items-center justify-between transition-all duration-500 ${
          darkMode
            ? 'bg-[#0a0f24]/85 border border-[#2c67ed]/50 text-white shadow-[0_0_30px_rgba(44,103,237,0.45)]'
            : 'bg-white/85 border border-[#2c67ed]/40 text-slate-800 shadow-[0_4px_30px_rgba(44,103,237,0.35)]'
        } backdrop-blur-xl hover:shadow-[0_0_42px_rgba(44,103,237,0.65)]`}
      >
        {/* Glow ambient background aura */}
        <div className="absolute inset-0 -z-10 rounded-full bg-[#2c67ed]/15 blur-lg pointer-events-none" />

        {/* Logo / Brand Name */}
        <a
          href="#hero"
          onClick={(e) => {
            e.preventDefault()
            handleNavClick('#hero')
          }}
          className="flex items-center gap-2 group cursor-pointer"
        >
          <div className="relative w-8 h-8 rounded-full bg-gradient-to-tr from-[#2c67ed] to-cyan-400 p-[1.5px] flex items-center justify-center shadow-[0_0_12px_rgba(44,103,237,0.6)] group-hover:scale-105 transition-transform">
            <div className="w-full h-full rounded-full bg-[#060814] flex items-center justify-center">
              <Orbit className="w-4 h-4 text-cyan-300 animate-spin" style={{ animationDuration: '10s' }} />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold tracking-tight text-sm md:text-base bg-gradient-to-r from-blue-400 via-[#2c67ed] to-indigo-500 bg-clip-text text-transparent">
              Yogi Pratama
            </span>
            <span className="text-[9px] tracking-wider uppercase opacity-70 font-semibold -mt-1 hidden sm:block">
              Portfolio
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-1 lg:gap-2">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id
            return (
              <a
                key={link.id}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault()
                  handleNavClick(link.href)
                }}
                className={`relative px-3 py-1.5 rounded-full text-xs lg:text-sm font-medium transition-all duration-300 ${
                  isActive
                    ? 'text-white'
                    : darkMode
                    ? 'text-slate-300 hover:text-white hover:bg-white/5'
                    : 'text-slate-600 hover:text-[#2c67ed] hover:bg-blue-50/80'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activePill"
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-[#2c67ed] to-blue-600 shadow-[0_0_18px_rgba(44,103,237,0.7)]"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{link.name}</span>
              </a>
            )
          })}
        </div>

        {/* Right Action Buttons */}
        <div className="flex items-center gap-2">
          {/* Quick CV Modal Trigger */}
          <button
            onClick={onOpenCvModal}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-gradient-to-r from-[#2c67ed] to-blue-600 text-white shadow-[0_0_16px_rgba(44,103,237,0.6)] hover:shadow-[0_0_24px_rgba(44,103,237,0.9)] hover:scale-105 active:scale-95 transition-all duration-200"
            title="Lihat & Download CV"
          >
            <FileText className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">CV Yogi</span>
          </button>

          {/* Theme Switcher Button (Space Sun / Cosmic Moon) */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            aria-label="Toggle Dark/Light Mode"
            className={`relative p-2 rounded-full transition-all duration-300 ${
              darkMode
                ? 'bg-blue-950/70 text-amber-300 border border-blue-500/30 hover:bg-blue-900/80 hover:shadow-[0_0_15px_rgba(251,191,36,0.4)]'
                : 'bg-blue-100/80 text-blue-800 border border-blue-400/50 hover:bg-blue-200/90 hover:shadow-[0_0_15px_rgba(44,103,237,0.4)]'
            }`}
            title={darkMode ? 'Beralih ke Light Space Mode' : 'Beralih ke Dark Space Mode'}
          >
            <motion.div
              key={darkMode ? 'dark' : 'light'}
              initial={{ rotate: -90, scale: 0.5, opacity: 0 }}
              animate={{ rotate: 0, scale: 1, opacity: 1 }}
              exit={{ rotate: 90, scale: 0.5, opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4 text-[#2c67ed]" />}
            </motion.div>
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`p-2 rounded-full md:hidden transition-colors ${
              darkMode ? 'text-slate-200 hover:bg-white/10' : 'text-slate-800 hover:bg-blue-100'
            }`}
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className={`mt-2 p-4 rounded-2xl md:hidden border shadow-[0_0_35px_rgba(44,103,237,0.4)] backdrop-blur-2xl ${
              darkMode
                ? 'bg-[#090e24]/95 border-[#2c67ed]/40 text-white'
                : 'bg-white/95 border-[#2c67ed]/30 text-slate-900'
            }`}
          >
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id
                return (
                  <a
                    key={link.id}
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault()
                      handleNavClick(link.href)
                    }}
                    className={`px-4 py-2.5 rounded-xl text-sm font-semibold flex items-center justify-between transition-all ${
                      isActive
                        ? 'bg-[#2c67ed] text-white shadow-[0_0_15px_rgba(44,103,237,0.6)]'
                        : darkMode
                        ? 'hover:bg-white/10 text-slate-300'
                        : 'hover:bg-blue-50 text-slate-700'
                    }`}
                  >
                    <span>{link.name}</span>
                    <Sparkles className="w-3.5 h-3.5 opacity-60" />
                  </a>
                )
              })}

              <div className="pt-2 border-t border-slate-700/30 flex gap-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false)
                    onOpenCvModal()
                  }}
                  className="flex-1 py-2.5 rounded-xl text-xs font-semibold bg-gradient-to-r from-[#2c67ed] to-blue-600 text-white flex items-center justify-center gap-1.5 shadow-[0_0_15px_rgba(44,103,237,0.5)]"
                >
                  <FileText className="w-4 h-4" />
                  Buka CV Lengkap
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
