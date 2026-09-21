// ============================================================
// English dictionary
// Shape is enforced by Sozluk (src/i18n/tr.ts) — a missing key
// breaks the build, which is intentional.
// ============================================================
import type { Sozluk } from './tr';

export const en: Sozluk = {
  nav: {
    hizmetler: 'Services',
    urunler: 'Products',
    projeler: 'Projects',
    referanslar: 'Clients',
    hakkimizda: 'About Us',
    iletisim: 'Contact',
    kurumsal: 'Corporate Solutions',
    blog: 'Blog',
    teklifAl: 'Request a Quote',
    tumHizmetler: 'View All Services',
    tumUrunler: 'View All Products',
    anaSayfa: 'Home',
    menu: 'Menu',
    ara: 'Search',
    aramaEtiket: 'Search products or services',
    aramaYerTutucu: 'Search',
    icerigeGec: 'Skip to content',
    dilSec: 'Select language',
  },

  footer: {
    firmaOzet:
      'Manufacturing in Pendik, Istanbul since 2000: signage, UV printing and large-format digital printing.',
    hizmetlerBaslik: 'SERVICES',
    firmaBaslik: 'COMPANY',
    iletisimBaslik: 'CONTACT',
    uzmanlikBaslik: 'SPECIALIST SITES',
    kurumsalSunum: 'Company Profile (PDF)',
    gizlilik: 'Privacy Policy',
    cerez: 'Cookie Policy',
    tecrube: 'Years of Manufacturing Experience',
  },

  ortak: {
    teklifAl: 'Request a Quote',
    ucretsizTeklif: 'Get a Free Quote',
    whatsappYaz: 'Message Us on WhatsApp',
    bizeUlasin: 'Contact Us',
    hemenArayin: 'Call Us',
    devaminiOku: 'Read More',
    detayliBilgi: 'Learn More',
    tumunuGor: 'View All',
    sss: 'Frequently Asked Questions',
    surec: 'How We Work',
    sektorler: 'Sectors We Serve',
    galeri: 'From Our Workshop',
    ozellikler: 'Key Capabilities',
    urunler: 'Products',
    tesis: 'Our Facility',
    fiyatFaktorleri: 'What Determines the Price',
    bolge: 'Where We Work',
    ilgiliProjeler: 'Related Projects',
    adres: 'Address',
    telefon: 'Phone',
    eposta: 'Email',
    calismaSaatleri: 'Working Hours',
    kapali: 'Closed',
  },

  form: {
    adSoyad: 'Full Name',
    firma: 'Company',
    telefon: 'Phone',
    eposta: 'Email',
    konu: 'Subject',
    hizmet: 'Service',
    mesaj: 'Message',
    seciniz: 'Please select',
    gonder: 'Send',
    gonderiliyor: 'Sending...',
    basarili: 'Your message has reached us. We will get back to you shortly.',
    hata: 'Could not send. Please try again or call us directly.',
    zorunlu: 'Required field',
    gizlilikNotu: 'Your details are used only to prepare your quote and are never shared with third parties.',
  },

  seo: {
    katalogAdi: 'Signage and Printing Services',
    isletmeAciklamasi:
      'Signage manufacturing, UV printing, large-format digital printing, vehicle wrapping and retail branding in Pendik, Istanbul. Produced in our own facility since 2000.',
    hizmetListesi: [
      'Signage Manufacturing',
      'UV Printing',
      'Poster Printing',
      'Banner & Mesh Printing',
      'Large-Format Digital Printing',
      'Vinyl & Vehicle Wrapping',
      'Graphic Design',
      'Safety Signage',
      'Retail Branding',
      'Displays & Stands',
    ],
    siteAdi: 'Eymen Reklam',
    varsayilanBaslik: 'Signage Manufacturing & UV Printing — Istanbul, Turkey',
    varsayilanAciklama:
      'Eymen Reklam — signage manufacturing, UV printing and large-format digital printing in Istanbul. 25 years of in-house production.',
  },

  hizmetSayfa: {
    teklifFormu: 'Fill in the quote form',
    ustBaslik: 'EYMEN REKLAM SERVICES',
    tesisUstBaslik: 'OUR FACILITY',
    uretimAlt: (baslik: string, i: number) => `${baslik} - production ${i}`,
    islerimizden: (baslik: string) => `${baslik}: Work We Have Produced`,
    galeriAciklama:
      'Every photograph below is from work produced in our own facility and installed on site. Where a project page exists, the photo links to it.',
    tumProjeler: 'All our projects',
    nedenBiz: 'Why Eymen Reklam?',
    nedenBizAciklama: (yil: number) =>
      `What ${yil} years of in-house production means for our corporate clients.`,
    surecUstBaslik: 'HOW WE WORK',
    surecBaslik: 'From Site Survey to Installation',
    markalarBaslik: (baslik: string) => `Brands We Have Produced ${baslik} For`,
    markalarAciklama:
      'We produced and installed this service for the brands below. Those with photographs link to the project page.',
    tumReferanslar: 'All our clients',
    fiyatUstBaslik: 'PRICING',
    fiyatBaslik: (baslik: string) => `What Determines the Price of ${baslik}?`,
    fiyatAciklama:
      'Every job is calculated from its dimensions and materials, so we do not publish a price list. Send us the details below and we will quote the same day.',
    whatsappOlcu: 'Send dimensions and material via WhatsApp',
    bolgeUstBaslik: 'WHERE WE WORK',
    kargo: 'Shipping across Turkey',
    ctaBaslik: 'Request a Quote for Your Project',
    ctaMetin:
      'Our team surveys the site, prepares a 3D preview and sends a detailed quotation. We respond within 24 hours.',
    ctaForm: 'Quote Request Form',
  },

  hizmetlerSayfa: {
    ustBaslik: (yil: number) => `${yil} YEARS OF IN-HOUSE PRODUCTION`,
    h1: 'Signage Manufacturing and Printing Services',
    aciklama:
      'From signage manufacturing and UV printing to vehicle wrapping and large-format digital printing, we plan the work with you and carry it through from production to installation ourselves.',
    seoBaslik: 'Signage and Printing Services in Istanbul',
    seoAciklama:
      'Signage manufacturing, UV printing, vehicle wrapping, large-format digital printing and façade graphics in Istanbul.',
    ctaMetin: 'Send us your project and we will come back with a 3D preview and a detailed quotation.',
  },

  projeSayfa: {
    ustBaslik: 'SELECTED WORK',
    h1: 'Our Projects',
    aciklama: 'Signage, retail fit-outs, exhibition stands, façade and fleet wrapping — produced in our own facility and installed by our own team.',
    seoBaslik: 'Our Projects — Signage and Printing in Istanbul',
    seoAciklama: 'Selected projects: shopping centre signage, retail fit-outs, exhibition stands, façade wrapping, fleet wrapping and UV printing.',
    hepsi: 'All',
    digerProjeler: 'Other Projects',
    oncekiGorsel: 'Previous',
    sonrakiGorsel: 'Next',
    secki: 'These are a selection. We have completed more than 10,000 projects since 2000 — tell us what you need and we will send references from your own sector.',
    ctaBaslik: 'Request a Quote for Your Project',
    ctaMetin: 'We survey the site, prepare a 3D preview and send a detailed quotation within 24 hours.',
  },

  whatsapp: {
    varsayilan: 'Hello, I would like to request a quote.',
    proje: 'Hello, I would like to request a quote for a project.',
    urun: (ad: string) => `Hello, I would like a quote for ${ad}.`,
  },
};
