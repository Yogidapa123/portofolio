import React, { useState } from 'react'
import { motion } from 'framer-motion'
import confetti from 'canvas-confetti'
import {
  Mail,
  Phone,
  MapPin,
  MessageSquare,
  Sparkles,
  CheckCircle2,
  Copy,
  ExternalLink,
} from 'lucide-react'
import { LinkedinIcon, InstagramIcon } from './SocialIcons'
import { PERSONAL_INFO } from '../data/portfolioData'

interface ContactSectionProps {
  darkMode: boolean
}

export const ContactSection: React.FC<ContactSectionProps> = ({ darkMode }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [copiedEmail, setCopiedEmail] = useState(false)
  const [copiedFormattedText, setCopiedFormattedText] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  // Format Email yang rapi, berstruktur, dan mudah dibaca oleh Yogi sebagai penerima
  const getFormattedEmailData = () => {
    const subject = `[Inkuiri Portofolio] ${
      formData.subject.trim() || 'Peluang Kerja Sama / Kolaborasi'
    } - ${formData.name.trim() || 'Pengunjung'}`

    const body = `Halo Yogi Pratama Nusantara,

Saya menghubungi Anda melalui formulir kontak website portofolio profesional Anda. Berikut adalah rincian pesan saya:

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📋 INFORMASI PENGIRIM
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Nama Lengkap : ${formData.name.trim() || '-'}
• Alamat Email : ${formData.email.trim() || '-'}
• No. WhatsApp : ${formData.phone.trim() || '-'}
• Topik / Hal  : ${formData.subject.trim() || '-'}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
💬 ISI PESAN & KEBUTUHAN
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${formData.message.trim() || '-'}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Salam hormat,
${formData.name.trim() || 'Pengirim'}

(Dikirim otomatis via formulir website portofolio Yogi Pratama Nusantara)`

    return { subject, body }
  }

  // Format WhatsApp yang sopan, rapi dengan penataan bullet point dan teks tebal
  const getFormattedWhatsAppMessage = () => {
    const hasData =
      formData.name.trim() || formData.message.trim() || formData.subject.trim()

    if (!hasData) {
      return `Halo Yogi Pratama Nusantara,

Perkenalkan, saya melihat website portofolio profesional Anda dan sangat tertarik dengan profil serta keahlian Anda di bidang Web Development & UI/UX Design.

Saya ingin berdiskusi mengenai peluang kerja sama / proyek / lowongan pekerjaan. Apakah Anda memiliki waktu luang untuk berdiskusi? Terima kasih!`
    }

    return `Halo Yogi Pratama Nusantara,

Perkenalkan, saya *${formData.name.trim() || 'rekan'}*. Saya menghubungi Anda melalui website portofolio profesional Anda.

*📋 Rincian Pesan:*
• *Nama Lengkap:* ${formData.name.trim() || '-'}
• *Alamat Email:* ${formData.email.trim() || '-'}
• *Topik / Hal:* ${formData.subject.trim() || 'Peluang Kolaborasi'}
${formData.phone.trim() ? `• *No. WhatsApp:* ${formData.phone.trim()}\n` : ''}
*💬 Isi Pesan:*
"${formData.message.trim() || 'Saya tertarik untuk berdiskusi lebih lanjut dengan Anda.'}"

Apakah Anda memiliki waktu luang untuk berdiskusi? Terima kasih!`
  }

  // Mengirim langsung ke email dengan format terstruktur
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    const { subject, body } = getFormattedEmailData()
    const mailtoUrl = `mailto:${PERSONAL_INFO.email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`

    // Buka aplikasi email default pengirim
    window.location.href = mailtoUrl

    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)

      // Fire cosmic confetti celebration
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#2c67ed', '#38bdf8', '#818cf8', '#ffffff'],
        })
      } catch (err) {
        // Fallback silently if canvas not available
      }
    }, 500)
  }

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email)
    setCopiedEmail(true)
    setTimeout(() => setCopiedEmail(false), 2500)
  }

  const handleCopyFormattedMessage = () => {
    const { body } = getFormattedEmailData()
    navigator.clipboard.writeText(body)
    setCopiedFormattedText(true)
    setTimeout(() => setCopiedFormattedText(false), 2500)
  }

  const handleDirectWhatsApp = () => {
    const msg = getFormattedWhatsAppMessage()
    window.open(`https://wa.me/6283105247681?text=${encodeURIComponent(msg)}`, '_blank')
  }

  const handleOpenWebGmail = () => {
    const { subject, body } = getFormattedEmailData()
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
      PERSONAL_INFO.email
    )}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    window.open(gmailUrl, '_blank')
  }

  return (
    <section id="contact" className="relative py-20 lg:py-28 overflow-hidden">
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
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Transmisi Komunikasi & Kontak</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight"
          >
            Hubungi{' '}
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
            Siap mendiskusikan peluang karir, proyek pembuatan website, perancangan UI/UX, desain grafis, maupun kolaborasi strategis lainnya.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Direct Contact & Social Cards */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 space-y-4"
          >
            {/* Primary Info Card */}
            <div
              className={`p-6 sm:p-7 rounded-3xl border ${
                darkMode
                  ? 'bg-[#0b122e]/90 border-[#2c67ed]/40 text-white shadow-[0_0_25px_rgba(44,103,237,0.25)]'
                  : 'bg-white/95 border-blue-200 text-slate-800 shadow-[0_8px_30px_rgba(44,103,237,0.15)]'
              }`}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#2c67ed] to-cyan-400 p-[2px] shadow-lg">
                  <img
                    key={darkMode ? 'dark-contact' : 'light-contact'}
                    src={darkMode ? PERSONAL_INFO.photoDarkUrl : PERSONAL_INFO.photoLightUrl}
                    alt={PERSONAL_INFO.name}
                    className="w-full h-full object-cover rounded-[14px] transition-all duration-500"
                  />
                </div>
                <div>
                  <h3 className="font-extrabold text-base sm:text-lg text-[#2c67ed]">
                    Yogi Pratama Nusantara
                  </h3>
                  <p className="text-xs opacity-75">Status: Terbuka untuk Tawaran Kerja</p>
                </div>
              </div>

              {/* Direct channels */}
              <div className="space-y-3.5">
                {/* WhatsApp */}
                <a
                  href={`https://wa.me/6283105247681?text=${encodeURIComponent(
                    `Halo Yogi Pratama Nusantara,\n\nPerkenalkan, saya melihat website portofolio profesional Anda dan sangat tertarik dengan profil serta keahlian Anda di bidang Web Development & UI/UX Design.\n\nSaya ingin berdiskusi mengenai peluang kerja sama / proyek / lowongan pekerjaan. Apakah Anda memiliki waktu luang untuk berdiskusi? Terima kasih!`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-3.5 rounded-2xl border flex items-center justify-between group transition-all duration-300 hover:scale-[1.02] ${
                    darkMode
                      ? 'bg-white/5 border-slate-700/60 hover:border-emerald-500/50 hover:bg-emerald-950/20'
                      : 'bg-slate-50 border-slate-200 hover:border-emerald-500/50 hover:bg-emerald-50/50'
                  }`}
                  title="Hubungi langsung via WhatsApp"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-400">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-[11px] opacity-70">WhatsApp / Telepon</div>
                      <div className="text-xs sm:text-sm font-bold text-emerald-400">
                        {PERSONAL_INFO.phoneFormatted}
                      </div>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 opacity-50 group-hover:opacity-100 group-hover:text-emerald-400 transition-opacity" />
                </a>

                {/* Email */}
                <div
                  className={`p-3.5 rounded-2xl border flex items-center justify-between group transition-all duration-300 ${
                    darkMode ? 'bg-white/5 border-slate-700/60' : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-[#2c67ed]/20 text-[#2c67ed]">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-[11px] opacity-70">Email Utama</div>
                      <a
                        href={`mailto:${PERSONAL_INFO.email}?subject=${encodeURIComponent(
                          '[Inkuiri Portofolio] Peluang Kerja Sama / Rekrutmen - Yogi Pratama Nusantara'
                        )}&body=${encodeURIComponent(
                          `Halo Yogi Pratama Nusantara,\n\nSaya melihat website portofolio profesional Anda dan ingin berdiskusi mengenai peluang kerja sama / rekrutmen.\n\nBerikut rincian inkuiri saya:\n• Nama Pengirim:\n• Instansi / Perusahaan:\n• Topik Diskusi:\n• Pesan:\n\nTerima kasih!`
                        )}`}
                        className="text-xs sm:text-sm font-bold hover:underline text-[#2c67ed] block truncate max-w-[180px] sm:max-w-[220px]"
                        title="Klik untuk mengirim email langsung"
                      >
                        {PERSONAL_INFO.email}
                      </a>
                    </div>
                  </div>
                  <button
                    onClick={handleCopyEmail}
                    className="p-1.5 rounded-lg hover:bg-white/10 text-xs flex items-center gap-1 font-semibold opacity-80 hover:opacity-100 transition-all cursor-pointer"
                    title="Salin Alamat Email"
                  >
                    {copiedEmail ? (
                      <span className="text-emerald-400 text-[11px] font-bold">Tersalin!</span>
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>

                {/* Location */}
                <div
                  className={`p-3.5 rounded-2xl border flex items-center gap-3 ${
                    darkMode ? 'bg-white/5 border-slate-700/60' : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <div className="p-2.5 rounded-xl bg-cyan-500/20 text-cyan-400">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[11px] opacity-70">Lokasi / Domisili</div>
                    <div className="text-xs sm:text-sm font-bold">{PERSONAL_INFO.location}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media Link Cards */}
            <div className="grid grid-cols-2 gap-3">
              {/* LinkedIn */}
              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className={`p-4 rounded-2xl border flex flex-col justify-between group transition-all duration-300 hover:scale-105 ${
                  darkMode
                    ? 'bg-[#0b122e]/90 border-blue-500/40 hover:border-blue-400 hover:shadow-[0_0_20px_rgba(44,103,237,0.4)]'
                    : 'bg-white/95 border-blue-200 hover:border-blue-400 hover:shadow-[0_6px_20px_rgba(44,103,237,0.2)]'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="p-2 rounded-xl bg-[#2c67ed]/20 text-[#2c67ed]">
                    <LinkedinIcon className="w-5 h-5" />
                  </div>
                  <ExternalLink className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
                </div>
                <div>
                  <div className="text-xs font-extrabold text-[#2c67ed]">LinkedIn</div>
                  <div className="text-[11px] opacity-70 truncate">yogipratamanusantara</div>
                </div>
              </a>

              {/* Instagram */}
              <a
                href={PERSONAL_INFO.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className={`p-4 rounded-2xl border flex flex-col justify-between group transition-all duration-300 hover:scale-105 ${
                  darkMode
                    ? 'bg-[#0b122e]/90 border-rose-500/30 hover:border-rose-400 hover:shadow-[0_0_20px_rgba(244,63,94,0.3)]'
                    : 'bg-white/95 border-rose-200 hover:border-rose-400 hover:shadow-[0_6px_20px_rgba(244,63,94,0.2)]'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="p-2 rounded-xl bg-gradient-to-tr from-amber-400 via-rose-500 to-indigo-600 text-white">
                    <InstagramIcon className="w-5 h-5" />
                  </div>
                  <ExternalLink className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
                </div>
                <div>
                  <div className="text-xs font-extrabold text-rose-500">Instagram</div>
                  <div className="text-[11px] opacity-70 truncate">{PERSONAL_INFO.instagramHandle}</div>
                </div>
              </a>
            </div>
          </motion.div>

          {/* Right Column: Interactive Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7"
          >
            <div
              className={`p-6 sm:p-8 rounded-3xl border transition-all ${
                darkMode
                  ? 'bg-[#0b122e]/90 border-[#2c67ed]/50 text-white shadow-[0_0_35px_rgba(44,103,237,0.35)]'
                  : 'bg-white/95 border-blue-200 text-slate-800 shadow-[0_10px_35px_rgba(44,103,237,0.2)]'
              }`}
            >
              <div className="flex items-center justify-between mb-6 pb-3 border-b border-slate-700/30">
                <div>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-[#2c67ed]">
                    Formulir Kirim Pesan ke Email
                  </h3>
                  <p className={`text-xs mt-0.5 ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                    Isi detail pesan di bawah untuk dikirimkan langsung ke email resmi Yogi
                  </p>
                </div>
                <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold bg-blue-500/20 text-cyan-300 border border-blue-500/40">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                  Format Rapi
                </span>
              </div>

              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-6 sm:py-8 space-y-5"
                >
                  <div className="w-16 h-16 rounded-full bg-[#2c67ed]/20 text-[#2c67ed] mx-auto flex items-center justify-center shadow-lg">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>

                  <div className="text-center space-y-1">
                    <h4 className="text-2xl font-extrabold text-[#2c67ed]">
                      Format Pesan Siap & Berhasil Diarahkan!
                    </h4>
                    <p className={`text-sm max-w-md mx-auto ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                      Pesan dari <strong>{formData.name || 'Pengirim'}</strong> dengan format terstruktur telah dibuka di aplikasi email Anda menuju{' '}
                      <strong className="text-[#2c67ed]">{PERSONAL_INFO.email}</strong>.
                    </p>
                  </div>

                  {/* Preview Box of the Message Format */}
                  <div
                    className={`p-4 rounded-2xl border text-left font-mono text-[11px] leading-relaxed max-h-52 overflow-y-auto ${
                      darkMode
                        ? 'bg-black/60 border-slate-700/80 text-slate-300'
                        : 'bg-slate-50 border-slate-300 text-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-700/40 text-[10px] font-sans font-bold text-cyan-400">
                      <span>Pratinjau Format Pesan (Sangat Mudah Dibaca):</span>
                      <button
                        type="button"
                        onClick={handleCopyFormattedMessage}
                        className="hover:underline flex items-center gap-1 cursor-pointer text-cyan-300"
                      >
                        {copiedFormattedText ? (
                          <span className="text-emerald-400 font-bold">✓ Teks Tersalin</span>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>Salin Teks Pesan</span>
                          </>
                        )}
                      </button>
                    </div>
                    <pre className="whitespace-pre-wrap font-mono text-[11px] select-all">
                      {getFormattedEmailData().body}
                    </pre>
                  </div>

                  {/* Quick Alternate Send Actions */}
                  <div className="pt-2 flex flex-wrap justify-center gap-2.5">
                    <button
                      type="button"
                      onClick={handleOpenWebGmail}
                      className="px-4 py-2.5 rounded-xl text-xs font-bold bg-red-600 hover:bg-red-500 text-white flex items-center gap-1.5 shadow-md transition-all cursor-pointer"
                      title="Buka langsung di Google Gmail Web"
                    >
                      <Mail className="w-4 h-4" />
                      <span>Buka di Gmail Web</span>
                      <ExternalLink className="w-3.5 h-3.5 opacity-70" />
                    </button>

                    <button
                      type="button"
                      onClick={handleDirectWhatsApp}
                      className="px-4 py-2.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white flex items-center gap-1.5 shadow-md transition-all cursor-pointer"
                      title="Kirim salinan pesan ini ke WhatsApp Yogi"
                    >
                      <Phone className="w-4 h-4" />
                      <span>Kirim Salinan via WhatsApp</span>
                      <ExternalLink className="w-3.5 h-3.5 opacity-70" />
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setIsSubmitted(false)
                        setFormData({ name: '', email: '', phone: '', subject: '', message: '' })
                      }}
                      className={`px-4 py-2.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                        darkMode
                          ? 'border-slate-700 text-slate-300 hover:bg-white/10'
                          : 'border-slate-300 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      Tulis Pesan Baru
                    </button>
                  </div>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold mb-1.5 opacity-90">
                        Nama Lengkap <span className="text-[#2c67ed]">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Contoh: Budi Prasetyo"
                        className={`w-full px-4 py-2.5 rounded-xl text-xs sm:text-sm border transition-all outline-none focus:border-[#2c67ed] focus:ring-2 focus:ring-[#2c67ed]/30 ${
                          darkMode
                            ? 'bg-[#070b1c] border-slate-700 text-white placeholder-slate-500'
                            : 'bg-slate-50 border-slate-300 text-slate-800 placeholder-slate-400'
                        }`}
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold mb-1.5 opacity-90">
                        Alamat Email Anda <span className="text-[#2c67ed]">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="email@perusahaan.com"
                        className={`w-full px-4 py-2.5 rounded-xl text-xs sm:text-sm border transition-all outline-none focus:border-[#2c67ed] focus:ring-2 focus:ring-[#2c67ed]/30 ${
                          darkMode
                            ? 'bg-[#070b1c] border-slate-700 text-white placeholder-slate-500'
                            : 'bg-slate-50 border-slate-300 text-slate-800 placeholder-slate-400'
                        }`}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold mb-1.5 opacity-90">
                        Nomor WhatsApp (Opsional)
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+62 812-3456-7890"
                        className={`w-full px-4 py-2.5 rounded-xl text-xs sm:text-sm border transition-all outline-none focus:border-[#2c67ed] focus:ring-2 focus:ring-[#2c67ed]/30 ${
                          darkMode
                            ? 'bg-[#070b1c] border-slate-700 text-white placeholder-slate-500'
                            : 'bg-slate-50 border-slate-300 text-slate-800 placeholder-slate-400'
                        }`}
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold mb-1.5 opacity-90">
                        Topik / Subjek <span className="text-[#2c67ed]">*</span>
                      </label>
                      <input
                        type="text"
                        name="subject"
                        required
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="Peluang Kerja / Proyek Web / Desain UI"
                        className={`w-full px-4 py-2.5 rounded-xl text-xs sm:text-sm border transition-all outline-none focus:border-[#2c67ed] focus:ring-2 focus:ring-[#2c67ed]/30 ${
                          darkMode
                            ? 'bg-[#070b1c] border-slate-700 text-white placeholder-slate-500'
                            : 'bg-slate-50 border-slate-300 text-slate-800 placeholder-slate-400'
                        }`}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold mb-1.5 opacity-90">
                      Pesan Anda <span className="text-[#2c67ed]">*</span>
                    </label>
                    <textarea
                      name="message"
                      rows={4}
                      required
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Jelaskan kebutuhan proyek, posisi pekerjaan, penawaran kolaborasi, atau pertanyaan Anda..."
                      className={`w-full px-4 py-2.5 rounded-xl text-xs sm:text-sm border transition-all outline-none focus:border-[#2c67ed] focus:ring-2 focus:ring-[#2c67ed]/30 resize-none ${
                        darkMode
                          ? 'bg-[#070b1c] border-slate-700 text-white placeholder-slate-500'
                          : 'bg-slate-50 border-slate-300 text-slate-800 placeholder-slate-400'
                      }`}
                    />
                  </div>

                  {/* Submit Actions */}
                  <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full sm:w-auto px-6 py-3 rounded-xl font-bold text-xs sm:text-sm text-white bg-gradient-to-r from-[#2c67ed] to-blue-600 shadow-[0_0_20px_rgba(44,103,237,0.6)] hover:shadow-[0_0_30px_rgba(44,103,237,0.85)] hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                      title="Membuka aplikasi email dengan format pesan rapi siap kirim"
                    >
                      <Mail className="w-4 h-4" />
                      <span>{isSubmitting ? 'Membuka Email...' : 'Kirim Pesan ke Email'}</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleDirectWhatsApp}
                      className="w-full sm:w-auto px-5 py-3 rounded-xl font-bold text-xs sm:text-sm bg-emerald-600 hover:bg-emerald-500 text-white shadow-md hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
                      title="Kirim pesan langsung via WhatsApp dengan format rapi"
                    >
                      <Phone className="w-4 h-4" />
                      <span>Kirim via WhatsApp</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
