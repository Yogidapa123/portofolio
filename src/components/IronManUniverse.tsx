import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Zap, Cpu, Sparkles, X, Activity, ShieldAlert, Radio } from 'lucide-react'

interface IronManUniverseProps {
  darkMode: boolean
}

export const IronManUniverse: React.FC<IronManUniverseProps> = ({ darkMode }) => {
  // 1. Supersonic Fly-By state
  const [isFlying, setIsFlying] = useState(false)

  // 2. Unibeam Chest Blast state
  const [isUnibeamActive, setIsUnibeamActive] = useState(false)

  // 3. JARVIS Holographic HUD Scanner state
  const [isJarvisScanOpen, setIsJarvisScanOpen] = useState(false)

  // 4. Superhero Landing state
  const [isLanding, setIsLanding] = useState(false)

  // 5. Action Menu toggle
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // 6. Tony Stark Speech Bubble
  const [speechText, setSpeechText] = useState<string | null>(null)

  // Automatic periodic fly-by across the sky (every 55s)
  useEffect(() => {
    const flyInterval = setInterval(() => {
      triggerFlyBy()
    }, 55000)
    return () => clearInterval(flyInterval)
  }, [])

  // Trigger Supersonic Flight
  const triggerFlyBy = () => {
    if (isFlying) return
    setIsFlying(true)
    setSpeechText('🚀 Mach 3 activated! Repulsor thrusters at maximum power!')
    setTimeout(() => {
      setIsFlying(false)
    }, 3800)
  }

  // Trigger Unibeam Cannon Blast
  const triggerUnibeam = () => {
    setIsUnibeamActive(true)
    setSpeechText('💥 UNIBEAM 100%! Menghancurkan semua hambatan bug di server!')
    setTimeout(() => {
      setIsUnibeamActive(false)
    }, 2800)
  }

  // Trigger JARVIS Holographic Scan
  const triggerJarvisScan = () => {
    setIsJarvisScanOpen(true)
    setSpeechText('🤖 JARVIS: "Sedang memindai parameter rekam jejak Yogi Pratama..."')
  }

  // Trigger Superhero Landing
  const triggerLanding = () => {
    setIsLanding(true)
    setSpeechText('🦾 Superhero landing! Gaya pendaratan klasik Iron Man Mark 85!')
    setTimeout(() => {
      setIsLanding(false)
    }, 2500)
  }

  return (
    <>
      {/* ============================================================ */}
      {/* 1. SUPERSONIC FLY-BY (Iron Man Sweeping Across the Sky)      */}
      {/* ============================================================ */}
      <AnimatePresence>
        {isFlying && (
          <motion.div
            initial={{ x: '-20vw', y: '35vh', rotate: 12, scale: 0.8 }}
            animate={{
              x: ['-20vw', '40vw', '120vw'],
              y: ['35vh', '25vh', '15vh'],
              rotate: [12, 8, -5],
              scale: [0.9, 1.25, 1],
            }}
            transition={{
              duration: 3.5,
              ease: 'easeInOut',
            }}
            className="fixed z-40 pointer-events-none select-none"
          >
            <div className="relative flex items-center">
              {/* Twin Repulsor Jet Exhaust Flame Behind */}
              <div className="absolute right-full top-1/2 -translate-y-1/2 flex items-center mr-1">
                <motion.div
                  animate={{ scaleX: [1, 1.6, 1.2], opacity: [0.8, 1, 0.9] }}
                  transition={{ duration: 0.15, repeat: Infinity }}
                  className="w-24 sm:w-36 h-3 rounded-full bg-gradient-to-l from-cyan-400 via-amber-400 to-transparent blur-[2px]"
                />
                <div className="w-12 h-1 bg-white blur-[0.5px]" />
              </div>

              {/* Iron Man Flight Vector SVG */}
              <div className="w-24 h-16 sm:w-28 sm:h-20 filter drop-shadow-[0_0_20px_rgba(245,158,11,0.8)]">
                <svg viewBox="0 0 100 60" className="w-full h-full">
                  {/* Armor Helmet & Faceplate */}
                  <path d="M72 20C72 14 78 12 86 16C92 20 92 28 86 32C80 34 72 30 72 20Z" fill="#dc2626" stroke="#991b1b" strokeWidth="1" />
                  <path d="M78 18C78 16 82 15 86 18C88 20 88 26 86 28C82 30 78 28 78 18Z" fill="#facc15" />
                  {/* Glowing Cyan Slit Eyes */}
                  <line x1="81" y1="21" x2="86" y2="21" stroke="#38bdf8" strokeWidth="1.8" strokeLinecap="round" />

                  {/* Armor Torso */}
                  <path d="M42 16L74 18L70 34L40 32Z" fill="#dc2626" stroke="#991b1b" strokeWidth="1" />
                  <path d="M50 17L68 18L66 31L48 29Z" fill="#facc15" />

                  {/* Glowing Arc Reactor Chest */}
                  <circle cx="62" cy="24" r="3.5" fill="#38bdf8" stroke="#ffffff" strokeWidth="1" />
                  <circle cx="62" cy="24" r="1.5" fill="#ffffff" />

                  {/* Forward Flying Arm with Palm Repulsor */}
                  <path d="M68 28L88 35L92 34" stroke="#dc2626" strokeWidth="5" strokeLinecap="round" fill="none" />
                  <circle cx="92" cy="34" r="2.5" fill="#38bdf8" />
                  <circle cx="92" cy="34" r="1" fill="#ffffff" />

                  {/* Rear Legs with Boot Repulsors */}
                  <path d="M42 22L20 20L12 18" stroke="#dc2626" strokeWidth="6" strokeLinecap="round" fill="none" />
                  <path d="M40 28L18 28L10 26" stroke="#facc15" strokeWidth="5" strokeLinecap="round" fill="none" />

                  {/* Boot Jet Fire Nodes */}
                  <circle cx="10" cy="18" r="3" fill="#38bdf8" />
                  <circle cx="8" cy="26" r="3" fill="#38bdf8" />
                </svg>
              </div>

              {/* Supersonic Sonic Boom Wave Rings */}
              <motion.div
                initial={{ scale: 0.5, opacity: 1 }}
                animate={{ scale: 2.2, opacity: 0 }}
                transition={{ duration: 0.6, repeat: Infinity }}
                className="absolute left-6 w-12 h-12 rounded-full border-2 border-cyan-300 pointer-events-none"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ============================================================ */}
      {/* 2. UNIBEAM CHEST CANNON BLAST (Massive Center Beam)          */}
      {/* ============================================================ */}
      <AnimatePresence>
        {isUnibeamActive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 pointer-events-none flex items-center justify-center overflow-hidden"
          >
            {/* Dark Energy Surge Backdrop */}
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

            {/* Iron Man in Hover Unibeam Pose (Center-Left) */}
            <motion.div
              initial={{ scale: 0.7, x: -100 }}
              animate={{ scale: 1, x: 0 }}
              exit={{ scale: 0.7, x: -100 }}
              className="relative z-20 flex items-center"
            >
              {/* Iron Man Vector SVG */}
              <div className="w-32 h-40 filter drop-shadow-[0_0_30px_rgba(56,189,248,1)]">
                <svg viewBox="0 0 80 100" className="w-full h-full">
                  {/* Hovering Repulsor Flames Feet */}
                  <circle cx="30" cy="94" r="5" fill="#38bdf8" />
                  <circle cx="50" cy="94" r="5" fill="#38bdf8" />

                  {/* Body Legs */}
                  <rect x="24" y="60" width="12" height="30" rx="4" fill="#dc2626" />
                  <rect x="44" y="60" width="12" height="30" rx="4" fill="#dc2626" />

                  {/* Torso */}
                  <path d="M22 30H58L52 64H28L22 30Z" fill="#dc2626" stroke="#991b1b" strokeWidth="1.5" />
                  <path d="M28 32H52L48 58H32L28 32Z" fill="#facc15" />

                  {/* Arc Reactor Core Charging */}
                  <circle cx="40" cy="44" r="8" fill="#38bdf8" stroke="#ffffff" strokeWidth="2" />
                  <circle cx="40" cy="44" r="4" fill="#ffffff" />

                  {/* Outstretched Arms */}
                  <path d="M22 34L8 45L4 42" stroke="#dc2626" strokeWidth="7" strokeLinecap="round" fill="none" />
                  <circle cx="4" cy="42" r="3" fill="#38bdf8" />

                  <path d="M58 34L72 45L76 42" stroke="#dc2626" strokeWidth="7" strokeLinecap="round" fill="none" />
                  <circle cx="76" cy="42" r="3" fill="#38bdf8" />

                  {/* Helmet */}
                  <circle cx="40" cy="18" r="14" fill="#dc2626" stroke="#991b1b" strokeWidth="1.5" />
                  <path d="M32 12H48V26H32V12Z" fill="#facc15" />
                  {/* Glowing Cyan Eyes */}
                  <line x1="33" y1="18" x2="38" y2="18" stroke="#38bdf8" strokeWidth="2.5" strokeLinecap="round" />
                  <line x1="42" y1="18" x2="47" y2="18" stroke="#38bdf8" strokeWidth="2.5" strokeLinecap="round" />
                </svg>
              </div>

              {/* Massive Unibeam Horizontal Laser Beam */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                exit={{ scaleX: 0 }}
                style={{ transformOrigin: 'left center' }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                className="relative h-28 sm:h-36 w-[120vw] -ml-6"
              >
                {/* Outer Cyan Energy Wave */}
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 blur-xl opacity-90" />
                {/* Center Core White Hot Laser */}
                <div className="absolute inset-y-1/4 inset-x-0 bg-gradient-to-r from-white via-cyan-200 to-cyan-400 blur-sm" />
                {/* Brightest Central Beam Line */}
                <div className="absolute inset-y-[40%] inset-x-0 bg-white" />

                {/* Energy Sparkle Discharges */}
                <div className="absolute left-1/4 top-0 text-xl animate-ping">⚡</div>
                <div className="absolute left-1/2 bottom-2 text-xl animate-ping" style={{ animationDelay: '0.2s' }}>⚡</div>
                <div className="absolute left-3/4 top-4 text-xl animate-ping" style={{ animationDelay: '0.4s' }}>⚡</div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ============================================================ */}
      {/* 3. JARVIS HOLOGRAPHIC BLUEPRINT SCANNER MODAL                */}
      {/* ============================================================ */}
      <AnimatePresence>
        {isJarvisScanOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsJarvisScanOpen(false)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md cursor-pointer"
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0, rotateX: 20 }}
              animate={{ scale: 1, opacity: 1, rotateX: 0 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-lg w-full bg-[#050b1f]/95 border-2 border-cyan-400/70 rounded-3xl p-6 sm:p-7 shadow-[0_0_50px_rgba(56,189,248,0.5)] text-cyan-300 font-mono select-none cursor-default overflow-hidden"
            >
              {/* Holographic Scanline Overlay */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(56,189,248,0.06)_1px,transparent_1px)] bg-[size:100%_4px] pointer-events-none" />

              {/* Top Banner Header */}
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-cyan-500/40">
                <div className="flex items-center gap-2">
                  <Cpu className="w-5 h-5 text-cyan-400 animate-pulse" />
                  <span className="font-black text-sm tracking-widest uppercase text-white">
                    STARK INDUSTRIES • J.A.R.V.I.S HUD
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsJarvisScanOpen(false)}
                  className="p-1 rounded-full text-cyan-400 hover:text-white hover:bg-cyan-950/60 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Scanning Target Box */}
              <div className="space-y-3 text-xs">
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-cyan-950/50 border border-cyan-500/30">
                  <span className="text-slate-400 font-sans">SUBJECT:</span>
                  <span className="font-bold text-white tracking-wide">YOGI PRATAMA NUSANTARA</span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="p-2.5 rounded-xl bg-cyan-950/40 border border-cyan-500/25">
                    <span className="text-slate-400 text-[10px] block font-sans">ACADEMIC STANDING</span>
                    <span className="font-black text-amber-300 text-sm">IPK 3.79 (CUM LAUDE)</span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-cyan-950/40 border border-cyan-500/25">
                    <span className="text-slate-400 text-[10px] block font-sans">OFFICIAL CREDENTIALS</span>
                    <span className="font-black text-emerald-400 text-sm">22+ CERTIFICATES</span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-cyan-950/40 border border-cyan-500/25 space-y-1">
                  <span className="text-slate-400 text-[10px] block font-sans">CORE COMPETENCY RADAR</span>
                  <div className="text-[11px] text-cyan-200 leading-relaxed font-semibold">
                    • Web Dev: Laravel, PHP, React, Tailwind CSS, MySQL<br />
                    • Mobile & UI/UX: Flutter, Dart, Figma Design System<br />
                    • Leadership: Ketua HMIF UMM, 20+ Corporate Sponsors
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-gradient-to-r from-cyan-950 via-blue-950 to-indigo-950 border border-cyan-400/50 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center shrink-0">
                    <Activity className="w-5 h-5 text-cyan-300 animate-spin" />
                  </div>
                  <div>
                    <span className="text-[10px] text-cyan-400 font-bold block">JARVIS RECRUITMENT VERDICT:</span>
                    <p className="text-xs font-bold text-white">
                      "Tingkat kecocokan 99.8%. Talenta komprehensif, kepemimpinan teruji, dan eksekusi teknis presisi. Rekomendasi: SEGERA REKRUT!"
                    </p>
                  </div>
                </div>
              </div>

              {/* Footer Confirmation */}
              <div className="mt-4 pt-3 border-t border-cyan-500/30 flex items-center justify-between text-[10px] text-slate-400">
                <span className="flex items-center gap-1 text-cyan-400 font-bold">
                  <Radio className="w-3.5 h-3.5 animate-pulse" />
                  <span>Stark Satellite Link Active</span>
                </span>
                <button
                  type="button"
                  onClick={() => setIsJarvisScanOpen(false)}
                  className="px-3 py-1 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 font-bold transition-colors cursor-pointer"
                >
                  Tutup HUD
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ============================================================ */}
      {/* 4. SUPERHERO LANDING (Impact Shockwave Animation)           */}
      {/* ============================================================ */}
      <AnimatePresence>
        {isLanding && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 pointer-events-none flex flex-col items-center justify-center"
          >
            {/* Iron Man dropping from sky into 3-point superhero landing */}
            <motion.div
              initial={{ y: -600, scale: 0.6 }}
              animate={{ y: 0, scale: 1 }}
              transition={{ type: 'spring', damping: 14, stiffness: 220 }}
              className="relative flex flex-col items-center"
            >
              {/* Chibi Superhero Landing Pose */}
              <div className="w-36 h-36 filter drop-shadow-[0_0_25px_rgba(245,158,11,0.9)]">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  {/* Smoke and Ground Dust Puffs */}
                  <ellipse cx="50" cy="88" rx="42" ry="8" fill="#facc15" opacity="0.3" />
                  <ellipse cx="50" cy="88" rx="28" ry="5" fill="#ffffff" opacity="0.5" />

                  {/* Left Leg kneeling */}
                  <path d="M30 68L22 84L14 86" stroke="#dc2626" strokeWidth="8" strokeLinecap="round" fill="none" />
                  {/* Right Leg bent back */}
                  <path d="M65 68L78 84L86 86" stroke="#dc2626" strokeWidth="8" strokeLinecap="round" fill="none" />

                  {/* Fist punching into ground */}
                  <path d="M50 48L50 86" stroke="#facc15" strokeWidth="8" strokeLinecap="round" fill="none" />
                  <circle cx="50" cy="88" r="5" fill="#38bdf8" />

                  {/* Torso hunched over */}
                  <path d="M34 40H66L60 70H40L34 40Z" fill="#dc2626" stroke="#991b1b" strokeWidth="1.5" />
                  <circle cx="50" cy="52" r="5" fill="#38bdf8" />

                  {/* Helmet looking up */}
                  <circle cx="50" cy="24" r="16" fill="#dc2626" stroke="#991b1b" strokeWidth="1.5" />
                  <path d="M42 16H58V32H42V16Z" fill="#facc15" />
                  {/* Glowing Eyes */}
                  <line x1="43" y1="22" x2="48" y2="22" stroke="#38bdf8" strokeWidth="2.5" strokeLinecap="round" />
                  <line x1="52" y1="22" x2="57" y2="22" stroke="#38bdf8" strokeWidth="2.5" strokeLinecap="round" />
                </svg>
              </div>

              {/* Ground Impact Ring Expanding */}
              <motion.div
                initial={{ scale: 0.2, opacity: 1 }}
                animate={{ scale: 3.5, opacity: 0 }}
                transition={{ duration: 0.8 }}
                className="w-32 h-10 rounded-full border-4 border-amber-400 blur-sm pointer-events-none -mt-4"
              />

              <div className="mt-2 px-4 py-1.5 rounded-full bg-black/90 border border-amber-400 text-amber-300 font-black text-xs shadow-xl tracking-wider uppercase">
                💥 SUPERHERO LANDING! 💥
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ============================================================ */}
      {/* 5. FLOATING HOVERING CHIBI IRON MAN (Left Screen Edge)      */}
      {/* ============================================================ */}
      <div className="fixed top-36 left-4 sm:left-6 z-40 select-none hidden md:block">
        <motion.div
          onClick={triggerFlyBy}
          animate={{
            y: [0, -8, 2, -6, 0],
            rotate: [0, 2, -2, 1, 0],
          }}
          transition={{
            duration: 3.8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          whileHover={{ scale: 1.2 }}
          className="relative cursor-pointer group flex flex-col items-center"
          title="Klik Iron Man untuk terbang supersonik! 🚀🤖"
        >
          {/* Glowing Aura Ring */}
          <div className="absolute -inset-2 rounded-full bg-amber-500/30 blur-md opacity-40 group-hover:opacity-100 transition-opacity" />

          {/* Chibi Hovering Iron Man SVG */}
          <div className="w-12 h-14 sm:w-13 sm:h-15 filter drop-shadow-[0_4px_12px_rgba(245,158,11,0.6)]">
            <svg viewBox="0 0 54 64" className="w-full h-full">
              {/* Boot Repulsor Jet Flames */}
              <motion.circle
                cx="20"
                cy="58"
                r="3"
                fill="#38bdf8"
                animate={{ r: [2, 4, 2], opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 0.4, repeat: Infinity }}
              />
              <motion.circle
                cx="34"
                cy="58"
                r="3"
                fill="#38bdf8"
                animate={{ r: [2, 4, 2], opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 0.4, repeat: Infinity, delay: 0.2 }}
              />

              {/* Legs */}
              <rect x="16" y="38" width="8" height="18" rx="3" fill="#dc2626" />
              <rect x="30" y="38" width="8" height="18" rx="3" fill="#dc2626" />

              {/* Torso */}
              <path d="M15 20H39L36 40H18L15 20Z" fill="#dc2626" stroke="#991b1b" strokeWidth="1" />
              <path d="M19 22H35L33 37H21L19 22Z" fill="#facc15" />

              {/* Glowing Arc Reactor */}
              <circle cx="27" cy="29" r="3.5" fill="#38bdf8" stroke="#ffffff" strokeWidth="1" />
              <circle cx="27" cy="29" r="1.5" fill="#ffffff" />

              {/* Arms Hovering Downwards */}
              <path d="M15 22L8 35" stroke="#dc2626" strokeWidth="4.5" strokeLinecap="round" fill="none" />
              <circle cx="8" cy="35" r="2" fill="#38bdf8" />

              <path d="M39 22L46 35" stroke="#dc2626" strokeWidth="4.5" strokeLinecap="round" fill="none" />
              <circle cx="46" cy="35" r="2" fill="#38bdf8" />

              {/* Helmet */}
              <circle cx="27" cy="12" r="10.5" fill="#dc2626" stroke="#991b1b" strokeWidth="1" />
              <path d="M21 7H33V17H21V7Z" fill="#facc15" />
              {/* Cyan Glowing Eyes */}
              <line x1="22" y1="12" x2="25.5" y2="12" stroke="#38bdf8" strokeWidth="1.8" strokeLinecap="round" />
              <line x1="28.5" y1="12" x2="32" y2="12" stroke="#38bdf8" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </div>
        </motion.div>
      </div>

      {/* ============================================================ */}
      {/* 6. STARK PROTOCOL ACTION CONTROLLER DOCK                     */}
      {/* ============================================================ */}
      <div className="fixed bottom-6 left-24 sm:left-28 z-40 select-none">
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: 15 }}
              className={`absolute bottom-full left-0 mb-3 w-64 p-3.5 rounded-3xl border shadow-2xl backdrop-blur-2xl ${
                darkMode
                  ? 'bg-[#090f28]/95 border-amber-500/50 text-white shadow-[0_0_35px_rgba(245,158,11,0.4)]'
                  : 'bg-white/95 border-amber-300 text-slate-800 shadow-[0_12px_35px_rgba(245,158,11,0.25)]'
              }`}
            >
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-amber-500/30">
                <span className="flex items-center gap-1.5 text-xs font-black text-amber-400 uppercase tracking-wider">
                  <span>🤖</span>
                  <span>Protokol Iron Man</span>
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
                  onClick={triggerFlyBy}
                  className="p-2 rounded-xl text-left bg-amber-500/15 hover:bg-amber-500/30 border border-amber-500/40 transition-colors flex items-center gap-1.5 text-xs font-bold text-amber-300 cursor-pointer"
                >
                  <span className="text-base">🚀</span>
                  <span>Terbang Mach 3</span>
                </button>

                <button
                  type="button"
                  onClick={triggerUnibeam}
                  className="p-2 rounded-xl text-left bg-cyan-500/15 hover:bg-cyan-500/30 border border-cyan-500/40 transition-colors flex items-center gap-1.5 text-xs font-bold text-cyan-300 cursor-pointer"
                >
                  <span className="text-base">💥</span>
                  <span>Unibeam 100%</span>
                </button>

                <button
                  type="button"
                  onClick={triggerLanding}
                  className="p-2 rounded-xl text-left bg-red-500/15 hover:bg-red-500/30 border border-red-500/40 transition-colors flex items-center gap-1.5 text-xs font-bold text-rose-300 cursor-pointer"
                >
                  <span className="text-base">🦾</span>
                  <span>Hero Landing</span>
                </button>

                <button
                  type="button"
                  onClick={triggerJarvisScan}
                  className="p-2 rounded-xl text-left bg-blue-500/15 hover:bg-blue-500/30 border border-blue-500/40 transition-colors flex items-center gap-1.5 text-xs font-bold text-cyan-200 cursor-pointer"
                >
                  <span className="text-base">🖥️</span>
                  <span>JARVIS Scan</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating Stark Protocol Trigger Button */}
        <motion.button
          type="button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="px-3.5 py-2 rounded-full bg-gradient-to-r from-amber-500 via-orange-600 to-red-600 text-white text-xs font-black shadow-[0_0_20px_rgba(245,158,11,0.7)] border border-amber-300/40 flex items-center gap-1.5 hover:shadow-[0_0_30px_rgba(245,158,11,0.9)] cursor-pointer"
        >
          <span className="text-sm animate-pulse">🤖</span>
          <span>Iron Man</span>
        </motion.button>
      </div>

      {/* ============================================================ */}
      {/* 7. TONY STARK COMIC SPEECH BUBBLE                           */}
      {/* ============================================================ */}
      <AnimatePresence>
        {speechText && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            className="fixed bottom-28 left-20 sm:left-28 z-50 max-w-xs pointer-events-auto select-none"
          >
            <div
              className={`p-3.5 rounded-2xl border shadow-2xl backdrop-blur-2xl ${
                darkMode
                  ? 'bg-[#090f28]/95 border-amber-500/50 text-white shadow-[0_0_30px_rgba(245,158,11,0.5)]'
                  : 'bg-white/95 border-amber-300 text-slate-800 shadow-[0_8px_30px_rgba(245,158,11,0.3)]'
              }`}
            >
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <span className="text-[11px] font-black text-amber-400 flex items-center gap-1">
                  <span>🤖</span>
                  <span>Tony Stark (Iron Man):</span>
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
