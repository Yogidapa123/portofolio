import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  X,
  ExternalLink,
  CheckCircle2,
  Calendar,
  Layers,
  Sparkles,
  FileText,
  Eye,
  Code2,
} from 'lucide-react'
import { GithubIcon, FigmaIcon } from './SocialIcons'
import { ProjectItem, getProjectLinks } from '../data/portfolioData'

interface ProjectModalProps {
  project: ProjectItem | null
  onClose: () => void
  darkMode: boolean
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose, darkMode }) => {
  const [activeMediaTab, setActiveMediaTab] = useState<'image' | 'figma'>('image')

  // Reset tab when project changes
  useEffect(() => {
    setActiveMediaTab('image')
  }, [project?.id])

  if (!project) return null

  const links = getProjectLinks(project)

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto backdrop-blur-md bg-black/80">
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
          <div className="relative p-5 sm:p-7 border-b border-slate-700/30 flex items-start justify-between gap-4 bg-gradient-to-r from-blue-900/30 via-indigo-900/20 to-transparent">
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
          <div className="p-5 sm:p-7 max-h-[72vh] overflow-y-auto space-y-6">
            {/* Media Section: Switch between Image and Live Figma Embed if available */}
            <div>
              {links.figma && project.imageUrl && (
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center p-1 rounded-xl bg-slate-800/80 border border-slate-700/80 text-xs font-bold">
                    <button
                      onClick={() => setActiveMediaTab('image')}
                      className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                        activeMediaTab === 'image'
                          ? 'bg-[#2c67ed] text-white shadow-md'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Mockup Gambar</span>
                    </button>
                    <button
                      onClick={() => setActiveMediaTab('figma')}
                      className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                        activeMediaTab === 'figma'
                          ? 'bg-purple-600 text-white shadow-md'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      <FigmaIcon className="w-3.5 h-3.5" />
                      <span>Live Figma Canvas</span>
                    </button>
                  </div>

                  <a
                    href={links.figma}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-purple-400 hover:text-purple-300 font-bold flex items-center gap-1 transition-colors"
                  >
                    <span>Buka Tab Figma</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              )}

              {/* Media Display Container */}
              {activeMediaTab === 'figma' && links.figma ? (
                <div className="relative rounded-2xl overflow-hidden border border-purple-500/50 shadow-2xl bg-black min-h-[380px] sm:min-h-[460px]">
                  <iframe
                    src={`https://www.figma.com/embed?embed_host=share&url=${encodeURIComponent(
                      links.figma
                    )}`}
                    className="w-full h-[460px] border-0"
                    allowFullScreen
                    title={`${project.title} Figma Prototype`}
                  />
                </div>
              ) : project.imageUrl ? (
                <div className="relative rounded-2xl overflow-hidden border border-slate-700/60 shadow-2xl bg-gradient-to-b from-[#0a1128] via-[#050816] to-[#030611] p-3 sm:p-5 flex items-center justify-center min-h-[220px] max-h-[460px]">
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="max-h-[420px] max-w-full w-auto h-auto object-contain rounded-xl drop-shadow-2xl"
                  />
                </div>
              ) : null}
            </div>

            {/* Direct Links Section: Highlights both Figma & GitHub */}
            {(links.figma || links.github || links.preview) && (
              <div
                className={`p-4 sm:p-5 rounded-2xl border transition-all ${
                  darkMode
                    ? 'bg-gradient-to-br from-blue-950/40 via-purple-950/20 to-slate-900/60 border-blue-500/30 shadow-[0_0_25px_rgba(44,103,237,0.15)]'
                    : 'bg-blue-50/70 border-blue-200'
                }`}
              >
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#2c67ed] mb-3 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
                  <span>Akses Langsung & Sumber Proyek (Figma / GitHub)</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Figma Direct Card */}
                  {links.figma && (
                    <a
                      href={links.figma}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`p-3.5 rounded-xl border flex items-center justify-between gap-3 group transition-all duration-300 ${
                        darkMode
                          ? 'bg-[#1b1928]/90 border-purple-500/40 hover:border-purple-400 hover:bg-[#252238] hover:shadow-[0_0_20px_rgba(162,89,255,0.3)]'
                          : 'bg-white border-purple-200 hover:border-purple-400 hover:shadow-md'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-center shrink-0">
                          <FigmaIcon className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="text-xs sm:text-sm font-bold flex items-center gap-1.5 text-purple-400 group-hover:text-purple-300">
                            <span>Figma Prototype</span>
                            <span className="text-[9px] px-1.5 py-0.2 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30 font-semibold">
                              UI/UX
                            </span>
                          </div>
                          <p className="text-[11px] opacity-70">
                            Buka desain interaktif di aplikasi Figma
                          </p>
                        </div>
                      </div>
                      <ExternalLink className="w-4 h-4 text-purple-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0" />
                    </a>
                  )}

                  {/* GitHub Direct Card */}
                  {links.github && (
                    <a
                      href={links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`p-3.5 rounded-xl border flex items-center justify-between gap-3 group transition-all duration-300 ${
                        darkMode
                          ? 'bg-[#141b2a]/90 border-slate-700/80 hover:border-blue-400/60 hover:bg-[#1a2336] hover:shadow-[0_0_20px_rgba(44,103,237,0.25)]'
                          : 'bg-white border-slate-200 hover:border-slate-400 hover:shadow-md'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-slate-500/15 border border-slate-500/30 flex items-center justify-center shrink-0">
                          <GithubIcon className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <div className="text-xs sm:text-sm font-bold flex items-center gap-1.5 text-blue-400 group-hover:text-blue-300">
                            <span>GitHub Repository</span>
                            <span className="text-[9px] px-1.5 py-0.2 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30 font-semibold">
                              Source Code
                            </span>
                          </div>
                          <p className="text-[11px] opacity-70">
                            Akses kode sumber & implementasi GitHub
                          </p>
                        </div>
                      </div>
                      <ExternalLink className="w-4 h-4 text-blue-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0" />
                    </a>
                  )}

                  {/* Other Preview Card (e.g. Drive / Live website) */}
                  {links.preview && (
                    <a
                      href={links.preview}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`p-3.5 rounded-xl border flex items-center justify-between gap-3 group transition-all duration-300 ${
                        darkMode
                          ? 'bg-blue-950/40 border-blue-500/40 hover:border-blue-400 hover:bg-blue-900/40 hover:shadow-[0_0_20px_rgba(44,103,237,0.3)]'
                          : 'bg-white border-blue-200 hover:border-blue-400 hover:shadow-md'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-[#2c67ed]/15 border border-[#2c67ed]/30 flex items-center justify-center shrink-0">
                          <ExternalLink className="w-5 h-5 text-[#2c67ed]" />
                        </div>
                        <div>
                          <div className="text-xs sm:text-sm font-bold text-cyan-400 group-hover:text-cyan-300">
                            {links.preview.includes('drive.google')
                              ? 'Google Drive Folder'
                              : 'Live Website / Demo'}
                          </div>
                          <p className="text-[11px] opacity-70">
                            Lihat hasil kerja & aset proyek lengkap
                          </p>
                        </div>
                      </div>
                      <ExternalLink className="w-4 h-4 text-[#2c67ed] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0" />
                    </a>
                  )}
                </div>
              </div>
            )}

            {/* Description */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#2c67ed] mb-2 flex items-center gap-1.5">
                <FileText className="w-4 h-4" />
                Ringkasan & Latar Belakang
              </h4>
              <p
                className={`text-sm sm:text-base leading-relaxed ${
                  darkMode ? 'text-slate-300' : 'text-slate-700'
                }`}
              >
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
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
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

          {/* Modal Footer Actions: Both Figma & GitHub Buttons Available */}
          <div className="p-4 sm:p-5 border-t border-slate-700/30 flex flex-wrap items-center justify-between gap-3 bg-slate-900/60">
            <div className="text-xs opacity-70 hidden sm:block">
              Portofolio Yogi Pratama Nusantara • UMM
            </div>

            <div className="flex flex-wrap items-center gap-2 sm:gap-3 w-full sm:w-auto justify-end">
              {/* Figma Button */}
              {links.figma && (
                <a
                  href={links.figma}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-[#1e1e1e] hover:bg-black text-white border border-purple-500/50 flex items-center gap-2 shadow-[0_0_15px_rgba(162,89,255,0.35)] transition-all cursor-pointer"
                >
                  <FigmaIcon className="w-4 h-4" />
                  <span>Buka Figma</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-70" />
                </a>
              )}

              {/* GitHub Button */}
              {links.github && (
                <a
                  href={links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-[#181d28] hover:bg-[#0f131a] text-white border border-slate-600/70 flex items-center gap-2 shadow-[0_0_15px_rgba(0,0,0,0.35)] transition-all cursor-pointer"
                >
                  <GithubIcon className="w-4 h-4" />
                  <span>Buka GitHub</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-70" />
                </a>
              )}

              {/* Other Preview Button */}
              {links.preview && (
                <a
                  href={links.preview}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-[#2c67ed] hover:bg-blue-600 text-white flex items-center gap-2 shadow-[0_0_20px_rgba(44,103,237,0.5)] transition-all cursor-pointer"
                >
                  <span>
                    {links.preview.includes('drive.google') ? 'Buka Google Drive' : 'Kunjungi Web'}
                  </span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}

              <button
                onClick={onClose}
                className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold border transition-all cursor-pointer ${
                  darkMode
                    ? 'border-slate-700 text-slate-300 hover:bg-white/10'
                    : 'border-slate-300 text-slate-700 hover:bg-slate-100'
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
