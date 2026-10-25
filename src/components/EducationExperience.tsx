import React, { useState } from 'react'
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
                    className={`p-6 sm:p-7 rounded-3xl border flex flex-col justify-between transition-all duration-300 hover:border-[#2c67ed] hover:-translate-y-1 ${
                      darkMode
                        ? 'bg-[#0b122e]/90 border-[#2c67ed]/40 text-white shadow-[0_0_20px_rgba(44,103,237,0.2)] hover:shadow-[0_0_30px_rgba(44,103,237,0.4)]'
                        : 'bg-white/95 border-blue-200 text-slate-800 shadow-[0_8px_25px_rgba(44,103,237,0.12)] hover:shadow-[0_12px_35px_rgba(44,103,237,0.22)]'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#2c67ed] text-white">
                          {exp.type}
                        </span>
                        <span className={`text-xs font-semibold flex items-center gap-1 ${darkMode ? 'text-cyan-300' : 'text-[#2c67ed]'}`}>
                          <Calendar className="w-3.5 h-3.5" />
                          {exp.period}
                        </span>
                      </div>

                      <h4 className="text-lg sm:text-xl font-extrabold text-[#2c67ed] mb-1">
                        {exp.role}
                      </h4>
                      <p className="text-sm font-semibold opacity-90 mb-4 flex items-center gap-1.5">
                        <Building className="w-4 h-4 text-cyan-400" />
                        {exp.company}
                      </p>

                      <ul className="space-y-2.5 mb-6 text-xs sm:text-sm">
                        {exp.highlights.map((item, hIdx) => (
                          <li key={hIdx} className="flex items-start gap-2.5">
                            <CheckCircle2 className="w-4 h-4 text-[#2c67ed] shrink-0 mt-0.5" />
                            <span className={darkMode ? 'text-slate-300' : 'text-slate-700'}>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

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
                    className={`p-6 sm:p-7 rounded-3xl border flex flex-col justify-between transition-all duration-300 hover:border-indigo-500 hover:-translate-y-1 ${
                      darkMode
                        ? 'bg-[#0b122e]/90 border-indigo-500/30 text-white shadow-[0_0_20px_rgba(99,102,241,0.2)]'
                        : 'bg-white/95 border-indigo-200 text-slate-800 shadow-[0_8px_25px_rgba(99,102,241,0.12)]'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-600 text-white">
                          Kepemimpinan
                        </span>
                        <span className={`text-xs font-semibold flex items-center gap-1 ${darkMode ? 'text-indigo-300' : 'text-indigo-700'}`}>
                          <Calendar className="w-3.5 h-3.5" />
                          {org.period}
                        </span>
                      </div>

                      <h4 className="text-lg sm:text-xl font-extrabold text-[#2c67ed] mb-1">
                        {org.role}
                      </h4>
                      <p className="text-sm font-semibold opacity-90 mb-4 flex items-center gap-1.5">
                        <Users className="w-4 h-4 text-indigo-400" />
                        {org.organization}
                      </p>

                      <ul className="space-y-2.5 text-xs sm:text-sm">
                        {org.highlights.map((item, hIdx) => (
                          <li key={hIdx} className="flex items-start gap-2.5">
                            <span className="text-[#2c67ed] font-bold mt-0.5">•</span>
                            <span className={darkMode ? 'text-slate-300' : 'text-slate-700'}>{item}</span>
                          </li>
                        ))}
                      </ul>
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
    </section>
  )
}
