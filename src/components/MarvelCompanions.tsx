import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, Zap, Shield, Heart, X, MessageSquare } from 'lucide-react'

interface MarvelCompanionsProps {
  darkMode: boolean
}

type MarvelHeroId = 'spiderman' | 'ironman' | 'groot' | 'thor' | 'cap'

interface HeroData {
  id: MarvelHeroId
  name: string
  alias: string
  accentColor: string
  tagline: string
  quotes: string[]
  icon: string
}

const HEROES: Record<MarvelHeroId, HeroData> = {
  spiderman: {
    id: 'spiderman',
    name: 'Spider-Man',
    alias: 'Peter Parker',
    accentColor: '#ef4444',
    tagline: 'Your Friendly Neighborhood Web-Slinger',
    icon: '🕷️',
    quotes: [
      'With great code comes great responsibility! 🕸️💻',
      'Spider-Sense mendeteksi calon developer hebat di sini! 🕷️✨',
      'Thwip! Thwip! Fitur web ini aman terlindungi jaring laba-laba! 🕸️',
      'Coba cek section Tentang Saya, ada alter-ego saya bersama Yogi!',
    ],
  },
  ironman: {
    id: 'ironman',
    name: 'Iron Man',
    alias: 'Tony Stark',
    accentColor: '#f59e0b',
    tagline: 'Genius, Billionaire, Tech Enthusiast',
    icon: '🤖',
    quotes: [
      'I am Iron Man... dan Yogi siap jadi engineer terbaikmu! 💥',
      'Arc Reactor berjalan di 100% efisiensi, sama seperti performa web ini! ⚡',
      'JARVIS baru saja menganalisis CV Yogi: Kesimpulan: Sangat Direkomendasikan! 📈',
      'Teknologi canggih butuh eksekutor handal. Yogi adalah pilihannya! 🚀',
    ],
  },
  groot: {
    id: 'groot',
    name: 'Baby Groot',
    alias: 'Guardians of the Galaxy',
    accentColor: '#22c55e',
    tagline: 'Flora Colossus & Galactic Dancer',
    icon: '🌱',
    quotes: [
      'I am Groot! 🌸 (Terjemahan: Halo semuanya, portofolio Yogi keren banget!)',
      'I am Groot! 🎶 (Terjemahan: Ayo menari bersama di semesta kosmik!)',
      'I am Groot! ✨ (Terjemahan: Jangan lupa cek 22 sertifikat resminya ya!)',
      'We are Groot! 💖 (Terjemahan: Siap berkolaborasi untuk proyek masa depan!)',
    ],
  },
  thor: {
    id: 'thor',
    name: 'Thor Odinson',
    alias: 'God of Thunder',
    accentColor: '#38bdf8',
    tagline: 'Wielder of Mjolnir & Thunder',
    icon: '⚡',
    quotes: [
      'Demi Asgard! Portofolio ini sungguh layak (WORTHY)! ⚡🔨',
      'Petir saya mengalirkan daya listrik 1.21 Gigawatt ke server Yogi! ⚡',
      'Mjolnir hanya terangkat oleh mereka yang berdedikasi tinggi! 🛡️',
      'Bersiaplah menghadapi masa depan dengan kode sekuat petir! ⛈️',
    ],
  },
  cap: {
    id: 'cap',
    name: 'Captain America',
    alias: 'Steve Rogers',
    accentColor: '#2563eb',
    tagline: 'The First Avenger & Team Leader',
    icon: '🛡️',
    quotes: [
      'I can code this all day! 🛡️🇺🇸',
      'Kepemimpinan organisasi HMIF Yogi membuktikan jiwa First Avenger sejati! 🎖️',
      'Perisai Vibranium siap menahan semua bug di production! 🛡️✨',
      'Avengers... Assemble! Bersatu untuk karya teknologi terbaik!',
    ],
  },
}

export const MarvelCompanions: React.FC<MarvelCompanionsProps> = ({ darkMode }) => {
  const [activeHero, setActiveHero] = useState<MarvelHeroId>('spiderman')
  const [currentQuote, setCurrentQuote] = useState<string>('')
  const [isBubbleOpen, setIsBubbleOpen] = useState(false)
  const [spideyFlipping, setSpideyFlipping] = useState(false)
  const [ironmanBlasting, setIronmanBlasting] = useState(false)
  const [grootDancing, setGrootDancing] = useState(false)
  const [thorShocking, setThorShocking] = useState(false)
  const [capShielding, setCapShielding] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)

  // Show a welcome superhero quote on start
  useEffect(() => {
    const timer = setTimeout(() => {
      triggerHeroQuote('spiderman')
    }, 3500)
    return () => clearTimeout(timer)
  }, [])

  const triggerHeroQuote = (heroId: MarvelHeroId) => {
    setActiveHero(heroId)
    const list = HEROES[heroId].quotes
    const randomQuote = list[Math.floor(Math.random() * list.length)]
    setCurrentQuote(randomQuote)
    setIsBubbleOpen(true)
  }

  // Trigger Action for Spider-Man
  const handleSpideyClick = () => {
    setSpideyFlipping(true)
    triggerHeroQuote('spiderman')
    setTimeout(() => setSpideyFlipping(false), 900)
  }

  // Trigger Action for Iron Man
  const handleIronManClick = () => {
    setIronmanBlasting(true)
    triggerHeroQuote('ironman')
    setTimeout(() => setIronmanBlasting(false), 1000)
  }

  // Trigger Action for Groot
  const handleGrootClick = () => {
    setGrootDancing(true)
    triggerHeroQuote('groot')
    setTimeout(() => setGrootDancing(false), 1200)
  }

  // Trigger Action for Thor
  const handleThorClick = () => {
    setThorShocking(true)
    triggerHeroQuote('thor')
    setTimeout(() => setThorShocking(false), 1000)
  }

  // Trigger Action for Captain America
  const handleCapClick = () => {
    setCapShielding(true)
    triggerHeroQuote('cap')
    setTimeout(() => setCapShielding(false), 1000)
  }

  return (
    <>
      {/* ============================================================ */}
      {/* 1. SPIDER-MAN: HANGING UPSIDE-DOWN BY WEB (Top Right Edge) */}
      {/* ============================================================ */}
      <div className="fixed top-0 right-14 sm:right-28 z-40 pointer-events-auto select-none">
        {/* Animated Web String */}
        <motion.div
          animate={{
            scaleY: [1, 1.06, 0.98, 1],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="w-[1.5px] h-20 sm:h-28 bg-gradient-to-b from-white/90 via-slate-200 to-white/70 mx-auto shadow-[0_0_8px_rgba(255,255,255,0.8)] origin-top"
        />

        {/* Hanging Spider-Man */}
        <motion.div
          onClick={handleSpideyClick}
          animate={
            spideyFlipping
              ? {
                  rotate: [0, 180, 360, 0],
                  scale: [1, 1.3, 1],
                  y: [0, -25, 0],
                }
              : {
                  rotate: [-4, 5, -5, 4, -4],
                  y: [0, 4, -3, 0],
                }
          }
          transition={
            spideyFlipping
              ? { duration: 0.8, ease: 'easeInOut' }
              : { duration: 4, repeat: Infinity, ease: 'easeInOut' }
          }
          whileHover={{ scale: 1.15 }}
          className="relative -mt-1 cursor-pointer group"
          title="Klik Spider-Man! 🕷️🕸️"
        >
          {/* Spidey Red Aura */}
          <div className="absolute -inset-2 rounded-full bg-red-500/30 blur-md opacity-0 group-hover:opacity-100 transition-opacity" />

          {/* Upside Down Chibi Spidey SVG */}
          <div className="relative w-12 h-14 sm:w-14 sm:h-16 flex items-center justify-center">
            <svg viewBox="0 0 54 62" className="w-full h-full drop-shadow-[0_4px_12px_rgba(239,68,68,0.7)]">
              {/* Web attachment loop */}
              <circle cx="27" cy="6" r="3" fill="#cbd5e1" stroke="#ffffff" strokeWidth="1" />
              <line x1="27" y1="6" x2="27" y2="14" stroke="#ffffff" strokeWidth="1.5" />

              {/* Spidey Suit Body (Upside Down) */}
              <path
                d="M17 14C17 14 27 10 37 14L34 32H20L17 14Z"
                fill="#2563eb"
                stroke="#1e293b"
                strokeWidth="1.2"
              />
              <path
                d="M22 13C22 13 27 12 32 13L31 28H23L22 13Z"
                fill="#dc2626"
              />

              {/* Spidey Head (Round cute chibi mask) */}
              <circle cx="27" cy="42" r="15" fill="#dc2626" stroke="#1e293b" strokeWidth="1.5" />

              {/* Spider Mask Web Lines */}
              <path d="M27 27V57M12 42H42" stroke="#991b1b" strokeWidth="0.8" opacity="0.8" />
              <path d="M16 32L38 52M16 52L38 32" stroke="#991b1b" strokeWidth="0.8" opacity="0.8" />

              {/* Big Expressive Spidey Eyes */}
              <motion.g
                animate={{
                  scaleY: spideyFlipping ? [1, 0.2, 1] : 1,
                }}
                transition={{ duration: 0.3 }}
              >
                {/* Left Eye */}
                <path
                  d="M16 39C16 39 21 37 25 42C25 45 22 47 17 45C15 44 15 40 16 39Z"
                  fill="#ffffff"
                  stroke="#0f172a"
                  strokeWidth="1.8"
                />
                {/* Right Eye */}
                <path
                  d="M38 39C38 39 33 37 29 42C29 45 32 47 37 45C39 44 39 40 38 39Z"
                  fill="#ffffff"
                  stroke="#0f172a"
                  strokeWidth="1.8"
                />
              </motion.g>

              {/* Spider Web Shooter Hand */}
              <motion.g
                animate={{
                  rotate: spideyFlipping ? [0, 45, 0] : [0, 8, 0],
                }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <circle cx="15" cy="22" r="3.5" fill="#dc2626" />
                <circle cx="39" cy="22" r="3.5" fill="#dc2626" />
              </motion.g>
            </svg>

            {/* Thwip Web Spray effect when clicked */}
            {spideyFlipping && (
              <motion.div
                initial={{ scale: 0, opacity: 1 }}
                animate={{ scale: 2.2, opacity: 0 }}
                transition={{ duration: 0.6 }}
                className="absolute -bottom-4 text-xs font-black text-white bg-red-600 px-2 py-0.5 rounded-full shadow-lg"
              >
                THWIP! 🕸️
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>

      {/* ============================================================ */}
      {/* 2. DANCING BABY GROOT (Sitting cute on the Right Screen Edge) */}
      {/* ============================================================ */}
      <div className="fixed bottom-28 right-6 z-40 select-none hidden md:block">
        <motion.div
          onClick={handleGrootClick}
          animate={
            grootDancing
              ? {
                  rotate: [-15, 15, -15, 15, 0],
                  scale: [1, 1.25, 1],
                  y: [0, -10, 0],
                }
              : {
                  rotate: [-6, 6, -6],
                  y: [0, -3, 0],
                }
          }
          transition={
            grootDancing
              ? { duration: 0.7, repeat: 2 }
              : { duration: 2.5, repeat: Infinity, ease: 'easeInOut' }
          }
          whileHover={{ scale: 1.2 }}
          className="relative cursor-pointer group flex flex-col items-center"
          title="Klik Baby Groot untuk menari! 🌱🌸"
        >
          {/* Chibi Baby Groot SVG */}
          <div className="w-12 h-14 sm:w-13 sm:h-15">
            <svg viewBox="0 0 48 56" className="w-full h-full drop-shadow-[0_4px_10px_rgba(34,197,94,0.5)]">
              {/* Plant Pot */}
              <path d="M14 36H34L32 52H16L14 36Z" fill="#ffffff" stroke="#94a3b8" strokeWidth="1.2" />
              <rect x="12" y="34" width="24" height="4" rx="2" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="1" />
              {/* Pot Label */}
              <text x="24" y="46" textAnchor="middle" fontSize="6" fontWeight="bold" fill="#2c67ed">
                GROOT
              </text>

              {/* Groot Stem/Body */}
              <path d="M22 28C22 28 20 34 24 35C28 34 26 28 26 28Z" fill="#854d0e" />

              {/* Swaying Tiny Wood Arms */}
              <motion.path
                d="M19 28C14 26 13 20 12 18"
                stroke="#854d0e"
                strokeWidth="2.5"
                strokeLinecap="round"
                animate={{ rotate: grootDancing ? [-20, 20, -20] : [-5, 5, -5] }}
                transition={{ duration: 1, repeat: Infinity }}
                style={{ transformOrigin: '19px 28px' }}
              />
              <motion.path
                d="M29 28C34 26 35 20 36 18"
                stroke="#854d0e"
                strokeWidth="2.5"
                strokeLinecap="round"
                animate={{ rotate: grootDancing ? [20, -20, 20] : [5, -5, 5] }}
                transition={{ duration: 1, repeat: Infinity }}
                style={{ transformOrigin: '29px 28px' }}
              />

              {/* Sprouting Cute Green Leaves */}
              <circle cx="12" cy="17" r="2.5" fill="#4ade80" />
              <circle cx="36" cy="17" r="2.5" fill="#4ade80" />

              {/* Groot Head */}
              <path
                d="M15 14C15 8 18 6 24 6C30 6 33 8 33 14C33 22 15 22 15 14Z"
                fill="#a16207"
                stroke="#713f12"
                strokeWidth="1.2"
              />
              {/* Wooden Head Crests */}
              <path d="M16 8L18 4L21 7L24 3L27 7L30 4L32 8" stroke="#713f12" strokeWidth="1" fill="#a16207" />

              {/* Huge Friendly Chibi Eyes */}
              <circle cx="20" cy="14" r="2.5" fill="#0f172a" />
              <circle cx="21" cy="13.2" r="0.9" fill="#ffffff" />

              <circle cx="28" cy="14" r="2.5" fill="#0f172a" />
              <circle cx="29" cy="13.2" r="0.9" fill="#ffffff" />

              {/* Rosy Cheeks */}
              <circle cx="18" cy="17" r="1.5" fill="#f43f5e" opacity="0.6" />
              <circle cx="30" cy="17" r="1.5" fill="#f43f5e" opacity="0.6" />

              {/* Smiling Mouth */}
              <path d="M22 18C23 20 25 20 26 18" stroke="#451a03" strokeWidth="1" strokeLinecap="round" fill="none" />
            </svg>
          </div>

          {/* Sprouting Flower on Click */}
          {grootDancing && (
            <motion.div
              initial={{ scale: 0, y: 10 }}
              animate={{ scale: 1.2, y: -8 }}
              className="absolute -top-3 text-sm"
            >
              🌸
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* ============================================================ */}
      {/* 3. FLOATING MARVEL AVENGERS SQUAD DOCK (Interactive Hub)     */}
      {/* ============================================================ */}
      <div className="fixed bottom-24 left-6 z-40 select-none hidden lg:block">
        <AnimatePresence>
          {!isMinimized ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.85, x: -20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.85, x: -20 }}
              className={`p-2.5 rounded-2xl border backdrop-blur-2xl shadow-2xl flex flex-col gap-2 ${
                darkMode
                  ? 'bg-[#0a0f26]/90 border-blue-500/40 text-white shadow-[0_0_30px_rgba(44,103,237,0.35)]'
                  : 'bg-white/95 border-blue-200 text-slate-800 shadow-[0_8px_30px_rgba(44,103,237,0.2)]'
              }`}
            >
              {/* Header Title */}
              <div className="flex items-center justify-between gap-3 px-1 pb-1 border-b border-slate-700/40">
                <span className="text-[11px] font-extrabold uppercase tracking-wider flex items-center gap-1.5 text-cyan-300">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin" />
                  <span>Marvel Squad</span>
                </span>
                <button
                  type="button"
                  onClick={() => setIsMinimized(true)}
                  className="text-slate-400 hover:text-white p-0.5 rounded text-xs"
                  title="Sembunyikan panel"
                >
                  ✕
                </button>
              </div>

              {/* Hero Avatars Button Row */}
              <div className="flex items-center gap-1.5 pt-0.5">
                {/* 1. Spider-Man */}
                <button
                  type="button"
                  onClick={handleSpideyClick}
                  className={`w-9 h-9 rounded-xl flex items-center justify-center text-lg transition-transform hover:scale-110 cursor-pointer ${
                    activeHero === 'spiderman'
                      ? 'bg-red-600/90 shadow-[0_0_12px_rgba(239,68,68,0.8)] border border-red-300'
                      : 'bg-white/5 hover:bg-white/10'
                  }`}
                  title="Spider-Man"
                >
                  🕷️
                </button>

                {/* 2. Iron Man */}
                <button
                  type="button"
                  onClick={handleIronManClick}
                  className={`w-9 h-9 rounded-xl flex items-center justify-center text-lg transition-transform hover:scale-110 cursor-pointer relative ${
                    activeHero === 'ironman'
                      ? 'bg-amber-500/90 shadow-[0_0_12px_rgba(245,158,11,0.8)] border border-amber-300'
                      : 'bg-white/5 hover:bg-white/10'
                  }`}
                  title="Iron Man"
                >
                  <span>🤖</span>
                  {ironmanBlasting && (
                    <span className="absolute -top-1 -right-1 flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                    </span>
                  )}
                </button>

                {/* 3. Baby Groot */}
                <button
                  type="button"
                  onClick={handleGrootClick}
                  className={`w-9 h-9 rounded-xl flex items-center justify-center text-lg transition-transform hover:scale-110 cursor-pointer ${
                    activeHero === 'groot'
                      ? 'bg-emerald-600/90 shadow-[0_0_12px_rgba(34,197,94,0.8)] border border-emerald-300'
                      : 'bg-white/5 hover:bg-white/10'
                  }`}
                  title="Baby Groot"
                >
                  🌱
                </button>

                {/* 4. Thor */}
                <button
                  type="button"
                  onClick={handleThorClick}
                  className={`w-9 h-9 rounded-xl flex items-center justify-center text-lg transition-transform hover:scale-110 cursor-pointer ${
                    activeHero === 'thor'
                      ? 'bg-cyan-600/90 shadow-[0_0_12px_rgba(56,189,248,0.8)] border border-cyan-300'
                      : 'bg-white/5 hover:bg-white/10'
                  }`}
                  title="Thor Odinson"
                >
                  ⚡
                </button>

                {/* 5. Captain America */}
                <button
                  type="button"
                  onClick={handleCapClick}
                  className={`w-9 h-9 rounded-xl flex items-center justify-center text-lg transition-transform hover:scale-110 cursor-pointer ${
                    activeHero === 'cap'
                      ? 'bg-blue-600/90 shadow-[0_0_12px_rgba(37,99,235,0.8)] border border-blue-300'
                      : 'bg-white/5 hover:bg-white/10'
                  }`}
                  title="Captain America"
                >
                  🛡️
                </button>
              </div>

              {/* Active Hero Label Hint */}
              <div className="flex items-center justify-between text-[10px] font-semibold text-slate-300 px-1">
                <span>{HEROES[activeHero].name}</span>
                <span className="text-cyan-400 font-bold">Klik untuk bicara</span>
              </div>
            </motion.div>
          ) : (
            <motion.button
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              onClick={() => setIsMinimized(false)}
              className="px-3 py-1.5 rounded-full bg-gradient-to-r from-red-600 via-[#2c67ed] to-amber-500 text-white text-xs font-black shadow-lg border border-white/30 flex items-center gap-1.5 hover:scale-105 cursor-pointer"
            >
              <span>🦸‍♂️</span>
              <span>Avengers</span>
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* ============================================================ */}
      {/* 4. GLOBAL MARVEL HERO SPEECH BUBBLE MODAL                    */}
      {/* ============================================================ */}
      <AnimatePresence>
        {isBubbleOpen && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            className="fixed bottom-24 right-20 sm:right-28 z-50 max-w-xs sm:max-w-sm pointer-events-auto select-none"
          >
            <div
              className={`p-4 rounded-3xl border shadow-2xl backdrop-blur-2xl ${
                darkMode
                  ? 'bg-[#090f28]/95 border-blue-500/50 text-white shadow-[0_0_35px_rgba(44,103,237,0.5)]'
                  : 'bg-white/95 border-blue-300 text-slate-800 shadow-[0_12px_35px_rgba(44,103,237,0.3)]'
              }`}
            >
              {/* Hero Banner Header */}
              <div className="flex items-center justify-between gap-2 mb-2 pb-2 border-b border-slate-700/40">
                <div className="flex items-center gap-2">
                  <span className="text-xl">{HEROES[activeHero].icon}</span>
                  <div>
                    <h4
                      className="font-black text-xs sm:text-sm tracking-wide leading-tight"
                      style={{ color: HEROES[activeHero].accentColor }}
                    >
                      {HEROES[activeHero].name}
                    </h4>
                    <span className="text-[10px] text-slate-400 block font-medium">
                      {HEROES[activeHero].alias}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setIsBubbleOpen(false)}
                  className="p-1 rounded-full text-slate-400 hover:text-white hover:bg-white/10"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Comic Speech Text */}
              <p className="text-xs sm:text-sm font-semibold leading-relaxed mb-3 text-slate-200">
                "{currentQuote}"
              </p>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-1 border-t border-slate-800 text-[10px]">
                <button
                  type="button"
                  onClick={() => triggerHeroQuote(activeHero)}
                  className="font-bold text-cyan-300 hover:text-cyan-200 cursor-pointer flex items-center gap-1"
                >
                  <Sparkles className="w-3 h-3" />
                  <span>Kutipan Lain</span>
                </button>
                <span className="font-mono text-slate-500 text-[9px]">Marvel Universe × Yogi</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
