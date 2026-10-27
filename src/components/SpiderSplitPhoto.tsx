import React, { useState, useRef, useEffect, useCallback } from 'react'
import { motion, useSpring, useMotionValue, AnimatePresence } from 'framer-motion'
import { Sparkles, Zap, MoveHorizontal } from 'lucide-react'
import { PERSONAL_INFO } from '../data/portfolioData'

interface SpiderSplitPhotoProps {
  darkMode: boolean
}

export const SpiderSplitPhoto: React.FC<SpiderSplitPhotoProps> = ({ darkMode }) => {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [isDragging, setIsDragging] = useState(false)

  // Target X split percentage (0 to 100)
  // Default at 50% for an iconic 50/50 Peter Parker / Spider-Man split
  const targetSplit = useMotionValue(50)

  // Fluid spring physics: ensures motion is never stiff (tidak kaku), gliding smoothly
  const smoothSplit = useSpring(targetSplit, {
    stiffness: 260,
    damping: 26,
    mass: 0.4,
  })

  const [currentPercent, setCurrentPercent] = useState(50)

  useEffect(() => {
    const unsub = smoothSplit.on('change', (v) => {
      setCurrentPercent(v)
    })
    return () => unsub()
  }, [smoothSplit])

  // Update split point based on touch/mouse clientX
  const handleMove = useCallback(
    (clientX: number) => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      const x = clientX - rect.left
      const percent = Math.min(Math.max((x / rect.width) * 100, 0), 100)
      targetSplit.set(percent)
    },
    [targetSplit]
  )

  const onPointerDown = (e: React.PointerEvent) => {
    setIsDragging(true)
    handleMove(e.clientX)
  }

  const onPointerMove = (e: React.PointerEvent) => {
    // Follow mouse hover or active drag touch
    handleMove(e.clientX)
  }

  const onPointerUp = () => {
    setIsDragging(false)
  }

  const onPointerLeave = () => {
    setIsDragging(false)
    // Smoothly settle back to 50% split when pointer leaves
    targetSplit.set(50)
  }

  // Touch handlers for mobile devices
  const onTouchMove = (e: React.TouchEvent) => {
    if (e.touches[0]) {
      handleMove(e.touches[0].clientX)
    }
  }

  // Active real photo: aligned split headshots
  const currentPhoto = darkMode ? '/split-yogi-dark.jpg' : '/split-yogi-light.jpg'

  return (
    <div className="relative w-full max-w-sm mx-auto select-none touch-none">
      {/* Outer Glow Halo reacting to dominant side */}
      <div
        className="absolute -inset-3 rounded-[36px] blur-2xl opacity-75 transition-all duration-700 pointer-events-none"
        style={{
          background:
            currentPercent < 50
              ? 'radial-gradient(circle, rgba(239, 68, 68, 0.5) 0%, rgba(44, 103, 237, 0.25) 60%, transparent 80%)'
              : 'radial-gradient(circle, rgba(44, 103, 237, 0.5) 0%, rgba(99, 102, 241, 0.25) 60%, transparent 80%)',
        }}
      />

      {/* Main Glassmorphic Photo Card */}
      <div
        ref={containerRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerLeave}
        onTouchMove={onTouchMove}
        className={`relative rounded-[32px] p-3 sm:p-4 border transition-all duration-500 shadow-2xl overflow-hidden cursor-ew-resize backdrop-blur-2xl ${
          darkMode
            ? 'bg-[#090f28]/95 border-[#2c67ed]/50 text-white shadow-[0_15px_40px_rgba(44,103,237,0.35)]'
            : 'bg-white/95 border-blue-200 text-slate-800 shadow-[0_15px_40px_rgba(44,103,237,0.2)]'
        }`}
      >
        {/* Spider-Sense Tingle indicator badge */}
        <AnimatePresence>
          {currentPercent < 55 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.7, y: -8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.7, y: -8 }}
              transition={{ duration: 0.2 }}
              className="absolute top-6 right-6 z-40 pointer-events-none flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-red-600 to-rose-600 text-white text-[10px] font-black tracking-wider uppercase shadow-[0_0_20px_rgba(239,68,68,0.9)] border border-red-300/40"
            >
              <Zap className="w-3.5 h-3.5 text-amber-300 animate-bounce" />
              <span>SPIDER-SENSE ⚡</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Photo Stage (Aspect 4/5) */}
        <div className="relative rounded-2xl overflow-hidden aspect-[4/5] bg-slate-950 border border-blue-500/30 shadow-inner group">
          {/* UNDER LAYER: SPIDER-MAN PORTRAIT (Full width on the right) */}
          <div className="absolute inset-0 w-full h-full">
            <img
              src="/split-spiderman.jpg"
              alt="Spider-Man Alter Ego"
              className="w-full h-full object-cover object-center"
            />
            {/* Dramatic Spider-Man Red & Blue Vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />

            {/* Spider-Man label top right */}
            <div className="absolute top-3 right-3 z-20 pointer-events-none">
              <span className="px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider bg-red-600/80 text-white shadow-md border border-red-400/50">
                🕷️ Spider-Man
              </span>
            </div>
          </div>

          {/* OVER LAYER: YOGI'S REAL PORTRAIT (Clipped by smooth split percentage) */}
          <div
            className="absolute inset-0 w-full h-full overflow-hidden"
            style={{
              clipPath: `polygon(0% 0%, ${currentPercent}% 0%, ${currentPercent}% 100%, 0% 100%)`,
              WebkitClipPath: `polygon(0% 0%, ${currentPercent}% 0%, ${currentPercent}% 100%, 0% 100%)`,
            }}
          >
            <img
              key={currentPhoto}
              src={currentPhoto}
              alt={PERSONAL_INFO.name}
              className="w-full h-full object-cover object-center"
            />
            {/* Real photo shadow */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />

            {/* Yogi Label top left */}
            <div className="absolute top-3 left-3 z-20 pointer-events-none">
              <span className="px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider bg-[#2c67ed]/85 text-white shadow-md border border-blue-400/50">
                👨‍💻 Yogi Pratama N.
              </span>
            </div>
          </div>

          {/* GLOWING LASER DIVIDER LINE & SPIDER EMBLEM HANDLE */}
          <div
            className="absolute top-0 bottom-0 z-30 pointer-events-none"
            style={{
              left: `${currentPercent}%`,
              transform: 'translateX(-50%)',
            }}
          >
            {/* Laser Beam Divider */}
            <div className="w-[3px] h-full bg-gradient-to-b from-cyan-400 via-white to-red-500 shadow-[0_0_18px_rgba(44,103,237,1),0_0_12px_rgba(239,68,68,1)]" />

            {/* Center Drag Handle Badge */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-gradient-to-tr from-red-600 via-slate-900 to-[#2c67ed] p-[1.5px] shadow-[0_0_25px_rgba(239,68,68,0.9),0_0_15px_rgba(44,103,237,0.9)] flex items-center justify-center">
              <div className="w-full h-full rounded-full bg-black/90 flex items-center justify-center text-white">
                <span className="text-base font-black transform hover:scale-125 transition-transform">
                  🕷️
                </span>
              </div>
            </div>
          </div>

          {/* Bottom Title Bar on Photo */}
          <div className="absolute bottom-3 left-3 right-3 z-30 text-white flex items-end justify-between pointer-events-none">
            <div>
              <p className="font-extrabold text-sm sm:text-base leading-tight text-white drop-shadow-md">
                {currentPercent > 65
                  ? 'Yogi Pratama Nusantara'
                  : currentPercent < 35
                  ? 'Peter Parker Alter Ego'
                  : 'Yogi × Spider-Man'}
              </p>
              <p className="text-[10px] sm:text-xs text-cyan-300 font-semibold drop-shadow">
                {currentPercent < 45
                  ? 'With Great Code Comes Great Responsibility'
                  : 'S1 Teknik Informatika • UMM Malang'}
              </p>
            </div>

            <div className="text-[9px] font-mono font-bold px-2 py-0.5 rounded-full bg-black/70 border border-white/20 text-cyan-300">
              {Math.round(currentPercent)}% / {Math.round(100 - currentPercent)}%
            </div>
          </div>
        </div>

        {/* Quick Transformation Presets Buttons */}
        <div className="mt-3 flex items-center justify-between gap-1.5 pt-1">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              targetSplit.set(100)
            }}
            className={`flex-1 py-1 px-1.5 rounded-lg text-[10px] font-bold border transition-all cursor-pointer ${
              currentPercent > 80
                ? 'bg-[#2c67ed] text-white border-[#2c67ed]'
                : darkMode
                ? 'bg-white/5 border-slate-700 text-slate-300 hover:bg-white/10'
                : 'bg-slate-100 border-slate-300 text-slate-700 hover:bg-slate-200'
            }`}
          >
            👨‍💻 Yogi
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              targetSplit.set(50)
            }}
            className={`flex-1 py-1 px-1.5 rounded-lg text-[10px] font-bold border transition-all cursor-pointer ${
              currentPercent >= 35 && currentPercent <= 65
                ? 'bg-gradient-to-r from-[#2c67ed] to-red-600 text-white border-transparent shadow-sm'
                : darkMode
                ? 'bg-white/5 border-slate-700 text-slate-300 hover:bg-white/10'
                : 'bg-slate-100 border-slate-300 text-slate-700 hover:bg-slate-200'
            }`}
          >
            ⚡ 50/50 Split
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              targetSplit.set(0)
            }}
            className={`flex-1 py-1 px-1.5 rounded-lg text-[10px] font-bold border transition-all cursor-pointer ${
              currentPercent < 20
                ? 'bg-red-600 text-white border-red-600'
                : darkMode
                ? 'bg-white/5 border-slate-700 text-slate-300 hover:bg-white/10'
                : 'bg-slate-100 border-slate-300 text-slate-700 hover:bg-slate-200'
            }`}
          >
            🕷️ Spidey
          </button>
        </div>

        {/* Guidance Prompt Hint */}
        <div className="mt-2.5 py-1 px-2.5 rounded-xl bg-gradient-to-r from-[#2c67ed]/15 via-purple-500/10 to-red-500/15 border border-blue-500/30 flex items-center justify-between text-[11px] font-bold">
          <span className="flex items-center gap-1 text-[#2c67ed]">
            <MoveHorizontal className="w-3.5 h-3.5 animate-pulse" />
            <span>Sentuh & Geser Foto</span>
          </span>
          <span className="text-xs text-red-400 font-extrabold flex items-center gap-1">
            <span>Mode Spider-Man</span>
            <span className="animate-spin" style={{ animationDuration: '8s' }}>🕸️</span>
          </span>
        </div>
      </div>
    </div>
  )
}
