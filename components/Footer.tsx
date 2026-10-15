'use client'

import React from 'react'
import Link from 'next/link'

export interface SocialItem {
  name: string
  handle: string
  href: string
  icon: React.ReactNode
}

const instagramIcon = (
  <svg viewBox="0 0 24 24" className="size-3.5 sm:size-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
)

const facebookIcon = (
  <svg viewBox="0 0 24 24" className="size-3.5 sm:size-4" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
)

const tiktokIcon = (
  <svg viewBox="0 0 24 24" className="size-3.5 sm:size-4" fill="currentColor">
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
  </svg>
)

const xIcon = (
  <svg viewBox="0 0 24 24" className="size-3.5 sm:size-4" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
)

const youtubeIcon = (
  <svg viewBox="0 0 24 24" className="size-4 sm:size-4.5" fill="currentColor">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
)

export const bambiSocialLinks: SocialItem[] = [
  {
    name: 'Instagram',
    handle: '@bambiyatakyenibati',
    href: 'https://www.instagram.com/bambiyatakyenibati/',
    icon: instagramIcon,
  },
  {
    name: 'Facebook',
    handle: '@bambiyatakyenibati',
    href: 'https://www.facebook.com/bambiyatakyenibati/',
    icon: facebookIcon,
  },
  {
    name: 'TikTok',
    handle: '@bambiyatakyenibati',
    href: 'https://www.tiktok.com/@bambiyatakyenibati',
    icon: tiktokIcon,
  },
  {
    name: 'X (Twitter)',
    handle: '@bambiyatakyenib',
    href: 'https://x.com/bambiyatakyenib',
    icon: xIcon,
  },
  {
    name: 'YouTube',
    handle: '@bambiyatakyenibati',
    href: 'https://www.youtube.com/@bambiyatakyenibati',
    icon: youtubeIcon,
  },
]

export const perdeSocialLinks: SocialItem[] = [
  {
    name: 'Instagram',
    handle: '@gurbuzlergrupperde',
    href: 'https://www.instagram.com/gurbuzlergrupperde/',
    icon: instagramIcon,
  },
  {
    name: 'Facebook',
    handle: '@GürbüzlerGrupPerde',
    href: 'https://www.facebook.com/GurbuzlerGrupPerde/',
    icon: facebookIcon,
  },
  {
    name: 'TikTok',
    handle: '@gurbuzlergrupperde',
    href: 'https://www.tiktok.com/@gurbuzlergrupperde',
    icon: tiktokIcon,
  },
  {
    name: 'X (Twitter)',
    handle: '@gurbuzlerperde',
    href: 'https://x.com/gurbuzlerperde',
    icon: xIcon,
  },
  {
    name: 'YouTube',
    handle: '@GürbüzlerGrupPerde',
    href: 'https://www.youtube.com/@GurbuzlerGrupPerde',
    icon: youtubeIcon,
  },
]

// Geriye dönük uyumluluk
export const socialLinks = bambiSocialLinks

export function Footer() {
  return (
    <footer className="border-t border-[#bdbbb4] bg-[#eeece7] px-4 py-8 text-xs text-[#6a6862] sm:px-6 md:px-12 2xl:px-24">
      <div className="mx-auto max-w-[1920px]">
        {/* Üst Kısım: Sosyal Medya Grupları ve Merkez Logo (Tam Ortalanmış & Büyütülmüş) */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:items-center pb-8 border-b border-[#bdbbb4]/60">
          {/* Sol: Bambi Yatak Sosyal Medya */}
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-2.5 sm:gap-4 order-2 lg:order-1">
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#8a6e50] shrink-0">
              Bambi Yatak:
            </span>
            <div className="flex items-center gap-2">
              {bambiSocialLinks.map((item) => (
                <a
                  key={`bambi-${item.name}`}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Bambi Yatak ${item.name}`}
                  title={`Bambi Yatak ${item.name}: ${item.handle}`}
                  className="group grid size-8 place-items-center rounded-full border border-[#bdbbb4] bg-white/70 text-[#292825] shadow-xs transition-all duration-300 hover:border-[#171717] hover:bg-[#171717] hover:text-white hover:scale-110 cursor-pointer"
                >
                  {item.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Orta: Resmî Gürbüzler Grup & Bambi & Perde Logo (Tam Matematiksel Merkez) */}
          <div className="flex items-center justify-center order-1 lg:order-2 py-2">
            <Link href="/" className="transition-transform duration-300 hover:scale-105 inline-block" title="Gürbüzler Grup">
              <img
                src="/logo-gurbuzler-grup.png"
                alt="Gürbüzler Grup - Bambi Yatak Sanatı & Gürbüz Perde Sanatı"
                className="h-24 sm:h-28 md:h-32 w-auto object-contain"
              />
            </Link>
          </div>

          {/* Sağ: Gürbüzler Grup Perde Sosyal Medya */}
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-end gap-2.5 sm:gap-4 order-3">
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#8a6e50] shrink-0">
              Gürbüzler Grup Perde:
            </span>
            <div className="flex items-center gap-2">
              {perdeSocialLinks.map((item) => (
                <a
                  key={`perde-${item.name}`}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Gürbüzler Grup Perde ${item.name}`}
                  title={`Gürbüzler Grup Perde ${item.name}: ${item.handle}`}
                  className="group grid size-8 place-items-center rounded-full border border-[#bdbbb4] bg-white/70 text-[#292825] shadow-xs transition-all duration-300 hover:border-[#171717] hover:bg-[#171717] hover:text-white hover:scale-110 cursor-pointer"
                >
                  {item.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Alt Kısım: Telif ve Mağaza Bilgisi */}
        <div className="pt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between text-center sm:text-left text-[#6a6862]">
          <div>
            <span>© 2026 Gürbüzler Grup. Tüm hakları saklıdır.</span>
          </div>
          <div className="sm:text-right">
            <span>İstanbul Yolu / Yeni Batı Mağazası · Bambi Yatak & Gürbüzler Grup</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
