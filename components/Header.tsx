'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, ArrowUpRight } from 'lucide-react'
import { bambiSocialLinks, perdeSocialLinks } from './Footer'

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const isHome = pathname === '/'

  // Mobil menü açıkken arkadaki sayfa kaymasını kilitle
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileMenuOpen])

  // Sayfa değiştiğinde mobil menüyü kapat
  useEffect(() => {
    setMobileMenuOpen(false)
  }, [pathname])

  const [currentHash, setCurrentHash] = useState('')

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCurrentHash(window.location.hash)
      const handleHashChange = () => setCurrentHash(window.location.hash)
      window.addEventListener('hashchange', handleHashChange)
      return () => window.removeEventListener('hashchange', handleHashChange)
    }
  }, [])

  const isBrandPage =
    pathname.startsWith('/mobilya-sanati') ||
    pathname.startsWith('/perde-sanati') ||
    pathname.startsWith('/dekorasyon-sanati')

  const isHomeActive = isHome && currentHash !== '#urunlerimiz' && currentHash !== '#markalar'
  const isUrunlerimizActive = isBrandPage || (isHome && (currentHash === '#urunlerimiz' || currentHash === '#markalar'))

  const handleHomeClick = (e: React.MouseEvent) => {
    setCurrentHash('#anasayfa')
    if (isHome) {
      e.preventDefault()
      const lenis = (window as unknown as { lenis?: { scrollTo: (target: number, opts?: { duration?: number }) => void } }).lenis
      if (lenis) {
        lenis.scrollTo(0, { duration: 0.9 })
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
      window.history.pushState(null, '', '#anasayfa')
    }
    setMobileMenuOpen(false)
  }

  const handleUrunlerimizClick = () => {
    setCurrentHash('#urunlerimiz')
    setMobileMenuOpen(false)
  }

  return (
    <>
      <header className="reveal relative z-50 w-full border-t border-[#243238] bg-[#eeece7] px-4 py-3 sm:px-6 sm:py-4 md:px-12 md:py-5 lg:px-16 2xl:px-24">
        <div className="mx-auto flex max-w-[1920px] items-center justify-between md:justify-center md:gap-12 lg:gap-16 2xl:gap-20">
          {/* Logo */}
          <Link
            href={isHome ? '#anasayfa' : '/'}
            onClick={handleHomeClick}
            aria-label="Gürbüzler Grup ana sayfa"
            className="block w-[115px] sm:w-[130px] md:w-[150px] lg:w-[165px] bg-transparent hover:bg-transparent focus:bg-transparent active:bg-transparent select-none transition-transform duration-300 shrink-0"
          >
            <img
              src="/logo-gg-bambi-gurbuz.png"
              alt="Gürbüzler Grup - Bambi & Gürbüz"
              className="block h-auto w-full bg-transparent hover:bg-transparent select-none"
            />
          </Link>

          {/* Masaüstü Navigasyon (Orijinal serbest yerleşim & Hardal rengi alt çizgi animasyonu) */}
          <nav
            aria-label="Ana navigasyon"
            className="hidden md:flex items-center gap-10 md:gap-14 lg:gap-16 2xl:gap-20 font-sans text-[15px] font-medium tracking-tight text-[#171717] lg:text-[17px] 2xl:text-[18px]"
          >
            {/* Anasayfa */}
            {isHome ? (
              <a
                href="#anasayfa"
                onClick={handleHomeClick}
                className={`group relative py-1 transition-colors duration-300 hover:text-[#8a6e50] cursor-pointer ${
                  isHomeActive ? 'text-[#8a6e50] font-semibold' : ''
                }`}
              >
                Anasayfa
                <span
                  className={`absolute -bottom-1 left-0 h-[2px] bg-[#8a6e50] transition-all duration-300 ease-out ${
                    isHomeActive ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
                />
              </a>
            ) : (
              <Link
                href="/"
                className="group relative py-1 transition-colors duration-300 hover:text-[#8a6e50] cursor-pointer"
              >
                Anasayfa
                <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-[#8a6e50] transition-all duration-300 ease-out group-hover:w-full" />
              </Link>
            )}

            {/* Ürünlerimiz */}
            {isHome ? (
              <a
                href="#urunlerimiz"
                onClick={handleUrunlerimizClick}
                className={`group relative py-1 transition-colors duration-300 hover:text-[#8a6e50] cursor-pointer ${
                  isUrunlerimizActive ? 'text-[#8a6e50] font-semibold' : ''
                }`}
              >
                Ürünlerimiz
                <span
                  className={`absolute -bottom-1 left-0 h-[2px] bg-[#8a6e50] transition-all duration-300 ease-out ${
                    isUrunlerimizActive ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
                />
              </a>
            ) : (
              <Link
                href="/#urunlerimiz"
                scroll={false}
                className={`group relative py-1 transition-colors duration-300 hover:text-[#8a6e50] cursor-pointer ${
                  isBrandPage ? 'text-[#8a6e50] font-semibold' : ''
                }`}
              >
                Ürünlerimiz
                <span
                  className={`absolute -bottom-1 left-0 h-[2px] bg-[#8a6e50] transition-all duration-300 ease-out ${
                    isBrandPage ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
                />
              </Link>
            )}

            {/* Hakkımızda */}
            <Link
              href="/hakkimizda"
              className={`group relative py-1 transition-colors duration-300 hover:text-[#8a6e50] cursor-pointer ${
                pathname === '/hakkimizda' ? 'text-[#8a6e50] font-semibold' : ''
              }`}
            >
              Hakkımızda
              <span
                className={`absolute -bottom-1 left-0 h-[2px] bg-[#8a6e50] transition-all duration-300 ease-out ${
                  pathname === '/hakkimizda' ? 'w-full' : 'w-0 group-hover:w-full'
                }`}
              />
            </Link>

            {/* İletişim */}
            <Link
              href="/iletisim"
              className={`group relative py-1 transition-colors duration-300 hover:text-[#8a6e50] cursor-pointer ${
                pathname === '/iletisim' ? 'text-[#8a6e50] font-semibold' : ''
              }`}
            >
              İletişim
              <span
                className={`absolute -bottom-1 left-0 h-[2px] bg-[#8a6e50] transition-all duration-300 ease-out ${
                  pathname === '/iletisim' ? 'w-full' : 'w-0 group-hover:w-full'
                }`}
              />
            </Link>
          </nav>

          {/* Mobilde Açılır Hamburger Menü Butonu (md altında) */}
          <div className="flex items-center md:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Menüyü kapat' : 'Menüyü aç'}
              className="grid size-10 place-items-center rounded-full border border-[#bdbbb4] bg-white/80 text-[#171717] shadow-sm backdrop-blur-sm transition-all duration-300 active:scale-95 cursor-pointer hover:bg-[#171717] hover:text-white"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobil Tam Ekran Açılır Menü (Drawer / Overlay) */}
      {mobileMenuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[100] flex flex-col justify-between overflow-y-auto bg-[#eeece7]/98 px-6 pt-6 pb-8 backdrop-blur-xl md:hidden animate-in fade-in duration-300"
        >
          {/* Üst Bar: Logo ve Kapat Butonu */}
          <div className="flex items-center justify-between border-b border-[#bdbbb4]/40 pb-4 shrink-0">
            <div className="w-[110px] bg-transparent">
              <img
                src="/logo-gg-bambi-gurbuz.png"
                alt="Gürbüzler Grup - Bambi & Gürbüz"
                className="h-auto w-full bg-transparent select-none"
              />
            </div>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Menüyü kapat"
              className="grid size-10 place-items-center rounded-full border border-[#bdbbb4] bg-white/90 text-[#171717] shadow-sm cursor-pointer transition hover:bg-[#171717] hover:text-white"
            >
              <X size={20} />
            </button>
          </div>

          {/* Menü Linkleri */}
          <nav className="my-auto flex flex-col items-center gap-5 py-6 text-center shrink-0">
            {isHome ? (
              <a
                href="#anasayfa"
                onClick={handleHomeClick}
                className="font-serif text-3xl font-light tracking-tight text-[#171717] transition hover:text-[#8a6e50]"
              >
                Anasayfa
              </a>
            ) : (
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className="font-serif text-3xl font-light tracking-tight text-[#171717] transition hover:text-[#8a6e50]"
              >
                Anasayfa
              </Link>
            )}

            {isHome ? (
              <a
                href="#urunlerimiz"
                onClick={handleUrunlerimizClick}
                className="font-serif text-3xl font-light tracking-tight text-[#171717] transition hover:text-[#8a6e50]"
              >
                Ürünlerimiz
              </a>
            ) : (
              <Link
                href="/#urunlerimiz"
                scroll={false}
                onClick={handleUrunlerimizClick}
                className="font-serif text-3xl font-light tracking-tight text-[#171717] transition hover:text-[#8a6e50]"
              >
                Ürünlerimiz
              </Link>
            )}

            <Link
              href="/hakkimizda"
              onClick={() => setMobileMenuOpen(false)}
              className={`font-serif text-3xl font-light tracking-tight text-[#171717] transition hover:text-[#8a6e50] ${
                pathname === '/hakkimizda' ? 'font-normal text-[#8a6e50]' : ''
              }`}
            >
              Hakkımızda
            </Link>

            <Link
              href="/iletisim"
              onClick={() => setMobileMenuOpen(false)}
              className={`font-serif text-3xl font-light tracking-tight text-[#171717] transition hover:text-[#8a6e50] ${
                pathname === '/iletisim' ? 'font-normal text-[#8a6e50]' : ''
              }`}
            >
              İletişim
            </Link>
          </nav>

          {/* Alt Kısım: Ayrıştırılmış Sosyal Medya ve Mağaza Bilgisi */}
          <div className="space-y-4 border-t border-[#bdbbb4]/40 pt-5 text-center shrink-0">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#6a6862]">
              Sosyal Medya Hesaplarımız
            </p>

            {/* Bambi Yatak */}
            <div>
              <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#8a6e50] block mb-2">
                Bambi Yatak
              </span>
              <div className="flex items-center justify-center gap-2.5">
                {bambiSocialLinks.map((item) => (
                  <a
                    key={`drawer-bambi-${item.name}`}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Bambi Yatak ${item.name}`}
                    title={`Bambi Yatak ${item.name}: ${item.handle}`}
                    className="grid size-9 place-items-center rounded-full border border-[#bdbbb4] bg-white/90 text-[#292825] shadow-xs transition-all duration-300 hover:border-[#171717] hover:bg-[#171717] hover:text-white hover:scale-105 cursor-pointer"
                  >
                    {item.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Gürbüzler Grup Perde */}
            <div className="pt-0.5">
              <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#8a6e50] block mb-2">
                Gürbüzler Grup Perde
              </span>
              <div className="flex items-center justify-center gap-2.5">
                {perdeSocialLinks.map((item) => (
                  <a
                    key={`drawer-perde-${item.name}`}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Gürbüzler Grup Perde ${item.name}`}
                    title={`Gürbüzler Grup Perde ${item.name}: ${item.handle}`}
                    className="grid size-9 place-items-center rounded-full border border-[#bdbbb4] bg-white/90 text-[#292825] shadow-xs transition-all duration-300 hover:border-[#171717] hover:bg-[#171717] hover:text-white hover:scale-105 cursor-pointer"
                  >
                    {item.icon}
                  </a>
                ))}
              </div>
            </div>

            <p className="text-[11px] text-[#6a6862] pt-1">
              İstanbul Yolu / Yeni Batı Mağazası · Bambi Yatak & Gürbüzler Grup
            </p>
          </div>
        </div>
      )}
    </>
  )
}
