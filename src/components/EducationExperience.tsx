import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  GraduationCap,
  Briefcase,
  Users,
  Award,
  Calendar,
  Building,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Code,
  Layers,
  Wrench,
  BookOpen,
  Eye,
  Camera,
  X,
  Maximize2,
} from 'lucide-react'
import {
  EDUCATION,
  WORK_EXPERIENCE,
  ORGANIZATIONS,
  SKILL_CATEGORIES,
} from '../data/portfolioData'

interface EducationExperienceProps {
  darkMode: boolean
}

type TabType = 'all' | 'education' | 'experience' | 'organization' | 'skills'

export const EducationExperience: React.FC<EducationExperienceProps> = ({ darkMode }) => {
  const [activeTab, setActiveTab] = useState<TabType>('all')
  const [selectedImage, setSelectedImage] = useState<{
    url: string
    title: string
    caption?: string
    role?: string
  } | null>(null)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedImage(null)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const tabs = [
    { id: 'all' as TabType, label: 'Semua Riwayat', icon: Layers },
    { id: 'education' as TabType, label: 'Pendidikan', icon: GraduationCap },
    { id: 'experience' as TabType, label: 'Magang & Kerja', icon: Briefcase },
    { id: 'organization' as TabType, label: 'Organisasi', icon: Users },
    { id: 'skills' as TabType, label: 'Keahlian & Tools', icon: Wrench },
  ]

  return (
    <section id="experience" className="relative py-20 lg:py-28 overflow-hidden">
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
            <Sparkles className="w-3.5 h-3.5" />
            <span>Rekam Jejak & Kapabilitas</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight"
          >
            Pendidikan, Pengalaman &{' '}
            <span className="bg-gradient-to-r from-[#2c67ed] via-blue-500 to-indigo-400 bg-clip-text text-transparent">
              Organisasi
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className={`mt-4 text-base sm:text-lg ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}
          >
            Eksplorasi riwayat pendidikan akademik, pengalaman magang profesional di instansi & BUMN, rekam jejak kepemimpinan mahasiswa, serta matriks keahlian teknis.
          </motion.p>
        </div>

        {/* Tab Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {tabs.map((tab) => {
            const Icon = tab.icon
            const isActive = activeTab === tab.id
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-[#2c67ed] to-blue-600 text-white shadow-[0_0_20px_rgba(44,103,237,0.65)] scale-105'
                    : darkMode
                    ? 'bg-[#0d1430]/70 text-slate-300 hover:bg-white/10 border border-slate-800'
                    : 'bg-white/90 text-slate-700 hover:bg-blue-50 border border-blue-200'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            )
          })}
        </div>

        {/* Content Showcase */}
        <div className="space-y-16">
          {/* SECTION 1: RIWAYAT PENDIDIKAN */}
          {(activeTab === 'all' || activeTab === 'education') && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="space-y-6"
            >
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-[#2c67ed] text-white shadow-lg">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <div>
                  <h3 className={`text-xl sm:text-2xl font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                    Riwayat Pendidikan
                  </h3>
                  <p className={`text-xs sm:text-sm ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                    Pendidikan formal dan fokus studi akademik
                  </p>
                </div>
              </div>

              {EDUCATION.map((edu, idx) => (
                <div
                  key={idx}
                  className={`p-6 sm:p-8 rounded-3xl border transition-all duration-300 hover:border-[#2c67ed] ${
                    darkMode
                      ? 'bg-[#0b122e]/90 border-[#2c67ed]/40 text-white shadow-[0_0_25px_rgba(44,103,237,0.25)]'
                      : 'bg-white/95 border-blue-200 text-slate-800 shadow-[0_8px_30px_rgba(44,103,237,0.15)]'
                  }`}
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                    <div>
                      <div className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-[#2c67ed]/20 text-[#2c67ed] mb-2">
                        {edu.period}
                      </div>
                      <h4 className="text-xl sm:text-2xl font-extrabold text-[#2c67ed]">
                        {edu.institution}
                      </h4>
                      <p className="text-base sm:text-lg font-semibold opacity-90">{edu.degree}</p>
                    </div>

                    <div className="flex flex-col items-start md:items-end">
                      <div className="text-xs uppercase tracking-wider opacity-70">Indeks Prestasi Kumulatif</div>
                      <div className="text-2xl sm:text-3xl font-black text-cyan-400 flex items-center gap-1.5">
                        <Award className="w-6 h-6 text-amber-400" />
                        <span>IPK {edu.gpa}</span>
                      </div>
                      <span className="text-xs font-bold text-emerald-400">Predikat: Cum Laude</span>
                    </div>
                  </div>

                  <p className={`text-sm sm:text-base leading-relaxed mb-6 ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                    {edu.description}
                  </p>

                  <div>
                    <h5 className="text-xs font-bold uppercase tracking-wider text-[#2c67ed] mb-3 flex items-center gap-1.5">
                      <BookOpen className="w-3.5 h-3.5" />
                      Mata Kuliah Relevan:
                    </h5>
                    <div className="flex flex-wrap gap-2">
                      {edu.courses.map((course) => (
                        <span
                          key={course}
                          className={`px-3 py-1.5 rounded-lg text-xs font-medium border ${
                            darkMode
                              ? 'bg-blue-950/50 border-blue-500/30 text-blue-200'
                              : 'bg-blue-50 border-blue-200 text-blue-900'
                          }`}
                        >
                          {course}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {/* SECTION 2: PENGALAMAN MAGANG & KERJA */}
          {(activeTab === 'all' || activeTab === 'experience') && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="space-y-6"
            >
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-cyan-600 text-white shadow-lg">
                  <Briefcase className="w-6 h-6" />
                </div>
                <div>
                  <h3 className={`text-xl sm:text-2xl font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                    Pengalaman Magang & Kerja
                  </h3>
                  <p className={`text-xs sm:text-sm ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                    Kontribusi nyata di instansi pemerintah, BUMN, dan tata usaha akademik
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {WORK_EXPERIENCE.map((exp, idx) => (
                  <div
                    key={idx}
                    className={`rounded-3xl border flex flex-col justify-between transition-all duration-300 hover:border-[#2c67ed] hover:-translate-y-1 overflow-hidden group ${
                      darkMode
                        ? 'bg-[#0b122e]/90 border-[#2c67ed]/40 text-white shadow-[0_0_20px_rgba(44,103,237,0.2)] hover:shadow-[0_0_30px_rgba(44,103,237,0.4)]'
                        : 'bg-white/95 border-blue-200 text-slate-800 shadow-[0_8px_25px_rgba(44,103,237,0.12)] hover:shadow-[0_12px_35px_rgba(44,103,237,0.22)]'
                    }`}
                  >
                    <div>
                      {/* Work Experience Photo Showcase */}
                      {exp.imageUrl && (
                        <div
                          onClick={() =>
                            setSelectedImage({
                              url: exp.imageUrl!,
                              title: exp.role,
                              caption: exp.imageCaption,
                              role: exp.company,
                            })
                          }
                          className="relative w-full h-48 sm:h-56 overflow-hidden bg-slate-900 cursor-pointer"
                        >
                          <img
                            src={exp.imageUrl}
                            alt={exp.imageCaption || exp.role}
                            className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${
                              exp.imageUrl.includes('teknik-industri') || exp.imageUrl.includes('diskominfo')
                                ? 'object-[center_20%]'
                                : 'object-center'
                            }`}
                            loading="lazy"
                          />
                          {/* Dramatic Overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />

                          {/* Top-Right 'Lihat Foto' Button */}
                          <div className="absolute top-3 right-3 opacity-90 group-hover:opacity-100 transition-opacity">
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-black/70 backdrop-blur-md text-white border border-white/20 shadow-lg">
                              <Eye className="w-3.5 h-3.5 text-cyan-400" />
                              <span>Lihat Foto</span>
                            </span>
                          </div>

                          {/* Image Caption at bottom */}
                          {exp.imageCaption && (
                            <div className="absolute bottom-2.5 left-3.5 right-3.5 pointer-events-none flex items-center gap-1.5 text-xs font-medium text-white/95 drop-shadow">
                              <Camera className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                              <span className="truncate">{exp.imageCaption}</span>
                            </div>
                          )}
                        </div>
                      )}

                      <div className="p-6 sm:p-7">
                        <div className="flex items-center justify-between gap-2 mb-3">
                          <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#2c67ed] text-white shadow-sm">
                            {exp.type}
                          </span>
                          <span
                            className={`text-xs font-semibold flex items-center gap-1 ${
                              darkMode ? 'text-cyan-300' : 'text-[#2c67ed]'
                            }`}
                          >
                            <Calendar className="w-3.5 h-3.5" />
                            {exp.period}
                          </span>
                        </div>

                        <h4 className="text-lg sm:text-xl font-extrabold text-[#2c67ed] mb-1">
                          {exp.role}
                        </h4>
                        <p className="text-sm font-semibold opacity-90 mb-4 flex items-center gap-1.5">
                          <Building className="w-4 h-4 text-cyan-400 shrink-0" />
                          {exp.company}
                        </p>

                        <ul className="space-y-2.5 mb-6 text-xs sm:text-sm">
                          {exp.highlights.map((item, hIdx) => (
                            <li key={hIdx} className="flex items-start gap-2.5">
                              <CheckCircle2 className="w-4 h-4 text-[#2c67ed] shrink-0 mt-0.5" />
                              <span className={darkMode ? 'text-slate-300' : 'text-slate-700'}>
                                {item}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="px-6 pb-6 sm:px-7 sm:pb-7 pt-0">
                      <div className="pt-4 border-t border-slate-700/30">
                        <div className="flex flex-wrap gap-1.5">
                          {exp.tech.map((t) => (
                            <span
                              key={t}
                              className={`px-2.5 py-1 rounded-md text-[11px] font-semibold border ${
                                darkMode
                                  ? 'bg-white/5 border-slate-700 text-slate-300'
                                  : 'bg-slate-100 border-slate-300 text-slate-700'
                              }`}
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* SECTION 3: PENGALAMAN ORGANISASI */}
          {(activeTab === 'all' || activeTab === 'organization') && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="space-y-6"
            >
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-indigo-600 text-white shadow-lg">
                  <Users className="w-6 h-6" />
                </div>
                <div>
                  <h3 className={`text-xl sm:text-2xl font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                    Pengalaman Organisasi & Kepemimpinan
                  </h3>
                  <p className={`text-xs sm:text-sm ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                    Peran strategis memimpin himpunan, kemitraan korporasi, dan forum wilayah
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {ORGANIZATIONS.map((org, idx) => (
                  <div
                    key={idx}
                    className={`rounded-3xl border flex flex-col justify-between transition-all duration-300 hover:border-indigo-500 hover:-translate-y-1 overflow-hidden group ${
                      darkMode
                        ? 'bg-[#0b122e]/90 border-indigo-500/30 text-white shadow-[0_0_20px_rgba(99,102,241,0.2)] hover:shadow-[0_0_30px_rgba(99,102,241,0.35)]'
                        : 'bg-white/95 border-indigo-200 text-slate-800 shadow-[0_8px_25px_rgba(99,102,241,0.12)] hover:shadow-[0_12px_35px_rgba(99,102,241,0.22)]'
                    }`}
                  >
                    <div>
                      {/* Organization Photo Showcase */}
                      {org.imageUrl && (
                        <div
                          onClick={() =>
                            setSelectedImage({
                              url: org.imageUrl!,
                              title: org.role,
                              caption: org.imageCaption,
                              role: org.organization,
                            })
                          }
                          className="relative w-full h-48 sm:h-56 overflow-hidden bg-slate-900 cursor-pointer"
                        >
                          <img
                            src={org.imageUrl}
                            alt={org.imageCaption || org.role}
                            className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${
                              org.imageUrl.includes('wakil-ketua')
                                ? 'object-[center_20%]'
                                : 'object-center'
                            }`}
                            loading="lazy"
                          />
                          {/* Dramatic Overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />

                          {/* Top-Right 'Lihat Foto' Button */}
                          <div className="absolute top-3 right-3 opacity-90 group-hover:opacity-100 transition-opacity">
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-black/70 backdrop-blur-md text-white border border-white/20 shadow-lg">
                              <Eye className="w-3.5 h-3.5 text-cyan-400" />
                              <span>Lihat Foto</span>
                            </span>
                          </div>

                          {/* Image Caption at bottom */}
                          {org.imageCaption && (
                            <div className="absolute bottom-2.5 left-3.5 right-3.5 pointer-events-none flex items-center gap-1.5 text-xs font-medium text-white/95 drop-shadow">
                              <Camera className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                              <span className="truncate">{org.imageCaption}</span>
                            </div>
                          )}
                        </div>
                      )}

                      <div className="p-6 sm:p-7">
                        <div className="flex items-center justify-between gap-2 mb-3">
                          <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-600 text-white shadow-sm">
                            Kepemimpinan
                          </span>
                          <span
                            className={`text-xs font-semibold flex items-center gap-1 ${
                              darkMode ? 'text-indigo-300' : 'text-indigo-700'
                            }`}
                          >
                            <Calendar className="w-3.5 h-3.5" />
                            {org.period}
                          </span>
                        </div>

                        <h4 className="text-lg sm:text-xl font-extrabold text-[#2c67ed] mb-1">
                          {org.role}
                        </h4>
                        <p className="text-sm font-semibold opacity-90 mb-4 flex items-center gap-1.5">
                          <Users className="w-4 h-4 text-indigo-400 shrink-0" />
                          {org.organization}
                        </p>

                        <ul className="space-y-2.5 text-xs sm:text-sm">
                          {org.highlights.map((item, hIdx) => (
                            <li key={hIdx} className="flex items-start gap-2.5">
                              <span className="text-[#2c67ed] font-bold mt-0.5">•</span>
                              <span className={darkMode ? 'text-slate-300' : 'text-slate-700'}>
                                {item}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* SECTION 4: KEAHLIAN & TOOLS */}
          {(activeTab === 'all' || activeTab === 'skills') && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="space-y-6"
            >
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-amber-500 text-white shadow-lg">
                  <Wrench className="w-6 h-6" />
                </div>
                <div>
                  <h3 className={`text-xl sm:text-2xl font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                    Matriks Keahlian & Tools
                  </h3>
                  <p className={`text-xs sm:text-sm ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                    Penguasaan teknologi pemrograman, perancangan desain, dan administrasi perkantoran
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {SKILL_CATEGORIES.map((cat, idx) => (
                  <div
                    key={idx}
                    className={`p-5 rounded-3xl border transition-all ${
                      darkMode
                        ? 'bg-[#0b122e]/90 border-[#2c67ed]/30 text-white shadow-[0_0_20px_rgba(44,103,237,0.2)]'
                        : 'bg-white/95 border-blue-200 text-slate-800 shadow-[0_8px_25px_rgba(44,103,237,0.12)]'
                    }`}
                  >
                    <h4 className="font-extrabold text-sm sm:text-base text-[#2c67ed] mb-4 pb-2 border-b border-slate-700/30">
                      {cat.title}
                    </h4>

                    <div className="space-y-3">
                      {cat.skills.map((skill, sIdx) => (
                        <div key={sIdx} className="flex items-center justify-between text-xs">
                          <span className="font-semibold">{skill.name}</span>
                          <span
                            className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                              darkMode ? 'bg-blue-950/70 text-cyan-300' : 'bg-blue-100 text-[#2c67ed]'
                            }`}
                          >
                            {skill.level}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Lightbox Modal for Full Image View */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md cursor-zoom-out"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full bg-slate-900 border border-indigo-500/40 rounded-3xl overflow-hidden shadow-2xl cursor-default"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/60 hover:bg-black/90 text-white transition-colors border border-white/20"
                aria-label="Tutup foto"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Photo Display */}
              <div className="relative max-h-[75vh] flex items-center justify-center bg-black/70 p-2 sm:p-4">
                <img
                  src={selectedImage.url}
                  alt={selectedImage.caption || selectedImage.title}
                  className="max-h-[70vh] w-auto max-w-full object-contain rounded-xl shadow-lg"
                />
              </div>

              {/* Caption & Info footer */}
              <div className="p-4 sm:p-5 bg-slate-950/90 border-t border-slate-800 text-white">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h4 className="text-base sm:text-lg font-bold text-cyan-300 flex items-center gap-2">
                      <Users className="w-4 h-4 text-indigo-400" />
                      {selectedImage.title}
                    </h4>
                    {selectedImage.role && (
                      <p className="text-xs text-slate-400">{selectedImage.role}</p>
                    )}
                  </div>
                  {selectedImage.caption && (
                    <span className="text-xs text-indigo-300 font-semibold px-3 py-1 rounded-full bg-indigo-950/80 border border-indigo-700/50 self-start sm:self-auto">
                      {selectedImage.caption}
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
