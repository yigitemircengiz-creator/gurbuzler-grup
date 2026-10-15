'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Send, CheckCircle2, MapPin, Phone, Clock, MoveRight, AlertCircle, Loader2, ExternalLink } from 'lucide-react'
import { Header } from '@/components/Header'
import { Footer, bambiSocialLinks, perdeSocialLinks } from '@/components/Footer'

export default function IletisimPage() {
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', message: '' })
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [whatsappUrl, setWhatsappUrl] = useState('')
  const [formSent, setFormSent] = useState(false)

  useEffect(() => {
    document.title = 'İletişim | Gürbüzler Grup Bambi Yatak'
  }, [])

  const validate = () => {
    const newErrors: { [key: string]: string } = {}
    if (!formData.name.trim()) {
      newErrors.name = 'Lütfen bu alanı doldurun.'
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Lütfen bu alanı doldurun.'
    }
    if (formData.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Lütfen geçerli bir e-posta adresi girin.'
    }
    if (!formData.message.trim()) {
      newErrors.message = 'Lütfen bu alanı doldurun.'
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    setIsSubmitting(true)
    setSubmitError('')

    try {
      const res = await fetch('/api/iletisim', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Mesaj gönderilemedi, lütfen tekrar deneyiniz.')
      }

      setWhatsappUrl(data.whatsappUrl || '')
      setFormSent(true)
      setErrors({})

      // 0543 616 37 53 WhatsApp hattına doğrudan aç
      if (data.whatsappUrl) {
        window.open(data.whatsappUrl, '_blank')
      }
    } catch (err: any) {
      setSubmitError(err.message || 'Sunucu ile iletişim kurulamadı. Lütfen doğrudan telefonla arayınız.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="min-h-screen bg-[#eeece7] text-[#171717]">
      {/* ÜST BAŞLIK / HEADER */}
      <Header />

      {/* MAĞAZA DIŞ CEPHE GÖRSELİ ARKA PLANLI BANNER (PARALLAX / FIXED BACKGROUND) */}
      <section className="relative flex min-h-[44vh] sm:min-h-[48vh] md:min-h-[54vh] items-center justify-center overflow-hidden px-4 sm:px-6 md:px-12 2xl:px-24 py-16 sm:py-20 md:py-28 2xl:py-36 border-y border-[#bdbbb4]">
        {/* Parallax Sabit Arka Plan */}
        <div
          className="absolute inset-0 z-0 bg-fixed bg-cover bg-no-repeat"
          style={{
            backgroundImage: "url('/magaza-dis.png')",
            backgroundPosition: 'center 38%',
          }}
        />

        {/* Arka plan görseline azcık daha beyaz filtre */}
        <div className="absolute inset-0 z-1 bg-white/30" />

        {/* Yumuşak odaklama - yazıyı belirginleştirirken mağazayı gösteren degrade */}
        <div className="absolute inset-0 z-2 bg-[radial-gradient(ellipse_75%_80%_at_50%_50%,rgba(238,236,231,0.74)_0%,rgba(238,236,231,0.30)_65%,transparent_100%)]" />

        {/* İçerik: Animasyonlu geliş */}
        <div className="relative z-10 mx-auto max-w-3xl 2xl:max-w-4xl text-center">
          <h1 className="reveal delay-1 font-serif text-4xl sm:text-5xl md:text-7xl lg:text-8xl 2xl:text-9xl font-light tracking-[-0.04em] text-[#171717]">
            Bize Ulaşın
          </h1>
          <p className="reveal delay-2 mx-auto mt-4 sm:mt-5 max-w-2xl text-sm sm:text-base md:text-lg lg:text-xl font-normal leading-relaxed text-[#262523]">
            Sizleri mağazamızda ağırlamaktan büyük mutluluk duyarız. Ürünlerimizi ve Mağazamıza özel fırsatları kaçırmamanız için sizleri çayımızı içmeye bekliyoruz.
          </p>
        </div>
      </section>

      {/* 3 SÜTUNLU AYRINTILI İLETİŞİM ALANI (ARALARINDA UZUN ÇİZGİLERLE AYRILMIŞ, KUTUCUKSUZ) */}
      <section className="px-4 sm:px-6 md:px-12 2xl:px-24 py-12 sm:py-16 md:py-24 2xl:py-32">
        <div className="mx-auto max-w-[1600px] 2xl:max-w-[2000px]">
          <div className="grid grid-cols-1 lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-[#c7c4bc] items-start">
            
            {/* 1. SÜTUN: EN SOLDA HARİTA */}
            <div className="reveal delay-2 pb-12 lg:pb-0 lg:pr-10 xl:pr-14 flex flex-col justify-between h-full space-y-6">
              <div>
                <h2 className="font-serif text-2xl sm:text-3xl font-normal text-[#171717]">
                  İstanbul Yolu / Yeni Batı
                </h2>
                <p className="mt-2 text-xs sm:text-sm text-[#595751] leading-relaxed">
                  Yeni Batı Mah. Kalem Cad. No: 22 AL adresinde, kolay ulaşılabilir geniş otoparklı mağazamızda hizmetinizdeyiz.
                </p>
              </div>

              <div className="relative min-h-[360px] w-full overflow-hidden rounded-xl border border-[#bdbbb4] shadow-xs">
                <iframe
                  title="BAMBİ YATAK Yeni Batı Mağazası"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3057.4022965664967!2d32.6602302!3d39.97711419999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14d3374a7db88109%3A0x9b39de92ecac9958!2zQkFNQsSwIFlBVEFLIFllbmkgQmF0xLEgTWHEn2F6YXPEsSAoxLBzdGFuYnVsIFlvbHUpIChHw7xyYsO8emxlciBHcnVwKQ!5e0!3m2!1str!2str"
                  className="size-full min-h-[360px] border-0 grayscale-[15%] contrast-[1.05] transition-all duration-300 hover:grayscale-0"
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              <a
                href="https://www.google.com/maps/place/BAMB%C4%B0+YATAK+Yeni+Bat%C4%B1+Ma%C4%9Fazas%C4%B1+(%C4%B0stanbul+Yolu)+(G%C3%BCrb%C3%BCzler+Grup)/@39.9771142,32.6602302,17z/data=!3m1!4b1!4m6!3m5!1s0x14d3374a7db88109:0x9b39de92ecac9958!8m2!3d39.9771142!4d32.6602302!16s%2Fg%2F11lzfscc02"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between border-b border-[#a8a59e] pb-3 text-xs sm:text-sm font-semibold uppercase tracking-[0.22em] text-[#171717] transition-colors hover:text-[#8a6e50]"
              >
                <span>Google Haritalar'da Yol Tarifi Al</span>
                <MoveRight size={16} className="transition-transform group-hover:translate-x-1.5" />
              </a>
            </div>

            {/* 2. SÜTUN: ORTADA MESAJ GÖNDERME YERİ */}
            <div className="reveal delay-3 py-12 lg:py-0 lg:px-10 xl:px-14 flex flex-col justify-between h-full">
              <div>
                <h2 className="font-serif text-2xl sm:text-3xl font-normal text-[#171717]">
                  Bize Mesaj Gönderin
                </h2>
                <p className="mt-2 text-xs sm:text-sm text-[#595751] leading-relaxed">
                  Mobilya, perde ve tekstil danışmanlığı için formu doldurun, size hızla dönüş yapalım.
                </p>
              </div>

              <div className="mt-8">
                {formSent ? (
                  <div className="flex flex-col items-center justify-center py-10 px-4 text-center animate-in fade-in rounded-xl border border-[#c7c4bc] bg-white/40">
                    <CheckCircle2 size={48} className="text-[#25D366] mb-3" strokeWidth={1.75} />
                    <h3 className="font-serif text-2xl sm:text-3xl font-light text-[#171717]">
                      Mesajınız Alındı!
                    </h3>
                    <p className="mt-2 text-xs sm:text-sm text-[#595751] max-w-sm leading-relaxed">
                      Talebiniz kaydedildi ve <strong>0543 616 37 53</strong> numaralı WhatsApp hattımıza aktarıldı.
                    </p>

                    {whatsappUrl && (
                      <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-5 inline-flex items-center gap-2.5 rounded-full bg-[#25D366] px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-white shadow-md transition-all duration-300 hover:bg-[#20ba59] hover:shadow-lg cursor-pointer"
                      >
                        <span>WhatsApp'ta Sohbeti Aç</span>
                        <ExternalLink size={14} />
                      </a>
                    )}

                    <button
                      type="button"
                      onClick={() => {
                        setFormSent(false)
                        setFormData({ name: '', phone: '', email: '', message: '' })
                        setWhatsappUrl('')
                      }}
                      className="mt-5 text-xs text-[#6a6862] hover:text-[#171717] underline cursor-pointer"
                    >
                      Yeni bir mesaj gönder
                    </button>
                  </div>
                ) : (
                  <form noValidate onSubmit={handleSubmit} className="space-y-7">
                    <div>
                      <label className="block text-[11px] font-semibold uppercase tracking-[0.22em] text-[#6a6862] mb-1.5">
                        Ad Soyad *
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => {
                          setFormData({ ...formData, name: e.target.value })
                          if (errors.name) setErrors((prev) => ({ ...prev, name: '' }))
                        }}
                        placeholder="Adınız ve soyadınız"
                        className={`w-full border-b bg-transparent pb-2.5 pt-1 text-sm sm:text-base text-[#171717] placeholder:text-[#a8a59e]/70 focus:outline-none transition-colors ${
                          errors.name ? 'border-[#b91c1c] focus:border-[#b91c1c]' : 'border-[#a8a59e] focus:border-[#171717]'
                        }`}
                      />
                      {errors.name && (
                        <p className="mt-1.5 flex items-center gap-1.5 text-xs text-[#b91c1c] font-medium animate-in fade-in duration-200">
                          <AlertCircle size={13} className="shrink-0" />
                          <span>{errors.name}</span>
                        </p>
                      )}
                    </div>

                    <div className="grid grid-cols-1 gap-7 sm:grid-cols-2">
                      <div>
                        <label className="block text-[11px] font-semibold uppercase tracking-[0.22em] text-[#6a6862] mb-1.5">
                          Telefon *
                        </label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => {
                            setFormData({ ...formData, phone: e.target.value })
                            if (errors.phone) setErrors((prev) => ({ ...prev, phone: '' }))
                          }}
                          placeholder="05XX XXX XX XX"
                          className={`w-full border-b bg-transparent pb-2.5 pt-1 text-sm sm:text-base text-[#171717] placeholder:text-[#a8a59e]/70 focus:outline-none transition-colors ${
                            errors.phone ? 'border-[#b91c1c] focus:border-[#b91c1c]' : 'border-[#a8a59e] focus:border-[#171717]'
                          }`}
                        />
                        {errors.phone && (
                          <p className="mt-1.5 flex items-center gap-1.5 text-xs text-[#b91c1c] font-medium animate-in fade-in duration-200">
                            <AlertCircle size={13} className="shrink-0" />
                            <span>{errors.phone}</span>
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold uppercase tracking-[0.22em] text-[#6a6862] mb-1.5">
                          E-Posta (İsteğe bağlı)
                        </label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => {
                            setFormData({ ...formData, email: e.target.value })
                            if (errors.email) setErrors((prev) => ({ ...prev, email: '' }))
                          }}
                          placeholder="ornek@mail.com"
                          className={`w-full border-b bg-transparent pb-2.5 pt-1 text-sm sm:text-base text-[#171717] placeholder:text-[#a8a59e]/70 focus:outline-none transition-colors ${
                            errors.email ? 'border-[#b91c1c] focus:border-[#b91c1c]' : 'border-[#a8a59e] focus:border-[#171717]'
                          }`}
                        />
                        {errors.email && (
                          <p className="mt-1.5 flex items-center gap-1.5 text-xs text-[#b91c1c] font-medium animate-in fade-in duration-200">
                            <AlertCircle size={13} className="shrink-0" />
                            <span>{errors.email}</span>
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold uppercase tracking-[0.22em] text-[#6a6862] mb-1.5">
                        Mesajınız *
                      </label>
                      <textarea
                        rows={4}
                        value={formData.message}
                        onChange={(e) => {
                          setFormData({ ...formData, message: e.target.value })
                          if (errors.message) setErrors((prev) => ({ ...prev, message: '' }))
                        }}
                        placeholder="İlgilendiğiniz ürün veya sormak istediğiniz sorular..."
                        className={`w-full resize-none border-b bg-transparent pb-2.5 pt-1 text-sm sm:text-base text-[#171717] placeholder:text-[#a8a59e]/70 focus:outline-none transition-colors ${
                          errors.message ? 'border-[#b91c1c] focus:border-[#b91c1c]' : 'border-[#a8a59e] focus:border-[#171717]'
                        }`}
                      />
                      {errors.message && (
                        <p className="mt-1.5 flex items-center gap-1.5 text-xs text-[#b91c1c] font-medium animate-in fade-in duration-200">
                          <AlertCircle size={13} className="shrink-0" />
                          <span>{errors.message}</span>
                        </p>
                      )}
                    </div>

                    {submitError && (
                      <div className="flex items-center gap-2 text-xs text-[#b91c1c] bg-[#b91c1c]/10 p-3 rounded border border-[#b91c1c]/20">
                        <AlertCircle size={15} className="shrink-0" />
                        <span>{submitError}</span>
                      </div>
                    )}

                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="group flex w-full items-center justify-center gap-3 bg-[#171717] py-4 text-xs font-semibold uppercase tracking-[0.25em] text-white transition-all duration-300 hover:bg-[#302f2b] hover:shadow-lg cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 size={15} className="animate-spin" />
                            <span>İletiliyor...</span>
                          </>
                        ) : (
                          <>
                            <span>Mesajı Gönder</span>
                            <Send size={14} className="transition-transform duration-300 group-hover:translate-x-1.5" />
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>

            {/* 3. SÜTUN: EN SAĞDA SOSYAL MEDYA, TELEFON, ADRES, ÇALIŞMA SAATLERİ */}
            <div className="reveal delay-4 pt-12 lg:pt-0 lg:pl-10 xl:pl-14 space-y-8 flex flex-col justify-between h-full">
              {/* Telefon & WhatsApp */}
              <div>
                <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#6a6862]">
                  <Phone size={14} className="text-[#8a6e50]" /> Telefon & WhatsApp
                </p>
                <div className="mt-2 space-y-1.5">
                  <a
                    href="tel:03126130101"
                    className="block font-[family-name:var(--font-outfit)] text-2xl sm:text-[1.75rem] font-light tracking-[0.04em] text-[#171717] transition hover:text-[#8a6e50]"
                  >
                    0312 613 01 01
                  </a>
                  <a
                    href="tel:05436163753"
                    className="block font-[family-name:var(--font-outfit)] text-2xl sm:text-[1.75rem] font-light tracking-[0.04em] text-[#171717] transition hover:text-[#8a6e50]"
                  >
                    0543 616 37 53
                  </a>
                </div>
                <a
                  href="https://wa.me/905436163753"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-[#1e7e34] hover:underline"
                >
                  WhatsApp ile Doğrudan İletişime Geç →
                </a>
              </div>


              {/* Mağaza Adresi */}
              <div className="border-t border-[#c7c4bc]/70 pt-6">
                <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#6a6862]">
                  <MapPin size={14} className="text-[#8a6e50]" /> Mağaza Adresi
                </p>
                <p className="mt-1.5 text-sm leading-relaxed text-[#232220]">
                  <strong>İstanbul Yolu / Yeni Batı Mağazası</strong><br />
                  Yeni Batı Mah. Kalem Cad. No: 22 AL, Yenimahalle / Ankara
                </p>
              </div>

              {/* Çalışma Saatleri */}
              <div className="border-t border-[#c7c4bc]/70 pt-6">
                <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#6a6862]">
                  <Clock size={14} className="text-[#8a6e50]" /> Çalışma Saatleri
                </p>
                <div className="mt-2 space-y-1.5 text-xs sm:text-sm text-[#232220]">
                  <div className="flex justify-between border-b border-[#c7c4bc]/50 pb-1">
                    <span>Haftanın her günü</span>
                    <strong className="font-semibold text-[#171717]">09:00 — 21:00</strong>
                  </div>
                </div>
              </div>

              {/* Sosyal Medya */}
              <div className="border-t border-[#c7c4bc]/70 pt-6 space-y-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#6a6862]">
                  Resmî Sosyal Medya Hesaplarımız
                </p>

                {/* Bambi Yatak */}
                <div>
                  <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#8a6e50] block mb-2">
                    Bambi Yatak:
                  </span>
                  <div className="flex flex-wrap gap-2.5">
                    {bambiSocialLinks.map((item) => (
                      <a
                        key={`bambi-${item.name}`}
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Bambi Yatak ${item.name}`}
                        title={`Bambi Yatak ${item.name}: ${item.handle}`}
                        className="group grid size-9 place-items-center rounded-full border border-[#bdbbb4] bg-white/70 text-[#292825] shadow-xs transition-all duration-300 hover:border-[#171717] hover:bg-[#171717] hover:text-white hover:scale-110 cursor-pointer"
                      >
                        {item.icon}
                      </a>
                    ))}
                  </div>
                </div>

                {/* Gürbüzler Grup Perde */}
                <div className="pt-1">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#8a6e50] block mb-2">
                    Gürbüzler Grup Perde:
                  </span>
                  <div className="flex flex-wrap gap-2.5">
                    {perdeSocialLinks.map((item) => (
                      <a
                        key={`perde-${item.name}`}
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Gürbüzler Grup Perde ${item.name}`}
                        title={`Gürbüzler Grup Perde ${item.name}: ${item.handle}`}
                        className="group grid size-9 place-items-center rounded-full border border-[#bdbbb4] bg-white/70 text-[#292825] shadow-xs transition-all duration-300 hover:border-[#171717] hover:bg-[#171717] hover:text-white hover:scale-110 cursor-pointer"
                      >
                        {item.icon}
                      </a>
                    ))}
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* ALT TELİF VE BİLGİ ÇUBUĞU */}
      <Footer />
    </main>
  )
}
