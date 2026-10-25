import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  FileText,
  Briefcase,
  ArrowRight,
  Sparkles,
  Download,
  Mail,
  GraduationCap,
  ChevronDown,
} from 'lucide-react'
import { LinkedinIcon } from './SocialIcons'
import { PERSONAL_INFO } from '../data/portfolioData'

interface HeroProps {
  darkMode: boolean
  onOpenCvModal: () => void
  onOpenPortfolioModal: () => void
}

export const Hero: React.FC<HeroProps> = ({ darkMode, onOpenCvModal, onOpenPortfolioModal }) => {
  const roles = [
    'Web Developer',
    'UI/UX Designer',
    'Grapich Desain',
    'Administrasi',
  ]

  const [roleIndex, setRoleIndex] = useState(0)
  const [displayText, setDisplayText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [typingSpeed, setTypingSpeed] = useState(130)

  useEffect(() => {
    const currentFullText = roles[roleIndex]

    const handleType = () => {
      if (!isDeleting) {
        // Typing forward
        setDisplayText(currentFullText.substring(0, displayText.length + 1))
        setTypingSpeed(90 + Math.random() * 40)

        if (displayText === currentFullText) {
          // Pause at end of word
          setTimeout(() => setIsDeleting(true), 1800)
        }
      } else {
        // Deleting backward
        setDisplayText(currentFullText.substring(0, displayText.length - 1))
        setTypingSpeed(45)

        if (displayText === '') {
          setIsDeleting(false)
          setRoleIndex((prev) => (prev + 1) % roles.length)
          setTypingSpeed(300)
        }
      }
    }

    const timer = setTimeout(handleType, typingSpeed)
    return () => clearTimeout(timer)
  }, [displayText, isDeleting, roleIndex, typingSpeed, roles])

  return (
    <section
      id="hero"
      className="relative min-h-screen pt-28 pb-16 md:pt-36 md:pb-24 flex items-center justify-center overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Column: Text & Hero Details */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left"
          >
            {/* Cosmic Status Badge */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide mb-6 border ${
                darkMode
                  ? 'bg-blue-950/60 border-blue-500/40 text-blue-300 shadow-[0_0_20px_rgba(44,103,237,0.35)]'
                  : 'bg-blue-100/90 border-blue-400/50 text-[#2c67ed] shadow-[0_0_15px_rgba(44,103,237,0.25)]'
              }`}
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#2c67ed] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#2c67ed]"></span>
              </span>
              <span>🌌 Explorer & Creator • Ready for Career Mission</span>
            </motion.div>

            {/* Intro Greeting */}
            <p
              className={`text-sm sm:text-base font-semibold tracking-wider uppercase mb-2 ${
                darkMode ? 'text-blue-400' : 'text-[#2c67ed]'
              }`}
            >
              Halo Semua, Saya
            </p>

            {/* Big Name */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] mb-4">
              <span
                className={`bg-clip-text text-transparent bg-gradient-to-r ${
                  darkMode
                    ? 'from-white via-slate-100 to-blue-200 drop-shadow-[0_4px_25px_rgba(44,103,237,0.4)]'
                    : 'from-slate-900 via-[#1e3a8a] to-[#2c67ed]'
                }`}
              >
                YOGI PRATAMA
              </span>
              <br />
              <span
                className={`bg-clip-text text-transparent bg-gradient-to-r from-[#2c67ed] via-blue-500 to-indigo-400 ${
                  darkMode ? 'drop-shadow-[0_0_30px_rgba(44,103,237,0.6)]' : ''
                }`}
              >
                NUSANTARA
              </span>
            </h1>

            {/* Typing Animation Showcase */}
            <div className="h-12 sm:h-14 flex items-center justify-center lg:justify-start gap-2 mb-6">
              <span
                className={`text-xl sm:text-2xl md:text-3xl font-bold tracking-tight ${
                  darkMode ? 'text-slate-300' : 'text-slate-700'
                }`}
              >
                Fokus Keahlian:
              </span>
              <div
                className={`px-3 py-1 rounded-lg border font-mono font-bold text-xl sm:text-2xl md:text-3xl flex items-center shadow-lg ${
                  darkMode
                    ? 'bg-[#0a122e]/90 text-cyan-300 border-[#2c67ed]/50 shadow-[0_0_20px_rgba(44,103,237,0.35)]'
                    : 'bg-white text-[#2c67ed] border-blue-300 shadow-[0_4px_15px_rgba(44,103,237,0.2)]'
                }`}
              >
                <span>{displayText}</span>
                <span className="w-2.5 h-6 sm:h-7 ml-1 bg-[#2c67ed] animate-pulse rounded-sm shadow-[0_0_10px_#2c67ed]" />
              </div>
            </div>

            {/* Brief Narrative */}
            <p
              className={`text-sm sm:text-base md:text-lg max-w-xl mb-8 leading-relaxed font-normal ${
                darkMode ? 'text-slate-300/90' : 'text-slate-700'
              }`}
            >
              Fresh graduate <strong className="font-semibold text-[#2c67ed]">S1 Teknik Informatika UMM (IPK 3.79)</strong>.
              Berpengalaman membangun aplikasi web full-stack <span className="font-medium underline decoration-blue-500/50">Laravel & MySQL</span> untuk instansi pemerintah, mendesain antarmuka <span className="font-medium underline decoration-blue-500/50">UI/UX & Grafis</span>, serta mengelola <span className="font-medium underline decoration-blue-500/50">administrasi digital</span> dan memimpin organisasi mahasiswa berskala besar.
            </p>

            {/* Main Action Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4 mb-8 w-full sm:w-auto">
              {/* CV Button */}
              <button
                onClick={onOpenCvModal}
                className="group relative px-6 py-3 rounded-xl font-bold text-sm sm:text-base text-white bg-gradient-to-r from-[#2c67ed] via-blue-600 to-indigo-600 shadow-[0_0_25px_rgba(44,103,237,0.65)] hover:shadow-[0_0_35px_rgba(44,103,237,0.95)] hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-2 cursor-pointer"
              >
                <FileText className="w-5 h-5 group-hover:rotate-6 transition-transform" />
                <span>Lihat & Unduh CV</span>
                <Sparkles className="w-4 h-4 text-cyan-200" />
              </button>

              {/* LinkedIn Button */}
              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className={`px-5 py-3 rounded-xl font-semibold text-sm sm:text-base border flex items-center gap-2 transition-all duration-300 hover:scale-105 active:scale-95 ${
                  darkMode
                    ? 'bg-[#0d1430]/80 border-blue-500/40 text-blue-300 hover:bg-[#15204c] hover:border-blue-400 hover:shadow-[0_0_20px_rgba(44,103,237,0.4)]'
                    : 'bg-white border-blue-300 text-[#2c67ed] hover:bg-blue-50 hover:shadow-[0_4px_15px_rgba(44,103,237,0.25)]'
                }`}
              >
                <LinkedinIcon className="w-5 h-5 text-[#2c67ed]" />
                <span>LinkedIn Profile</span>
              </a>

              {/* Portfolio Presentation Deck Button */}
              <button
                onClick={onOpenPortfolioModal}
                className={`px-5 py-3 rounded-xl font-semibold text-sm sm:text-base border flex items-center gap-2 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer ${
                  darkMode
                    ? 'bg-white/5 border-slate-700/60 text-slate-200 hover:bg-white/10'
                    : 'bg-white/80 border-slate-300 text-slate-800 hover:bg-white'
                }`}
              >
                <Briefcase className="w-4 h-4 text-cyan-400" />
                <span>Portofolio PDF</span>
                <Download className="w-4 h-4 opacity-70" />
              </button>
            </div>

            {/* Quick Micro Badges */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs font-medium">
              <div
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border ${
                  darkMode ? 'bg-white/5 border-white/10 text-slate-300' : 'bg-white/70 border-blue-200 text-slate-700'
                }`}
              >
                <GraduationCap className="w-4 h-4 text-[#2c67ed]" />
                <span>IPK 3.79 / 4.00</span>
              </div>
              <div
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border ${
                  darkMode ? 'bg-white/5 border-white/10 text-slate-300' : 'bg-white/70 border-blue-200 text-slate-700'
                }`}
              >
                <Briefcase className="w-4 h-4 text-[#2c67ed]" />
                <span>Ex-Ketua HMIF UMM</span>
              </div>
              <div
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border ${
                  darkMode ? 'bg-white/5 border-white/10 text-slate-300' : 'bg-white/70 border-blue-200 text-slate-700'
                }`}
              >
                <Mail className="w-4 h-4 text-[#2c67ed]" />
                <span>Malang, Jawa Timur</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Cosmic Profile Portrait & Holographic Frame */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.2, ease: 'easeOut' }}
            className="lg:col-span-5 flex justify-center items-center relative"
          >
            {/* Outer Rotating Glowing Cosmic Orbit */}
            <div className="absolute w-[340px] h-[340px] sm:w-[420px] sm:h-[420px] rounded-full border border-dashed border-[#2c67ed]/40 animate-orbit pointer-events-none" />
            <div className="absolute w-[390px] h-[390px] sm:w-[470px] sm:h-[470px] rounded-full border border-blue-400/20 animate-orbit-reverse pointer-events-none hidden sm:block" />

            {/* Glowing Backdrop Aura */}
            <div className="absolute w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-gradient-to-tr from-[#2c67ed]/40 via-blue-500/20 to-indigo-600/30 blur-3xl pointer-events-none" />

            {/* Portrait Container */}
            <div className="relative group">
              {/* Inner Glowing Ring */}
              <div className="absolute -inset-2 rounded-3xl sm:rounded-[36px] bg-gradient-to-tr from-[#2c67ed] via-cyan-400 to-indigo-600 opacity-80 blur-md group-hover:opacity-100 group-hover:blur-lg transition-all duration-500" />

              {/* Holographic Border Box */}
              <div
                className={`relative rounded-3xl sm:rounded-[32px] p-2 sm:p-2.5 transition-all duration-500 ${
                  darkMode
                    ? 'bg-[#090f26] border border-[#2c67ed]/60 shadow-[0_0_35px_rgba(44,103,237,0.5)]'
                    : 'bg-white border-2 border-[#2c67ed]/50 shadow-[0_10px_40px_rgba(44,103,237,0.35)]'
                }`}
              >
                {/* Profile Image */}
                <div className="relative w-64 h-80 sm:w-76 sm:h-96 rounded-2xl sm:rounded-[26px] overflow-hidden bg-slate-900">
                  <img
                    src={PERSONAL_INFO.photoUrl}
                    alt={PERSONAL_INFO.name}
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  />

                  {/* Glassmorphic Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />

                  {/* Floating Badges on Photo */}
                  <div className="absolute bottom-3 left-3 right-3 p-3 rounded-xl backdrop-blur-md bg-black/60 border border-white/20 text-white shadow-lg">
                    <p className="text-xs font-bold text-cyan-300 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
                      Yogi Pratama N.
                    </p>
                    <p className="text-[11px] text-slate-300 truncate">
                      Web Dev • UI/UX • Graphic • Admin
                    </p>
                  </div>
                </div>
              </div>

              {/* Floating Orbit Stat Badges */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className={`absolute -top-4 -right-4 sm:-right-6 px-3.5 py-2 rounded-2xl backdrop-blur-xl border text-xs font-bold shadow-xl flex items-center gap-2 ${
                  darkMode
                    ? 'bg-[#0e163b]/90 border-[#2c67ed]/60 text-white shadow-[0_0_20px_rgba(44,103,237,0.4)]'
                    : 'bg-white/95 border-blue-300 text-slate-800 shadow-[0_6px_20px_rgba(44,103,237,0.25)]'
                }`}
              >
                <div className="w-7 h-7 rounded-full bg-[#2c67ed] text-white flex items-center justify-center font-black text-xs shadow-md">
                  ★
                </div>
                <div>
                  <div className="text-[10px] opacity-70 leading-none">Status Lulus</div>
                  <div className="text-xs font-extrabold text-[#2c67ed]">IPK 3.79 Cum Laude</div>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                className={`absolute -bottom-4 -left-4 sm:-left-6 px-3.5 py-2 rounded-2xl backdrop-blur-xl border text-xs font-bold shadow-xl flex items-center gap-2 ${
                  darkMode
                    ? 'bg-[#0e163b]/90 border-[#2c67ed]/60 text-white shadow-[0_0_20px_rgba(44,103,237,0.4)]'
                    : 'bg-white/95 border-blue-300 text-slate-800 shadow-[0_6px_20px_rgba(44,103,237,0.25)]'
                }`}
              >
                <div className="w-7 h-7 rounded-full bg-cyan-500 text-white flex items-center justify-center font-black text-xs shadow-md">
                  🚀
                </div>
                <div>
                  <div className="text-[10px] opacity-70 leading-none">Leadership</div>
                  <div className="text-xs font-extrabold text-cyan-400">Ketua Himpunan HMIF</div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Scroll Down Indicator */}
        <div className="mt-16 flex flex-col items-center justify-center">
          <a
            href="#about"
            className={`flex flex-col items-center gap-1.5 text-xs font-medium transition-all duration-300 hover:scale-110 ${
              darkMode ? 'text-slate-400 hover:text-cyan-400' : 'text-slate-600 hover:text-[#2c67ed]'
            }`}
          >
            <span>Jelajahi Profil Lengkap</span>
            <ChevronDown className="w-4 h-4 animate-bounce text-[#2c67ed]" />
          </a>
        </div>
      </div>
    </section>
  )
}
