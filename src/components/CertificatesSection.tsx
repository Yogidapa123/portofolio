import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Award,
  Search,
  ExternalLink,
  Eye,
  CheckCircle2,
  Sparkles,
  Calendar,
  Layers,
  FileCheck,
  Building,
  GraduationCap,
  X,
  ChevronLeft,
  ChevronRight,
  Download,
  BookOpen,
} from 'lucide-react'
import { CERTIFICATES, CertificateItem } from '../data/certificateData'

interface CertificatesSectionProps {
  darkMode: boolean
}

type CategoryType = 'all' | 'industry' | 'internship' | 'academic'

export const CertificatesSection: React.FC<CertificatesSectionProps> = ({ darkMode }) => {
  const [activeCategory, setActiveCategory] = useState<CategoryType>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCert, setSelectedCert] = useState<CertificateItem | null>(null)
  const [activePage, setActivePage] = useState<'page1' | 'page2'>('page1')

  // Reset active page to page 1 whenever a new certificate is selected
  useEffect(() => {
    setActivePage('page1')
  }, [selectedCert])

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedCert(null)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const categories = [
    {
      id: 'all' as CategoryType,
      label: 'Semua Sertifikat',
      count: CERTIFICATES.length,
      icon: Layers,
    },
    {
      id: 'industry' as CategoryType,
      label: 'Industri & Profesional',
      count: CERTIFICATES.filter((c) => c.category === 'industry').length,
      icon: Award,
    },
    {
      id: 'internship' as CategoryType,
      label: 'Magang & Institusi',
      count: CERTIFICATES.filter((c) => c.category === 'internship').length,
      icon: Building,
    },
    {
      id: 'academic' as CategoryType,
      label: 'Praktikum Lab Informatika UMM',
      count: CERTIFICATES.filter((c) => c.category === 'academic').length,
      icon: GraduationCap,
    },
  ]

  const filteredCertificates = CERTIFICATES.filter((cert) => {
    const matchesCategory =
      activeCategory === 'all' || cert.category === activeCategory
    const q = searchQuery.toLowerCase().trim()
    const matchesQuery =
      q === '' ||
      cert.title.toLowerCase().includes(q) ||
      cert.issuer.toLowerCase().includes(q) ||
      cert.description.toLowerCase().includes(q) ||
      (cert.grade && cert.grade.toLowerCase().includes(q)) ||
      cert.skills.some((s) => s.toLowerCase().includes(q))

    return matchesCategory && matchesQuery
  })

  return (
    <section id="certificates" className="relative py-20 lg:py-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
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
            <Sparkles className="w-3.5 h-3.5" />
            <span>Lisensi & Kredensial Resmi</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight"
          >
            Sertifikasi &{' '}
            <span className="bg-gradient-to-r from-[#2c67ed] via-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Pencapaian Kompetensi
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className={`mt-4 text-base sm:text-lg ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}
          >
            Koleksi lengkap 22 sertifikat resmi dari pelatihan teknologi industri (Google, Kominfo, MySkill), sertifikasi magang BUMN & instansi pemerintah, serta 14 sertifikat kompetensi praktikum Laboratorium Informatika UMM.
          </motion.p>
        </div>

        {/* Filter Controls: Tabs + Search Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 w-full md:w-auto">
            {categories.map((cat) => {
              const Icon = cat.icon
              const isActive = activeCategory === cat.id
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-[#2c67ed] to-blue-600 text-white shadow-[0_0_20px_rgba(44,103,237,0.65)] scale-105'
                      : darkMode
                      ? 'bg-[#0d1430]/70 text-slate-300 hover:bg-white/10 border border-slate-800'
                      : 'bg-white/90 text-slate-700 hover:bg-blue-50 border border-blue-200'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{cat.label}</span>
                  <span
                    className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                      isActive
                        ? 'bg-white/20 text-white'
                        : darkMode
                        ? 'bg-blue-950/80 text-cyan-300'
                        : 'bg-blue-100 text-[#2c67ed]'
                    }`}
                  >
                    {cat.count}
                  </span>
                </button>
              )
            })}
          </div>

          {/* Search Input Bar */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari sertifikat atau skill..."
              className={`w-full pl-9 pr-4 py-2 rounded-xl text-xs sm:text-sm border transition-all outline-none ${
                darkMode
                  ? 'bg-[#0b122e]/90 border-slate-700/80 text-white placeholder-slate-400 focus:border-[#2c67ed] focus:ring-1 focus:ring-[#2c67ed]'
                  : 'bg-white/95 border-slate-300 text-slate-900 placeholder-slate-400 focus:border-[#2c67ed] focus:ring-1 focus:ring-[#2c67ed]'
              }`}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-xs"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Certificate Grid */}
        {filteredCertificates.length === 0 ? (
          <div className="text-center py-16 border rounded-3xl border-dashed border-slate-700/50">
            <FileCheck className="w-12 h-12 mx-auto text-slate-500 mb-3" />
            <p className="text-base font-semibold">Tidak ada sertifikat yang cocok dengan pencarian.</p>
            <button
              onClick={() => {
                setActiveCategory('all')
                setSearchQuery('')
              }}
              className="mt-3 text-xs text-[#2c67ed] font-bold underline cursor-pointer"
            >
              Reset Filter
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCertificates.map((cert) => (
              <motion.div
                key={cert.id}
                layout
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                onClick={() => setSelectedCert(cert)}
                className={`rounded-3xl border flex flex-col justify-between transition-all duration-300 hover:border-[#2c67ed] hover:-translate-y-1.5 overflow-hidden group cursor-pointer ${
                  darkMode
                    ? 'bg-[#0b122e]/90 border-blue-500/25 text-white shadow-[0_0_20px_rgba(44,103,237,0.15)] hover:shadow-[0_0_30px_rgba(44,103,237,0.35)]'
                    : 'bg-white/95 border-blue-200 text-slate-800 shadow-[0_8px_25px_rgba(44,103,237,0.1)] hover:shadow-[0_12px_35px_rgba(44,103,237,0.22)]'
                }`}
              >
                <div>
                  {/* Certificate Thumbnail Banner */}
                  <div className="relative w-full aspect-[16/10] overflow-hidden bg-slate-950 border-b border-blue-500/20">
                    <img
                      src={cert.page1Url}
                      alt={cert.title}
                      className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />

                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

                    {/* Top Badges */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#2c67ed]/90 text-white backdrop-blur-md shadow-md border border-blue-400/40">
                        {cert.issuer}
                      </span>

                      {cert.hasPage2 && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-600/90 text-white backdrop-blur-md shadow-md border border-purple-400/40">
                          2 Halaman
                        </span>
                      )}
                    </div>

                    {/* Hover Zoom Action Hint */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 backdrop-blur-[2px]">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-white text-slate-900 shadow-xl transform translate-y-2 group-hover:translate-y-0 transition-transform">
                        <Eye className="w-3.5 h-3.5 text-[#2c67ed]" />
                        <span>Buka Sertifikat</span>
                      </span>
                    </div>

                    {/* Grade indicator on thumbnail */}
                    {cert.grade && (
                      <div className="absolute bottom-2.5 left-3">
                        <span className="px-2.5 py-0.5 rounded-md text-[10px] font-extrabold bg-emerald-500/90 text-white shadow border border-emerald-300/40 flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>{cert.grade}</span>
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Card Content */}
                  <div className="p-5 sm:p-6">
                    <div className="flex items-center justify-between gap-2 text-xs font-semibold mb-2">
                      <span className="text-[#2c67ed] flex items-center gap-1">
                        <Award className="w-3.5 h-3.5 shrink-0" />
                        <span className="truncate">{cert.categoryLabel}</span>
                      </span>
                      <span className={`text-[11px] flex items-center gap-1 shrink-0 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                        <Calendar className="w-3 h-3" />
                        {cert.date}
                      </span>
                    </div>

                    <h3 className="font-extrabold text-base sm:text-lg leading-snug mb-2 group-hover:text-[#2c67ed] transition-colors line-clamp-2">
                      {cert.title}
                    </h3>

                    <p className={`text-xs sm:text-sm line-clamp-2 mb-4 leading-relaxed ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                      {cert.description}
                    </p>

                    {/* Skills Chips */}
                    <div className="flex flex-wrap gap-1.5 mb-2">
                      {cert.skills.slice(0, 3).map((skill) => (
                        <span
                          key={skill}
                          className={`px-2 py-0.5 rounded-md text-[10px] font-semibold border ${
                            darkMode
                              ? 'bg-white/5 border-slate-700/80 text-cyan-300'
                              : 'bg-blue-50 border-blue-200 text-[#2c67ed]'
                          }`}
                        >
                          {skill}
                        </span>
                      ))}
                      {cert.skills.length > 3 && (
                        <span className="text-[10px] font-semibold text-slate-400 self-center">
                          +{cert.skills.length - 3} lainnya
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Card Footer */}
                <div className="px-5 pb-5 sm:px-6 sm:pb-6 pt-0">
                  <div className="pt-3 border-t border-slate-700/30 flex items-center justify-between">
                    <span className="text-[10px] font-mono opacity-70 truncate max-w-[170px]">
                      {cert.credentialId ? `ID: ${cert.credentialId}` : 'Terverifikasi Resmi'}
                    </span>
                    <span className="text-xs font-bold text-[#2c67ed] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      <span>Detail</span>
                      <span>→</span>
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* FULL-SCREEN LIGHTBOX MODAL */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedCert(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md cursor-zoom-out"
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full max-h-[92vh] flex flex-col bg-slate-900 border border-blue-500/40 rounded-3xl overflow-hidden shadow-2xl cursor-default"
            >
              {/* Header Bar */}
              <div className="flex items-center justify-between px-5 py-4 bg-slate-950/90 border-b border-slate-800 text-white shrink-0">
                <div className="flex items-center gap-3 pr-4">
                  <div className="p-2 rounded-xl bg-[#2c67ed] text-white">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm sm:text-base text-white leading-tight">
                      {selectedCert.title}
                    </h3>
                    <p className="text-xs text-cyan-300 font-semibold">{selectedCert.issuer}</p>
                  </div>
                </div>

                {/* Close Button */}
                <button
                  type="button"
                  onClick={() => setSelectedCert(null)}
                  className="p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors border border-slate-700"
                  aria-label="Tutup"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Page Toggle for 2-Page Certificates */}
              {selectedCert.hasPage2 && (
                <div className="flex items-center justify-center gap-2 p-2.5 bg-slate-950/60 border-b border-slate-800">
                  <button
                    type="button"
                    onClick={() => setActivePage('page1')}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      activePage === 'page1'
                        ? 'bg-[#2c67ed] text-white shadow-md'
                        : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    <Award className="w-3.5 h-3.5" />
                    <span>Halaman 1: Sertifikat Resmi</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActivePage('page2')}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      activePage === 'page2'
                        ? 'bg-[#2c67ed] text-white shadow-md'
                        : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Halaman 2: Transkrip / Modul Nilai</span>
                  </button>
                </div>
              )}

              {/* Certificate Image Canvas */}
              <div className="relative flex-1 overflow-auto bg-black/75 p-3 sm:p-5 flex items-center justify-center min-h-[300px]">
                <img
                  src={
                    activePage === 'page2' && selectedCert.page2Url
                      ? selectedCert.page2Url
                      : selectedCert.page1Url
                  }
                  alt={`${selectedCert.title} - ${activePage === 'page2' ? 'Halaman 2' : 'Halaman 1'}`}
                  className="max-h-[60vh] w-auto max-w-full object-contain rounded-xl shadow-2xl border border-white/10"
                />
              </div>

              {/* Modal Footer Info */}
              <div className="p-4 sm:p-5 bg-slate-950/95 border-t border-slate-800 text-white shrink-0">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <p className="text-xs text-slate-300 leading-relaxed mb-1.5">
                      {selectedCert.description}
                    </p>
                    <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-400">
                      <span>
                        📅 <strong className="text-slate-200">{selectedCert.date}</strong>
                      </span>
                      {selectedCert.credentialId && (
                        <span>
                          • No: <strong className="text-cyan-300 font-mono">{selectedCert.credentialId}</strong>
                        </span>
                      )}
                      {selectedCert.grade && (
                        <span>
                          • Hasil: <strong className="text-emerald-400">{selectedCert.grade}</strong>
                        </span>
                      )}
                    </div>
                  </div>

                  <a
                    href={
                      activePage === 'page2' && selectedCert.page2Url
                        ? selectedCert.page2Url
                        : selectedCert.page1Url
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    download
                    className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-[#2c67ed] to-blue-600 text-white hover:brightness-110 shadow-lg shrink-0"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download Gambar</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
