import React, { useState, useRef, useEffect, useCallback } from 'react'
import { motion, useSpring, useMotionValue, AnimatePresence } from 'framer-motion'
import { Zap, MoveHorizontal } from 'lucide-react'
import { PERSONAL_INFO } from '../data/portfolioData'

interface SpiderSplitPhotoProps {
  darkMode: boolean
}

export const SpiderSplitPhoto: React.FC<SpiderSplitPhotoProps> = ({ darkMode }) => {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [isDragging, setIsDragging] = useState(false)

  // Target X split percentage (0 to 100)
  // Default at 48.3% (exact reference image midline X = 293 / 606)
  const targetSplit = useMotionValue(48.3)

  // Fluid spring physics: ensures motion is silky smooth and never stiff ("tidak kaku")
  const smoothSplit = useSpring(targetSplit, {
    stiffness: 240,
    damping: 28,
    mass: 0.35,
  })

  const [currentPercent, setCurrentPercent] = useState(48.3)

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
    // If dragging or moving pointer, follow smoothly
    if (isDragging || e.buttons === 1) {
      handleMove(e.clientX)
    } else {
      // Hover follow with gentle dampening
      handleMove(e.clientX)
    }
  }

  const onPointerUp = () => {
    setIsDragging(false)
  }

  const onPointerLeave = () => {
    setIsDragging(false)
    // Smoothly return back to iconic 50/50 reference split
    targetSplit.set(48.3)
  }

  // Touch handlers for mobile devices
  const onTouchMove = (e: React.TouchEvent) => {
    if (e.touches[0]) {
      handleMove(e.touches[0].clientX)
    }
  }

  // Active real portrait of Yogi, perfectly scaled and aligned to the Spider-Man mask
  const currentPhoto = darkMode ? '/perfect-aligned-yogi-dark.jpg' : '/perfect-aligned-yogi-light.jpg'

  return (
    <div className="relative w-full max-w-sm mx-auto select-none touch-none">
      {/* Dynamic Spider-Man & Tech Halo Glow reacting to current split */}
      <div
        className="absolute -inset-3 rounded-[36px] blur-2xl opacity-75 transition-all duration-500 pointer-events-none"
        style={{
          background:
            currentPercent > 50
              ? 'radial-gradient(circle, rgba(239, 68, 68, 0.55) 0%, rgba(44, 103, 237, 0.3) 60%, transparent 80%)'
              : 'radial-gradient(circle, rgba(44, 103, 237, 0.5) 0%, rgba(239, 68, 68, 0.25) 60%, transparent 80%)',
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
        className={`relative rounded-[32px] p-2.5 sm:p-3.5 border transition-all duration-500 shadow-2xl overflow-hidden cursor-ew-resize backdrop-blur-2xl ${
          darkMode
            ? 'bg-[#090f28]/95 border-[#2c67ed]/50 text-white shadow-[0_15px_40px_rgba(44,103,237,0.35)]'
            : 'bg-white/95 border-blue-200 text-slate-800 shadow-[0_15px_40px_rgba(44,103,237,0.2)]'
        }`}
      >
        {/* Spider-Sense Tingle indicator badge */}
        <AnimatePresence>
          {currentPercent > 40 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.7, y: -8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.7, y: -8 }}
              transition={{ duration: 0.2 }}
              className="absolute top-5 left-5 z-40 pointer-events-none flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-red-600 via-rose-600 to-amber-500 text-white text-[10px] font-black tracking-wider uppercase shadow-[0_0_20px_rgba(239,68,68,0.9)] border border-red-300/40"
            >
              <Zap className="w-3.5 h-3.5 text-amber-300 animate-bounce" />
              <span>SPIDER-SENSE ⚡</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Photo Stage (Exact 606 / 1024 Aspect Ratio from Reference Photo) */}
        <div
          className="relative rounded-2xl overflow-hidden bg-slate-950 border border-blue-500/30 shadow-inner group"
          style={{ aspectRatio: '606 / 1024' }}
        >
          {/* UNDER LAYER: YOGI'S REAL PORTRAIT (Full width on the right) */}
          <div className="absolute inset-0 w-full h-full">
            <img
              key={currentPhoto}
              src={currentPhoto}
              alt={PERSONAL_INFO.name}
              className="w-full h-full object-cover object-center"
            />
            {/* Subtle Vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />

            {/* Yogi Label top right */}
            <div className="absolute top-3 right-3 z-20 pointer-events-none">
              <span className="px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider bg-[#2c67ed]/90 text-white shadow-md border border-blue-400/50 backdrop-blur-sm">
                👨‍💻 Yogi Pratama N.
              </span>
            </div>
          </div>

          {/* OVER LAYER: SPIDER-MAN MASK (Clipped from left 0% to currentPercent%) */}
          {/* Matches reference image: Spider-Man is on the LEFT */}
          <div
            className="absolute inset-0 w-full h-full overflow-hidden"
            style={{
              clipPath: `polygon(0% 0%, ${currentPercent}% 0%, ${currentPercent}% 100%, 0% 100%)`,
              WebkitClipPath: `polygon(0% 0%, ${currentPercent}% 0%, ${currentPercent}% 100%, 0% 100%)`,
            }}
          >
            <img
              src="/spiderman-full-mask.jpg"
              alt="MCU Spider-Man"
              className="w-full h-full object-cover object-center"
            />
            {/* Spider-Man Suit Shadow Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />

            {/* Spider-Man Label top left */}
            <div className="absolute top-3 left-3 z-20 pointer-events-none">
              <span className="px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider bg-red-600/90 text-white shadow-md border border-red-400/50 backdrop-blur-sm">
                🕷️ Spider-Man
              </span>
            </div>
          </div>

          {/* ORGANIC SPIDER-MAN WEB DIVIDER LINE & HANDLE */}
          <div
            className="absolute top-0 bottom-0 z-30 pointer-events-none"
            style={{
              left: `${currentPercent}%`,
              transform: 'translateX(-50%)',
            }}
          >
            {/* Neon Spider-Web Line */}
            <div className="w-[3px] h-full bg-gradient-to-b from-red-500 via-white to-[#2c67ed] shadow-[0_0_15px_rgba(239,68,68,1),0_0_15px_rgba(44,103,237,1)] relative">
              {/* Organic web strands along the seam */}
              <svg
                className="absolute -left-[14px] top-0 w-[31px] h-full opacity-60 pointer-events-none"
                viewBox="0 0 31 1000"
                preserveAspectRatio="none"
              >
                <path
                  d="M15,0 Q18,100 12,200 Q20,300 15,400 Q10,500 18,600 Q12,700 16,800 Q10,900 15,1000"
                  stroke="rgba(255,255,255,0.85)"
                  strokeWidth="1.5"
                  fill="none"
                />
                <path
                  d="M15,50 Q28,90 15,130 M15,250 Q2,290 15,330 M15,450 Q27,490 15,530 M15,650 Q3,690 15,730 M15,850 Q26,890 15,930"
                  stroke="rgba(255,255,255,0.7)"
                  strokeWidth="1.2"
                  fill="none"
                />
              </svg>
            </div>

            {/* Center Grab Handle with Spider Icon */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-gradient-to-tr from-red-600 via-slate-900 to-[#2c67ed] p-[1.5px] shadow-[0_0_25px_rgba(239,68,68,0.95),0_0_15px_rgba(44,103,237,0.95)] flex items-center justify-center">
              <div className="w-full h-full rounded-full bg-black/90 flex items-center justify-center text-white backdrop-blur-md">
                <span className="text-base sm:text-lg font-black transform hover:scale-125 transition-transform drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]">
                  🕷️
                </span>
              </div>
            </div>
          </div>

          {/* Bottom Title Bar with Alter-Ego Status */}
          <div className="absolute bottom-3 left-3 right-3 z-30 text-white flex items-end justify-between pointer-events-none">
            <div className="drop-shadow-md">
              <p className="font-extrabold text-sm sm:text-base leading-tight text-white drop-shadow-md">
                {currentPercent > 70
                  ? 'Peter Parker Alter Ego'
                  : currentPercent < 30
                  ? 'Yogi Pratama Nusantara'
                  : 'Yogi × Spider-Man'}
              </p>
              <p className="text-[10px] sm:text-xs text-cyan-300 font-semibold drop-shadow">
                {currentPercent > 50
                  ? 'With Great Code Comes Great Responsibility ⚡'
                  : 'S1 Teknik Informatika • UMM Malang'}
              </p>
            </div>

            {/* Split Percentage Gauge */}
            <div className="text-[9px] font-mono font-bold px-2 py-0.5 rounded-full bg-black/75 border border-white/20 text-cyan-300 shadow-sm backdrop-blur-sm">
              🕷️ {Math.round(currentPercent)}% | 👨‍💻 {Math.round(100 - currentPercent)}%
            </div>
          </div>
        </div>

        {/* Quick Transformation Presets Buttons */}
        <div className="mt-3 flex items-center justify-between gap-1.5 pt-1">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              targetSplit.set(0)
            }}
            className={`flex-1 py-1 px-1.5 rounded-lg text-[10px] font-bold border transition-all cursor-pointer ${
              currentPercent < 20
                ? 'bg-[#2c67ed] text-white border-[#2c67ed] shadow-md'
                : darkMode
                ? 'bg-white/5 border-slate-700 text-slate-300 hover:bg-white/10'
                : 'bg-slate-100 border-slate-300 text-slate-700 hover:bg-slate-200'
            }`}
          >
            👨‍💻 Yogi (0%)
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              targetSplit.set(48.3)
            }}
            className={`flex-1 py-1 px-1.5 rounded-lg text-[10px] font-bold border transition-all cursor-pointer ${
              currentPercent >= 35 && currentPercent <= 65
                ? 'bg-gradient-to-r from-red-600 via-purple-600 to-[#2c67ed] text-white border-transparent shadow-[0_0_12px_rgba(239,68,68,0.5)]'
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
              targetSplit.set(100)
            }}
            className={`flex-1 py-1 px-1.5 rounded-lg text-[10px] font-bold border transition-all cursor-pointer ${
              currentPercent > 80
                ? 'bg-red-600 text-white border-red-600 shadow-md'
                : darkMode
                ? 'bg-white/5 border-slate-700 text-slate-300 hover:bg-white/10'
                : 'bg-slate-100 border-slate-300 text-slate-700 hover:bg-slate-200'
            }`}
          >
            🕷️ Spidey (100%)
          </button>
        </div>

        {/* Guidance Prompt Hint */}
        <div className="mt-2.5 py-1 px-2.5 rounded-xl bg-gradient-to-r from-red-500/15 via-purple-500/10 to-[#2c67ed]/15 border border-red-500/30 flex items-center justify-between text-[11px] font-bold">
          <span className="flex items-center gap-1 text-red-400">
            <MoveHorizontal className="w-3.5 h-3.5 animate-pulse" />
            <span>Sentuh & Geser Foto</span>
          </span>
          <span className="text-xs text-[#2c67ed] font-extrabold flex items-center gap-1">
            <span>Spider-Man Mode</span>
            <span className="animate-spin" style={{ animationDuration: '8s' }}>🕸️</span>
          </span>
        </div>
      </div>
    </div>
  )
}
