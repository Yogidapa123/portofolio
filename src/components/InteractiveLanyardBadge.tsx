import React, { useState, useEffect } from 'react'
import { motion, useMotionValue, useTransform, AnimatePresence } from 'framer-motion'
import { Sparkles, QrCode, ShieldCheck, Hand } from 'lucide-react'
import { PERSONAL_INFO } from '../data/portfolioData'

interface InteractiveLanyardBadgeProps {
  darkMode: boolean
}

export const InteractiveLanyardBadge: React.FC<InteractiveLanyardBadgeProps> = ({ darkMode }) => {
  const [isDragged, setIsDragged] = useState(false)
  const [hasInteracted, setHasInteracted] = useState(false)

  // Motion values for physical tracking
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  // Dynamic rotation based on drag X offset
  const rotate = useTransform(x, [-140, 140], [-22, 22])
  // Subtle 3D tilt based on Y
  const rotateX = useTransform(y, [-50, 150], [15, -15])

  // Strap SVG path state
  const [strapPath, setStrapPath] = useState({
    left: 'M 140 0 C 140 60, 160 110, 160 135',
    right: 'M 180 0 C 180 60, 160 110, 160 135',
  })

  // Update lanyard strap curves in real-time as badge is dragged
  useEffect(() => {
    const unsubscribeX = x.on('change', updateStrap)
    const unsubscribeY = y.on('change', updateStrap)

    function updateStrap() {
      const currentX = x.get()
      const currentY = y.get()

      const topAnchorLeft = 145
      const topAnchorRight = 175
      const targetX = 160 + currentX
      const targetY = 135 + currentY

      // Left strap curve
      const cpLeftX = topAnchorLeft + currentX * 0.4
      const cpLeftY = (targetY * 0.55)

      // Right strap curve
      const cpRightX = topAnchorRight + currentX * 0.4
      const cpRightY = (targetY * 0.55)

      setStrapPath({
        left: `M ${topAnchorLeft} 0 C ${cpLeftX} ${cpLeftY}, ${targetX - 4} ${targetY - 15}, ${targetX} ${targetY}`,
        right: `M ${topAnchorRight} 0 C ${cpRightX} ${cpRightY}, ${targetX + 4} ${targetY - 15}, ${targetX} ${targetY}`,
      })
    }

    return () => {
      unsubscribeX()
      unsubscribeY()
    }
  }, [x, y])

  // Current photo: Black suit in Light mode, UMM uniform in Dark mode
  const currentPhoto = darkMode ? PERSONAL_INFO.photoDarkUrl : PERSONAL_INFO.photoLightUrl

  return (
    <div className="relative w-full max-w-[340px] sm:max-w-[380px] h-[540px] sm:h-[590px] mx-auto flex flex-col items-center justify-start select-none touch-none">
      {/* Top Ceiling Hook / Fixed Anchor */}
      <div className="absolute top-0 z-30 flex flex-col items-center pointer-events-none">
        <div className="w-10 h-3 rounded-b-md bg-gradient-to-r from-slate-700 via-slate-400 to-slate-700 shadow-md border-b border-white/30" />
        <div className="w-4 h-3 bg-gradient-to-r from-slate-600 to-slate-400 rounded-b shadow-sm" />
      </div>

      {/* SVG Canvas for the Dynamic Woven Lanyard Ribbon */}
      <svg
        className="absolute top-0 w-full h-[220px] pointer-events-none z-20 overflow-visible"
        viewBox="0 0 320 220"
      >
        <defs>
          {/* Lanyard Ribbon Texture Gradient */}
          <linearGradient id="lanyardGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#1e3a8a" />
            <stop offset="30%" stopColor="#2c67ed" />
            <stop offset="70%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#1d4ed8" />
          </linearGradient>

          {/* Ribbon Shadow */}
          <filter id="ribbonShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="4" stdDeviation="3" floodColor="#000" floodOpacity="0.4" />
          </filter>
        </defs>

        {/* Left Strap Ribbon */}
        <path
          d={strapPath.left}
          fill="none"
          stroke="url(#lanyardGradient)"
          strokeWidth="11"
          strokeLinecap="round"
          filter="url(#ribbonShadow)"
        />
        {/* Left Strap Stitches */}
        <path
          d={strapPath.left}
          fill="none"
          stroke="rgba(255,255,255,0.45)"
          strokeWidth="1.5"
          strokeDasharray="4 3"
        />

        {/* Right Strap Ribbon */}
        <path
          d={strapPath.right}
          fill="none"
          stroke="url(#lanyardGradient)"
          strokeWidth="11"
          strokeLinecap="round"
          filter="url(#ribbonShadow)"
        />
        {/* Right Strap Stitches */}
        <path
          d={strapPath.right}
          fill="none"
          stroke="rgba(255,255,255,0.45)"
          strokeWidth="1.5"
          strokeDasharray="4 3"
        />
      </svg>

      {/* Floating Interactive Pull Hint */}
      {!hasInteracted && (
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="absolute -top-6 right-2 sm:-right-4 z-40 pointer-events-none"
        >
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className={`px-3 py-1.5 rounded-full text-[11px] font-extrabold flex items-center gap-1.5 shadow-xl border ${
              darkMode
                ? 'bg-gradient-to-r from-[#2c67ed] to-indigo-600 text-white border-blue-400/50 shadow-[0_0_20px_rgba(44,103,237,0.7)]'
                : 'bg-white text-[#2c67ed] border-blue-300 shadow-[0_6px_20px_rgba(44,103,237,0.3)]'
            }`}
          >
            <Hand className="w-3.5 h-3.5 animate-bounce" />
            <span>Tarik Tali / Badge Saya!</span>
          </motion.div>
        </motion.div>
      )}

      {/* Draggable Badge Card & Metal Buckle */}
      <motion.div
        style={{ x, y, rotate, rotateX }}
        drag
        dragConstraints={{ left: -130, right: 130, top: -45, bottom: 150 }}
        dragElastic={0.65}
        dragTransition={{ bounceStiffness: 350, bounceDamping: 15 }}
        onDragStart={() => {
          setIsDragged(true)
          setHasInteracted(true)
        }}
        onDragEnd={() => setIsDragged(false)}
        initial={{ y: -380, rotate: -16, opacity: 0 }}
        animate={{ y: 0, rotate: 0, opacity: 1 }}
        transition={{
          type: 'spring',
          damping: 12,
          stiffness: 90,
          mass: 1.15,
          delay: 0.25,
        }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="relative mt-28 z-20 flex flex-col items-center cursor-grab active:cursor-grabbing group"
      >
        {/* Metal Swivel Clasp & Carabiner Clip */}
        <div className="relative -mb-3 z-30 flex flex-col items-center">
          {/* Metal Ring Buckle */}
          <div className="w-7 h-5 rounded-md border-2 border-slate-300 bg-gradient-to-b from-slate-400 via-slate-100 to-slate-500 shadow-md" />
          {/* Swivel Carabiner Hook */}
          <div className="w-4 h-6 -mt-1 rounded-sm bg-gradient-to-r from-slate-400 via-slate-200 to-slate-500 border border-slate-400 shadow-md" />
          {/* Clamp Claw gripping the punch hole */}
          <div className="w-5 h-2 -mt-1 rounded-full bg-slate-700 border border-slate-400" />
        </div>

        {/* Lanyard ID Card Badge Body */}
        <div
          className={`relative w-64 sm:w-72 rounded-[28px] p-3 sm:p-3.5 border transition-all duration-500 shadow-2xl overflow-hidden backdrop-blur-2xl ${
            darkMode
              ? 'bg-[#090f28]/95 border-[#2c67ed]/60 text-white shadow-[0_15px_40px_rgba(44,103,237,0.45)]'
              : 'bg-white/95 border-blue-300 text-slate-800 shadow-[0_15px_45px_rgba(44,103,237,0.3)]'
          }`}
        >
          {/* Acrylic Badge Slot Hole at the Top */}
          <div className="flex justify-center mb-2">
            <div className="w-10 h-2.5 rounded-full bg-slate-950/70 border border-white/20 inset-shadow-sm flex items-center justify-center">
              <span className="w-6 h-1 rounded-full bg-white/10" />
            </div>
          </div>

          {/* Holographic Sheen Overlay */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none opacity-40 group-hover:opacity-75 transition-opacity duration-500" />

          {/* Badge Top Header */}
          <div className="flex items-center justify-between px-2 mb-2">
            <div className="flex items-center gap-1.5">
              <div className="w-4 h-4 rounded-full bg-[#2c67ed] flex items-center justify-center text-[9px] font-black text-white">
                ★
              </div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider bg-gradient-to-r from-[#2c67ed] to-cyan-400 bg-clip-text text-transparent">
                DEVELOPER PASS
              </span>
            </div>
            <span
              className={`text-[9px] font-bold px-2 py-0.5 rounded-full border ${
                darkMode
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                  : 'bg-emerald-100 text-emerald-800 border-emerald-300'
              }`}
            >
              VERIFIED
            </span>
          </div>

          {/* Profile Photo Container with Mode Auto-Switch */}
          <div className="relative rounded-2xl overflow-hidden aspect-[4/5] bg-slate-900 border border-blue-500/30 shadow-inner group-hover:shadow-[0_0_20px_rgba(44,103,237,0.4)] transition-all">
            <AnimatePresence mode="wait">
              <motion.img
                key={currentPhoto}
                src={currentPhoto}
                alt={PERSONAL_INFO.name}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.04 }}
                transition={{ duration: 0.4 }}
                className="w-full h-full object-cover object-top"
              />
            </AnimatePresence>

            {/* Gradient Darkening Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

            {/* Mode Indicator Overlay on Photo */}
            <div className="absolute top-2 right-2 px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-md text-[9px] font-bold text-cyan-300 border border-white/20">
              {darkMode ? '🌌 Space Mode (UMM)' : '☀️ Light Mode (Formal)'}
            </div>

            {/* Name Banner on bottom of photo */}
            <div className="absolute bottom-2.5 left-2.5 right-2.5 text-white">
              <h4 className="font-extrabold text-sm sm:text-base leading-tight text-white drop-shadow-md">
                {PERSONAL_INFO.name}
              </h4>
              <p className="text-[10px] sm:text-[11px] text-cyan-300 font-medium truncate">
                Web Dev • UI/UX • Graphic • Admin
              </p>
            </div>
          </div>

          {/* Badge Bottom Identity Specs */}
          <div className="mt-2.5 px-1 space-y-1.5 text-left">
            <div className="flex items-center justify-between text-[10px]">
              <span className="opacity-70 font-semibold">ID CREW:</span>
              <span className="font-mono font-bold text-[#2c67ed]">YP-2026-UMM</span>
            </div>

            <div className="flex items-center justify-between text-[10px]">
              <span className="opacity-70 font-semibold">CLEARANCE:</span>
              <span className="font-bold text-cyan-400">LEVEL 5 • FULL-STACK</span>
            </div>

            {/* Simulated Barcode & Security Hologram */}
            <div className="pt-1.5 border-t border-slate-700/40 flex items-center justify-between">
              {/* Barcode lines */}
              <div className="flex items-center gap-[2px] opacity-75">
                <span className="w-[1.5px] h-4 bg-current" />
                <span className="w-[3px] h-4 bg-current" />
                <span className="w-[1px] h-4 bg-current" />
                <span className="w-[2.5px] h-4 bg-current" />
                <span className="w-[1px] h-4 bg-current" />
                <span className="w-[3px] h-4 bg-current" />
                <span className="w-[1.5px] h-4 bg-current" />
                <span className="w-[2px] h-4 bg-current" />
                <span className="w-[1px] h-4 bg-current" />
                <span className="w-[2.5px] h-4 bg-current" />
              </div>

              {/* Holographic Chip Seal */}
              <div className="flex items-center gap-1 text-[9px] font-bold text-[#2c67ed]">
                <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                <span>AUTHENTIC</span>
              </div>
            </div>
          </div>

          {/* Interactive Pull Bottom Tag */}
          <div className="mt-2 py-1 rounded-xl bg-[#2c67ed]/15 border border-[#2c67ed]/30 text-center">
            <p className="text-[9px] font-bold text-[#2c67ed] flex items-center justify-center gap-1">
              <span>{isDragged ? '✨ Lepaskan untuk memantul!' : '👆 Coba klik dan tarik badge ini'}</span>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
