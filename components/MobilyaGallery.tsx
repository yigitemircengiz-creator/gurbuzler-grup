'use client'

import { useState, useEffect, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { Maximize2, X, ChevronLeft, ChevronRight } from 'lucide-react'

interface MobilyaProject {
  id: number
  src: string
  title: string
  category: 'yatak' | 'bebek' | 'topper'
  categoryName: string
  description: string
  fit?: 'cover' | 'contain'
}

const mobilyaProjects: MobilyaProject[] = [
  {
    id: 1,
    src: '/mobilya/nirvana-zen-yatak.png',
    title: 'Nirvana Zen Yatak',
    category: 'yatak',
    categoryName: 'Yatak Koleksiyonu',
    description: 'Çift paket yay sistemi ile daha iyi uyku, daha dirençli vücut...',
    fit: 'cover',
  },
  {
    id: 2,
    src: '/mobilya/dozy-yatak.png',
    title: 'Dozy Yatak',
    category: 'yatak',
    categoryName: 'Yatak Koleksiyonu',
    description: 'Kendi tarzını yarat, odanı Dozy ile yeniden keşfet',
    fit: 'cover',
  },
  {
    id: 3,
    src: '/mobilya/bohemela-yatak.png',
    title: 'Bohemela Yatak',
    category: 'yatak',
    categoryName: 'Yatak Koleksiyonu',
    description: 'Bohemela Yatak, aromaterapi etkisi gösteren doğal kokularla melatonin üretimi arasındaki bilimsel ilişkiyi temel alır...',
    fit: 'cover',
  },
  {
    id: 4,
    src: '/mobilya/cappadocia-natura-yatak.jpg',
    title: 'Cappadocia Natura Yatak',
    category: 'yatak',
    categoryName: 'Yatak Koleksiyonu',
    description: "Kapadokya'dan ilham alan doğal kil mineraliyle kusursuz bir uyku için Cappadocia Natura Yatak ile tanışın...",
    fit: 'cover',
  },
  {
    id: 5,
    src: '/mobilya/novera-yatak-kanepe.jpg',
    title: 'Novera Yatak ve Kanepe',
    category: 'yatak',
    categoryName: 'Yatak & Kanepe',
    description: 'Modern yaşam alanlarının değişen ihtiyaçlarına yanıt veren Novera Yatak & Kanepe, şıklık ve işlevselliği bir araya getirir.',
    fit: 'cover',
  },
  {
    id: 6,
    src: '/mobilya/silver-voyage-yatak.png',
    title: 'Silver Voyage Yatak',
    category: 'yatak',
    categoryName: 'Yatak Koleksiyonu',
    description: 'Sert veya orta sert zeminde yatmaktan keyif alanlara özel Silver Voyage Yatak ile tanışın...',
    fit: 'cover',
  },
  {
    id: 7,
    src: '/mobilya/vanilla-dream-yatak.png',
    title: 'Vanilla Dream Yatak',
    category: 'yatak',
    categoryName: 'Yatak Koleksiyonu',
    description: 'Vanilla Dream yatağın yüzey kumaşı, ağaç liflerinden üretilmiş Doğal Viskon kumaştır. Her mevsime uygun, konforlu bir uyku sunar.',
    fit: 'cover',
  },
  {
    id: 8,
    src: '/mobilya/blacksand-yatak.png',
    title: 'Blacksand Yatak',
    category: 'yatak',
    categoryName: 'Yatak Koleksiyonu',
    description: 'Manyetik siyah kum mucizesini yatak odanıza taşıyan Blacksand Yatak ile tanışın...',
    fit: 'cover',
  },
  {
    id: 9,
    src: '/mobilya/climextra-yatak.png',
    title: 'Climextra Yatak',
    category: 'yatak',
    categoryName: 'Yatak Koleksiyonu',
    description: 'Climextra Yatak çift taraflı kullanımıyla her mevsim en iyi uyku için tasarlandı.',
    fit: 'cover',
  },
  {
    id: 10,
    src: '/mobilya/latex-master-yatak.png',
    title: 'Latex Master Yatak',
    category: 'yatak',
    categoryName: 'Yatak Koleksiyonu',
    description: 'Pamuklu kumaş yüzeyi ve özel el işçiliğiyle her mevsime uygun, yumuşak tuşeye sahip yapısı ile Latex Master...',
    fit: 'cover',
  },
  {
    id: 11,
    src: '/mobilya/biosalt-yatak.png',
    title: 'Biosalt Yatak (Tuz Lambası Hediyeli)',
    category: 'yatak',
    categoryName: 'Yatak Koleksiyonu',
    description: 'Kaya Tuzunun mucizevi etkileri BioSalt Yatak ile odanıza geliyor.',
    fit: 'cover',
  },
  {
    id: 12,
    src: '/mobilya/fornea-yatak.png',
    title: 'Fornea Yatak',
    category: 'yatak',
    categoryName: 'Yatak Koleksiyonu',
    description: 'Bonel Yay Sistemi ile vücut ağırlığının yoğunlaştığı bölgelerde çökme olasılığının azalmasına yardımcı olur...',
    fit: 'cover',
  },
  {
    id: 13,
    src: '/mobilya/pineda-yatak.png',
    title: 'Pineda Yatak',
    category: 'yatak',
    categoryName: 'Yatak Koleksiyonu',
    description: 'Bonel Yay Sistemine sahip Pineda Yatak ile daha uzun ömürlü kullanım mümkün.',
    fit: 'cover',
  },
  {
    id: 14,
    src: '/mobilya/oviedo-yatak.png',
    title: 'Oviedo Yatak',
    category: 'yatak',
    categoryName: 'Yatak Koleksiyonu',
    description: 'Paket Yay Sisteminin dayanıklılığı, kalın sünger tabakasının konforu Oviedo Yatak ile sizlerle...',
    fit: 'cover',
  },
  {
    id: 15,
    src: '/mobilya/questo-katlanir-somya.png',
    title: 'Guesto Katlanır Somya ve Yatak',
    category: 'topper',
    categoryName: 'Katlanır Somya & Yatak',
    description: 'Bambi Katlanabilir Somya ve Yatak, işyerinizde, evinizde yada yazlığınızda ek yatak ihtiyacınıza çözüm sunar.',
    fit: 'cover',
  },
  {
    id: 16,
    src: '/mobilya/kapok-naturel-yatak.png',
    title: 'Kapok Naturel Yatak',
    category: 'yatak',
    categoryName: 'Yatak Koleksiyonu',
    description: 'Doğal, Kaliteli ve Sağlıklı Uyku için Kapok Naturel Yatak... Doğanın mucizesi her gün sizinle...',
    fit: 'cover',
  },
  {
    id: 17,
    src: '/mobilya/clima-naturel-yatak.jpg',
    title: 'Clima Naturel Yatak',
    category: 'yatak',
    categoryName: 'Yatak Koleksiyonu',
    description: 'Yaz gecelerinizi serin, kış gecelerinizi sıcacık geçirmenize imkan sağlayan çift taraflı kullanımıyla Clima Naturel Yatak..',
    fit: 'cover',
  },
  {
    id: 18,
    src: '/mobilya/visco-fresh-exclusive-yatak.png',
    title: 'Visco Fresh Exclusive Yatak',
    category: 'yatak',
    categoryName: 'Yatak Koleksiyonu',
    description: 'Visco Fresh Yatakta kullanılan kapitonedeki kuş tüyü sünger ile vücudun yatağa temasında yumuşak bir dokunuş hissi...',
    fit: 'cover',
  },
  {
    id: 19,
    src: '/mobilya/golden-prime-yatak.jpg',
    title: 'Golden Prime Yatak',
    category: 'yatak',
    categoryName: 'Yatak Koleksiyonu',
    description: 'Sert veya orta sert zeminde yatmaktan keyif alanlara özel Golden Prime Yatak ile tanışın...',
    fit: 'cover',
  },
  {
    id: 20,
    src: '/mobilya/comfort-balance-yatak.jpg',
    title: 'Comfort Balance Yatak',
    category: 'yatak',
    categoryName: 'Yatak Koleksiyonu',
    description: 'Comfort Balance Yatağın çift taraflı kullanımı ile uzun ömürlü, her yön değişiminde yeni bir yatakta uyuma...',
    fit: 'cover',
  },
  {
    id: 21,
    src: '/mobilya/latex-topper-yatak.png',
    title: 'Latex Topper Yatak',
    category: 'topper',
    categoryName: 'Yatak Pedi & Topper',
    description: 'Latex Topper Yatak ile yatağınızı değiştirmeden lateks teknolojisine kavuşun...',
    fit: 'cover',
  },
  {
    id: 22,
    src: '/mobilya/visco-topper-yatak.png',
    title: 'Visco Topper Yatak',
    category: 'topper',
    categoryName: 'Yatak Pedi & Topper',
    description: 'Visco Topper Yatak ile yatağınızı değiştirmeden visco konforuna kavuşun...',
    fit: 'cover',
  },
  {
    id: 23,
    src: '/mobilya/comfizone-yatak.png',
    title: 'Comfizone Yatak',
    category: 'yatak',
    categoryName: 'Yatak Koleksiyonu',
    description: 'Comfizone Yatak, farklı konfor anlayışlarını tek bir yatakta buluşturuyor...',
    fit: 'cover',
  },
  {
    id: 24,
    src: '/mobilya/thermo-control-yatak.jpg',
    title: 'Thermo Control Yatak',
    category: 'yatak',
    categoryName: 'Yatak Koleksiyonu',
    description: 'Thermo Control Yatak, kumaşı sayesinde ısı regülasyonu sağlama özelliğine sahiptir. Bu sayede vücudun ideal sıcaklığını korur.',
    fit: 'cover',
  },
  {
    id: 25,
    src: '/mobilya/borjen-yatak.png',
    title: 'Borjen Yatak',
    category: 'yatak',
    categoryName: 'Yatak Koleksiyonu',
    description: 'Bor mucizesinin yatakla buluştuğu ve eşsiz konforun hayat bulmuş hali Borjen Yatak ayrıcalığı ile tanışın...',
    fit: 'cover',
  },
  {
    id: 26,
    src: '/mobilya/freshcell-prime-yatak.jpg',
    title: 'Freshcell Prime Yatak',
    category: 'yatak',
    categoryName: 'Yatak Koleksiyonu',
    description: 'Freshcell Prime Yatakta, Kuş Tüyü Sünger ile vücudun temasında yumuşak bir dokunuş hissi...',
    fit: 'cover',
  },
  {
    id: 27,
    src: '/mobilya/thermall-yatak.png',
    title: 'Thermall Yatak',
    category: 'yatak',
    categoryName: 'Yatak Koleksiyonu',
    description: 'Paket Yay Sisteminin dayanıklılığı, kalın sünger tabakasının konforu Thermall Yatakta...',
    fit: 'cover',
  },
  {
    id: 28,
    src: '/mobilya/bamboo-sleep-yatak.jpg',
    title: 'Bamboo Sleep Yatak',
    category: 'yatak',
    categoryName: 'Yatak Koleksiyonu',
    description: 'Zarafetin ve dayanıklılığın simgesi bambu ağacından ilham alan Bambu Sleep Yatak, saf uykunun derinliklerine...',
    fit: 'cover',
  },
  {
    id: 29,
    src: '/mobilya/serenity-yatak.jpg',
    title: 'Serenity Yatak',
    category: 'yatak',
    categoryName: 'Yatak Koleksiyonu',
    description: 'Paket Yay sistemi ile eşsiz bir hareket rahatlığı sunan Serenity Yatak ile huzura kavuşun...',
    fit: 'cover',
  },
  {
    id: 30,
    src: '/mobilya/sleepure-yatak.jpg',
    title: 'Sleepure Yatak',
    category: 'yatak',
    categoryName: 'Yatak Koleksiyonu',
    description: 'Sleepure Yatak ile kaliteli bir uykuyu, hijyenik ve sağlıklı bir ortamda deneyimleme imkanı...',
    fit: 'cover',
  },
  {
    id: 31,
    src: '/mobilya/cotton-master-yatak.jpg',
    title: 'Cotton Master Yatak',
    category: 'yatak',
    categoryName: 'Yatak Koleksiyonu',
    description: 'Cotton Master Yatak ile doğal pamuk sayesinde yatak yüzeyinde daha yumuşak, ısı dengeli, terlemesiz, deliksiz bir uyku...',
    fit: 'cover',
  },
  {
    id: 32,
    src: '/mobilya/magic-bambi-bebek.png',
    title: 'Magic Bambi',
    category: 'bebek',
    categoryName: 'Bebek Koleksiyonu',
    description: 'Sıvı geçirmez ve yıkanabilir pedi ile uzun ömürlü Magic Bambi Yatak...',
    fit: 'cover',
  },
  {
    id: 33,
    src: '/mobilya/junior-bambi-bebek.jpg',
    title: 'Junior Bambi',
    category: 'bebek',
    categoryName: 'Bebek Koleksiyonu',
    description: 'Özel eğimi, yumuşacık kuş tüyü süngeri ve yıkanabilir pedi ile bebek gelişimine katkı sağlayan Junior Bambi Yatak...',
    fit: 'cover',
  },
  {
    id: 34,
    src: '/mobilya/luna-bambi-bebek.png',
    title: 'Luna Bambi',
    category: 'bebek',
    categoryName: 'Bebek Koleksiyonu',
    description: 'Luna Bambi Yatağın uzun ömürlü, sıvı geçirmez, yıkanabilir pediyle tertemiz uykular...',
    fit: 'cover',
  },
  {
    id: 35,
    src: '/mobilya/mini-bambi-bebek.png',
    title: 'Mini Bambi',
    category: 'bebek',
    categoryName: 'Bebek Koleksiyonu',
    description: 'Bebek gelişimine katkı sağlayan, özel eğimli, sıvı geçirmez pedli bebek yatağı.',
    fit: 'cover',
  },
  {
    id: 36,
    src: '/mobilya/magnasand-therapy-yatak.png',
    title: 'Magnasand Therapy Yatak',
    category: 'yatak',
    categoryName: 'Yatak Koleksiyonu',
    description: 'Zihinsel ve fiziksel bir terapinin, tedavi edici mucizesini sizlerle buluşturan Magnasand Therapy Yatak ile tanışın...',
    fit: 'cover',
  },
]

const filterTabs = [
  { key: 'all', label: 'Tüm Koleksiyon' },
  { key: 'yatak', label: 'Yataklar' },
  { key: 'bebek', label: 'Bebek Yatakları' },
  { key: 'topper', label: 'Yatak Pedi & Somya' },
]

export function MobilyaGallery() {
  const [mounted, setMounted] = useState(false)
  const [selectedFilter, setSelectedFilter] = useState<string>('all')
  const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  const filteredProjects = selectedFilter === 'all'
    ? mobilyaProjects
    : mobilyaProjects.filter((p) => p.category === selectedFilter)

  const openLightbox = (index: number) => {
    setActivePhotoIndex(index)
  }

  const closeLightbox = () => {
    setActivePhotoIndex(null)
  }

  const showPrev = useCallback(() => {
    if (activePhotoIndex === null) return
    setActivePhotoIndex((prev) => (prev! > 0 ? prev! - 1 : filteredProjects.length - 1))
  }, [activePhotoIndex, filteredProjects.length])

  const showNext = useCallback(() => {
    if (activePhotoIndex === null) return
    setActivePhotoIndex((prev) => (prev! < filteredProjects.length - 1 ? prev! + 1 : 0))
  }, [activePhotoIndex, filteredProjects.length])

  useEffect(() => {
    const lenis = (window as unknown as { lenis?: { stop: () => void; start: () => void } }).lenis

    if (activePhotoIndex === null) {
      document.body.style.overflow = ''
      document.documentElement.style.overflow = ''
      lenis?.start()
      return
    }

    document.body.style.overflow = 'hidden'
    document.documentElement.style.overflow = 'hidden'
    lenis?.stop()

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox()
      if (e.key === 'ArrowLeft') showPrev()
      if (e.key === 'ArrowRight') showNext()
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = ''
      document.documentElement.style.overflow = ''
      lenis?.start()
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [activePhotoIndex, showPrev, showNext])

  return (
    <section id="projelerimiz" className="border-t border-black/10 py-16 sm:py-20 md:py-28 2xl:py-36 bg-transparent">
      {/* Geriye dönük veya menü uyumluluğu için anchor */}
      <span id="uygulamalar" className="sr-only" />
      <span id="menu" className="sr-only" />

      <div className="mx-auto max-w-[1920px] 2xl:max-w-[2200px] px-4 sm:px-6 md:px-12 lg:px-16 2xl:px-24">
        {/* Başlık: Ortalanmış, Modern & Zarif */}
        <div className="mb-10 sm:mb-14 text-center max-w-3xl mx-auto">
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl 2xl:text-7xl font-light tracking-[-0.04em] text-[#171717]">
            Projelerimiz
          </h2>
          <p className="mt-3 sm:mt-4 font-serif text-lg sm:text-xl md:text-2xl font-light italic tracking-tight text-[#5c5952]">
            Konforu, ergonomiyi ve estetiği yaşam alanlarınızla buluşturan seçkin Bambi mobilya koleksiyonumuz.
          </p>
        </div>

        {/* Filtre Butonları (Ortalanmış Segmented Floating Pill Bar) */}
        <div className="mb-12 flex justify-center">
          <div className="inline-flex flex-wrap items-center justify-center gap-2 rounded-2xl sm:rounded-full border border-black/10 bg-white/70 p-1.5 shadow-xs backdrop-blur-md">
            {filterTabs.map((tab) => {
              const count = tab.key === 'all'
                ? mobilyaProjects.length
                : mobilyaProjects.filter((p) => p.category === tab.key).length

              const isActive = selectedFilter === tab.key

              return (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => {
                    setSelectedFilter(tab.key)
                    setActivePhotoIndex(null)
                  }}
                  className={`rounded-full px-5 py-2.5 text-xs font-semibold tracking-wider uppercase transition-all duration-300 cursor-pointer ${
                    isActive
                      ? 'bg-[#171717] text-white shadow-md'
                      : 'text-[#69665f] hover:text-[#171717] hover:bg-black/5'
                  }`}
                >
                  <span>{tab.label}</span>
                  <span className={`ml-2 text-[10px] ${isActive ? 'text-white/70' : 'text-[#8a6e50]'}`}>
                    ({count})
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Galeri Izgarası (Editorial Luxury Grid) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 sm:gap-8">
          {filteredProjects.map((project, idx) => (
            <div
              key={project.id}
              onClick={() => openLightbox(idx)}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-black/10 bg-white shadow-xs transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl cursor-pointer"
            >
              {/* Görsel Alanı */}
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#dedcd6] flex items-center justify-center">
                <img
                  src={project.src}
                  alt={project.title}
                  loading="lazy"
                  className={`size-full transition-transform duration-700 ease-out group-hover:scale-108 ${
                    project.fit === 'contain' ? 'object-contain p-6' : 'object-cover'
                  }`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                
                {/* Büyütme İkonu */}
                <div className="absolute top-4 right-4 grid size-10 place-items-center rounded-full border border-white/20 bg-black/40 text-white backdrop-blur-md opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:scale-100 scale-90">
                  <Maximize2 size={16} />
                </div>

                {/* Kategori Rozeti */}
                <span className="absolute top-4 left-4 rounded-full border border-white/20 bg-black/50 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-[#c5a880] backdrop-blur-md">
                  {project.categoryName}
                </span>

                {/* Hover Anında Çıkan İncele Butonu */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white opacity-0 transition-all duration-300 group-hover:opacity-100">
                  <span className="text-[11px] font-medium tracking-wider uppercase">Tam Ekran İncele</span>
                  <span className="text-sm">→</span>
                </div>
              </div>

              {/* Alt Bilgi */}
              <div className="p-5 sm:p-6 flex flex-col flex-1 justify-between">
                <div>
                  <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#8a6e50] block mb-1.5">
                    {project.categoryName}
                  </span>
                  <h3 className="text-base sm:text-lg font-medium tracking-tight text-[#171717] group-hover:text-[#8a6e50] transition-colors line-clamp-1">
                    {project.title}
                  </h3>
                  <p className="mt-1.5 text-xs sm:text-[13px] leading-relaxed text-[#5c5952] line-clamp-2">
                    {project.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-black/5 flex items-center justify-between text-[11px] font-semibold uppercase tracking-[0.2em] text-[#171717] group-hover:text-[#8a6e50] transition-colors">
                  <span>Detaylı İncele</span>
                  <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* LIGHTBOX MODAL (TAM EKRAN İNCELEME - PORTAL) */}
      {mounted && activePhotoIndex !== null && createPortal(
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[999999] flex h-dvh w-screen items-center justify-center bg-black/95 p-3 sm:p-6 md:p-10 backdrop-blur-xl animate-in fade-in duration-200 overflow-hidden select-none"
          onClick={closeLightbox}
          onWheel={(e) => e.stopPropagation()}
        >
          {/* Kapat Butonu */}
          <button
            type="button"
            onClick={closeLightbox}
            aria-label="Kapat"
            className="absolute top-4 right-4 sm:top-6 sm:right-6 z-[1000000] grid size-12 place-items-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition-all hover:scale-110 hover:bg-white hover:text-black cursor-pointer shadow-2xl"
          >
            <X size={22} strokeWidth={2} />
          </button>

          {/* Sol Ok Butonu */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              showPrev()
            }}
            aria-label="Önceki görsel"
            className="absolute left-3 sm:left-6 z-[1000000] grid size-12 place-items-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition-all hover:scale-110 hover:bg-white hover:text-black cursor-pointer shadow-2xl"
          >
            <ChevronLeft size={26} strokeWidth={2} />
          </button>

          {/* Sağ Ok Butonu */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              showNext()
            }}
            aria-label="Sonraki görsel"
            className="absolute right-3 sm:right-6 z-[1000000] grid size-12 place-items-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition-all hover:scale-110 hover:bg-white hover:text-black cursor-pointer shadow-2xl"
          >
            <ChevronRight size={26} strokeWidth={2} />
          </button>

          {/* Modal Görsel ve Bilgi Alanı */}
          <div
            className="relative flex max-h-[92vh] max-w-5xl flex-col items-center justify-center overflow-hidden rounded-3xl bg-[#171614] p-4 sm:p-6 shadow-2xl border border-white/15 animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {filteredProjects[activePhotoIndex].fit === 'contain' ? (
              <div className="flex items-center justify-center py-6 px-6 sm:py-10 sm:px-12 w-full">
                <img
                  src={filteredProjects[activePhotoIndex].src}
                  alt={filteredProjects[activePhotoIndex].title}
                  className="max-h-[32vh] sm:max-h-[36vh] max-w-[60vw] sm:max-w-[400px] object-contain drop-shadow-2xl"
                />
              </div>
            ) : (
              <img
                src={filteredProjects[activePhotoIndex].src}
                alt={filteredProjects[activePhotoIndex].title}
                className="max-h-[66vh] max-w-[85vw] rounded-2xl object-contain shadow-2xl"
              />
            )}

            <div className="mt-4 w-full px-2 text-center text-white">
              <div className="flex items-center justify-center gap-3">
                <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#c5a880]">
                  {filteredProjects[activePhotoIndex].categoryName}
                </span>
                <span className="text-white/40">·</span>
                <span className="text-xs font-mono text-white/60">
                  Görsel {activePhotoIndex + 1} / {filteredProjects.length}
                </span>
              </div>
              <h4 className="text-xl sm:text-2xl md:text-3xl font-medium tracking-tight text-white mt-2">
                {filteredProjects[activePhotoIndex].title}
              </h4>
              <p className="text-xs sm:text-sm text-white/80 mt-1.5 max-w-xl mx-auto leading-relaxed">
                {filteredProjects[activePhotoIndex].description}
              </p>
            </div>
          </div>
        </div>,
        document.body
      )}
    </section>
  )
}
