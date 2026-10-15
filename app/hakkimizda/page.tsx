import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { MagazaGallery } from '@/components/MagazaGallery'

export const metadata = {
  title: 'Hakkımızda',
  description: 'Gürbüzler Grup Bambi Yatak İstanbul Yolu Yeni Batı Mağazası hakkında bilgiler ve mağaza görseli.',
}

export default function HakkimizdaPage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#eeece7] text-[#171717]">
      <Header />

      {/* HAKKIMIZDA BÖLÜMÜ */}
      <section className="px-4 py-12 sm:px-6 sm:py-16 md:px-12 md:py-20 lg:py-24 2xl:px-24 text-[#171717]">
        <div className="mx-auto max-w-7xl 2xl:max-w-[1700px]">
          {/* Üst Kısım: Solda Yeni Mağaza Görseli, Sağda Tanıtım Metni */}
          <div className="reveal grid items-center gap-10 md:gap-12 lg:grid-cols-12 lg:gap-14 2xl:gap-18">
            {/* Sol: Yeni Mağaza Görseli */}
            <div className="lg:col-span-6 xl:col-span-6 flex justify-center lg:justify-start lg:translate-x-5 xl:translate-x-7">
              <MagazaGallery />
            </div>

            {/* Sağ: Mağaza Tanıtım Metni */}
            <div className="lg:col-span-6 xl:col-span-6">
              <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.28em] text-[#8a6e50]">
                Hakkımızda
              </span>
              <h1 className="mt-3 font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[2.6rem] xl:text-[3.1rem] 2xl:text-6xl font-medium tracking-tight text-[#171717] leading-[1.18]">
                Gürbüzler Grup Bambi Yatak İstanbul Yolu Yeni Batı Mağazası
              </h1>

              <div className="mt-6 space-y-4 text-base sm:text-lg 2xl:text-xl font-light leading-relaxed text-[#595751]">
                <p>
                  2025 yılında yeni açılan mağazamızda Bambi Yatak ürünlerini, 20 yılı aşkın Gürbüzler Grup güvencesi ve tecrübesiyle hizmetinize sunmaktan mutluluk duyuyoruz.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Alt Telif ve Bilgi Çubuğu */}
      <Footer />
    </main>
  )
}
