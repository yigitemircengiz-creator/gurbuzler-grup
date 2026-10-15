'use client'

import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { X } from 'lucide-react'

export interface MagazaPhoto {
  id: number
  src: string
  alt: string
}

export const magazaPhotos: MagazaPhoto[] = [
  {
    id: 1,
    src: '/magaza/bambi-magaza-dis-cephe.jpg',
    alt: 'Gürbüzler Grup Bambi Yatak İstanbul Yolu Yeni Batı Mağazası',
  },
]

export function MagazaGallery() {
  const [mounted, setMounted] = useState(false)
  const [lightboxOpen, setLightboxOpen] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const openLightbox = () => {
    setLightboxOpen(true)
  }

  const closeLightbox = () => {
    setLightboxOpen(false)
  }

  useEffect(() => {
    const lenis = (window as unknown as { lenis?: { stop: () => void; start: () => void } }).lenis

    if (!lightboxOpen) {
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
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = ''
      document.documentElement.style.overflow = ''
      lenis?.start()
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [lightboxOpen])

  const photo = magazaPhotos[0]

  return (
    <div className="group relative w-full max-w-[580px] 2xl:max-w-[640px] mx-auto lg:mx-0 overflow-hidden rounded-2xl border border-[#c4c0b5]/80 bg-[#dfdcce] shadow-md transition-all duration-500 hover:shadow-xl">
      {/* Sadece saf görsel - Üzerinde hiçbir yazı veya badge yok */}
      <div
        onClick={openLightbox}
        className="relative aspect-[1.15/1] w-full overflow-hidden cursor-pointer"
      >
        <img
          src={photo.src}
          alt={photo.alt}
          loading="eager"
          className="size-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-103"
        />
      </div>

      {/* LIGHTBOX MODAL */}
      {mounted && lightboxOpen && createPortal(
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[999999] flex h-dvh w-screen items-center justify-center bg-black/95 p-3 sm:p-6 md:p-8 backdrop-blur-xl animate-in fade-in duration-200 overflow-hidden select-none"
          onClick={closeLightbox}
          onWheel={(e) => e.stopPropagation()}
        >
          {/* Kapat Butonu */}
          <button
            type="button"
            onClick={closeLightbox}
            aria-label="Kapat"
            className="absolute top-4 right-4 sm:top-6 sm:right-6 z-[1000000] grid size-12 place-items-center rounded-full border border-white/25 bg-white/10 text-white backdrop-blur-md transition-all hover:scale-110 hover:bg-white hover:text-black cursor-pointer shadow-2xl"
          >
            <X size={24} strokeWidth={2} />
          </button>

          {/* Modal Görsel Kutusu */}
          <div
            className="relative flex max-h-[92vh] max-w-[92vw] items-center justify-center overflow-hidden rounded-3xl bg-[#141412] p-2 sm:p-4 shadow-2xl border border-white/15 animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={photo.src}
              alt={photo.alt}
              className="max-h-[84vh] max-w-[88vw] w-auto h-auto rounded-2xl object-contain shadow-2xl select-none"
            />
          </div>
        </div>,
        document.body
      )}
    </div>
  )
}
