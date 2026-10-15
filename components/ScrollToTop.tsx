'use client'

import { useEffect, useState } from 'react'
import { ArrowUp } from 'lucide-react'

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight

      if (docHeight > 0) {
        const progress = Math.min(100, Math.max(0, (scrollY / docHeight) * 100))
        setScrollProgress(progress)
      }

      // 300px'den fazla kaydırıldığında butonu göster
      if (scrollY > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    const lenis = (window as unknown as { lenis?: { scrollTo: (target: number, opts?: { duration?: number }) => void } }).lenis
    if (lenis) {
      lenis.scrollTo(0, { duration: 1.1 })
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  // Dairesel ilerleme hesaplaması
  const radius = 22
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (scrollProgress / 100) * circumference

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="En yukarı çık"
      title="Yukarı Çık"
      className={`group fixed bottom-6 right-6 z-50 flex size-12 sm:size-13 cursor-pointer items-center justify-center rounded-full bg-[#171717]/90 text-[#eeece7] shadow-2xl backdrop-blur-md transition-all duration-500 hover:scale-110 hover:bg-[#171717] hover:text-white hover:shadow-[#8a6e50]/25 md:bottom-8 md:right-8 ${
        isVisible
          ? 'translate-y-0 opacity-100 pointer-events-auto'
          : 'translate-y-8 opacity-0 pointer-events-none'
      }`}
    >
      {/* İnce İlerleme Çerçevesi (Progress Ring) */}
      <svg
        className="absolute inset-0 size-full -rotate-90 pointer-events-none"
        viewBox="0 0 52 52"
      >
        {/* Arka plan çemberi */}
        <circle
          cx="26"
          cy="26"
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="text-white/15"
        />
        {/* İlerleme çemberi */}
        <circle
          cx="26"
          cy="26"
          r={radius}
          fill="none"
          stroke="#8a6e50"
          strokeWidth="1.8"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-[stroke-dashoffset] duration-150 ease-out"
        />
      </svg>

      {/* Modern Yukarı Ok İkonu */}
      <ArrowUp
        size={19}
        strokeWidth={2}
        className="relative z-10 transition-transform duration-300 group-hover:-translate-y-1"
      />
    </button>
  )
}
