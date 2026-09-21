// ============================================================
// Eymen Reklam — Dil Tanımları ve Yol Haritası
// TR kökte (/), EN /en/ altında, AR /ar/ altında yayınlanır.
// Yeni bir sayfa eklerken ÖNCE buraya anahtarını yaz — yol()
// yalnızca burada tanımlı anahtarları üretir.
// ============================================================

export const DILLER = ['tr', 'en', 'ar'] as const;
export type Dil = (typeof DILLER)[number];

export const VARSAYILAN_DIL: Dil = 'tr';

/**
 * Canlıda YAYINDA olan diller. Bir dilin sayfaları tamamlanmadan buraya
 * eklenmez — dil değiştirici ve hreflang yalnızca bu listeyi kullanır,
 * aksi hâlde henüz var olmayan sayfalara link verilir.
 *   Faz 1 bitince → ['tr', 'en'] ; Faz 2 bitince → ['tr', 'en', 'ar']
 */
export const YAYINDAKI_DILLER: readonly Dil[] = ['tr', 'en'];

export interface DilBilgisi {
  kod: Dil;
  /** <html lang> değeri */
  htmlLang: string;
  /** og:locale değeri */
  ogLocale: string;
  /** hreflang değeri */
  hreflang: string;
  /** <html dir> değeri */
  dir: 'ltr' | 'rtl';
  /** Dil değiştiricide görünen ad (kendi dilinde) */
  ad: string;
  /** Dil değiştiricideki kısa etiket */
  kisa: string;
  /** URL ön eki — TR için boş */
  onek: string;
  /** JSON-LD availableLanguage */
  schemaDil: string;
}

export const DIL_BILGISI: Record<Dil, DilBilgisi> = {
  tr: {
    kod: 'tr',
    htmlLang: 'tr',
    ogLocale: 'tr_TR',
    hreflang: 'tr',
    dir: 'ltr',
    ad: 'Türkçe',
    kisa: 'TR',
    onek: '',
    schemaDil: 'Turkish',
  },
  en: {
    kod: 'en',
    htmlLang: 'en',
    ogLocale: 'en_US',
    hreflang: 'en',
    dir: 'ltr',
    ad: 'English',
    kisa: 'EN',
    onek: '/en',
    schemaDil: 'English',
  },
  ar: {
    kod: 'ar',
    htmlLang: 'ar',
    ogLocale: 'ar_AR',
    hreflang: 'ar',
    dir: 'rtl',
    ad: 'العربية',
    kisa: 'AR',
    onek: '/ar',
    schemaDil: 'Arabic',
  },
};

// ─── Sayfa anahtarı → dile göre yol parçası ───
// Değerler ön ek OLMADAN yazılır; yol() ön eki kendisi ekler.
// AR'da da latin harfli slug kullanıyoruz: Arapça URL'ler percent-encode
// edilince hem paylaşımda hem raporlarda okunmaz hâle geliyor.
export const YOLLAR = {
  ana:          { tr: '/',                    en: '/',                     ar: '/' },
  hizmetler:    { tr: '/hizmetlerimiz/',      en: '/services/',            ar: '/services/' },
  projeler:     { tr: '/projelerimiz/',       en: '/projects/',            ar: '/projects/' },
  referanslar:  { tr: '/referanslarimiz/',    en: '/references/',          ar: '/references/' },
  hakkimizda:   { tr: '/hakkimizda/',         en: '/about/',               ar: '/about/' },
  iletisim:     { tr: '/iletisim/',           en: '/contact/',             ar: '/contact/' },
  teklif:       { tr: '/teklif-al/',          en: '/get-a-quote/',         ar: '/get-a-quote/' },
  kurumsal:     { tr: '/kurumsal-cozumler/',  en: '/corporate-solutions/', ar: '/corporate-solutions/' },
  gizlilik:     { tr: '/gizlilik/',           en: '/privacy/',             ar: '/privacy/' },
  cerez:        { tr: '/cerez-politikasi/',   en: '/cookie-policy/',       ar: '/cookie-policy/' },
} as const;

export type YolAnahtari = keyof typeof YOLLAR;

// ─── Yalnızca Türkçe yayınlanan bölümler ───
// 56 ürün sayfası ve blog Türkçe yerel arama için var; EN/AR'da
// karşılıkları yok. Bu yollara EN/AR sayfalarından link VERİLMEZ.
export const SADECE_TR = {
  urunler: '/urunlerimiz/',
  blog: '/blog/',
  istanbulBranda: '/istanbul-branda-baski/',
  anadoluUv: '/anadolu-yakasi-uv-baski/',
  promosyon: '/promosyon/',
} as const;

// ─── Hizmet slug haritası (TR dosya adı → EN/AR slug) ───
// Anahtar = src/content/hizmetler/*.json dosya adı.
export const HIZMET_SLUG: Record<string, { en: string; ar: string }> = {
  'tabela':          { en: 'signage',            ar: 'signage' },
  'uv-baski':        { en: 'uv-printing',        ar: 'uv-printing' },
  'bez-baski':       { en: 'banner-printing',    ar: 'banner-printing' },
  'dijital-baski':   { en: 'digital-printing',   ar: 'digital-printing' },
  'afis-baski':      { en: 'poster-printing',    ar: 'poster-printing' },
  'folyo-giydirme':  { en: 'vehicle-wrapping',   ar: 'vehicle-wrapping' },
  'magaza-reklam':   { en: 'retail-branding',    ar: 'retail-branding' },
  'sunum-stand':     { en: 'displays-and-stands', ar: 'displays-and-stands' },
  'grafik-tasarim':  { en: 'graphic-design',     ar: 'graphic-design' },
  'is-guvenligi':    { en: 'safety-signage',     ar: 'safety-signage' },
};

/** EN/AR slug → TR slug (dil değiştiricide ters çeviri için) */
export const HIZMET_SLUG_TERS: Record<string, string> = Object.fromEntries(
  Object.entries(HIZMET_SLUG).map(([tr, m]) => [m.en, tr]),
);
