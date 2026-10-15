'use client'

import { useState, useEffect, useCallback } from 'react'
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react'

export interface CurtainProject {
  id: number
  src: string
  title: string
  category: 'salon' | 'tul-fon' | 'mekanik' | 'diger'
  categoryName: string
  description: string
}

export const curtainProjects: CurtainProject[] = [
  {
    id: 1,
    src: '/perde/perde-1.jpg',
    title: 'Klasik Salon Tül & Fon Tasarımı',
    category: 'tul-fon',
    categoryName: 'Tül & Fon',
    description: 'Özel dökümlü vizon fon kumaşı ve tül kombinasyonu ile zamansız salon zarafeti.',
  },
  {
    id: 3,
    src: '/perde/perde-3.jpg',
    title: 'Silüet Stor Perde Işık Geçirgenliği',
    category: 'mekanik',
    categoryName: 'Mekanik & Stor',
    description: 'Geniş cam cephelerde ışığı yumuşatan modern mekanik silüet perde çözümü.',
  },
  {
    id: 4,
    src: '/perde/perde-4.jpg',
    title: 'Klinik / Ofis Jaluzi Uygulaması',
    category: 'mekanik',
    categoryName: 'Mekanik & Stor',
    description: 'Modern yaşam alanları ve ofisler için hijyenik, minimalist metal jaluzi.',
  },
  {
    id: 5,
    src: '/perde/perde-5.jpg',
    title: 'Modern Salon Ahşap Jaluzi',
    category: 'mekanik',
    categoryName: 'Mekanik & Stor',
    description: 'Doğal ahşap dokusuyla yaşam alanlarına sıcaklık ve sofistike derinlik katan jaluzi.',
  },
  {
    id: 6,
    src: '/perde/perde-6.jpg',
    title: 'Rustik Borulu Dökümlü Tül',
    category: 'tul-fon',
    categoryName: 'Tül & Fon',
    description: 'Mat siyah rustik boru üzerinde akıcı dökümüyle öne çıkan modern tül tasarımı.',
  },
  {
    id: 7,
    src: '/perde/perde-7.jpg',
    title: 'Cam Balkon Plise Perde Sistemi',
    category: 'mekanik',
    categoryName: 'Mekanik & Stor',
    description: 'Panoramik cam balkonlar için bağımsız çalışan pliseli güneş kırıcı sistemi.',
  },
  {
    id: 8,
    src: '/perde/perde-8.jpg',
    title: 'Kış Bahçesi & Balkon Plise Çözümü',
    category: 'mekanik',
    categoryName: 'Mekanik & Stor',
    description: 'Kış bahçesi ve balkon alanlarında yüksek ısı ve ışık kontrolü sunan plise perde.',
  },
  {
    id: 9,
    src: '/perde/perde-9.jpg',
    title: 'Modern İp / Saçak Perde Uygulaması',
    category: 'tul-fon',
    categoryName: 'Tül & Fon',
    description: 'Ferah geçişler ve dinamik hava sirkülasyonu sağlayan modern ip perde tasarımı.',
  },
  {
    id: 10,
    src: '/perde/perde-10.jpg',
    title: 'Balkon Yemek Alanı Plise Montajı',
    category: 'mekanik',
    categoryName: 'Mekanik & Stor',
    description: 'Yemek alanlarında ferah bir aydınlık sağlayan özel ölçü plise uygulaması.',
  },
  {
    id: 11,
    src: '/perde/perde-11.jpg',
    title: 'Avangart Gece Mavisi & Altın Fon',
    category: 'salon',
    categoryName: 'Salon & Avangart',
    description: 'Avangart oymalı taç ve gece mavisi kadife kumaşın asil salon uyumu.',
  },
  {
    id: 12,
    src: '/perde/perde-12.jpg',
    title: 'Yemek Odası Bordürlü Döküm Perde',
    category: 'tul-fon',
    categoryName: 'Tül & Fon',
    description: 'Üst farbela işçiliği ve kenar dökümüyle aydınlık, zarif yemek odası perdesi.',
  },

  {
    id: 14,
    src: '/perde/perde-14.jpg',
    title: 'Eflatun & Vizon Kadife Kruvaze Fon',
    category: 'salon',
    categoryName: 'Salon & Avangart',
    description: 'Klasik oymalı mobilyalar ile kusursuz renk ve doku uyumu sağlayan fon perde.',
  },
  {
    id: 15,
    src: '/perde/perde-15.jpg',
    title: 'Mutfak / Balkon Geçiş Döküm Perde',
    category: 'diger',
    categoryName: 'Mutfak & Diğer',
    description: 'Mutfak ve balkon geçişlerinde fonksiyonel ve estetik tek taraflı dökümlü kumaş çözümü.',
  },
  {
    id: 16,
    src: '/perde/perde-16.jpg',
    title: 'Pudra Pembe Kruvaze Drapeli Perde',
    category: 'tul-fon',
    categoryName: 'Tül & Fon',
    description: 'Romantik pudra tonlarında kruvaze döküm ve zarif boncuk bordür detayı.',
  },
  {
    id: 17,
    src: '/perde/perde-17.jpg',
    title: 'Çift Ton Çizgili Modern Salon Fonu',
    category: 'salon',
    categoryName: 'Salon & Avangart',
    description: 'Modern salonlar için kontrast çizgili dokuma kumaş ve akıcı kruvaze tül.',
  },
  {
    id: 18,
    src: '/perde/perde-18.jpg',
    title: 'Mutfak Tezgah Üstü Siyah Jaluzi',
    category: 'mekanik',
    categoryName: 'Mekanik & Stor',
    description: 'Modern mutfak dolaplarıyla güçlü kontrast oluşturan suya dayanıklı siyah jaluzi.',
  },
  {
    id: 19,
    src: '/perde/perde-19.jpg',
    title: 'Köşe Pencere Mutfak Jaluzi Montajı',
    category: 'mekanik',
    categoryName: 'Mekanik & Stor',
    description: 'Köşe cepheler için milimetrik hassasiyetle uygulanan ahşap jaluzi montajı.',
  },
  {
    id: 20,
    src: '/perde/perde-20.jpg',
    title: 'Fuşya & Mürdüm Kruvaze Salon Fonu',
    category: 'salon',
    categoryName: 'Salon & Avangart',
    description: 'Geniş açıklıklı pencerelerde görkemli kruvaze döküm ve zengin mürdüm fon perdesi.',
  },
  {
    id: 21,
    src: '/perde/perde-21.jpg',
    title: 'Avangart Dilimli & Püsküllü Salon Tülü',
    category: 'salon',
    categoryName: 'Salon & Avangart',
    description: 'Klasik oymalı mobilyalarla bütünleşen dilimli ve püsküllü lüks salon tülü.',
  },
  {
    id: 22,
    src: '/perde/perde-22.jpg',
    title: 'Geniş Açı Avangart Salon Projesi',
    category: 'salon',
    categoryName: 'Salon & Avangart',
    description: 'Salonun tüm mimari cephesinde kesintisiz ve zengin tül-fon yerleşimi.',
  },
  {
    id: 23,
    src: '/perde/perde-23.jpg',
    title: 'Modern Kiremit Fon & Dökümlü Tül',
    category: 'salon',
    categoryName: 'Salon & Avangart',
    description: 'Doğal keten dokulu kiremit fon ve dökümlü tülün sıcak çağdaş atmosferi.',
  },
  {
    id: 24,
    src: '/perde/perde-24.jpg',
    title: 'Güpürlü Fransız Tül & Vizon Fon',
    category: 'tul-fon',
    categoryName: 'Tül & Fon',
    description: 'Güpürlü Fransız dantel işçiliği ve dökümlü vizon fonun rafine birlikteliği.',
  },
  {
    id: 25,
    src: '/perde/perde-25.jpg',
    title: 'Lüks Klasik Konut Salon Teslimatı',
    category: 'salon',
    categoryName: 'Salon & Avangart',
    description: 'Tavan boyu akıcı dökümüyle konutun mimari kimliğini tamamlayan salon perdesi.',
  },
]

const filterTabs = [
  { key: 'all', label: 'Tüm Uygulamalar' },
  { key: 'salon', label: 'Salon & Avangart' },
  { key: 'tul-fon', label: 'Tül & Fon' },
  { key: 'mekanik', label: 'Jaluzi & Stor & Plise' },
]

export function PerdeGallery() {
  const [selectedFilter, setSelectedFilter] = useState<string>('all')
  const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null)

  const filteredProjects = selectedFilter === 'all'
    ? curtainProjects
    : curtainProjects.filter((p) => p.category === selectedFilter)

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

  // Klavye ok tuşları ve Escape dinleyicisi
  useEffect(() => {
    if (activePhotoIndex === null) {
      document.body.style.overflow = ''
      return
    }

    document.body.style.overflow = 'hidden'

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox()
      if (e.key === 'ArrowLeft') showPrev()
      if (e.key === 'ArrowRight') showNext()
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [activePhotoIndex, showPrev, showNext])

  return (
    <section id="projelerimiz" className="border-t border-black/10 py-16 sm:py-20 md:py-28 2xl:py-36 bg-transparent">
      <span id="uygulamalar" className="sr-only" />
      <div className="mx-auto max-w-[1920px] 2xl:max-w-[2200px] px-4 sm:px-6 md:px-12 lg:px-16 2xl:px-24">
        {/* Başlık: Ortalanmış, Modern & Zarif */}
        <div className="mb-10 sm:mb-14 text-center max-w-3xl mx-auto">
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl 2xl:text-7xl font-light tracking-[-0.04em] text-[#171717]">
            Projelerimiz
          </h2>
          <p className="mt-3 sm:mt-4 font-serif text-lg sm:text-xl md:text-2xl font-light italic tracking-tight text-[#5c5952]">
            Işığı, mimariyi ve dokuyu yaşam alanlarınızla buluşturan özel dikim perde koleksiyonumuz.
          </p>
        </div>

        {/* Filtre Butonları (Ortalanmış Segmented Floating Pill Bar) */}
        <div className="mb-12 flex justify-center">
          <div className="inline-flex flex-wrap items-center justify-center gap-2 rounded-2xl sm:rounded-full border border-black/10 bg-white/70 p-1.5 shadow-xs backdrop-blur-md">
            {filterTabs.map((tab) => {
              const count = tab.key === 'all'
                ? curtainProjects.length
                : curtainProjects.filter((p) => p.category === tab.key).length

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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
          {filteredProjects.map((project, idx) => (
            <div
              key={project.id}
              onClick={() => openLightbox(idx)}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-black/10 bg-white shadow-xs transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl cursor-pointer"
            >
              {/* Görsel Alanı */}
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#dedcd6]">
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

      {/* LIGHTBOX MODAL (TAM EKRAN İNCELEME) */}
      {activePhotoIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4 sm:p-6 md:p-10 backdrop-blur-xl animate-in fade-in duration-200"
          onClick={closeLightbox}
        >
          {/* Kapat Butonu */}
          <button
            type="button"
            onClick={closeLightbox}
            aria-label="Kapat"
            className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20 grid size-12 place-items-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition-all hover:scale-110 hover:bg-white hover:text-black cursor-pointer"
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
            className="absolute left-3 sm:left-6 z-20 grid size-12 place-items-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition-all hover:scale-110 hover:bg-white hover:text-black cursor-pointer"
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
            className="absolute right-3 sm:right-6 z-20 grid size-12 place-items-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition-all hover:scale-110 hover:bg-white hover:text-black cursor-pointer"
          >
            <ChevronRight size={26} strokeWidth={2} />
          </button>

          {/* Modal Görsel ve Bilgi Alanı */}
          <div
            className="relative flex max-h-[92vh] max-w-5xl flex-col items-center justify-center overflow-hidden rounded-3xl bg-[#171614] p-4 sm:p-6 shadow-2xl border border-white/15"
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
        </div>
      )}
    </section>
  )
}
