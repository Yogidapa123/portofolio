import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  X,
  Download,
  ExternalLink,
  FileText,
  GraduationCap,
  Briefcase,
  Users,
  Award,
  CheckCircle2,
  Sparkles,
} from 'lucide-react'
import { PERSONAL_INFO } from '../data/portfolioData'

interface CVModalProps {
  isOpen: boolean
  onClose: () => void
  darkMode: boolean
}

export const CVModal: React.FC<CVModalProps> = ({ isOpen, onClose, darkMode }) => {
  const [viewMode, setViewMode] = useState<'preview' | 'summary'>('preview')

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
          {/* Modal Header */}
          <div className="px-6 py-4 border-b border-slate-700/30 flex items-center justify-between gap-4 bg-slate-900/40">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-[#2c67ed] text-white">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-base sm:text-lg text-[#2c67ed] flex items-center gap-2">
                  Curriculum Vitae (CV) Resmi
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 font-bold hidden sm:inline">
                    PDF 3 Halaman
                  </span>
                </h3>
                <p className="text-xs opacity-75">
                  Yogi Pratama Nusantara • S1 Informatika UMM (IPK 3.79)
                </p>
              </div>
            </div>

            {/* View Mode Switcher & Close */}
            <div className="flex items-center gap-2">
              <div className="hidden sm:flex items-center bg-slate-800/80 p-1 rounded-xl border border-slate-700">
                <button
                  onClick={() => setViewMode('preview')}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                    viewMode === 'preview'
                      ? 'bg-[#2c67ed] text-white'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  PDF Viewer
                </button>
                <button
                  onClick={() => setViewMode('summary')}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                    viewMode === 'summary'
                      ? 'bg-[#2c67ed] text-white'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Ringkasan Teks
                </button>
              </div>

              <a
                href={PERSONAL_INFO.cvPdf}
                download="CV_Yogi_Pratama_Nusantara.pdf"
                className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-[#2c67ed] hover:bg-blue-600 text-white flex items-center gap-1.5 shadow-[0_0_15px_rgba(44,103,237,0.5)] transition-all cursor-pointer"
                title="Download CV PDF"
              >
                <Download className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Unduh PDF</span>
              </a>

              <a
                href={PERSONAL_INFO.cvPdf}
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

          {/* Modal Content */}
          <div className="flex-1 overflow-hidden relative bg-slate-950/60">
            {viewMode === 'preview' ? (
              <div className="w-full h-full flex flex-col">
                <iframe
                  src={`${PERSONAL_INFO.cvPdf}#toolbar=1`}
                  title="CV Yogi Pratama Nusantara"
                  className="w-full flex-1 border-0"
                />
              </div>
            ) : (
              <div className="p-6 sm:p-8 h-full overflow-y-auto space-y-6 text-sm">
                <div>
                  <h4 className="text-base font-bold text-[#2c67ed] mb-1">
                    YOGI PRATAMA NUSANTARA
                  </h4>
                  <p className="opacity-80">
                    Malang, Jawa Timur, 65323 | +6283105247681 | yogipnusantara@gmail.com
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white/5 border border-slate-700/60">
                  <h5 className="font-bold text-xs uppercase tracking-wider text-cyan-400 mb-2">
                    PROFIL
                  </h5>
                  <p className="leading-relaxed opacity-90">{PERSONAL_INFO.aboutBio}</p>
                </div>

                <div className="p-4 rounded-2xl bg-white/5 border border-slate-700/60">
                  <h5 className="font-bold text-xs uppercase tracking-wider text-cyan-400 mb-2">
                    PENDIDIKAN
                  </h5>
                  <p className="font-bold">UNIVERSITAS MUHAMMADIYAH MALANG (2022 - 2026)</p>
                  <p className="text-xs text-emerald-400 font-semibold mb-1">
                    S1 Teknik Informatika • IPK: 3.79 / 4.00 (Cum Laude)
                  </p>
                  <p className="text-xs opacity-75">
                    Mata Kuliah Relevan: Pemrograman Orientasi Objek, Pemrograman Web, Pemrograman
                    Mobile, Rekayasa Kebutuhan, Interaksi Manusia dan Komputer, Pemrograman Dasar.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white/5 border border-slate-700/60">
                  <h5 className="font-bold text-xs uppercase tracking-wider text-cyan-400 mb-2">
                    PENGALAMAN KERJA & MAGANG
                  </h5>
                  <ul className="space-y-2 text-xs">
                    <li>
                      <strong>DISKOMINFO Kab. Malang (Feb - Mar 2025)</strong>: Web Developer
                      (Laravel & MySQL sistem peminjaman ruang rapat terintegrasi WhatsApp).
                    </li>
                    <li>
                      <strong>RUMAH BUMN MALANG (Apr - Jun 2025)</strong>: Graphic Designer (15+
                      konten Instagram Canva, migrasi 100+ UMKM ke sistem BRI).
                    </li>
                    <li>
                      <strong>Part-Time Kemahasiswaan UMM (Mar - Apr 2026)</strong>: Administrasi 100+
                      berkas Warek III & desain jaket UKM Karate UMM Nasional.
                    </li>
                    <li>
                      <strong>Part-Time Teknik Industri UMM (Okt 2025 - Mar 2026)</strong>:
                      Administrasi 50+ berkas yudisium/sidang per bulan & feeds Instagram.
                    </li>
                  </ul>
                </div>

                <div className="p-4 rounded-2xl bg-white/5 border border-slate-700/60">
                  <h5 className="font-bold text-xs uppercase tracking-wider text-cyan-400 mb-2">
                    PENGALAMAN ORGANISASI
                  </h5>
                  <ul className="space-y-2 text-xs">
                    <li>
                      <strong>Ketua Himpunan Mahasiswa Informatika UMM (2024-2025)</strong>: Pimpin 40
                      anggota di 7 divisi, 15+ proker, 20+ sponsor korporasi (Pelindo & BitPreneur).
                    </li>
                    <li>
                      <strong>Wakil Ketua Himpunan HMIF UMM (2023-2024)</strong>: Koordinasi 50
                      anggota, forum evaluasi 6 bulan, kenaikan komunikasi internal ke 91%.
                    </li>
                    <li>
                      <strong>Permikomnas Wilayah IX (2023-2024)</strong>: Kunjungan 30+ kampus
                      Informatika se-Jawa Timur.
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
