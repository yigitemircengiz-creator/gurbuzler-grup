'use client'

import { useState, useEffect, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { Maximize2, X, ChevronLeft, ChevronRight } from 'lucide-react'

interface DekorasyonProject {
  id: number
  src: string
  title: string
  category: 'salon' | 'yatak-odasi' | 'yemek-yasam' | 'genc-calisma'
  categoryName: string
  description: string
}

const dekorasyonProjects: DekorasyonProject[] = [
  {
    id: 1,
    src: '/dekorasyon/dekorasyon-01.jpg',
    title: 'Japandi Kemerli Mutfak & Yemek Alanı',
    category: 'yemek-yasam',
    categoryName: 'Yemek & Yaşam Alanı',
    description: 'Doğal ahşap dokular, yumuşak kemer mimarisi ve özel aydınlatma detaylarıyla sıcak ve huzurlu bir yaşam alanı.',
  },
  {
    id: 2,
    src: '/dekorasyon/dekorasyon-02.jpg',
    title: 'Açık Plan Loft & Sanatsal Yaşam Alanı',
    category: 'yemek-yasam',
    categoryName: 'Yemek & Yaşam Alanı',
    description: 'Geniş ahşap zemin, aynalı hacim detayları ve seçkin sanat eserleriyle harmanlanan aydınlık açık plan mimari dekorasyon.',
  },
  {
    id: 3,
    src: '/dekorasyon/dekorasyon-03.jpg',
    title: 'Modern Ferah Salon & Oturma Odası',
    category: 'salon',
    categoryName: 'Salon & Oturma Odası',
    description: 'Sakin toprak tonları, konforlu beyaz oturma grubu ve fonksiyonel bar ünitesiyle dengeli bir şehir evi salonu.',
  },
  {
    id: 4,
    src: '/dekorasyon/dekorasyon-04.png',
    title: 'Keten Dokulu Dingin Yatak Odası Konsepti',
    category: 'yatak-odasi',
    categoryName: 'Yatak Odası & Süit',
    description: 'Özel pileli keten perdeler, doğal dokuma tekstiller ve okuma köşesiyle huzurlu ve zamansız bir yatak odası.',
  },
  {
    id: 5,
    src: '/dekorasyon/dekorasyon-05.png',
    title: 'Sıcak Terakota Dokulu Modern Salon',
    category: 'salon',
    categoryName: 'Salon & Oturma Odası',
    description: 'Geniş şehir manzarası önünde terakota kumaş koltuk, asimetrik amorf ayna ve ahşap konsolla dinamik bir salon dekorasyonu.',
  },
  {
    id: 6,
    src: '/dekorasyon/dekorasyon-06.jpg',
    title: 'Özel Ahşap Panel & Lüks Yemek Odası',
    category: 'yemek-yasam',
    categoryName: 'Yemek & Yaşam Alanı',
    description: 'Gizli lineer ışık bantları, heykelsi modern avizeler ve ceviz panel kaplamalarla tasarlanmış seçkin yemek ve oturma mekanı.',
  },
  {
    id: 7,
    src: '/dekorasyon/dekorasyon-07.jpg',
    title: 'Minimalist Bouclé Dokulu Aydınlık Salon',
    category: 'salon',
    categoryName: 'Salon & Oturma Odası',
    description: 'Yumuşak formlu bouclé koltuk, el yapımı rölyef tablo ve tavandan tabana dökümlü tüllerle sakin bir monokrom atmosfer.',
  },
  {
    id: 8,
    src: '/dekorasyon/dekorasyon-08.jpg',
    title: 'Neoklasik Çıtalı Kaset Duvar & Ebeveyn Süiti',
    category: 'yatak-odasi',
    categoryName: 'Yatak Odası & Süit',
    description: 'Geniş tavan yüksekliğine uyumlu geometrik kaset duvar panelleri, kadife bench ve özel mekanik gölgelendirme sistemleri.',
  },
  {
    id: 9,
    src: '/dekorasyon/dekorasyon-09.jpg',
    title: 'Kapitone Başlıklı Klasik & Zarif Yatak Odası',
    category: 'yatak-odasi',
    categoryName: 'Yatak Odası & Süit',
    description: 'Geleneksel zarafeti yansıtan kapitone yatak başlığı, kristal avize ve ipeksi dökümlü perdelerle zengin bir yatak odası projesi.',
  },
  {
    id: 10,
    src: '/dekorasyon/dekorasyon-10.jpg',
    title: 'Modern Süit & Özel Tasarım Makyaj Alanı',
    category: 'yatak-odasi',
    categoryName: 'Yatak Odası & Süit',
    description: 'Dokulu duvar kağıdı, oluklu ahşap makyaj konsolu ve tam boy ayna detayıyla fonksiyonel ve lüks ebeveyn süiti.',
  },
  {
    id: 11,
    src: '/dekorasyon/dekorasyon-11.jpg',
    title: 'Modern Aile Salonu & Yemek Bölümü',
    category: 'salon',
    categoryName: 'Salon & Oturma Odası',
    description: 'Konforlu gri köşe grubu, modern dairesel tavan aydınlatması ve entegre yemek masasıyla samimi bir yaşam alanı.',
  },
  {
    id: 12,
    src: '/dekorasyon/dekorasyon-12.jpg',
    title: 'Doğal Ahşap Detaylı Genç & Çalışma Odası',
    category: 'genc-calisma',
    categoryName: 'Genç & Çalışma Odası',
    description: 'Sıcak meşe kaplamalı dolap, ergonomik çalışma masası ve gizli LED tavan havuzu ile ferah ve odaklanmayı artıran genç odası.',
  },
  {
    id: 13,
    src: '/dekorasyon/dekorasyon-13.jpg',
    title: 'Cumba Pencereli Avangard & Klasik Salon',
    category: 'salon',
    categoryName: 'Salon & Oturma Odası',
    description: 'Geniş cumba mimarisine özel tasarlanmış kruvaze tül ve kadife fonlar, berjerler ve kristal avizeyle görkemli salon dekorasyonu.',
  },
  {
    id: 14,
    src: '/dekorasyon/dekorasyon-14.jpg',
    title: 'Ahşap Jaluzi & Sanatsal Loft Salon Tasarımı',
    category: 'salon',
    categoryName: 'Salon & Oturma Odası',
    description: 'Ahşap tavan kirişleri, özel ahşap jaluziler, koyu füme duvar paneli ve sanat galerisi hissi veren oturma kurgusu.',
  },
  {
    id: 15,
    src: '/dekorasyon/dekorasyon-15.png',
    title: 'Mermer Panel & Gizli Aydınlatmalı Lüks Salon',
    category: 'salon',
    categoryName: 'Salon & Oturma Odası',
    description: 'Doğal damarlı mermer TV ünitesi, entegre açık raf sistemleri, dökümlü tüller ve dingin renk paletiyle üst düzey mimari salon projesi.',
  },
]

const filterTabs = [
  { key: 'all', label: 'Tüm Projeler' },
  { key: 'salon', label: 'Salon & Oturma Odası' },
  { key: 'yatak-odasi', label: 'Yatak Odası & Süit' },
  { key: 'yemek-yasam', label: 'Yemek & Yaşam Alanı' },
  { key: 'genc-calisma', label: 'Genç & Çalışma Odası' },
]

export function DekorasyonGallery() {
  const [mounted, setMounted] = useState(false)
  const [selectedFilter, setSelectedFilter] = useState<string>('all')
  const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  const filteredProjects = selectedFilter === 'all'
    ? dekorasyonProjects
    : dekorasyonProjects.filter((p) => p.category === selectedFilter)

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
            Detaylardaki incelikle yaşam alanlarınıza ruh katan mimari dekorasyon, salon, yatak odası ve yaşam alanı projelerimiz.
          </p>
        </div>

        {/* Filtre Butonları (Ortalanmış Segmented Floating Pill Bar) */}
        <div className="mb-12 flex justify-center">
          <div className="inline-flex flex-wrap items-center justify-center gap-2 rounded-2xl sm:rounded-full border border-black/10 bg-white/70 p-1.5 shadow-xs backdrop-blur-md">
            {filterTabs.map((tab) => {
              const count = tab.key === 'all'
                ? dekorasyonProjects.length
                : dekorasyonProjects.filter((p) => p.category === tab.key).length

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
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#dedcd6] flex items-center justify-center">
                <img
                  src={project.src}
                  alt={project.title}
                  loading="lazy"
                  className="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
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
            <img
              src={filteredProjects[activePhotoIndex].src}
              alt={filteredProjects[activePhotoIndex].title}
              className="max-h-[66vh] max-w-[85vw] rounded-2xl object-contain shadow-2xl"
            />

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
