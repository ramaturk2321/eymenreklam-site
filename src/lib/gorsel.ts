// Responsive görsel yardımcıları — scripts/gorsel-varyant.mjs'nin ürettiği manifesti okur.
//
// Kullanım (.astro):
//   import { srcset, boyut } from '../lib/gorsel';
//   <img src={img} srcset={srcset(img)} sizes="(min-width:1024px) 33vw, 100vw" {...boyut(img)} />
//
// - srcset(): manifestte olmayan bir yol için undefined döner → <img> srcset'siz basılır, site kırılmaz.
// - sizes vermeyi UNUTMA: sizes yoksa tarayıcı 100vw varsayar ve büyük varyantı çeker.
// - Galeride JS ile src değiştiriliyorsa srcset'i de değiştir (data-srcset ile taşı), yoksa eski srcset kazanır.

import manifest from './gorsel-manifest.json';

type Kayit = { w: number; h: number; v: number[] };
const M = manifest as Record<string, Kayit>;

function varyantUrl(src: string, w: number): string {
  const i = src.lastIndexOf('.');
  return `${src.slice(0, i)}-${w}.webp`;
}

/** `foo-480.webp 480w, foo-800.webp 800w, foo.webp 1400w` — orijinal her zaman en geniş aday. */
export function srcset(src: string | undefined): string | undefined {
  if (!src) return undefined;
  const k = M[src];
  if (!k) return undefined;
  const parts = k.v.map((w) => `${varyantUrl(src, w)} ${w}w`);
  parts.push(`${src} ${k.w}w`);
  return parts.join(', ');
}

/** Orijinal genişlik/yükseklik — width/height attribute'u için (CLS önlemi). */
export function boyut(src: string | undefined): { width?: number; height?: number } {
  const k = src ? M[src] : undefined;
  return k ? { width: k.w, height: k.h } : {};
}

/** Sık kullanılan sizes değerleri — grid'lerle eşleşir (max-w-7xl = 1280 px kap). */
export const SIZES = {
  tamGenislik: '100vw',
  // grid-cols-2 sm:3 lg:4 (ana sayfa galerisi, ilgili ürünler)
  kart4: '(min-width: 1280px) 300px, (min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw',
  // grid-cols-1 sm:2 lg:3 (projeler, hizmetler, blog alt grid)
  kart3: '(min-width: 1280px) 400px, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw',
  // grid-cols-1 sm:2 lg:3 xl:4 (ürün listesi)
  urunListe: '(min-width: 1280px) 300px, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw',
  // yan menülü proje listesi: 1 / sm:2 / xl:3
  projeListe: '(min-width: 1280px) 300px, (min-width: 640px) 50vw, 100vw',
  // iki sütunlu düzenin sol yarısı (galeri ana görseli, hakkımızda tesis)
  yariGenislik: '(min-width: 1024px) 600px, 100vw',
  kucukResim: '80px',
} as const;
