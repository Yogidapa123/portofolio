import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Download, ExternalLink, Briefcase, Sparkles } from 'lucide-react'
import { PERSONAL_INFO } from '../data/portfolioData'

interface PortfolioDeckModalProps {
  isOpen: boolean
  onClose: () => void
  darkMode: boolean
}

export const PortfolioDeckModal: React.FC<PortfolioDeckModalProps> = ({
  isOpen,
  onClose,
  darkMode,
}) => {
  if (!isOpen) return null

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 backdrop-blur-md bg-black/80 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 20 }}
          transition={{ duration: 0.3 }}
          className={`relative w-full max-w-5xl rounded-3xl border shadow-2xl flex flex-col h-[90vh] overflow-hidden ${
            darkMode
              ? 'bg-[#090f26] border-[#2c67ed]/50 text-white shadow-[0_0_50px_rgba(44,103,237,0.4)]'
              : 'bg-white border-blue-200 text-slate-800 shadow-[0_20px_60px_rgba(44,103,237,0.25)]'
          }`}
        >
          {/* Header */}
          <div className="px-6 py-4 border-b border-slate-700/30 flex items-center justify-between gap-4 bg-slate-900/40">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-gradient-to-tr from-[#2c67ed] to-indigo-600 text-white">
                <Briefcase className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-base sm:text-lg text-[#2c67ed] flex items-center gap-2">
                  Dokumen Portofolio Lengkap
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 font-bold hidden sm:inline">
                    15 Halaman Presentasi
                  </span>
                </h3>
                <p className="text-xs opacity-75">
                  Web Development • UI/UX • Desain Grafis • Administrasi Staff
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <a
                href={PERSONAL_INFO.portfolioPdf}
                download="Portofolio_Yogi_Pratama_Nusantara.pdf"
                className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-[#2c67ed] hover:bg-blue-600 text-white flex items-center gap-1.5 shadow-[0_0_15px_rgba(44,103,237,0.5)] transition-all cursor-pointer"
                title="Download Portofolio PDF"
              >
                <Download className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Unduh Dokumen</span>
              </a>

              <a
                href={PERSONAL_INFO.portfolioPdf}
                target="_blank"
                rel="noopener noreferrer"
                className={`p-2 rounded-xl border transition-all ${
                  darkMode ? 'border-slate-700 hover:bg-white/10 text-slate-300' : 'border-slate-300 hover:bg-slate-100 text-slate-700'
                }`}
                title="Buka di Tab Baru"
              >
                <ExternalLink className="w-4 h-4" />
              </a>

              <button
                onClick={onClose}
                className={`p-2 rounded-xl transition-all ${
                  darkMode ? 'hover:bg-white/10 text-slate-300' : 'hover:bg-slate-100 text-slate-700'
                }`}
                title="Tutup"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* PDF Viewer */}
          <div className="flex-1 overflow-hidden relative bg-slate-950/60">
            <iframe
              src={`${PERSONAL_INFO.portfolioPdf}#toolbar=1`}
              title="Portofolio Yogi Pratama Nusantara"
              className="w-full h-full border-0"
            />
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
