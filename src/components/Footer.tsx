import React from 'react'
import { motion } from 'framer-motion'
import {
  Rocket,
  Mail,
  Phone,
  Orbit,
  Heart,
  ChevronUp,
} from 'lucide-react'
import { LinkedinIcon, InstagramIcon, GithubIcon } from './SocialIcons'
import { PERSONAL_INFO } from '../data/portfolioData'

interface FooterProps {
  darkMode: boolean
}

export const Footer: React.FC<FooterProps> = ({ darkMode }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="relative z-10 pt-16 pb-12 border-t border-slate-700/30 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-10 border-b border-slate-700/30">
          {/* Brand & Tagline */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="flex items-center gap-2.5 mb-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#2c67ed] to-cyan-400 p-[1.5px] flex items-center justify-center shadow-[0_0_15px_rgba(44,103,237,0.5)]">
                <div className="w-full h-full rounded-full bg-[#060814] flex items-center justify-center">
                  <Orbit className="w-4 h-4 text-cyan-300" />
                </div>
              </div>
              <span className="font-extrabold text-xl bg-gradient-to-r from-blue-400 via-[#2c67ed] to-indigo-400 bg-clip-text text-transparent">
                YOGI PRATAMA NUSANTARA
              </span>
            </div>
            <p className={`text-xs max-w-sm ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              Fresh Graduate Teknik Informatika UMM • Web Developer, UI/UX Designer, Graphic Designer & Administrasi Staff.
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-3">
            {/* GitHub */}
            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              className={`p-3 rounded-2xl border transition-all duration-300 hover:scale-110 ${
                darkMode
                  ? 'bg-white/5 border-slate-700 text-slate-300 hover:text-white hover:border-slate-500 hover:shadow-[0_0_15px_rgba(255,255,255,0.2)]'
                  : 'bg-white border-slate-200 text-slate-700 hover:text-black hover:border-slate-400'
              }`}
              title="GitHub Profile - Yogidapa123"
            >
              <GithubIcon className="w-4 h-4" />
            </a>

            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className={`p-3 rounded-2xl border transition-all duration-300 hover:scale-110 ${
                darkMode
                  ? 'bg-white/5 border-slate-700 text-slate-300 hover:text-white hover:border-[#2c67ed] hover:shadow-[0_0_15px_rgba(44,103,237,0.5)]'
                  : 'bg-white border-blue-200 text-slate-700 hover:text-[#2c67ed] hover:border-blue-400'
              }`}
              title="LinkedIn"
            >
              <LinkedinIcon className="w-4 h-4" />
            </a>

            <a
              href={PERSONAL_INFO.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className={`p-3 rounded-2xl border transition-all duration-300 hover:scale-110 ${
                darkMode
                  ? 'bg-white/5 border-slate-700 text-slate-300 hover:text-rose-400 hover:border-rose-500 hover:shadow-[0_0_15px_rgba(244,63,94,0.4)]'
                  : 'bg-white border-rose-200 text-slate-700 hover:text-rose-500 hover:border-rose-400'
              }`}
              title="Instagram"
            >
              <InstagramIcon className="w-4 h-4" />
            </a>

            <a
              href={`mailto:${PERSONAL_INFO.email}?subject=${encodeURIComponent(
                '[Inkuiri Portofolio] Peluang Kerja Sama / Rekrutmen - Yogi Pratama Nusantara'
              )}&body=${encodeURIComponent(
                `Halo Yogi Pratama Nusantara,\n\nSaya melihat website portofolio profesional Anda dan tertarik untuk mendiskusikan peluang kerja sama / rekrutmen.\n\nBerikut informasi saya:\n• Nama Pengirim:\n• Instansi / Perusahaan:\n• Pesan / Kebutuhan:\n\nTerima kasih!`
              )}`}
              className={`p-3 rounded-2xl border transition-all duration-300 hover:scale-110 ${
                darkMode
                  ? 'bg-white/5 border-slate-700 text-slate-300 hover:text-cyan-400 hover:border-cyan-500'
                  : 'bg-white border-blue-200 text-slate-700 hover:text-[#2c67ed]'
              }`}
              title="Kirim Email ke Yogi Pratama Nusantara"
            >
              <Mail className="w-4 h-4" />
            </a>

            <a
              href={`https://wa.me/6283105247681?text=${encodeURIComponent(
                `Halo Yogi Pratama Nusantara,\n\nPerkenalkan, saya melihat website portofolio profesional Anda dan sangat tertarik dengan keahlian Anda di bidang Web Development & UI/UX Design.\n\nSaya ingin berdiskusi mengenai peluang kerja sama / proyek / lowongan pekerjaan. Apakah Anda memiliki waktu luang untuk berdiskusi? Terima kasih!`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className={`p-3 rounded-2xl border transition-all duration-300 hover:scale-110 ${
                darkMode
                  ? 'bg-white/5 border-slate-700 text-slate-300 hover:text-emerald-400 hover:border-emerald-500'
                  : 'bg-white border-emerald-200 text-slate-700 hover:text-emerald-600'
              }`}
              title="Hubungi via WhatsApp"
            >
              <Phone className="w-4 h-4" />
            </a>
          </div>

          {/* Back to top button */}
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold text-white bg-gradient-to-r from-[#2c67ed] to-blue-600 shadow-[0_0_20px_rgba(44,103,237,0.6)] hover:shadow-[0_0_30px_rgba(44,103,237,0.9)] hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            <Rocket className="w-4 h-4" />
            <span>Kembali ke Atas</span>
          </button>
        </div>

        {/* Sub-footer copyright & tech credits */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p className={darkMode ? 'text-slate-400' : 'text-slate-600'}>
            © {new Date().getFullYear()} Yogi Pratama Nusantara. All rights reserved.
          </p>

          <p className={`flex items-center gap-1 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
            <span>Dibuat dengan React • Tailwind CSS • Framer Motion</span>
            <span className="text-[#2c67ed]">✨</span>
          </p>
        </div>
      </div>
    </footer>
  )
}
