// Ürün kategorileri — content.config.ts şeması (z.enum) ve urunlerimiz.astro filtre eşlemesi bu listeden türetilir.
// Yeni kategori eklerken: buraya ekle + urunlerimiz.astro categoryMap'e filtre karşılığını yaz (yoksa build kırılır).
export const URUN_KATEGORILERI = [
  'Tabela',
  'Folyo & Giydirme',
  'UV Baskı',
  'Dijital Baskı',
  'Afiş Baskı',
  'Bez Baskı',
  'Bez & Afiş Baskı',
  'İş Güvenliği',
  'Display & Stand',
  'Mağaza Reklam',
] as const;
export type UrunKategori = (typeof URUN_KATEGORILERI)[number];
