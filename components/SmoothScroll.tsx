'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import Lenis from 'lenis'

export function SmoothScroll() {
  const pathname = usePathname()
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    // Çok hafif, doğal ve akıcı momentum scroll
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.2,
      infinite: false,
    })

    lenisRef.current = lenis
    ;(window as unknown as { lenis?: Lenis }).lenis = lenis

    let rafId: number
    function raf(time: number) {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }

    rafId = requestAnimationFrame(raf)

    // Aynı sayfadayken tıklanan çapa (# ve /#) linklerine kaydırma
    const handleAnchorClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('a')
      if (!target) return
      const href = target.getAttribute('href')
      if (!href) return

      if (href.startsWith('#') && href.length > 1) {
        const element = document.querySelector(href) as HTMLElement | null
        if (element) {
          e.preventDefault()
          const docTop = window.scrollY + element.getBoundingClientRect().top
          lenis.scrollTo(docTop, {
            duration: 0.8,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          })
          window.history.pushState(null, '', href)
        }
      } else if (href.startsWith('/#') && href.length > 2) {
        if (window.location.pathname === '/') {
          const hash = href.slice(1)
          const element = document.querySelector(hash) as HTMLElement | null
          if (element) {
            e.preventDefault()
            const docTop = window.scrollY + element.getBoundingClientRect().top
            lenis.scrollTo(docTop, {
              duration: 0.8,
              easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            })
            window.history.pushState(null, '', hash)
          }
        }
      }
    }

    document.addEventListener('click', handleAnchorClick)

    return () => {
      document.removeEventListener('click', handleAnchorClick)
      cancelAnimationFrame(rafId)
      lenis.destroy()
      lenisRef.current = null
      delete (window as unknown as { lenis?: Lenis }).lenis
    }
  }, [])

  // Sayfa değiştiğinde veya dışarıdan hash ile gelindiğinde:
  // direct=1 parametresi varsa HİÇBİR animasyon olmadan doğrudan o bölüme atlar (ör. marka sayfasındaki geri butonu).
  // Diğer tüm durumlarda ise (ör. menüdeki Ürünlerimiz vb.) akıcı ve pürüzsüz animasyonla kaydırır.
  useEffect(() => {
    const hash = window.location.hash
    const search = window.location.search
    const isDirect = search.includes('direct=1')

    if (!hash || hash.length <= 1) {
      if (lenisRef.current) {
        lenisRef.current.scrollTo(0, { immediate: true })
      }
      window.scrollTo(0, 0)
      return
    }

    if (isDirect) {
      let attempts = 0
      const jumpWithSubtleAnimation = () => {
        const target = document.querySelector(hash) as HTMLElement | null
        if (target) {
          const docTop = window.scrollY + target.getBoundingClientRect().top
          if (docTop > 100 || attempts > 10) {
            // Sayfanın en tepesinden değil, ürünler bölümünün sadece ~120px yukarısına konumlan
            const startPos = Math.max(docTop - 120, 0)
            window.scrollTo(0, startPos)

            // Ürünler bölümüne hafif, zarif bir fade-in / slide-up animasyonu ver
            target.classList.remove('direct-reveal-active')
            void target.offsetWidth
            target.classList.add('direct-reveal-active')

            if (lenisRef.current) {
              lenisRef.current.resize()
              // Kısa mesafeden çok tatlı, yumuşak bir mikro kaydırma ile tam yerine otursun
              lenisRef.current.scrollTo(target, {
                duration: 0.6,
                easing: (t) => Math.min(1, 1.001 - Math.pow(2, -8 * t)),
              })
            } else {
              target.scrollIntoView({ behavior: 'smooth' })
            }

            window.history.replaceState(null, '', `/${hash}`)
            return
          }
        }
        attempts++
        if (attempts <= 20) {
          requestAnimationFrame(jumpWithSubtleAnimation)
        }
      }

      jumpWithSubtleAnimation()
      return
    }

    // Sayfayı başlangıçta tepeye al
    window.scrollTo(0, 0)
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true })
    }

    let isCancelled = false
    let lastPos = -1
    let stableCount = 0
    let rafId: number

    const startScrollWhenReady = () => {
      if (isCancelled) return
      const target = document.querySelector(hash) as HTMLElement | null
      if (!target) {
        rafId = requestAnimationFrame(startScrollWhenReady)
        return
      }

      const pos = window.scrollY + target.getBoundingClientRect().top
      const minExpected = (hash === '#urunlerimiz' || hash === '#markalar') ? Math.max(window.innerHeight - 80, 600) : 100

      // Pozisyon beklenen minimuma ulaştı mı ve ardışık karelerde değişmedi mi?
      if (pos >= minExpected && Math.abs(pos - lastPos) < 1) {
        stableCount++
      } else {
        stableCount = 0
        lastPos = pos
      }

      // Layout 3 kare boyunca stabil kaldıysa tek seferde akıcı ve takılmasız kaydır
      if (stableCount >= 3) {
        if (lenisRef.current) {
          lenisRef.current.resize()
          lenisRef.current.scrollTo(target, {
            duration: 1.1,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          })
        } else {
          target.scrollIntoView({ behavior: 'smooth' })
        }
        return
      }

      rafId = requestAnimationFrame(startScrollWhenReady)
    }

    // İlk boyutu alması için 60ms bekle ve kontrol döngüsünü başlat
    const timer = setTimeout(() => {
      lenisRef.current?.resize()
      rafId = requestAnimationFrame(startScrollWhenReady)
    }, 60)

    // Kullanıcı tekerlekle müdahale ederse animasyonu iptal et
    const onUserTouch = () => {
      isCancelled = true
    }
    window.addEventListener('wheel', onUserTouch, { passive: true, once: true })
    window.addEventListener('touchmove', onUserTouch, { passive: true, once: true })

    return () => {
      isCancelled = true
      clearTimeout(timer)
      cancelAnimationFrame(rafId)
      window.removeEventListener('wheel', onUserTouch)
      window.removeEventListener('touchmove', onUserTouch)
    }
  }, [pathname])

  return null
}
