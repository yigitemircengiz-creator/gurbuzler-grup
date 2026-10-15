import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Inter, Cormorant_Garamond, Outfit } from 'next/font/google'
import 'lenis/dist/lenis.css'
import './globals.css'
import { SmoothScroll } from '@/components/SmoothScroll'
import { ScrollToTop } from '@/components/ScrollToTop'

const inter = Inter({ subsets: ['latin', 'latin-ext'], variable: '--font-inter' })
const cormorant = Cormorant_Garamond({ subsets: ['latin', 'latin-ext'], variable: '--font-cormorant', weight: ['300', '400', '500', '600', '700'] })
const outfit = Outfit({ subsets: ['latin', 'latin-ext'], variable: '--font-outfit', weight: ['300', '400', '500', '600', '700'] })

export const metadata: Metadata = {
  title: {
    default: 'Gürbüzler Grup Bambi Yatak',
    template: '%s | Gürbüzler Grup Bambi Yatak',
  },
  description: 'Gürbüzler Grup Bambi Yatak - İstanbul Yolu Yeni Batı Mağazası. Mobilya, perde ve dekorasyon sanatında seçkin yaşam alanları.',
  icons: {
    icon: [
      { url: '/gg-logo.png?v=3', type: 'image/png' },
      { url: '/icon.svg?v=3', type: 'image/svg+xml' },
    ],
    shortcut: '/gg-logo.png?v=3',
    apple: '/gg-logo.png?v=3',
  },
}
export const viewport: Viewport = { colorScheme: 'light', themeColor: '#eeece7', width: 'device-width', initialScale: 1 }

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="tr">
      <body className={`${inter.variable} ${cormorant.variable} ${outfit.variable} antialiased`}>
        <SmoothScroll />
        <ScrollToTop />
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}

