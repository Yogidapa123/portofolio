import React from 'react'
import { motion } from 'framer-motion'
import {
  User,
  GraduationCap,
  Sparkles,
  MapPin,
  Mail,
  Phone,
  FileCheck2,
  Layers,
  Award,
  Download,
  ExternalLink,
  CheckCircle2,
} from 'lucide-react'
import { PERSONAL_INFO, STATS } from '../data/portfolioData'
import { SpiderSplitPhoto } from './SpiderSplitPhoto'

interface AboutProps {
  darkMode: boolean
  onOpenCvModal: () => void
  onOpenPortfolioModal: () => void
}

export const About: React.FC<AboutProps> = ({ darkMode, onOpenCvModal, onOpenPortfolioModal }) => {
  return (
    <section id="about" className="relative py-20 lg:py-28 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
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
            <User className="w-3.5 h-3.5" />
            <span>Biografi & Identitas Diri</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight"
          >
            Tentang{' '}
            <span className="bg-gradient-to-r from-[#2c67ed] via-blue-500 to-indigo-400 bg-clip-text text-transparent">
              Saya
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className={`mt-4 text-base sm:text-lg ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}
          >
            Mengenal lebih dekat rekam jejak, latar belakang akademis, keahlian teknis, dan dedikasi profesional Yogi Pratama Nusantara.
          </motion.p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-16">
          {/* Left Column: Interactive Spider-Man Transform Photo & Specs */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5 flex flex-col items-center gap-4 w-full"
          >
            {/* Interactive Spider-Man Split Photo (Touch & Drag to Transform!) */}
            <SpiderSplitPhoto darkMode={darkMode} />

            {/* Key Personal Details & Fast Action Card */}
            <div
              className={`w-full max-w-sm rounded-[24px] p-4 sm:p-5 border transition-all ${
                darkMode
                  ? 'bg-[#0b122e]/95 border-[#2c67ed]/40 text-white shadow-[0_4px_25px_rgba(44,103,237,0.2)]'
                  : 'bg-white/95 border-blue-200 text-slate-800 shadow-[0_6px_25px_rgba(44,103,237,0.15)]'
              }`}
            >
              {/* Key Personal Details List */}
              <div className="space-y-2.5 text-xs sm:text-sm">
                <div className="flex items-center justify-between pb-2 border-b border-slate-700/30">
                  <span className="opacity-70 flex items-center gap-1.5">
                    <GraduationCap className="w-4 h-4 text-[#2c67ed]" /> Pendidikan
                  </span>
                  <span className="font-bold text-[#2c67ed]">S1 Informatika (IPK 3.79)</span>
                </div>

                <div className="flex items-center justify-between pb-2 border-b border-slate-700/30">
                  <span className="opacity-70 flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-[#2c67ed]" /> Domisili
                  </span>
                  <span className="font-semibold">Malang, Jawa Timur</span>
                </div>

                <div className="flex items-center justify-between pb-2 border-b border-slate-700/30">
                  <span className="opacity-70 flex items-center gap-1.5">
                    <Mail className="w-4 h-4 text-[#2c67ed]" /> Email
                  </span>
                  <span className="font-medium text-xs truncate max-w-[170px]">{PERSONAL_INFO.email}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="opacity-70 flex items-center gap-1.5">
                    <Phone className="w-4 h-4 text-[#2c67ed]" /> WhatsApp
                  </span>
                  <span className="font-semibold text-emerald-400">{PERSONAL_INFO.phoneFormatted}</span>
                </div>
              </div>

              {/* Direct Action Link in Card */}
              <div className="mt-4 pt-3.5 border-t border-slate-700/30 flex gap-2">
                <button
                  onClick={onOpenCvModal}
                  className="flex-1 py-2 px-3 rounded-xl text-xs font-bold bg-[#2c67ed] hover:bg-blue-600 text-white flex items-center justify-center gap-1.5 shadow-[0_0_15px_rgba(44,103,237,0.5)] transition-all cursor-pointer"
                >
                  <FileCheck2 className="w-3.5 h-3.5" />
                  Buka Dokumen CV
                </button>
                <a
                  href={PERSONAL_INFO.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`py-2 px-3 rounded-xl text-xs font-semibold border flex items-center justify-center gap-1 transition-all ${
                    darkMode
                      ? 'border-slate-700 hover:bg-white/10 text-slate-200'
                      : 'border-slate-300 hover:bg-slate-100 text-slate-800'
                  }`}
                >
                  <span>LinkedIn</span>
                  <ExternalLink className="w-3 h-3 opacity-70" />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Bio Narrative & Core Strengths */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7 flex flex-col justify-center"
          >
            <div className="space-y-4 text-sm sm:text-base leading-relaxed">
              <p
                className={`font-medium ${
                  darkMode ? 'text-blue-300' : 'text-[#2c67ed]'
                } text-base sm:text-lg`}
              >
                "Mengintegrasikan keandalan logika rekayasa web, kepekaan visual desain, serta ketelitian tata kelola administrasi modern."
              </p>

              <p className={darkMode ? 'text-slate-300' : 'text-slate-700'}>
                Halo! Saya <strong>Yogi Pratama Nusantara</strong>, lulusan S1 Teknik Informatika Universitas Muhammadiyah Malang dengan IPK <strong>3.79 / 4.00 (Cum Laude)</strong>. Saya memadukan keahlian teknis pemrograman web full-stack, perancangan antarmuka UI/UX, kreasi desain grafis, hingga tata kelola berkas perkantoran digital.
              </p>

              <p className={darkMode ? 'text-slate-300' : 'text-slate-700'}>
                Di dunia industri dan pemerintahan, saya telah merancang dan membangun sistem informasi berbasis <strong>Laravel & MySQL</strong> untuk <strong>Dinas Kominfo Kab. Malang</strong>, merancang lebih dari 15+ materi visual Instagram di <strong>Rumah BUMN Kota Malang & Jatim</strong>, serta mengelola ratusan berkas akademik kemahasiswaan dengan akurasi tinggi.
              </p>

              <p className={darkMode ? 'text-slate-300' : 'text-slate-700'}>
                Dalam ranah kepemimpinan, saya dipercaya menjabat sebagai <strong>Ketua Himpunan Mahasiswa Informatika (HMIF) UMM</strong> periode 2024-2025. Saya memimpin 40 fungsionaris di 7 divisi, mengeksekusi 15+ program kerja, menjalin relasi strategis dengan 20+ sponsor korporasi (termasuk PT Pelabuhan Indonesia Reg 3 & BitPreneur), dan meningkatkan partisipasi aktif anggota hingga 83%.
              </p>
            </div>

            {/* Core Capability Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6">
              <div
                className={`p-3.5 rounded-xl border flex items-start gap-3 ${
                  darkMode
                    ? 'bg-[#0d1538]/70 border-[#2c67ed]/30 text-slate-200'
                    : 'bg-white/80 border-blue-200 text-slate-800'
                }`}
              >
                <div className="p-2 rounded-lg bg-[#2c67ed]/20 text-[#2c67ed]">
                  <Layers className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-xs sm:text-sm">Web Development</h4>
                  <p className="text-[11px] sm:text-xs opacity-75">Laravel (PHP), MySQL, REST API, Git</p>
                </div>
              </div>

              <div
                className={`p-3.5 rounded-xl border flex items-start gap-3 ${
                  darkMode
                    ? 'bg-[#0d1538]/70 border-[#2c67ed]/30 text-slate-200'
                    : 'bg-white/80 border-blue-200 text-slate-800'
                }`}
              >
                <div className="p-2 rounded-lg bg-cyan-500/20 text-cyan-400">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-xs sm:text-sm">UI/UX & Graphic Design</h4>
                  <p className="text-[11px] sm:text-xs opacity-75">Figma, Canva, Prototyping, Branding</p>
                </div>
              </div>

              <div
                className={`p-3.5 rounded-xl border flex items-start gap-3 ${
                  darkMode
                    ? 'bg-[#0d1538]/70 border-[#2c67ed]/30 text-slate-200'
                    : 'bg-white/80 border-blue-200 text-slate-800'
                }`}
              >
                <div className="p-2 rounded-lg bg-indigo-500/20 text-indigo-400">
                  <FileCheck2 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-xs sm:text-sm">Administrasi Perkantoran</h4>
                  <p className="text-[11px] sm:text-xs opacity-75">Google Workspace, MS Office, Arsip</p>
                </div>
              </div>

              <div
                className={`p-3.5 rounded-xl border flex items-start gap-3 ${
                  darkMode
                    ? 'bg-[#0d1538]/70 border-[#2c67ed]/30 text-slate-200'
                    : 'bg-white/80 border-blue-200 text-slate-800'
                }`}
              >
                <div className="p-2 rounded-lg bg-amber-500/20 text-amber-400">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-xs sm:text-sm">Kepemimpinan & Sinergi</h4>
                  <p className="text-[11px] sm:text-xs opacity-75">Ketua HMIF UMM, 20+ Sponsor</p>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="mt-7 flex flex-wrap gap-3">
              <button
                onClick={onOpenPortfolioModal}
                className="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-gradient-to-r from-[#2c67ed] to-blue-600 text-white flex items-center gap-2 shadow-[0_0_20px_rgba(44,103,237,0.5)] hover:shadow-[0_0_28px_rgba(44,103,237,0.8)] hover:scale-105 active:scale-95 transition-all cursor-pointer"
              >
                <Download className="w-4 h-4" />
                Unduh Dokumen Portofolio (PDF)
              </button>

              <button
                onClick={onOpenCvModal}
                className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold border flex items-center gap-2 transition-all hover:scale-105 active:scale-95 cursor-pointer ${
                  darkMode
                    ? 'border-blue-500/40 text-blue-300 hover:bg-blue-950/50'
                    : 'border-blue-300 text-[#2c67ed] hover:bg-blue-50'
                }`}
              >
                <FileCheck2 className="w-4 h-4" />
                Buka CV Lengkap
              </button>
            </div>
          </motion.div>
        </div>

        {/* Statistical Metrics Showcase */}
        <div className="mt-8">
          <div className="text-center mb-8">
            <h3
              className={`text-lg sm:text-xl font-bold tracking-tight ${
                darkMode ? 'text-white' : 'text-slate-900'
              }`}
            >
              Statistik & Pencapaian Utama (Berdasarkan CV & Portofolio)
            </h3>
            <p className={`text-xs sm:text-sm ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              Rekam jejak terukur dari pengalaman akademik, proyek teknologi, pengabdian, dan organisasi.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            {STATS.map((stat, idx) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08 }}
                className={`p-4 rounded-2xl border text-center transition-all duration-300 hover:scale-105 ${
                  darkMode
                    ? 'bg-[#0d1430]/90 border-[#2c67ed]/40 hover:border-blue-400 hover:shadow-[0_0_25px_rgba(44,103,237,0.45)]'
                    : 'bg-white/90 border-blue-200 hover:border-blue-400 hover:shadow-[0_8px_25px_rgba(44,103,237,0.2)]'
                }`}
              >
                <div className="flex items-baseline justify-center">
                  <span className="text-2xl sm:text-3xl font-extrabold text-[#2c67ed]">
                    {stat.value}
                  </span>
                  <span className="text-base sm:text-lg font-bold text-cyan-400 ml-0.5">
                    {stat.suffix}
                  </span>
                </div>
                <div
                  className={`mt-1 text-[11px] sm:text-xs font-semibold leading-snug ${
                    darkMode ? 'text-slate-300' : 'text-slate-700'
                  }`}
                >
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
