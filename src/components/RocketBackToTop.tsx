import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles } from 'lucide-react'

interface RocketBackToTopProps {
  darkMode: boolean
}

export const RocketBackToTop: React.FC<RocketBackToTopProps> = ({ darkMode }) => {
  const [showRocket, setShowRocket] = useState(false)
  const [isLaunching, setIsLaunching] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [fuelPercent, setFuelPercent] = useState(100)

  useEffect(() => {
    const handleScroll = () => {
      // Calculate scroll progress for fuel gauge
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight
      const currentScroll = window.scrollY
      const progress = totalScroll > 0 ? Math.min(Math.round((currentScroll / totalScroll) * 100), 100) : 0
      setFuelPercent(progress)

      if (window.scrollY > 350) {
        setShowRocket(true)
      } else if (!isLaunching) {
        setShowRocket(false)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isLaunching])

  const handleLaunch = () => {
    if (isLaunching) return
    setIsLaunching(true)

    // Smooth scroll to top of universe
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })

    // Reset rocket position after blast-off animation finishes
    setTimeout(() => {
      setIsLaunching(false)
      setShowRocket(false)
    }, 1200)
  }

  return (
    <AnimatePresence>
      {showRocket && (
        <div className="fixed bottom-6 right-6 z-50 select-none">
          {/* Tooltip Speech Bubble on Hover */}
          <AnimatePresence>
            {isHovered && !isLaunching && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 5, scale: 0.8 }}
                className={`absolute bottom-full right-0 mb-3 px-3 py-1.5 rounded-2xl text-[11px] font-bold shadow-xl whitespace-nowrap flex items-center gap-1.5 border pointer-events-none ${
                  darkMode
                    ? 'bg-[#0b122e]/95 text-cyan-300 border-blue-500/50 shadow-[0_0_20px_rgba(44,103,237,0.5)]'
                    : 'bg-white/95 text-[#2c67ed] border-blue-200 shadow-[0_4px_20px_rgba(44,103,237,0.25)]'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin" />
                <span>Luncurkan ke Orbit Atas! 🚀</span>
                <span className="text-[9px] opacity-75">({fuelPercent}%)</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Rocket Launcher Button */}
          <motion.button
            type="button"
            onClick={handleLaunch}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            initial={{ opacity: 0, scale: 0.5, y: 40 }}
            animate={
              isLaunching
                ? {
                    y: -window.innerHeight - 250,
                    x: [0, -3, 3, -2, 0],
                    scale: [1, 1.25, 0.9],
                    opacity: [1, 1, 0.8, 0],
                    transition: { duration: 1.1, ease: 'easeIn' },
                  }
                : {
                    opacity: 1,
                    scale: 1,
                    y: [0, -6, 0],
                    transition: {
                      y: {
                        duration: 2.2,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      },
                    },
                  }
            }
            exit={{ opacity: 0, scale: 0.5, y: 40 }}
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.95 }}
            className="relative group cursor-pointer focus:outline-none p-1"
            aria-label="Kembali ke atas dengan Roket"
          >
            {/* Glowing Aura Ring */}
            <div
              className={`absolute -inset-2 rounded-full blur-md opacity-60 group-hover:opacity-100 transition-opacity ${
                darkMode ? 'bg-cyan-500/40' : 'bg-blue-500/30'
              }`}
            />

            {/* Main Rocket SVG Container */}
            <div
              className={`relative w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center border shadow-2xl backdrop-blur-xl transition-all ${
                darkMode
                  ? 'bg-[#090f28]/90 border-blue-500/60 shadow-[0_0_25px_rgba(44,103,237,0.6)] group-hover:border-cyan-400'
                  : 'bg-white/90 border-[#2c67ed]/40 shadow-[0_8px_30px_rgba(44,103,237,0.35)] group-hover:border-[#2c67ed]'
              }`}
            >
              {/* Cute Vector Rocket SVG */}
              <svg
                viewBox="0 0 64 64"
                className={`w-10 h-10 sm:w-11 sm:h-11 transform transition-transform duration-300 ${
                  isHovered ? '-rotate-12 scale-110' : '-rotate-45'
                }`}
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Rocket Body */}
                <path
                  d="M32 6C32 6 44 14 44 34L32 44L20 34C20 14 32 6 32 6Z"
                  fill="url(#rocketBodyGrad)"
                  stroke="#1e293b"
                  strokeWidth="1.5"
                />

                {/* Rocket Nose Tip */}
                <path
                  d="M32 6C32 6 38 12 39 18H25C26 12 32 6 32 6Z"
                  fill="#ef4444"
                />

                {/* Left Fin */}
                <path
                  d="M20 32L12 42C12 42 16 44 22 42L20 32Z"
                  fill="#2563eb"
                  stroke="#1e293b"
                  strokeWidth="1.2"
                />

                {/* Right Fin */}
                <path
                  d="M44 32L52 42C52 42 48 44 42 42L44 32Z"
                  fill="#2563eb"
                  stroke="#1e293b"
                  strokeWidth="1.2"
                />

                {/* Center Engine Nozzle */}
                <path
                  d="M27 43H37L35 47H29L27 43Z"
                  fill="#475569"
                />

                {/* Porthole Window with Astronaut Inside */}
                <circle cx="32" cy="25" r="5.5" fill="#38bdf8" stroke="#ffffff" strokeWidth="1.2" />
                <circle cx="33" cy="24" r="2.2" fill="#0f172a" />
                <circle cx="34" cy="23.2" r="0.8" fill="#ffffff" />

                {/* Dynamic Rocket Thruster Flames */}
                <motion.g
                  animate={{
                    scaleY: isLaunching ? [1.8, 2.4, 2] : [0.9, 1.3, 0.9],
                    opacity: isLaunching ? 1 : [0.8, 1, 0.8],
                  }}
                  transition={{
                    duration: 0.2,
                    repeat: Infinity,
                    repeatType: 'reverse',
                  }}
                  style={{ transformOrigin: '32px 47px' }}
                >
                  {/* Outer Orange Flame */}
                  <path
                    d="M28 47C28 47 26 56 32 62C38 56 36 47 36 47Z"
                    fill="url(#outerFlameGrad)"
                  />
                  {/* Inner Yellow Flame Core */}
                  <path
                    d="M30 47C30 47 29 53 32 58C35 53 34 47 34 47Z"
                    fill="#fef08a"
                  />
                </motion.g>

                {/* Gradients */}
                <defs>
                  <linearGradient id="rocketBodyGrad" x1="20" y1="6" x2="44" y2="44" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#ffffff" />
                    <stop offset="0.6" stopColor="#e2e8f0" />
                    <stop offset="1" stopColor="#94a3b8" />
                  </linearGradient>
                  <linearGradient id="outerFlameGrad" x1="32" y1="47" x2="32" y2="62" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#f97316" />
                    <stop offset="0.7" stopColor="#ef4444" />
                    <stop offset="1" stopColor="rgba(239, 68, 68, 0)" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Trailing Smoke Sparks during Launch */}
              {isLaunching && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none">
                  <motion.div
                    initial={{ scale: 0.5, opacity: 1, y: 0 }}
                    animate={{ scale: 3, opacity: 0, y: 40 }}
                    transition={{ duration: 0.5, repeat: Infinity }}
                    className="w-4 h-4 rounded-full bg-gradient-to-r from-amber-400 to-red-500 blur-sm"
                  />
                  <div className="w-1.5 h-16 bg-gradient-to-b from-cyan-400 via-amber-300 to-transparent blur-[1px]" />
                </div>
              )}
            </div>
          </motion.button>
        </div>
      )}
    </AnimatePresence>
  )
}
