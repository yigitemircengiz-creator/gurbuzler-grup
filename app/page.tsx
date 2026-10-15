'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowUpRight, Send, CheckCircle2, AlertCircle, Loader2, ExternalLink } from 'lucide-react'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'

const brands = [
  {
    number: '01',
    name: 'Mobilya Sanatı',
    kicker: 'BAMBİ',
    description: 'Yaşam alanlarınıza karakter kazandıran, zamansız ve kişisel mobilya koleksiyonları.',
    href: '/mobilya-sanati',
    image: '/mobilya/mobilya-sanati-hero.png',
    tone: 'light',
  },
  {
    number: '02',
    name: 'Perde Sanatı',
    kicker: 'GÜRBÜZ',
    description: 'Işığı, dokuyu ve manzarayı yeniden kurgulayan sofistike perde çözümleri.',
    href: '/perde-sanati',
    image: '/perde/perde-17.jpg',
    tone: 'dark',
  },
  {
    number: '03',
    name: 'Dekorasyon Sanatı',
    kicker: 'GÜRBÜZLER GRUP',
    description: 'Mekanları yalnızca güzelleştirmiyor, size ait bir hikayeye dönüştürüyoruz.',
    href: '/dekorasyon-sanati',
    image: '/dekorasyon/dekorasyon-sanati-hero.png',
    tone: 'warm',
  },
]

export default function Page() {
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', message: '' })
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [whatsappUrl, setWhatsappUrl] = useState('')
  const [formSent, setFormSent] = useState(false)

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
        throw new Error(data.error || 'Mesaj iletilemedi, lütfen tekrar deneyiniz.')
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
    <main id="anasayfa" className="min-h-screen overflow-x-hidden bg-[#eeece7] text-[#171717]">
      <Header />



      {/* ÜRÜNLERİMİZ BÖLÜMÜ */}
      <section id="urunlerimiz" className="relative scroll-mt-0 bg-[#171717] px-4 pt-8 pb-28 text-[#eeece7] sm:px-6 sm:pt-10 sm:pb-36 md:px-10 md:pt-12 lg:pt-16 md:pb-44 lg:pb-48 2xl:px-20">
        <span id="markalar" className="absolute top-0 pointer-events-none opacity-0" aria-hidden="true" />
        <div className="mx-auto max-w-[1920px]">
          <div className="grid gap-px bg-[#4a4945] grid-cols-1 md:grid-cols-3">
            {brands.map((brand) => (
              <Link
                key={brand.name}
                href={brand.href}
                className="brand-card group relative min-h-[480px] sm:min-h-[570px] md:min-h-[680px] lg:min-h-[725px] 2xl:min-h-[820px] overflow-hidden bg-[#292826] p-6 sm:p-7 md:p-8 2xl:p-12"
              >
                <img
                  src={brand.image}
                  alt=""
                  className="absolute inset-0 size-full object-cover opacity-50 grayscale transition duration-700 group-hover:scale-105 group-hover:opacity-70 group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/80" />
                <div className="relative flex h-full flex-col justify-between">
                  <div className="flex items-start justify-end">
                    <ArrowUpRight className="transition duration-300 group-hover:rotate-45" size={22} strokeWidth={1} />
                  </div>
                  <div>
                    <h3 className="max-w-xs font-serif text-3xl sm:text-4xl md:text-4xl lg:text-5xl 2xl:text-6xl font-light leading-none tracking-[-.04em]">{brand.name}</h3>
                    <p className="mt-4 sm:mt-5 max-w-xs text-xs sm:text-sm 2xl:text-base leading-relaxed text-white/65">{brand.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* İLETİŞİM / MESAJ GÖNDER BÖLÜMÜ */}
      <section id="iletisim" className="scroll-mt-0 border-t border-[#bdbbb4] bg-[#eeece7] px-4 py-16 sm:px-6 sm:py-20 md:px-12 md:py-28 lg:py-36 2xl:px-24 text-[#171717]">
        <div className="mx-auto max-w-4xl 2xl:max-w-5xl">
          <div className="mb-14 md:mb-20 text-center">
            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-[-0.04em] text-[#171717]">
              Bize Mesaj Gönderin
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm sm:text-base md:text-lg font-light leading-relaxed text-[#595751]">
              Mobilya, perde ve tekstil danışmanlığı için formu doldurun, size hızla dönüş yapalım.
            </p>
          </div>

          {formSent ? (
            <div className="flex flex-col items-center justify-center py-12 px-4 text-center animate-in fade-in rounded-2xl border border-[#c7c4bc] bg-white/40 shadow-sm max-w-xl mx-auto">
              <CheckCircle2 size={52} className="text-[#25D366] mb-3" strokeWidth={1.75} />
              <h3 className="font-serif text-3xl sm:text-4xl font-light text-[#171717]">
                Mesajınız Alındı!
              </h3>
              <p className="mt-2 text-sm sm:text-base text-[#595751] max-w-md leading-relaxed">
                Talebiniz başarıyla oluşturuldu ve <strong>0543 616 37 53</strong> numaralı WhatsApp hattımıza aktarıldı.
              </p>

              {whatsappUrl && (
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center gap-2.5 rounded-full bg-[#25D366] px-8 py-3.5 text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-white shadow-md transition-all duration-300 hover:bg-[#20ba59] hover:shadow-xl cursor-pointer"
                >
                  <span>WhatsApp'ta Sohbeti Aç</span>
                  <ExternalLink size={15} />
                </a>
              )}

              <button
                type="button"
                onClick={() => {
                  setFormSent(false)
                  setFormData({ name: '', phone: '', email: '', message: '' })
                  setWhatsappUrl('')
                }}
                className="mt-6 text-xs sm:text-sm text-[#6a6862] hover:text-[#171717] underline cursor-pointer"
              >
                Yeni bir mesaj gönder
              </button>
            </div>
          ) : (
            <form noValidate onSubmit={handleSubmit} className="mx-auto max-w-3xl space-y-10 md:space-y-12">
              <div>
                <label className="block text-[11px] sm:text-xs font-semibold uppercase tracking-[0.25em] text-[#6a6862] mb-2">
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
                  className={`w-full border-b bg-transparent pb-3 pt-1 text-base sm:text-lg md:text-xl text-[#171717] placeholder:text-[#a8a59e]/70 focus:outline-none transition-colors ${
                    errors.name ? 'border-[#b91c1c] focus:border-[#b91c1c]' : 'border-[#a8a59e] focus:border-[#171717]'
                  }`}
                />
                {errors.name && (
                  <p className="mt-2 flex items-center gap-1.5 text-xs text-[#b91c1c] font-medium animate-in fade-in duration-200">
                    <AlertCircle size={14} className="shrink-0" />
                    <span>{errors.name}</span>
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 gap-10 sm:grid-cols-2">
                <div>
                  <label className="block text-[11px] sm:text-xs font-semibold uppercase tracking-[0.25em] text-[#6a6862] mb-2">
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
                    className={`w-full border-b bg-transparent pb-3 pt-1 text-base sm:text-lg md:text-xl text-[#171717] placeholder:text-[#a8a59e]/70 focus:outline-none transition-colors ${
                      errors.phone ? 'border-[#b91c1c] focus:border-[#b91c1c]' : 'border-[#a8a59e] focus:border-[#171717]'
                    }`}
                  />
                  {errors.phone && (
                    <p className="mt-2 flex items-center gap-1.5 text-xs text-[#b91c1c] font-medium animate-in fade-in duration-200">
                      <AlertCircle size={14} className="shrink-0" />
                      <span>{errors.phone}</span>
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-[11px] sm:text-xs font-semibold uppercase tracking-[0.25em] text-[#6a6862] mb-2">
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
                    className={`w-full border-b bg-transparent pb-3 pt-1 text-base sm:text-lg md:text-xl text-[#171717] placeholder:text-[#a8a59e]/70 focus:outline-none transition-colors ${
                      errors.email ? 'border-[#b91c1c] focus:border-[#b91c1c]' : 'border-[#a8a59e] focus:border-[#171717]'
                    }`}
                  />
                  {errors.email && (
                    <p className="mt-2 flex items-center gap-1.5 text-xs text-[#b91c1c] font-medium animate-in fade-in duration-200">
                      <AlertCircle size={14} className="shrink-0" />
                      <span>{errors.email}</span>
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-[11px] sm:text-xs font-semibold uppercase tracking-[0.25em] text-[#6a6862] mb-2">
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
                  className={`w-full resize-none border-b bg-transparent pb-3 pt-1 text-base sm:text-lg md:text-xl text-[#171717] placeholder:text-[#a8a59e]/70 focus:outline-none transition-colors ${
                    errors.message ? 'border-[#b91c1c] focus:border-[#b91c1c]' : 'border-[#a8a59e] focus:border-[#171717]'
                  }`}
                />
                {errors.message && (
                  <p className="mt-2 flex items-center gap-1.5 text-xs text-[#b91c1c] font-medium animate-in fade-in duration-200">
                    <AlertCircle size={14} className="shrink-0" />
                    <span>{errors.message}</span>
                  </p>
                )}
              </div>

              {submitError && (
                <div className="flex items-center gap-2 text-xs sm:text-sm text-[#b91c1c] bg-[#b91c1c]/10 p-3.5 rounded-lg border border-[#b91c1c]/20">
                  <AlertCircle size={16} className="shrink-0" />
                  <span>{submitError}</span>
                </div>
              )}

              <div className="pt-4 flex justify-center">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group inline-flex items-center justify-center gap-3 bg-[#171717] px-8 sm:px-12 md:px-16 py-3.5 sm:py-4 md:py-5 text-xs sm:text-sm font-semibold uppercase tracking-[0.25em] text-white transition-all duration-300 hover:bg-[#302f2b] hover:shadow-xl cursor-pointer w-full sm:w-auto disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      <span>İletiliyor...</span>
                    </>
                  ) : (
                    <>
                      <span>Mesajı Gönder</span>
                      <Send size={15} className="transition-transform duration-300 group-hover:translate-x-1.5" />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </section>

      {/* Alt Telif ve Bilgi Çubuğu */}
      <Footer />
    </main>
  )
}
