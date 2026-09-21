// ============================================================
// Türkçe sözlük — ŞEKLİ BELİRLEYEN DOSYA
// en.ts ve ar.ts tiplerini buradan alır; buraya anahtar eklersen
// diğer iki dosyada da karşılığını yazmadan build geçmez.
// ============================================================

export const tr = {
  // ─── Gezinme ───
  nav: {
    hizmetler: 'Hizmetlerimiz',
    urunler: 'Ürünlerimiz',
    projeler: 'Projelerimiz',
    referanslar: 'Referanslarımız',
    hakkimizda: 'Hakkımızda',
    iletisim: 'İletişim',
    kurumsal: 'Kurumsal Çözümler',
    blog: 'Blog',
    teklifAl: 'Kurumsal Teklif Al',
    tumHizmetler: 'Tüm Hizmetleri Görüntüle',
    tumUrunler: 'Tüm Ürünleri Görüntüle',
    anaSayfa: 'Ana Sayfa',
    menu: 'Menü',
    ara: 'Ara',
    aramaEtiket: 'Ürün veya hizmet ara',
    aramaYerTutucu: 'Arama',
    icerigeGec: 'İçeriğe geç',
    dilSec: 'Dil seçimi',
  },

  // ─── Footer ───
  footer: {
    firmaOzet:
      "2000'den beri İstanbul Pendik'te müşterilerimizle birlikte üretiyoruz: tabela imalatı, UV baskı ve dijital baskı.",
    hizmetlerBaslik: 'HİZMETLERİMİZ',
    firmaBaslik: 'FİRMA',
    iletisimBaslik: 'İLETİŞİM',
    uzmanlikBaslik: 'UZMANLIK SİTELERİMİZ',
    kurumsalSunum: 'Kurumsal Sunum (PDF)',
    gizlilik: 'Gizlilik & KVKK',
    cerez: 'Çerez Politikası',
    tecrube: 'Yıllık Üretim Tecrübesi',
  },

  // ─── Sık kullanılan ortak metinler ───
  ortak: {
    teklifAl: 'Teklif Al',
    ucretsizTeklif: 'Ücretsiz Teklif Alın',
    whatsappYaz: "WhatsApp'tan Yazın",
    bizeUlasin: 'Bize Ulaşın',
    hemenArayin: 'Hemen Arayın',
    devaminiOku: 'Devamını Oku',
    detayliBilgi: 'Detaylı Bilgi',
    tumunuGor: 'Tümünü Gör',
    sss: 'Sıkça Sorulan Sorular',
    surec: 'Çalışma Sürecimiz',
    sektorler: 'Hizmet Verdiğimiz Sektörler',
    galeri: 'Üretimden Kareler',
    ozellikler: 'Öne Çıkan Özellikler',
    urunler: 'Ürünler',
    tesis: 'Üretim Tesisimiz',
    fiyatFaktorleri: 'Fiyatı Belirleyen Etkenler',
    bolge: 'Hizmet Bölgemiz',
    ilgiliProjeler: 'İlgili Projeler',
    adres: 'Adres',
    telefon: 'Telefon',
    eposta: 'E-posta',
    calismaSaatleri: 'Çalışma Saatleri',
    kapali: 'Kapalı',
  },

  // ─── Form ───
  form: {
    adSoyad: 'Ad Soyad',
    firma: 'Firma Adı',
    telefon: 'Telefon',
    eposta: 'E-posta',
    konu: 'Konu',
    hizmet: 'Hizmet',
    mesaj: 'Mesaj',
    seciniz: 'Seçiniz',
    gonder: 'Gönder',
    gonderiliyor: 'Gönderiliyor...',
    basarili: 'Mesajınız bize ulaştı. En kısa sürede dönüş yapacağız.',
    hata: 'Gönderilemedi. Lütfen tekrar deneyin veya bizi arayın.',
    zorunlu: 'Zorunlu alan',
    gizlilikNotu: 'Bilgileriniz yalnızca teklif hazırlamak için kullanılır, üçüncü kişilerle paylaşılmaz.',
  },

  // ─── SEO / meta ───
  seo: {
    katalogAdi: 'Reklam ve Baskı Hizmetleri',
    isletmeAciklamasi:
      'İstanbul Pendik\'te tabela imalatı, UV baskı, dijital baskı, folyo giydirme ve mağaza reklam uygulamaları. 2000\'den beri kendi tesisimizde üretiyoruz.',
    hizmetListesi: [
      'Tabela İmalatı',
      'UV Baskı',
      'Afiş Baskı',
      'Branda & Bez Baskı',
      'Dijital Baskı',
      'Folyo & Araç Giydirme',
      'Grafik Tasarım',
      'İş Güvenliği Levhaları',
      'Mağaza Reklam Uygulamaları',
      'Sunum & Stand',
    ],
    siteAdi: 'Eymen Reklam',
    varsayilanBaslik: 'Tabela İmalatı & UV Baskı — Pendik İstanbul',
    varsayilanAciklama:
      'Eymen Reklam — Tabela İmalatı & UV Baskı Pendik İstanbul. 25 yıllık üretim tecrübesi.',
  },

  // ─── WhatsApp şablon mesajları ───
  // ─── Hizmet detay sayfası ───
  hizmetSayfa: {
    teklifFormu: 'Teklif formunu doldur',
    ustBaslik: 'EYMEN REKLAM HİZMETLERİ',
    tesisUstBaslik: 'ÜRETİM TESİSİ',
    uretimAlt: (baslik: string, i: number) => `${baslik} - Üretim ${i}`,
    islerimizden: (baslik: string) => `${baslik} İşlerimizden`,
    galeriAciklama:
      'Aşağıdaki fotoğrafların tamamı kendi tesisimizde ürettiğimiz ve sahada uyguladığımız işlerden. Bağlantılı olanlar proje sayfasına gider.',
    tumProjeler: 'Tüm projelerimiz',
    nedenBiz: 'Neden Eymen Reklam?',
    nedenBizAciklama: (yil: number) =>
      `${yil} yıllık deneyimle kurumsal müşterilerimize sunduğumuz avantajlar.`,
    surecUstBaslik: 'ÇALIŞMA SÜRECİMİZ',
    surecBaslik: 'Keşiften Montaja',
    markalarBaslik: (baslik: string) => `${baslik} Yaptığımız Markalar`,
    markalarAciklama:
      'Aşağıdaki markalar için bu hizmeti ürettik ve yerinde uyguladık. Fotoğraflı olanlar proje sayfasına gider.',
    tumReferanslar: 'Tüm referanslarımız',
    fiyatUstBaslik: 'FİYATLANDIRMA',
    fiyatBaslik: (baslik: string) => `${baslik} Fiyatını Ne Belirler?`,
    fiyatAciklama:
      'Her iş ölçüsüne ve malzemesine göre hesaplanır; bu yüzden liste fiyatı yayınlamıyoruz. Aşağıdaki bilgileri iletirseniz aynı gün net fiyat veriyoruz.',
    whatsappOlcu: "Ölçü ve malzemeyi WhatsApp'tan gönder",
    bolgeUstBaslik: 'HİZMET BÖLGESİ',
    kargo: 'Türkiye geneline kargo',
    ctaBaslik: 'Projeniz İçin Kurumsal Teklif Alın',
    ctaMetin:
      'Uzman ekibimiz projenizi yerinde inceler, 3D ön izleme hazırlar ve detaylı fiyat teklifi sunar. 24 saat içinde dönüş garantisi.',
    ctaForm: 'Kurumsal Teklif Formu',
  },

  // ─── Hizmetler liste sayfası ───
  hizmetlerSayfa: {
    ustBaslik: (yil: number) => `${yil} YILLIK UZMANLIK`,
    h1: 'Tabela İmalatı ve Reklam Hizmetleri',
    aciklama:
      "Pendik İstanbul'da tabela imalatından UV baskıya, araç giydirmeden dijital baskıya kadar kurumsal reklam ihtiyacınızı birlikte planlıyor, üretimden montaja tek elden yürütüyoruz.",
    seoBaslik: 'Reklam ve Tabela Hizmetleri Pendik',
    seoAciklama:
      "Pendik İstanbul'da tabela imalatı, UV baskı, araç giydirme, dijital baskı ve cephe giydirme.",
    ctaMetin: 'Projenizi birlikte inceleyelim: 3D ön izleme ve detaylı fiyat teklifiyle size dönelim.',
  },

  // ─── Proje sayfaları ───
  projeSayfa: {
    ustBaslik: 'SEÇİLMİŞ İŞLER',
    h1: 'Projelerimiz',
    aciklama: 'Tabela, mağaza uygulaması, fuar standı, cephe ve araç giydirme — kendi tesisimizde üretip kendi ekibimizle monte ettik.',
    seoBaslik: 'Projelerimiz — Tabela ve Reklam Uygulamaları',
    seoAciklama: 'Seçilmiş projeler: AVM tabelaları, mağaza uygulamaları, fuar standları, cephe giydirme, araç giydirme ve UV baskı.',
    hepsi: 'Tümü',
    digerProjeler: 'Diğer Projelerimiz',
    oncekiGorsel: 'Önceki',
    sonrakiGorsel: 'Sonraki',
    secki: '2000’den bu yana 10.000’den fazla iş tamamladık; bunlar bir seçki. İhtiyacınızı yazın, kendi sektörünüzden referans gönderelim.',
    ctaBaslik: 'Projeniz İçin Teklif Alın',
    ctaMetin: 'Keşfe geliyor, 3D ön izleme hazırlıyor ve 24 saat içinde detaylı teklif gönderiyoruz.',
  },

  whatsapp: {
    varsayilan: 'Merhaba, teklif almak istiyorum.',
    proje: 'Merhaba, proje teklifi almak istiyorum.',
    urun: (ad: string) => `Merhaba, ${ad} hakkında teklif almak istiyorum.`,
  },
};

export type Sozluk = typeof tr;
