import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FolderGit2,
  ExternalLink,
  Layers,
  Sparkles,
  Maximize2,
  Laptop,
  Smartphone,
  Eye,
  CheckCircle2,
  Calendar,
  Grid,
  X,
} from 'lucide-react'
import { PROJECTS, ProjectItem } from '../data/portfolioData'
import { ProjectModal } from './ProjectModal'

interface PortfolioSectionProps {
  darkMode: boolean
  onOpenPortfolioModal: () => void
}

type CategoryFilter = 'all' | 'web' | 'mobile' | 'uiux' | 'graphic' | 'admin'

export const PortfolioSection: React.FC<PortfolioSectionProps> = ({ darkMode, onOpenPortfolioModal }) => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('all')
  const [activeModalProject, setActiveModalProject] = useState<ProjectItem | null>(null)
  const [lightboxImage, setLightboxImage] = useState<{ url: string; title: string; category: string } | null>(null)

  const filterTabs = [
    { id: 'all' as CategoryFilter, label: 'Semua Proyek' },
    { id: 'web' as CategoryFilter, label: 'Web Development' },
    { id: 'mobile' as CategoryFilter, label: 'Mobile App' },
    { id: 'uiux' as CategoryFilter, label: 'UI/UX Design' },
    { id: 'graphic' as CategoryFilter, label: 'Graphic Design' },
  ]

  const filteredProjects =
    selectedCategory === 'all'
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === selectedCategory)

  // Render individual realistic mockups according to project mockupType
  const renderMockup = (project: ProjectItem) => {
    // If the user uploaded an image, display it fully and neatly uncropped
    if (project.imageUrl) {
      return (
        <div className="relative w-full h-60 sm:h-64 flex items-center justify-center p-2 rounded-2xl overflow-hidden group/img">
          {/* Ambient Glow */}
          <div
            className="absolute inset-2 rounded-2xl blur-2xl opacity-25 group-hover/img:opacity-40 transition-opacity duration-500 pointer-events-none"
            style={{ backgroundColor: project.accentColor || '#2c67ed' }}
          />

          {/* Full Uncropped Image */}
          <img
            src={project.imageUrl}
            alt={project.title}
            className="max-h-full max-w-full w-auto h-auto object-contain rounded-xl drop-shadow-[0_12px_24px_rgba(0,0,0,0.65)] group-hover/img:scale-[1.03] transition-transform duration-500"
            loading="lazy"
          />

          {/* Type Badge */}
          <div className="absolute top-2 left-2 px-2.5 py-1 rounded-full text-[10px] font-bold bg-black/70 backdrop-blur-md border border-white/15 text-white flex items-center gap-1.5 shadow-md">
            <span className="w-1.5 h-1.5 rounded-full bg-[#2c67ed] animate-pulse" />
            <span>{project.categoryLabel}</span>
          </div>

          {/* Quick Zoom Button */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              setLightboxImage({
                url: project.imageUrl!,
                title: project.title,
                category: project.categoryLabel,
              })
            }}
            className="absolute top-2 right-2 p-1.5 rounded-lg bg-black/70 hover:bg-[#2c67ed] text-white border border-white/20 backdrop-blur-md opacity-80 hover:opacity-100 transition-all shadow-md cursor-pointer"
            title="Perbesar Gambar Penuh"
          >
            <Maximize2 className="w-3.5 h-3.5" />
          </button>
        </div>
      )
    }

    // Fallback simulated mockups if no image is uploaded
    switch (project.mockupType) {
      case 'laptop':
        return (
          <div className="relative mx-auto w-full max-w-md pt-2">
            {/* Laptop Body Shell */}
            <div className="relative rounded-t-xl bg-slate-800 p-2 border-t-2 border-x-2 border-slate-600 shadow-2xl">
              {/* Web Browser Frame */}
              <div className="rounded-lg overflow-hidden bg-slate-950 border border-slate-700">
                {/* Browser Top Navigation */}
                <div className="flex items-center justify-between px-3 py-1.5 bg-slate-900 border-b border-slate-800 text-[10px] text-slate-400">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  </div>
                  <div className="flex-1 max-w-[200px] mx-2 px-2 py-0.5 rounded bg-slate-800/80 text-[9px] text-center truncate text-slate-300">
                    {project.previewUrl ? project.previewUrl.replace(/^https?:\/\//, '') : 'ruangrapat.diskominfo.malangkab.go.id'}
                  </div>
                  <span className="text-[9px] font-bold text-cyan-400">Live Web</span>
                </div>

                {/* Simulated Screen UI: Web Ruang Rapat */}
                <div className="p-3 bg-gradient-to-b from-[#0a1128] to-[#040817] text-white min-h-[160px] flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between border-b border-blue-900/50 pb-2 mb-2">
                      <div className="flex items-center gap-1.5">
                        <div className="w-5 h-5 rounded bg-[#2c67ed] flex items-center justify-center text-[10px] font-black">
                          D
                        </div>
                        <span className="font-bold text-[11px] text-blue-200">
                          Sistem Ruang Rapat
                        </span>
                      </div>
                      <span className="text-[8px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                        WA Gateway Active
                      </span>
                    </div>

                    <div className="space-y-1.5 text-[9px]">
                      <div className="flex justify-between items-center bg-slate-800/50 p-1.5 rounded border border-slate-700/50">
                        <span className="font-semibold text-blue-300">Ruang Anjasmoro</span>
                        <span className="px-1.5 py-0.2 rounded bg-blue-500/20 text-blue-300">
                          Divisi Kominfo
                        </span>
                        <span className="text-emerald-400 font-bold">Tersedia</span>
                      </div>
                      <div className="flex justify-between items-center bg-slate-800/50 p-1.5 rounded border border-slate-700/50">
                        <span className="font-semibold text-blue-300">Ruang Bromo</span>
                        <span className="px-1.5 py-0.2 rounded bg-indigo-500/20 text-indigo-300">
                          Divisi Statistik
                        </span>
                        <span className="text-amber-400 font-bold">13:00 WIB</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-2 flex items-center justify-between text-[8px] text-slate-400 pt-1 border-t border-slate-800">
                    <span>5 Divisi Terdaftar</span>
                    <span className="text-[#2c67ed] font-semibold">Database MySQL</span>
                  </div>
                </div>
              </div>
            </div>
            {/* Laptop Base Stand */}
            <div className="h-2.5 bg-slate-700 rounded-b-xl border-t border-slate-600 shadow-md flex justify-center">
              <div className="w-16 h-1 bg-slate-500 rounded-b" />
            </div>
          </div>
        )

      case 'mobile':
        return (
          <div className="relative mx-auto w-48 sm:w-52 py-2">
            {/* Smartphone Chassis */}
            <div className="rounded-[30px] p-2 bg-slate-900 border-2 border-slate-700 shadow-2xl">
              {/* Screen */}
              <div className="rounded-[22px] overflow-hidden bg-gradient-to-b from-slate-900 to-[#0e172e] text-white p-2.5">
                {/* Dynamic Island Notch */}
                <div className="flex justify-center mb-2">
                  <div className="w-16 h-3 bg-black rounded-full flex items-center justify-end px-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                  </div>
                </div>

                {/* Simulated Snack App UI */}
                <div className="text-center mb-2">
                  <span className="text-[11px] font-bold text-amber-400">SnackStore Mobile</span>
                  <p className="text-[8px] text-slate-400">Flutter • Dart • Android</p>
                </div>

                {/* Product Card Preview */}
                <div className="bg-slate-800/80 rounded-xl p-2 border border-slate-700 mb-2">
                  <div className="flex justify-between items-center text-[9px] mb-1">
                    <span className="font-bold text-slate-200">Chips Original</span>
                    <span className="text-amber-400 font-black">$2.40</span>
                  </div>
                  <div className="h-10 bg-amber-500/10 rounded-lg flex items-center justify-center text-[9px] text-amber-300 font-bold">
                    🍟 Crispy Snack Pack
                  </div>
                  <div className="mt-1 flex justify-between text-[8px] text-slate-400">
                    <span>Stok: 50 pcs</span>
                    <span className="text-emerald-400 font-bold">+ Tambah Cart</span>
                  </div>
                </div>

                <div className="p-1.5 rounded-lg bg-[#2c67ed] text-white text-center text-[9px] font-bold shadow-md">
                  Place the Order
                </div>
              </div>
            </div>
          </div>
        )

      case 'dual-mobile':
        return (
          <div className="relative mx-auto w-full max-w-sm flex items-center justify-center gap-2 py-2">
            {/* Phone 1: Dashboard E-Posyandu */}
            <div className="w-36 rounded-2xl p-1.5 bg-slate-900 border border-indigo-500/40 shadow-xl">
              <div className="rounded-xl bg-slate-950 p-2 text-[8px] text-white">
                <div className="w-8 h-1 bg-slate-700 rounded-full mx-auto mb-1" />
                <div className="text-center font-bold text-indigo-400 mb-1">E-POSYANDU</div>
                <div className="space-y-1 mb-2">
                  <div className="p-1 rounded bg-slate-800/80 flex justify-between">
                    <span>Akmal (1th)</span>
                    <span className="text-emerald-400">Normal</span>
                  </div>
                  <div className="p-1 rounded bg-slate-800/80 flex justify-between">
                    <span>Zenitsu</span>
                    <span className="text-amber-400">Pantau</span>
                  </div>
                </div>
                <div className="p-1 rounded bg-indigo-600/40 text-center text-indigo-200 font-bold">
                  Grafik Tumbuh
                </div>
              </div>
            </div>

            {/* Phone 2: Education / Article */}
            <div className="w-36 rounded-2xl p-1.5 bg-slate-900 border border-blue-500/40 shadow-xl -mt-4">
              <div className="rounded-xl bg-slate-950 p-2 text-[8px] text-white">
                <div className="w-8 h-1 bg-slate-700 rounded-full mx-auto mb-1" />
                <div className="text-center font-bold text-cyan-400 mb-1">ARTIKEL GIZI</div>
                <div className="p-1 rounded bg-blue-900/40 border border-blue-800 mb-1.5">
                  <div className="font-bold text-blue-200">Cegah Stunting</div>
                  <div className="text-[7px] text-slate-300">Gizi seimbang bagi anak</div>
                </div>
                <div className="p-1 rounded bg-slate-800 text-center text-slate-300">
                  Figma Prototype
                </div>
              </div>
            </div>
          </div>
        )

      case 'instagram':
        return (
          <div className="relative mx-auto w-full max-w-sm py-2">
            {/* Instagram Feed Post Card */}
            <div className="rounded-2xl p-2.5 bg-slate-900 border border-blue-500/30 shadow-2xl text-white text-xs">
              {/* IG Header */}
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-amber-400 via-rose-500 to-indigo-600 p-[1px]">
                    <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center text-[9px] font-bold text-[#2c67ed]">
                      B
                    </div>
                  </div>
                  <div>
                    <div className="font-bold text-[10px] flex items-center gap-1">
                      rumahbumnkotamalang
                      <span className="text-[#2c67ed]">✓</span>
                    </div>
                    <div className="text-[8px] text-slate-400">Malang, Jawa Timur</div>
                  </div>
                </div>
                <span className="text-[10px] text-slate-400">•••</span>
              </div>

              {/* Visual Showcase Banner */}
              <div className="rounded-xl overflow-hidden bg-gradient-to-br from-[#1e3a8a] via-[#1d4ed8] to-[#2563eb] p-3 text-center text-white">
                <span className="inline-block px-2 py-0.5 rounded bg-amber-400 text-slate-900 font-extrabold text-[8px] mb-1">
                  AI UNTUK UMKM
                </span>
                <p className="font-extrabold text-sm tracking-tight text-white mb-0.5">
                  Solusi Pintar, Usaha Lancar!
                </p>
                <p className="text-[9px] text-blue-200">Rumah BUMN Kota Malang & Jatim</p>
                <div className="mt-2 flex justify-center gap-1 text-[8px]">
                  <span className="px-1.5 py-0.5 rounded bg-black/40">15+ Feed Desain</span>
                  <span className="px-1.5 py-0.5 rounded bg-black/40">Canva Design</span>
                </div>
              </div>

              <div className="mt-2 flex justify-between text-[9px] text-slate-400 px-1">
                <span>❤️ 1,216 Likes</span>
                <span className="text-[#2c67ed] font-semibold">Branding UMKM</span>
              </div>
            </div>
          </div>
        )

      case 'apparel':
        return (
          <div className="relative mx-auto w-full max-w-sm py-2">
            <div className="rounded-2xl p-3 bg-slate-900 border border-red-500/30 shadow-2xl text-white">
              <div className="flex items-center justify-between mb-2">
                <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-red-600 text-white">
                  Karate UMM Championship
                </span>
                <span className="text-[9px] text-amber-400 font-bold">30 Kontingen</span>
              </div>

              {/* Jacket Concept Mockup Preview */}
              <div className="rounded-xl bg-gradient-to-br from-red-950 via-slate-900 to-slate-950 p-3 border border-red-800/40 text-center">
                <div className="text-3xl mb-1">🥋</div>
                <h5 className="font-black text-xs text-red-400">DESAIN JAKET RESMI KONTINGEN</h5>
                <p className="text-[9px] text-slate-300">Merah • Putih • Garis Aksen Emas • Logo UMM</p>

                <div className="mt-2 flex justify-center gap-2">
                  <span className="w-4 h-4 rounded-full bg-red-600 border border-white" title="Merah" />
                  <span className="w-4 h-4 rounded-full bg-blue-900 border border-white" title="Navy" />
                  <span className="w-4 h-4 rounded-full bg-slate-900 border border-white" title="Hitam" />
                </div>
              </div>

              <p className="mt-2 text-[8px] text-slate-400 text-center">
                Dirancang khusus dengan Figma untuk kejuaraan karate tingkat nasional
              </p>
            </div>
          </div>
        )

      case 'dashboard':
        return (
          <div className="relative mx-auto w-full max-w-sm py-2">
            <div className="rounded-2xl p-3 bg-slate-900 border border-emerald-500/30 shadow-2xl text-white text-xs">
              <div className="flex items-center justify-between mb-2 border-b border-slate-800 pb-1.5">
                <span className="font-bold text-[10px] text-emerald-400">
                  Google Workspace Database TU
                </span>
                <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[8px] font-bold">
                  100% Cloud Synced
                </span>
              </div>

              <div className="space-y-1.5 text-[9px]">
                <div className="p-1.5 rounded bg-slate-800/80 flex justify-between items-center">
                  <span>Transkrip & Yudisium</span>
                  <span className="px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-400">
                    50+ Berkas/Bulan
                  </span>
                </div>
                <div className="p-1.5 rounded bg-slate-800/80 flex justify-between items-center">
                  <span>Arsip Surat Warek III</span>
                  <span className="px-1.5 py-0.2 rounded bg-blue-500/20 text-blue-400">
                    100+ Terkelola
                  </span>
                </div>
              </div>

              <div className="mt-2 pt-1 border-t border-slate-800 flex justify-between text-[8px] text-slate-400">
                <span>Google Sheets Automation</span>
                <span className="text-emerald-400 font-bold">Akurasi 99.9%</span>
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <section id="portfolio" className="relative py-20 lg:py-28 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4 border ${
              darkMode
                ? 'bg-blue-950/60 border-blue-500/40 text-blue-300 shadow-[0_0_15px_rgba(44,103,237,0.3)]'
                : 'bg-blue-100/90 border-blue-400/50 text-[#2c67ed]'
            }`}
          >
            <FolderGit2 className="w-3.5 h-3.5" />
            <span>Koleksi Karya Unggulan</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight"
          >
            Portofolio &{' '}
            <span className="bg-gradient-to-r from-[#2c67ed] via-blue-500 to-indigo-400 bg-clip-text text-transparent">
              Showcase Proyek
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className={`mt-4 text-base sm:text-lg ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}
          >
            Semua proyek dilengkapi mockup visual interaktif, mulai dari sistem web pemerintahan, aplikasi mobile, UI/UX, desain grafis BUMN, hingga digitalisasi administrasi.
          </motion.p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {filterTabs.map((tab) => {
            const isActive = selectedCategory === tab.id
            return (
              <button
                key={tab.id}
                onClick={() => setSelectedCategory(tab.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-[#2c67ed] to-blue-600 text-white shadow-[0_0_20px_rgba(44,103,237,0.6)] scale-105'
                    : darkMode
                    ? 'bg-[#0d1430]/70 text-slate-300 hover:bg-white/10 border border-slate-800'
                    : 'bg-white/90 text-slate-700 hover:bg-blue-50 border border-blue-200'
                }`}
              >
                {tab.label}
              </button>
            )
          })}
        </div>

        {/* Project Cards Grid with Interactive Mockups */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.35 }}
                className={`group rounded-3xl border flex flex-col justify-between overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl ${
                  darkMode
                    ? 'bg-[#0b122e]/90 border-[#2c67ed]/40 hover:border-blue-400 hover:shadow-[0_0_35px_rgba(44,103,237,0.4)]'
                    : 'bg-white/95 border-blue-200 hover:border-blue-400 hover:shadow-[0_12px_40px_rgba(44,103,237,0.22)]'
                }`}
              >
                {/* Mockup Display Box */}
                <div
                  onClick={() => setActiveModalProject(project)}
                  className={`p-3 sm:p-4 border-b relative overflow-hidden flex items-center justify-center cursor-pointer transition-colors ${
                    darkMode
                      ? 'bg-gradient-to-b from-[#0a1128] via-[#070b1c] to-[#040714] border-slate-800/80 hover:bg-[#0c1533]'
                      : 'bg-gradient-to-b from-blue-100/70 via-blue-50/50 to-white border-blue-100 hover:bg-blue-100/80'
                  }`}
                >
                  {/* Subtle Background Glow behind Mockup */}
                  <div className="absolute inset-0 bg-[#2c67ed]/10 blur-xl pointer-events-none group-hover:bg-[#2c67ed]/20 transition-all duration-500" />

                  {/* Render the specific Mockup / Image */}
                  {renderMockup(project)}

                  {/* Quick Expand Button on Hover */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      if (project.imageUrl) {
                        setLightboxImage({
                          url: project.imageUrl,
                          title: project.title,
                          category: project.categoryLabel,
                        })
                      } else {
                        setActiveModalProject(project)
                      }
                    }}
                    className="absolute top-3 right-3 p-2 rounded-xl bg-black/60 hover:bg-[#2c67ed] text-white opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-lg cursor-pointer"
                    title={project.imageUrl ? 'Perbesar Gambar' : 'Buka Detail Proyek'}
                  >
                    <Maximize2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Card Content & Details */}
                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Category & Date */}
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#2c67ed]/20 text-[#2c67ed]">
                        {project.categoryLabel}
                      </span>
                      <span className="text-[11px] font-medium opacity-70 flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {project.date}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-lg sm:text-xl font-extrabold text-[#2c67ed] mb-1 group-hover:text-cyan-400 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-xs font-semibold opacity-75 mb-3">{project.subtitle}</p>

                    {/* Brief Description */}
                    <p
                      className={`text-xs sm:text-sm line-clamp-3 leading-relaxed mb-4 ${
                        darkMode ? 'text-slate-300' : 'text-slate-600'
                      }`}
                    >
                      {project.description}
                    </p>

                    {/* Tools Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {project.tools.slice(0, 4).map((tool) => (
                        <span
                          key={tool}
                          className={`px-2 py-0.5 rounded-md text-[10px] font-semibold border ${
                            darkMode
                              ? 'bg-white/5 border-slate-700 text-slate-300'
                              : 'bg-slate-100 border-slate-300 text-slate-700'
                          }`}
                        >
                          {tool}
                        </span>
                      ))}
                      {project.tools.length > 4 && (
                        <span className="px-1.5 py-0.5 rounded-md text-[10px] font-semibold opacity-60">
                          +{project.tools.length - 4}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Actions: Direct Link + Modal */}
                  <div className="pt-4 border-t border-slate-700/30 flex items-center gap-2">
                    <button
                      onClick={() => setActiveModalProject(project)}
                      className="flex-1 py-2 px-3 rounded-xl text-xs font-bold bg-[#2c67ed] hover:bg-blue-600 text-white flex items-center justify-center gap-1.5 shadow-[0_0_15px_rgba(44,103,237,0.45)] transition-all cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Detail Mockup</span>
                    </button>

                    {project.previewUrl && (
                      <a
                        href={project.previewUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`py-2 px-3 rounded-xl text-xs font-bold border flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                          darkMode
                            ? 'border-[#2c67ed]/50 bg-blue-950/40 text-cyan-300 hover:bg-[#2c67ed] hover:text-white'
                            : 'border-blue-300 bg-blue-50 text-[#2c67ed] hover:bg-[#2c67ed] hover:text-white'
                        }`}
                        title="Buka Link Proyek Ini"
                      >
                        <span>Buka Link</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Download Portfolio Deck Section Banner */}
        <div className="mt-14 p-6 sm:p-8 rounded-3xl border bg-gradient-to-r from-blue-900/30 via-[#2c67ed]/20 to-indigo-900/30 backdrop-blur-xl border-blue-500/40 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h4 className="text-xl sm:text-2xl font-extrabold text-[#2c67ed] mb-1">
              Ingin Meninjau Portofolio Lengkap (15 Slide Presentasi)?
            </h4>
            <p className={`text-xs sm:text-sm ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
              Dokumen portofolio PDF resmi mencakup dokumentasi kegiatan, screenshot layar aplikasi, dan foto kontingen.
            </p>
          </div>

          <button
            onClick={onOpenPortfolioModal}
            className="px-6 py-3 rounded-xl text-xs sm:text-sm font-bold bg-[#2c67ed] hover:bg-blue-600 text-white flex items-center gap-2 shadow-[0_0_20px_rgba(44,103,237,0.6)] hover:scale-105 active:scale-95 transition-all whitespace-nowrap cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            <span>Buka Presentasi Portofolio</span>
          </button>
        </div>
      </div>

      {/* Case Study Modal */}
      <ProjectModal
        project={activeModalProject}
        onClose={() => setActiveModalProject(null)}
        darkMode={darkMode}
      />

      {/* Fullscreen Image Lightbox Modal */}
      <AnimatePresence>
        {lightboxImage && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 backdrop-blur-xl bg-black/85 overflow-y-auto cursor-pointer"
            onClick={() => setLightboxImage(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl max-h-[92vh] w-full flex flex-col items-center justify-center rounded-3xl p-3 sm:p-5 border border-[#2c67ed]/50 bg-[#090e24]/95 shadow-[0_0_50px_rgba(44,103,237,0.5)] cursor-default"
            >
              <div className="w-full flex items-center justify-between pb-3 px-2 border-b border-slate-700/50 mb-3">
                <div>
                  <span className="text-[11px] font-bold text-cyan-400 uppercase tracking-wider">
                    {lightboxImage.category}
                  </span>
                  <h4 className="text-base sm:text-lg font-extrabold text-white">
                    {lightboxImage.title}
                  </h4>
                </div>
                <button
                  onClick={() => setLightboxImage(null)}
                  className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer"
                  title="Tutup"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="w-full flex-1 flex items-center justify-center overflow-hidden max-h-[78vh] p-1">
                <img
                  src={lightboxImage.url}
                  alt={lightboxImage.title}
                  className="max-h-[76vh] max-w-full w-auto h-auto object-contain rounded-xl drop-shadow-2xl"
                />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  )
}
