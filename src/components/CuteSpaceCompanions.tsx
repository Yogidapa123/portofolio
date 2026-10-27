import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, MessageCircle, X, Heart, Coffee, Star } from 'lucide-react'

interface CuteSpaceCompanionsProps {
  darkMode: boolean
}

const QUOTES = [
  'Halo penjelajah! Selamat datang di galaksi Yogi! 👨‍🚀✨',
  'Pst! Klik roket di pojok kanan bawah buat meluncur balik ke atas! 🚀',
  'Coba geser foto di section Tentang Saya, ada alter-ego Spider-Man! 🕷️🕸️',
  '22+ Sertifikat Resmi & IPK 3.79 Cum Laude siap berkontribusi! 🏆',
  'Laravel, React, Flutter, hingga Graphic Design? Lengkap di sini! 💻🎨',
  'Jangan lupa ngopi & tetap semangat menjelajah ya! ☕🛸',
  'Tertarik berkolaborasi? Langsung hubungi via form Kontak di bawah! 📩',
]

export const CuteSpaceCompanions: React.FC<CuteSpaceCompanionsProps> = ({ darkMode }) => {
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0)
  const [isBubbleOpen, setIsBubbleOpen] = useState(false)
  const [isDancing, setIsDancing] = useState(false)
  const [floatingParticles, setFloatingParticles] = useState<{ id: number; emoji: string; x: number }[]>([])
  const [isUfoVisible, setIsUfoVisible] = useState(true)
  const [isUfoBeaming, setIsUfoBeaming] = useState(false)

  // Auto-pop a greeting after a few seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsBubbleOpen(true)
    }, 2500)
    return () => clearTimeout(timer)
  }, [])

  // Cycle quotes periodically
  const nextQuote = () => {
    setCurrentQuoteIndex((prev) => (prev + 1) % QUOTES.length)
    setIsBubbleOpen(true)
  }

  const handleCompanionClick = () => {
    setIsDancing(true)
    nextQuote()

    // Spawn cute floating particle
    const emojis = ['⭐', '✨', '💖', '☕', '🚀', '🌟']
    const newParticle = {
      id: Date.now(),
      emoji: emojis[Math.floor(Math.random() * emojis.length)],
      x: (Math.random() - 0.5) * 40,
    }
    setFloatingParticles((prev) => [...prev.slice(-4), newParticle])

    setTimeout(() => {
      setIsDancing(false)
    }, 1000)
  }

  return (
    <>
      {/* 1. FLOATING MINI ASTRO-BOT COMPANION (Bottom Left) */}
      <div className="fixed bottom-6 left-6 z-40 select-none hidden sm:block">
        {/* Floating Particles Burst on Click */}
        {floatingParticles.map((p) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 1, y: 0, x: p.x, scale: 0.8 }}
            animate={{ opacity: 0, y: -70, scale: 1.4 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            onAnimationComplete={() => {
              setFloatingParticles((prev) => prev.filter((item) => item.id !== p.id))
            }}
            className="absolute -top-4 left-6 pointer-events-none text-base"
          >
            {p.emoji}
          </motion.div>
        ))}

        {/* Speech Bubble Dialog */}
        <AnimatePresence>
          {isBubbleOpen && (
            <motion.div
              initial={{ opacity: 0, y: 15, scale: 0.85 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.85 }}
              transition={{ type: 'spring', damping: 20, stiffness: 300 }}
              className={`absolute bottom-full left-0 mb-3 w-64 p-3 rounded-2xl text-xs font-medium shadow-2xl border backdrop-blur-xl ${
                darkMode
                  ? 'bg-[#090f28]/95 text-slate-100 border-cyan-500/40 shadow-[0_0_25px_rgba(44,103,237,0.35)]'
                  : 'bg-white/95 text-slate-800 border-blue-200 shadow-[0_8px_30px_rgba(44,103,237,0.2)]'
              }`}
            >
              <div className="flex items-start justify-between gap-1.5 mb-1">
                <span className="flex items-center gap-1 font-bold text-[11px] text-[#2c67ed]">
                  <Sparkles className="w-3 h-3 text-amber-400 animate-spin" />
                  <span>Astro-Bot Yogi</span>
                </span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    setIsBubbleOpen(false)
                  }}
                  className="text-slate-400 hover:text-white p-0.5"
                  aria-label="Tutup pesan"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              <p className="leading-relaxed text-[11px] text-slate-300">
                {QUOTES[currentQuoteIndex]}
              </p>

              {/* Click to change quote */}
              <button
                type="button"
                onClick={nextQuote}
                className="mt-2 text-[10px] text-cyan-400 hover:text-cyan-300 font-bold flex items-center gap-1 cursor-pointer"
              >
                <span>Sentuh aku lagi untuk pesan baru</span>
                <span>✨</span>
              </button>

              {/* Bubble Tail */}
              <div
                className={`absolute top-full left-6 -mt-1 w-3 h-3 rotate-45 border-r border-b ${
                  darkMode ? 'bg-[#090f28] border-cyan-500/40' : 'bg-white border-blue-200'
                }`}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Astronaut Avatar Character */}
        <motion.div
          onClick={handleCompanionClick}
          animate={
            isDancing
              ? {
                  rotate: [0, -20, 20, -15, 360],
                  scale: [1, 1.2, 0.95, 1.1, 1],
                  y: [0, -15, 0],
                }
              : {
                  y: [0, -8, 0],
                  rotate: [0, 3, -3, 0],
                }
          }
          transition={
            isDancing
              ? { duration: 0.9, ease: 'easeInOut' }
              : {
                  duration: 3.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }
          }
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.9 }}
          className="relative cursor-pointer group"
          title="Klik aku! 👨‍🚀"
        >
          {/* Ambient Glow */}
          <div
            className={`absolute -inset-2 rounded-full blur-md opacity-40 group-hover:opacity-90 transition-opacity ${
              darkMode ? 'bg-cyan-400/40' : 'bg-blue-400/30'
            }`}
          />

          {/* Cute Astro-Bot Vector SVG */}
          <div
            className={`relative w-13 h-13 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center p-2 border shadow-xl backdrop-blur-xl transition-all ${
              darkMode
                ? 'bg-[#0b122e]/90 border-blue-500/50 group-hover:border-cyan-400'
                : 'bg-white/90 border-blue-200 group-hover:border-[#2c67ed]'
            }`}
          >
            <svg
              viewBox="0 0 48 48"
              className="w-10 h-10 drop-shadow-md"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Jetpack Wings */}
              <rect x="6" y="16" width="6" height="16" rx="3" fill="#64748b" />
              <rect x="36" y="16" width="6" height="16" rx="3" fill="#64748b" />

              {/* Jetpack Flame subtle puffs */}
              <motion.circle
                cx="9"
                cy="34"
                r="2"
                fill="#38bdf8"
                animate={{ r: [1.5, 2.5, 1.5], opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 0.5, repeat: Infinity }}
              />
              <motion.circle
                cx="39"
                cy="34"
                r="2"
                fill="#38bdf8"
                animate={{ r: [1.5, 2.5, 1.5], opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 0.5, repeat: Infinity, delay: 0.25 }}
              />

              {/* Spacesuit Body */}
              <rect x="12" y="14" width="24" height="22" rx="8" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
              {/* Blue Chest Patch */}
              <rect x="18" y="24" width="12" height="7" rx="2" fill="#2c67ed" />
              <circle cx="21" cy="27.5" r="1.2" fill="#38bdf8" />
              <circle cx="27" cy="27.5" r="1.2" fill="#4ade80" />

              {/* Astronaut Helmet */}
              <circle cx="24" cy="14" r="11" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />

              {/* Helmet Visor with Cute Reflections */}
              <rect x="16" y="8" width="16" height="12" rx="5" fill="#0f172a" />
              <path
                d="M18 10C18 10 20 16 30 16"
                stroke="#38bdf8"
                strokeWidth="1.5"
                strokeLinecap="round"
                opacity="0.8"
              />
              {/* Cute Blinking Visor Eyes */}
              <motion.circle
                cx="21"
                cy="14"
                r="1.8"
                fill="#38bdf8"
                animate={{ scaleY: [1, 0.1, 1] }}
                transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
              />
              <motion.circle
                cx="27"
                cy="14"
                r="1.8"
                fill="#38bdf8"
                animate={{ scaleY: [1, 0.1, 1] }}
                transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
              />

              {/* Helmet Antenna */}
              <line x1="24" y1="3" x2="24" y2="0" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round" />
              <motion.circle
                cx="24"
                cy="0"
                r="2"
                fill="#ef4444"
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 1, repeat: Infinity }}
              />
            </svg>
          </div>
        </motion.div>
      </div>

      {/* 2. CUTE DRIFTING UFO EASTER EGG (Upper Background) */}
      {isUfoVisible && (
        <motion.div
          initial={{ x: -100, y: 120 }}
          animate={{
            x: ['-10vw', '110vw'],
            y: [120, 80, 140, 90, 120],
          }}
          transition={{
            duration: 45,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="fixed top-24 z-20 pointer-events-auto select-none opacity-80 hover:opacity-100 hidden md:block"
        >
          <div
            onClick={() => {
              setIsUfoBeaming(true)
              setTimeout(() => setIsUfoBeaming(false), 2000)
            }}
            className="relative cursor-pointer group"
            title="UFO Misterius! Klik untuk mengaktifkan sinar traktor 🛸"
          >
            {/* Cute Flying Saucer SVG */}
            <svg viewBox="0 0 64 36" className="w-12 h-8 filter drop-shadow-[0_0_8px_rgba(56,189,248,0.7)]">
              {/* Glowing Cockpit Dome */}
              <path d="M22 14C22 8 26 4 32 4C38 4 42 8 42 14Z" fill="#38bdf8" opacity="0.9" />
              <ellipse cx="32" cy="14" rx="28" ry="8" fill="#64748b" />
              <ellipse cx="32" cy="13" rx="24" ry="6" fill="#94a3b8" />

              {/* Blinking Disco Port Lights */}
              <circle cx="16" cy="14" r="2" fill="#ef4444" />
              <circle cx="24" cy="16" r="2" fill="#facc15" />
              <circle cx="32" cy="16.5" r="2" fill="#4ade80" />
              <circle cx="40" cy="16" r="2" fill="#38bdf8" />
              <circle cx="48" cy="14" r="2" fill="#a855f7" />
            </svg>

            {/* Glowing Tractor Beam on Click */}
            <AnimatePresence>
              {isUfoBeaming && (
                <motion.div
                  initial={{ opacity: 0, scaleY: 0 }}
                  animate={{ opacity: 1, scaleY: 1 }}
                  exit={{ opacity: 0, scaleY: 0 }}
                  style={{ transformOrigin: 'top center' }}
                  className="absolute top-6 left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none"
                >
                  <div className="w-16 h-36 bg-gradient-to-b from-cyan-400/50 via-emerald-400/30 to-transparent blur-sm [clip-path:polygon(30%_0%,70%_0%,100%_100%,0%_100%)]" />
                  <motion.div
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: -10, opacity: 1 }}
                    transition={{ duration: 1.2 }}
                    className="absolute bottom-4 text-xs font-bold text-cyan-300 bg-black/70 px-2 py-0.5 rounded-full"
                  >
                    ☕ Coffee beamed!
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </>
  )
}
