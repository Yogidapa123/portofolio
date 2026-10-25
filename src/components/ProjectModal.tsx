import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  X,
  ExternalLink,
  CheckCircle2,
  Calendar,
  Layers,
  Sparkles,
  FileText,
} from 'lucide-react'
import { GithubIcon } from './SocialIcons'
import { ProjectItem } from '../data/portfolioData'

interface ProjectModalProps {
  project: ProjectItem | null
  onClose: () => void
  darkMode: boolean
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose, darkMode }) => {
  if (!project) return null

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto backdrop-blur-md bg-black/75">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.3 }}
          className={`relative w-full max-w-3xl rounded-3xl border shadow-2xl overflow-hidden my-auto ${
            darkMode
              ? 'bg-[#090f26] border-[#2c67ed]/50 text-white shadow-[0_0_50px_rgba(44,103,237,0.4)]'
              : 'bg-white border-blue-200 text-slate-800 shadow-[0_20px_60px_rgba(44,103,237,0.25)]'
          }`}
        >
          {/* Header Bar */}
          <div className="relative p-6 sm:p-8 border-b border-slate-700/30 flex items-start justify-between gap-4 bg-gradient-to-r from-blue-900/30 via-indigo-900/20 to-transparent">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#2c67ed] text-white">
                  {project.categoryLabel}
                </span>
                <span className="text-xs font-semibold opacity-70 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  {project.date}
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#2c67ed]">
                {project.title}
              </h3>
              <p className="text-sm font-semibold opacity-80 mt-1">{project.subtitle}</p>
            </div>

            <button
              onClick={onClose}
              className={`p-2 rounded-full transition-colors ${
                darkMode ? 'hover:bg-white/10 text-slate-300' : 'hover:bg-slate-100 text-slate-700'
              }`}
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Modal Body */}
          <div className="p-6 sm:p-8 max-h-[70vh] overflow-y-auto space-y-6">
            {/* Project Image Banner if available */}
            {project.imageUrl && (
              <div className="relative rounded-2xl overflow-hidden border border-slate-700/60 shadow-2xl bg-gradient-to-b from-[#0a1128] via-[#050816] to-[#030611] p-3 sm:p-5 flex items-center justify-center min-h-[220px] max-h-[500px]">
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="max-h-[460px] max-w-full w-auto h-auto object-contain rounded-xl drop-shadow-2xl"
                />
              </div>
            )}

            {/* Description */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#2c67ed] mb-2 flex items-center gap-1.5">
                <FileText className="w-4 h-4" />
                Ringkasan & Latar Belakang
              </h4>
              <p className={`text-sm sm:text-base leading-relaxed ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                {project.longDescription}
              </p>
            </div>

            {/* Key Features */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#2c67ed] mb-3 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" />
                Fitur & Fungsionalitas Utama
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {project.features.map((feat, idx) => (
                  <div
                    key={idx}
                    className={`p-3 rounded-xl border flex items-start gap-2.5 text-xs sm:text-sm ${
                      darkMode
                        ? 'bg-white/5 border-slate-700/60 text-slate-200'
                        : 'bg-blue-50/60 border-blue-200 text-slate-800'
                    }`}
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#2c67ed] shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Project Stats if any */}
            {project.stats && (
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#2c67ed] mb-3">
                  Metrik & Dampak
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {project.stats.map((stat, idx) => (
                    <div
                      key={idx}
                      className={`p-3 rounded-xl border text-center ${
                        darkMode ? 'bg-white/5 border-slate-700/60' : 'bg-slate-50 border-slate-200'
                      }`}
                    >
                      <div className="text-xs opacity-70 mb-0.5">{stat.label}</div>
                      <div className="text-base font-extrabold text-[#2c67ed]">{stat.value}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tools & Tech Stack */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#2c67ed] mb-3 flex items-center gap-1.5">
                <Layers className="w-4 h-4" />
                Teknologi & Perangkat yang Digunakan
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.tools.map((tool) => (
                  <span
                    key={tool}
                    className="px-3 py-1.5 rounded-lg text-xs font-bold bg-[#2c67ed]/20 text-[#2c67ed] border border-[#2c67ed]/40"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Modal Footer Actions */}
          <div className="p-4 sm:p-6 border-t border-slate-700/30 flex flex-wrap items-center justify-between gap-3 bg-slate-900/40">
            <div className="text-xs opacity-75">
              Portofolio Yogi Pratama Nusantara • UMM
            </div>

            <div className="flex items-center gap-3">
              {project.previewUrl && (
                <a
                  href={project.previewUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-[#2c67ed] hover:bg-blue-600 text-white flex items-center gap-2 shadow-[0_0_20px_rgba(44,103,237,0.5)] transition-all cursor-pointer"
                >
                  <span>Kunjungi Sistem / Proyek</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
              <button
                onClick={onClose}
                className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold border transition-all ${
                  darkMode ? 'border-slate-700 text-slate-300 hover:bg-white/10' : 'border-slate-300 text-slate-700 hover:bg-slate-100'
                }`}
              >
                Tutup
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
