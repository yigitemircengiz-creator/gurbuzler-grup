import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

// İletişim mesajlarının iletileceği hedef numara: 0543 616 37 53
const TARGET_PHONE = '905436163753'

export async function GET() {
  return NextResponse.json({
    status: 'online',
    endpoint: '/api/iletisim',
    targetPhone: '0543 616 37 53',
    description: 'Gürbüzler Grup İletişim API Servisi Aktif',
  })
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, phone, email, message } = body

    if (!name?.trim() || !phone?.trim() || !message?.trim()) {
      return NextResponse.json(
        { error: 'Lütfen zorunlu alanları doldurunuz (Ad Soyad, Telefon, Mesaj).' },
        { status: 400 }
      )
    }

    // Türkiye saati ile formatlı tarih
    const tarih = new Date().toLocaleString('tr-TR', {
      timeZone: 'Europe/Istanbul',
      dateStyle: 'short',
      timeStyle: 'short',
    })

    // WhatsApp için şık ve düzenli hazır mesaj şablonu
    const formattedText = 
`🔔 *YENİ İLETİŞİM TALEBİ* 🔔
🏢 *Gürbüzler Grup Web Sitesi*
📅 *Tarih:* ${tarih}

👤 *Müşteri:* ${name.trim()}
📞 *Telefon:* ${phone.trim()}
✉️ *E-Posta:* ${email?.trim() || 'Belirtilmedi'}

💬 *Mesaj:*
"${message.trim()}"`

    // WhatsApp doğrudan mesaj gönderme URL'i
    const encodedMessage = encodeURIComponent(formattedText)
    const whatsappUrl = `https://wa.me/${TARGET_PHONE}?text=${encodedMessage}`

    // Sunucu logu (Console üzerinden anlık izleme & kayıt)
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
    console.log(`[YENİ İLETİŞİM FORMU -> 0543 616 37 53] ${tarih}`)
    console.log(`Müşteri: ${name} | Tel: ${phone} | E-posta: ${email}`)
    console.log(`Mesaj: ${message}`)
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')

    return NextResponse.json({
      success: true,
      message: 'Talebiniz başarıyla alındı.',
      targetPhone: '0543 616 37 53',
      whatsappUrl,
    })
  } catch (error) {
    console.error('API İletişim Hatası:', error)
    return NextResponse.json(
      { error: 'Sunucu hatası oluştu, lütfen doğrudan telefon veya WhatsApp ile iletişime geçiniz.' },
      { status: 500 }
    )
  }
}
