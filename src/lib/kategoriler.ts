// Ürün kategorileri — content.config.ts şeması (z.enum) ve urunlerimiz.astro filtre eşlemesi bu listeden türetilir.
// Yeni kategori eklerken: buraya ekle + urunlerimiz.astro categoryMap'e filtre karşılığını yaz (yoksa build kırılır).
export const URUN_KATEGORILERI = [
  'Tabela',
  'Folyo & Giydirme',
  'UV Baskı',
  'Dijital Baskı',
  'Afiş Baskı',
  'Branda & Bez Baskı',
  'İş Güvenliği',
  'Display & Stand',
  'Mağaza Reklam',
] as const;
export type UrunKategori = (typeof URUN_KATEGORILERI)[number];

/**
 * Proje kategorilerinin İngilizce karşılıkları.
 * Proje md'lerindeki `categories` alanı Türkçe kalır; EN sayfaları çeviriyi buradan okur.
 * Karşılığı olmayan bir kategori olduğu gibi basılır.
 */
export const PROJE_KATEGORI_EN: Record<string, string> = {
  'Tabela': 'Signage',
  'Mağaza Reklam': 'Retail Branding',
  'UV Baskı': 'UV Printing',
  'Dijital Baskı': 'Digital Printing',
  'Afiş Baskı': 'Poster Printing',
  'Bez Baskı': 'Banner Printing',
  'Branda & Bez Baskı': 'Banner & Mesh Printing',
  'Folyo & Giydirme': 'Vinyl & Wrapping',
  'Araç Giydirme': 'Vehicle Wrapping',
  'Cephe Giydirme': 'Façade Wrapping',
  'Dolap Kaplama': 'Cooler Wrapping',
  'Grafik Tasarım': 'Graphic Design',
  'Lightbox Pano': 'Lightbox Panels',
  'Sunum & Stand': 'Displays & Stands',
  'Display & Stand': 'Displays & Stands',
  'Yönlendirme Tabelası': 'Wayfinding Signage',
  'İş Güvenliği': 'Safety Signage',
};


/** Proje kategorilerinin Arapça karşılıkları. */
export const PROJE_KATEGORI_AR: Record<string, string> = {
  'Tabela': 'اللافتات',
  'Mağaza Reklam': 'تجهيز المتاجر',
  'UV Baskı': 'طباعة UV',
  'Dijital Baskı': 'الطباعة الرقمية',
  'Afiş Baskı': 'طباعة الملصقات',
  'Bez Baskı': 'طباعة البانر',
  'Branda & Bez Baskı': 'البانر والمش',
  'Folyo & Giydirme': 'الفينيل والتغليف',
  'Araç Giydirme': 'تغليف المركبات',
  'Cephe Giydirme': 'تغليف الواجهات',
  'Dolap Kaplama': 'تغليف الثلاجات',
  'Grafik Tasarım': 'التصميم الجرافيكي',
  'Lightbox Pano': 'اللوحات المضيئة',
  'Sunum & Stand': 'العرض والستاندات',
  'Display & Stand': 'العرض والستاندات',
  'Yönlendirme Tabelası': 'اللافتات الإرشادية',
  'İş Güvenliği': 'لافتات السلامة',
};

/** Kategori adını dile göre döndürür. */
export function kategoriAdi(kategori: string, lang: 'tr' | 'en' | 'ar'): string {
  if (lang === 'en') return PROJE_KATEGORI_EN[kategori] ?? kategori;
  if (lang === 'ar') return PROJE_KATEGORI_AR[kategori] ?? kategori;
  return kategori;
}
