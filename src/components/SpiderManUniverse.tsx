import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Zap, Camera, Sparkles, X, Volume2, Shield } from 'lucide-react'

interface SpiderManUniverseProps {
  darkMode: boolean
}

type SpideyActionType = 'idle' | 'swing' | 'sense' | 'pizza' | 'selfie' | 'flip'

export const SpiderManUniverse: React.FC<SpiderManUniverseProps> = ({ darkMode }) => {
  // State for the full-screen swinging Spider-Man
  const [isSwinging, setIsSwinging] = useState(false)
  const [swingProgress, setSwingProgress] = useState(0)

  // State for Spider-Sense Global Alert
  const [isSpiderSenseActive, setIsSpiderSenseActive] = useState(false)

  // State for Spidey Selfie Flash
  const [isSelfieFlashing, setIsSelfieFlashing] = useState(false)

  // State for Pizza Time
  const [isPizzaTime, setIsPizzaTime] = useState(false)

  // State for Spidey Backflip
  const [isFlipping, setIsFlipping] = useState(false)

  // State for Spidey Speech Dialogue
  const [speechText, setSpeechText] = useState<string | null>(null)

  // State for Action Menu
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // Periodic automatic web-swing patrol across screen (every 40s)
  useEffect(() => {
    const swingInterval = setInterval(() => {
      triggerWebSwing()
    }, 45000)
    return () => clearInterval(swingInterval)
  }, [])

  // Trigger Full Screen Web Swing
  const triggerWebSwing = () => {
    if (isSwinging) return
    setIsSwinging(true)
    setSpeechText('Wooohooo! Menjelajahi semesta portofolio Yogi! 🕸️🚀')

    setTimeout(() => {
      setIsSwinging(false)
    }, 4200)
  }

  // Trigger Spider-Sense Tingle Alarm
  const triggerSpiderSense = () => {
    setIsSpiderSenseActive(true)
    setSpeechText('⚡ SPIDER-SENSE TINGLING! Seseorang sedang mengagumi portofolio ini!')
    setTimeout(() => {
      setIsSpiderSenseActive(false)
    }, 2800)
  }

  // Trigger Spidey Selfie Flash
  const triggerSelfie = () => {
    setIsSelfieFlashing(true)
    setSpeechText('📸 Smile! Foto kenangan bareng pengunjung terbaik semesta!')
    setTimeout(() => {
      setIsSelfieFlashing(false)
    }, 1500)
  }

  // Trigger Pizza Time
  const triggerPizza = () => {
    setIsPizzaTime(true)
    setSpeechText('🍕 Pizza Time! Istirahat sejenak setelah ngoding seharian!')
    setTimeout(() => {
      setIsPizzaTime(false)
    }, 3200)
  }

  // Trigger Backflip
  const triggerFlip = () => {
    setIsFlipping(true)
    setSpeechText('🤸 360° Web-Spin! Gerakan akrobatik khas Peter Parker!')
    setTimeout(() => {
      setIsFlipping(false)
    }, 1200)
  }

  return (
    <>
      {/* ============================================================ */}
      {/* 1. SPIDER-SENSE SCREEN-WIDE TINGLE SHOCKWAVE OVERLAY        */}
      {/* ============================================================ */}
      <AnimatePresence>
        {isSpiderSenseActive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 pointer-events-none flex flex-col items-center justify-center overflow-hidden"
          >
            {/* Pulsing Red & Blue Screen Vignette */}
            <motion.div
              animate={{
                boxShadow: [
                  'inset 0 0 100px rgba(239,68,68,0.7)',
                  'inset 0 0 140px rgba(44,103,237,0.7)',
                  'inset 0 0 100px rgba(239,68,68,0.7)',
                ],
              }}
              transition={{ duration: 0.4, repeat: 6 }}
              className="absolute inset-0"
            />

            {/* Spider-Sense Electric Wavy Arcs radiating from top */}
            <motion.div
              initial={{ scale: 0.5, y: -50, opacity: 0 }}
              animate={{ scale: [1, 1.25, 1], y: 0, opacity: 1 }}
              exit={{ opacity: 0, scale: 1.5 }}
              transition={{ duration: 0.4 }}
              className="relative z-10 flex flex-col items-center"
            >
              {/* Comic Tingle Waves SVG */}
              <svg viewBox="0 0 200 80" className="w-64 h-24 filter drop-shadow-[0_0_15px_rgba(239,68,68,0.9)]">
                <motion.path
                  d="M10 70C30 20 60 10 100 10C140 10 170 20 190 70"
                  fill="none"
                  stroke="#ef4444"
                  strokeWidth="4"
                  strokeDasharray="8 6"
                  animate={{ strokeDashoffset: [0, -40] }}
                  transition={{ duration: 0.6, repeat: Infinity, ease: 'linear' }}
                />
                <motion.path
                  d="M30 60C50 25 70 20 100 20C130 20 150 25 170 60"
                  fill="none"
                  stroke="#facc15"
                  strokeWidth="3.5"
                  strokeDasharray="6 4"
                  animate={{ strokeDashoffset: [0, 30] }}
                  transition={{ duration: 0.5, repeat: Infinity, ease: 'linear' }}
                />
                <motion.path
                  d="M50 55C65 30 80 28 100 28C120 28 135 30 150 55"
                  fill="none"
                  stroke="#38bdf8"
                  strokeWidth="3"
                />
              </svg>

              <div className="mt-2 px-5 py-2 rounded-2xl bg-black/90 border-2 border-red-500 shadow-[0_0_30px_rgba(239,68,68,0.9)] flex items-center gap-2 text-white font-black tracking-widest text-sm uppercase animate-bounce">
                <Zap className="w-5 h-5 text-amber-300 animate-pulse" />
                <span>SPIDER-SENSE TINGLING! ⚡⚡⚡</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ============================================================ */}
      {/* 2. CAMERA SELFIE FLASHBANG EFFECT                           */}
      {/* ============================================================ */}
      <AnimatePresence>
        {isSelfieFlashing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0.9, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="fixed inset-0 z-50 bg-white pointer-events-none flex items-center justify-center"
          >
            <div className="p-4 rounded-3xl bg-black/80 text-white font-black text-xl flex items-center gap-2 border border-white/40 shadow-2xl">
              <span>📸 FLASH! *CHEESE!* 🕷️</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ============================================================ */}
      {/* 3. DYNAMIC WEB-SWINGING SPIDER-MAN ACROSS THE SCREEN        */}
      {/* ============================================================ */}
      <AnimatePresence>
        {isSwinging && (
          <motion.div
            initial={{ x: '-15vw', y: '20vh' }}
            animate={{
              x: ['-15vw', '30vw', '70vw', '115vw'],
              y: ['20vh', '55vh', '30vh', '15vh'],
              rotate: [35, -25, 40, -15],
            }}
            transition={{
              duration: 4.2,
              ease: 'easeInOut',
            }}
            className="fixed z-40 pointer-events-none select-none"
          >
            {/* Visual Web Line Attached to Ceiling */}
            <div className="relative flex flex-col items-center">
              {/* Web string hanging up into the sky */}
              <div
                className="w-[2px] h-[35vh] bg-gradient-to-b from-transparent via-white to-cyan-200 shadow-[0_0_8px_rgba(255,255,255,0.9)] origin-bottom -rotate-12"
                style={{ transformOrigin: 'bottom center' }}
              />

              {/* Spider-Man in Iconic Mid-Air Web-Sling Pose */}
              <div className="w-20 h-24 -mt-2 filter drop-shadow-[0_8px_20px_rgba(239,68,68,0.8)]">
                <svg viewBox="0 0 80 96" className="w-full h-full">
                  {/* Shooting Web Arm */}
                  <path d="M40 35L48 10L52 6" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" />
                  <path d="M48 10L60 2" stroke="#ffffff" strokeWidth="1.5" strokeDasharray="3 3" />

                  {/* Body Torso */}
                  <path d="M30 35C30 35 48 30 52 48L44 65L32 62L30 35Z" fill="#2563eb" stroke="#1e293b" strokeWidth="1.5" />
                  <path d="M33 34C33 34 44 31 47 44L41 58L34 56L33 34Z" fill="#dc2626" />

                  {/* Spider Emblem on chest */}
                  <circle cx="39" cy="45" r="2.5" fill="#0f172a" />
                  <path d="M36 43L34 40M42 43L44 40M36 47L33 50M42 47L45 50" stroke="#0f172a" strokeWidth="1" />

                  {/* Spider-Man Mask */}
                  <circle cx="32" cy="24" r="14" fill="#dc2626" stroke="#1e293b" strokeWidth="1.5" />
                  <path d="M32 10V38M18 24H46" stroke="#991b1b" strokeWidth="0.8" />
                  <path d="M22 14L42 34M22 34L42 14" stroke="#991b1b" strokeWidth="0.8" />

                  {/* White Expressive Eyes */}
                  <path d="M23 21C23 21 27 19 30 24C30 26 27 28 24 26Z" fill="#ffffff" stroke="#0f172a" strokeWidth="1.5" />
                  <path d="M41 21C41 21 37 19 34 24C34 26 37 28 40 26Z" fill="#ffffff" stroke="#0f172a" strokeWidth="1.5" />

                  {/* Acrobatic Legs in Flying Jump */}
                  {/* Left Leg bent */}
                  <path d="M32 62L20 72L12 66" stroke="#2563eb" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                  <path d="M12 66L8 70" stroke="#dc2626" strokeWidth="6" strokeLinecap="round" fill="none" />

                  {/* Right Leg stretched */}
                  <path d="M44 65L58 78L70 86" stroke="#2563eb" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                  <path d="M70 86L76 89" stroke="#dc2626" strokeWidth="6" strokeLinecap="round" fill="none" />

                  {/* Trailing Web Blast particles */}
                  <circle cx="48" cy="8" r="3" fill="#ffffff" />
                  <circle cx="52" cy="5" r="2" fill="#38bdf8" />
                </svg>
              </div>

              {/* Trailing Stardust Sparkles */}
              <div className="flex gap-1 text-sm pointer-events-none -mt-4">
                <span className="animate-spin text-cyan-300">🕸️</span>
                <span className="text-amber-300">✨</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ============================================================ */}
      {/* 4. CORNER SPIDER-WEB WITH CRAWLING MINI SPIDER (Top Left)    */}
      {/* ============================================================ */}
      <div className="fixed top-0 left-0 z-30 pointer-events-auto select-none group">
        <svg
          viewBox="0 0 100 100"
          className="w-20 h-20 sm:w-28 sm:h-28 opacity-40 group-hover:opacity-90 transition-opacity drop-shadow-[0_0_10px_rgba(44,103,237,0.5)]"
        >
          {/* Radial Web Strands */}
          <line x1="0" y1="0" x2="100" y2="10" stroke={darkMode ? '#93c5fd' : '#2c67ed'} strokeWidth="1" />
          <line x1="0" y1="0" x2="85" y2="45" stroke={darkMode ? '#93c5fd' : '#2c67ed'} strokeWidth="1" />
          <line x1="0" y1="0" x2="60" y2="75" stroke={darkMode ? '#93c5fd' : '#2c67ed'} strokeWidth="1" />
          <line x1="0" y1="0" x2="20" y2="100" stroke={darkMode ? '#93c5fd' : '#2c67ed'} strokeWidth="1" />
          {/* Concentric Arc Webbing */}
          <path d="M20 2Q15 15 2 20" stroke={darkMode ? '#93c5fd' : '#2c67ed'} strokeWidth="1" fill="none" />
          <path d="M45 4Q32 32 4 45" stroke={darkMode ? '#93c5fd' : '#2c67ed'} strokeWidth="1" fill="none" />
          <path d="M70 7Q50 50 7 70" stroke={darkMode ? '#93c5fd' : '#2c67ed'} strokeWidth="1" fill="none" />
          <path d="M95 10Q70 70 10 95" stroke={darkMode ? '#93c5fd' : '#2c67ed'} strokeWidth="1" fill="none" />
        </svg>

        {/* Tiny Crawling Spider */}
        <motion.div
          animate={{
            y: [0, 15, 0],
            x: [0, 8, 0],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-10 left-10 text-xs cursor-pointer hover:scale-150 transition-transform"
          title="Laba-laba ramah penjaga web! 🕷️"
          onClick={triggerSpiderSense}
        >
          🕷️
        </motion.div>
      </div>

      {/* ============================================================ */}
      {/* 5. CUTE STARK SPIDER-BOT DRONE (Patrolling Top Navbar Edge)   */}
      {/* ============================================================ */}
      <motion.div
        animate={{
          x: ['25vw', '75vw', '25vw'],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="fixed top-2 z-40 hidden xl:flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-slate-900/80 border border-red-500/40 text-[10px] text-white shadow-[0_0_15px_rgba(239,68,68,0.4)] cursor-pointer hover:scale-110 backdrop-blur-md"
        onClick={() => {
          setSpeechText('🤖 Stark Spider-Bot: Semua sistem dan keamanan portofolio 100% optimal!')
        }}
        title="Stark Spider-Bot Patroli 🤖🕷️"
      >
        <span className="animate-spin" style={{ animationDuration: '6s' }}>🕷️</span>
        <span className="font-mono text-cyan-300 font-bold">SPIDER-BOT v2.0</span>
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
      </motion.div>

      {/* ============================================================ */}
      {/* 6. SPIDER-MAN ACTION CONTROLLER DOCK & PIZZA/SELFIE STATUS   */}
      {/* ============================================================ */}
      <div className="fixed bottom-6 right-24 sm:right-28 z-40 select-none">
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: 15 }}
              className={`absolute bottom-full right-0 mb-3 w-64 p-3.5 rounded-3xl border shadow-2xl backdrop-blur-2xl ${
                darkMode
                  ? 'bg-[#090f28]/95 border-red-500/50 text-white shadow-[0_0_35px_rgba(239,68,68,0.4)]'
                  : 'bg-white/95 border-red-300 text-slate-800 shadow-[0_12px_35px_rgba(239,68,68,0.25)]'
              }`}
            >
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-red-500/30">
                <span className="flex items-center gap-1.5 text-xs font-black text-red-500 uppercase tracking-wider">
                  <span>🕷️</span>
                  <span>Aksi Spider-Man</span>
                </span>
                <button
                  type="button"
                  onClick={() => setIsMenuOpen(false)}
                  className="text-slate-400 hover:text-white p-0.5 rounded text-xs"
                >
                  ✕
                </button>
              </div>

              {/* Action Buttons Grid */}
              <div className="grid grid-cols-2 gap-1.5">
                <button
                  type="button"
                  onClick={triggerWebSwing}
                  className="p-2 rounded-xl text-left bg-red-600/15 hover:bg-red-600/30 border border-red-500/40 transition-colors flex items-center gap-1.5 text-xs font-bold text-white cursor-pointer"
                >
                  <span className="text-base">🕸️</span>
                  <span>Ayunkan Jaring</span>
                </button>

                <button
                  type="button"
                  onClick={triggerSpiderSense}
                  className="p-2 rounded-xl text-left bg-amber-500/15 hover:bg-amber-500/30 border border-amber-500/40 transition-colors flex items-center gap-1.5 text-xs font-bold text-amber-300 cursor-pointer"
                >
                  <span className="text-base">⚡</span>
                  <span>Spider-Sense</span>
                </button>

                <button
                  type="button"
                  onClick={triggerPizza}
                  className="p-2 rounded-xl text-left bg-orange-500/15 hover:bg-orange-500/30 border border-orange-500/40 transition-colors flex items-center gap-1.5 text-xs font-bold text-orange-300 cursor-pointer"
                >
                  <span className="text-base">🍕</span>
                  <span>Pizza Time!</span>
                </button>

                <button
                  type="button"
                  onClick={triggerSelfie}
                  className="p-2 rounded-xl text-left bg-blue-500/15 hover:bg-blue-500/30 border border-blue-500/40 transition-colors flex items-center gap-1.5 text-xs font-bold text-cyan-300 cursor-pointer"
                >
                  <span className="text-base">📸</span>
                  <span>Selfie Blitz</span>
                </button>
              </div>

              {/* Pizza Eating Animation Display if active */}
              {isPizzaTime && (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="mt-2.5 p-2 rounded-xl bg-orange-950/80 border border-orange-500/50 flex items-center gap-2 text-xs font-bold text-orange-200"
                >
                  <span className="text-xl animate-bounce">🍕</span>
                  <span>*Nyam nyam!* Pizza New York terenak sedunia!</span>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating Spidey Action Controller Trigger Button */}
        <motion.button
          type="button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="px-3.5 py-2 rounded-full bg-gradient-to-r from-red-600 via-rose-600 to-[#2c67ed] text-white text-xs font-black shadow-[0_0_20px_rgba(239,68,68,0.7)] border border-red-300/40 flex items-center gap-1.5 hover:shadow-[0_0_30px_rgba(239,68,68,0.9)] cursor-pointer"
        >
          <span className="text-sm animate-pulse">🕷️</span>
          <span>Spidey Action</span>
        </motion.button>
      </div>

      {/* ============================================================ */}
      {/* 7. SPIDEY COMIC SPEECH BUBBLE                               */}
      {/* ============================================================ */}
      <AnimatePresence>
        {speechText && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            className="fixed bottom-28 right-24 sm:right-32 z-50 max-w-xs pointer-events-auto select-none"
          >
            <div
              className={`p-3.5 rounded-2xl border shadow-2xl backdrop-blur-2xl ${
                darkMode
                  ? 'bg-[#090f28]/95 border-red-500/50 text-white shadow-[0_0_30px_rgba(239,68,68,0.5)]'
                  : 'bg-white/95 border-red-300 text-slate-800 shadow-[0_8px_30px_rgba(239,68,68,0.3)]'
              }`}
            >
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <span className="text-[11px] font-black text-red-500 flex items-center gap-1">
                  <span>🕷️</span>
                  <span>Spider-Man Berbicara:</span>
                </span>
                <button
                  type="button"
                  onClick={() => setSpeechText(null)}
                  className="text-slate-400 hover:text-white p-0.5 text-xs"
                >
                  ✕
                </button>
              </div>

              <p className="text-xs font-semibold leading-relaxed text-slate-200">
                "{speechText}"
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
