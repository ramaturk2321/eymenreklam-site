// ============================================================
// i18n yardımcıları
// Kural: sayfa dosyaları yol string'i ELLE yazmaz, yol()/hizmetYolu()/
// projeYolu() çağırır. Böylece trailing slash ve dil ön eki tek yerden gelir.
// ============================================================
import { DILLER, DIL_BILGISI, VARSAYILAN_DIL, YAYINDAKI_DILLER, YOLLAR, HIZMET_SLUG } from './diller';
import type { Dil, YolAnahtari } from './diller';
import { tr } from './tr';
import { en } from './en';
import { ar } from './ar';
import type { Sozluk } from './tr';

export * from './diller';
export type { Sozluk };

const SOZLUKLER: Record<Dil, Sozluk> = { tr, en, ar };

/** Dil koduna göre sözlük. */
export function sozluk(dil: Dil): Sozluk {
  return SOZLUKLER[dil];
}

/** URL yolundan dili çıkarır — /en/... → 'en', /ar/... → 'ar', diğer her şey 'tr'. */
export function dilBul(url: URL | string): Dil {
  const yol = typeof url === 'string' ? url : url.pathname;
  const ilk = yol.split('/').filter(Boolean)[0];
  return (DILLER as readonly string[]).includes(ilk ?? '') && ilk !== VARSAYILAN_DIL
    ? (ilk as Dil)
    : VARSAYILAN_DIL;
}

/** Sayfa anahtarının o dildeki tam yolu. Sonu her zaman "/" ile biter. */
export function yol(dil: Dil, anahtar: YolAnahtari): string {
  return DIL_BILGISI[dil].onek + YOLLAR[anahtar][dil];
}

/**
 * Hizmet detay sayfasının yolu.
 * @param trSlug src/content/hizmetler/*.json dosya adı (örn. "uv-baski")
 */
export function hizmetYolu(dil: Dil, trSlug: string): string {
  const slug = dil === 'tr' ? trSlug : (HIZMET_SLUG[trSlug]?.[dil] ?? trSlug);
  return `${yol(dil, 'hizmetler')}${slug}/`;
}

/** Proje detay yolu — proje slug'ları marka adı taşıdığı için dillere göre değişmez. */
export function projeYolu(dil: Dil, slug: string): string {
  return `${yol(dil, 'projeler')}${slug}/`;
}

export interface SayfaKimligi {
  anahtar: YolAnahtari;
  /** Hizmet/proje detay sayfalarında TR slug */
  slug?: string;
  tur?: 'hizmet' | 'proje';
}

/**
 * Bir sayfanın tüm dillerdeki karşılıkları — hem hreflang etiketleri
 * hem de dil değiştirici bunu kullanır.
 * Sayfa yalnızca Türkçe yayınlanıyorsa (ürün, blog) çağrılmaz.
 */
export function dilAlternatifleri(
  kimlik: SayfaKimligi,
  diller: readonly Dil[] = YAYINDAKI_DILLER,
): { dil: Dil; href: string; hreflang: string; ad: string; kisa: string }[] {
  return diller.map((d) => {
    let href: string;
    if (kimlik.tur === 'hizmet' && kimlik.slug) href = hizmetYolu(d, kimlik.slug);
    else if (kimlik.tur === 'proje' && kimlik.slug) href = projeYolu(d, kimlik.slug);
    else href = yol(d, kimlik.anahtar);
    return {
      dil: d,
      href,
      hreflang: DIL_BILGISI[d].hreflang,
      ad: DIL_BILGISI[d].ad,
      kisa: DIL_BILGISI[d].kisa,
    };
  });
}

/** WhatsApp bağlantısı — mesaj dile göre seçilir. */
export function whatsappUrl(dil: Dil, mesaj?: string): string {
  const s = sozluk(dil);
  return `https://wa.me/905455491162?text=${encodeURIComponent(mesaj || s.whatsapp.varsayilan)}`;
}
