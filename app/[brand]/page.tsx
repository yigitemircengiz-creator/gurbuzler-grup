import Link from 'next/link'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { PerdeGallery } from '@/components/PerdeGallery'
import { MobilyaGallery } from '@/components/MobilyaGallery'
import { DekorasyonGallery } from '@/components/DekorasyonGallery'

const content = {
  'mobilya-sanati': {
    name: 'Mobilya Sanatı',
    title: 'Mobilya\nSanatı',
    intro: 'Yaşam alanlarınıza karakter kazandıran, el işçiliği ve çağdaş formun buluştuğu koleksiyonlar.',
    accent: '#e8e0d4',
    image: '/mobilya/mobilya-sanati-hero.png',
    items: ['Koleksiyonlar', 'Yatak Odası', 'Oturma Grupları', 'Projelerimiz'],
  },
  'perde-sanati': {
    name: 'Perde Sanatı',
    title: 'Perde\nSanatı',
    intro: 'Işığı yöneten, manzarayı çerçeveleyen ve her pencereye özel tasarlanan tekstil çözümleri.',
    accent: '#dce0dc',
    image: '/perde/perde-17.jpg',
    items: ['Koleksiyonlar', 'Tül & Fon', 'Motorlu Sistemler', 'Projelerimiz'],
  },
  'dekorasyon-sanati': {
    name: 'Dekorasyon Sanatı',
    title: 'Dekorasyon\nSanatı',
    intro: 'Mimariyi, malzemeyi ve hayatı aynı hikâyede buluşturan anahtar teslim mekanlar.',
    accent: '#e1eae4',
    image: '/dekorasyon/dekorasyon-sanati-hero.png',
    items: ['Yaklaşımımız', 'Konut Projeleri', 'Ticari Projeler', 'Projelerimiz'],
  },
} as const

export function generateStaticParams() {
  return Object.keys(content).map((brand) => ({ brand }))
}

export async function generateMetadata({ params }: { params: Promise<{ brand: string }> }) {
  const { brand } = await params
  const item = content[brand as keyof typeof content] ?? content['mobilya-sanati']
  return {
    title: item.name,
    description: item.intro,
  }
}

export default async function BrandPage({ params }: { params: Promise<{ brand: string }> }) {
  const { brand } = await params
  const item = content[brand as keyof typeof content] ?? content['mobilya-sanati']

  const isPerde = brand === 'perde-sanati'
  const isMobilya = brand === 'mobilya-sanati'
  const isDekorasyon = brand === 'dekorasyon-sanati'

  return (
    <main style={{ backgroundColor: item.accent }} className="min-h-screen text-[#171717]">
      {/* ÜST BAŞLIK / HEADER */}
      <Header />

      {/* HERO BÖLÜMÜ */}
      <section className="mx-auto max-w-[1920px] 2xl:max-w-[2200px] grid min-h-[calc(100vh-100px)] md:grid-cols-[.9fr_1.1fr]">
        <div className="flex flex-col justify-between px-4 sm:px-6 md:px-12 lg:px-16 2xl:px-24 pb-8 sm:pb-12 pt-6 md:pb-16 md:pt-8">
          <div className="reveal">
            <Link
              href="/?direct=1#urunlerimiz"
              className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-[#69665f] transition hover:text-[#171717]"
            >
              <ArrowLeft size={14} /> {item.name}
            </Link>
          </div>

          <div className="mt-8 sm:mt-12 md:mt-16">
            <h1 className="reveal delay-1 whitespace-pre-line font-serif text-[clamp(3.5rem,8vw,8.5rem)] font-light leading-[.85] tracking-[-.06em]">
              {item.title}
            </h1>
            <p className="reveal delay-2 mt-6 sm:mt-8 md:mt-10 max-w-md text-base sm:text-lg 2xl:text-xl leading-relaxed text-[#5c5952]">
              {item.intro}
            </p>
            <Link
              href="#projelerimiz"
              className="reveal delay-3 group mt-8 sm:mt-10 flex w-fit items-center gap-4 border-b border-[#8f8b83] pb-3 text-[10px] uppercase tracking-[.28em] transition-all hover:border-[#171717]"
            >
              <span>Projeleri İncele</span>
              <ArrowUpRight size={16} strokeWidth={1} className="transition duration-300 group-hover:rotate-45" />
            </Link>
          </div>
        </div>
        <div className="reveal delay-2 relative min-h-[45vh] sm:min-h-[50vh] md:min-h-full overflow-hidden">
          <img
            src={item.image}
            alt={item.name}
            className="absolute inset-0 size-full object-cover transition-transform duration-1000 ease-out hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/35 to-transparent" />
          <span className="absolute top-6 left-6 text-[10px] uppercase tracking-[.25em] text-white/80 md:top-8 md:left-10 hidden md:block">
            {item.name}
          </span>
          <span className="absolute bottom-8 left-6 text-[10px] uppercase tracking-[.25em] text-white/80 md:left-10">
            Ankara / Türkiye
          </span>
        </div>
      </section>

      {/* HER MARKA İÇİN KENDİ ÖZEL GALERİSİ */}
      {isPerde && <PerdeGallery />}
      {isMobilya && <MobilyaGallery />}
      {isDekorasyon && <DekorasyonGallery />}

      {/* Alt Telif ve Bilgi Çubuğu */}
      <Footer />
    </main>
  )
}

