// Responsive görsel varyantları — public/images altındaki her görsel için
// 240 / 480 / 800 / 1200 px genişliğinde WebP kopyalar üretir (foo.webp → foo-480.webp)
// ve src/lib/gorsel-manifest.json'a orijinal boyut + üretilen genişlikleri yazar.
//
// - Astro entegrasyonu olarak her `astro dev` / `astro build` başında çalışır (astro.config.mjs).
// - Elle: `npm run gorsel`. Temizlemek için: `npm run gorsel -- --temizle`
// - Varyantlar git'e girmez (.gitignore); manifest girer.
// - İdempotent: varyant varsa ve kaynaktan yeniyse atlar. 430 görsel için ilk üretim ~1 dk, sonrakiler saniyeler.
// - Kaynak dosyanın kendisi değiştirilmez. Kaynaktan geniş varyant üretilmez (upscale yok).
// - Kapsam dışı: public/promosyon (flipbook kendi boyutlarını taşıyor), public/images/belgeler hariç tutulmaz.

import { promises as fs } from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

export const GENISLIKLER = [240, 480, 800, 1200];
const KALITE = 78;
const KOK = path.resolve('public/images');
const MANIFEST = path.resolve('src/lib/gorsel-manifest.json');
const UZANTI = /\.(webp|jpe?g|png)$/i;
const VARYANT_ADI = /-(240|480|800|1200)\.webp$/;

async function dosyalar(dizin) {
  const out = [];
  for (const e of await fs.readdir(dizin, { withFileTypes: true })) {
    const p = path.join(dizin, e.name);
    if (e.isDirectory()) out.push(...(await dosyalar(p)));
    else if (UZANTI.test(e.name) && !VARYANT_ADI.test(e.name)) out.push(p);
  }
  return out;
}

function varyantYolu(kaynak, w) {
  const { dir, name } = path.parse(kaynak);
  return path.join(dir, `${name}-${w}.webp`);
}

export async function uret(log = console.log) {
  const t0 = Date.now();
  const kaynaklar = await dosyalar(KOK);
  const manifest = {};
  let uretilen = 0, atlanan = 0;

  // 4 paralel iş: Sharp zaten çok çekirdekli, daha fazlası RAM'i şişiriyor
  const kuyruk = [...kaynaklar];
  async function isci() {
    while (kuyruk.length) {
      const kaynak = kuyruk.shift();
      const meta = await sharp(kaynak).metadata();
      const w0 = meta.width, h0 = meta.height;
      const kaynakStat = await fs.stat(kaynak);
      const uretilenler = [];
      for (const w of GENISLIKLER) {
        if (w >= w0) continue; // upscale yok
        const hedef = varyantYolu(kaynak, w);
        let var_ = false;
        try {
          const s = await fs.stat(hedef);
          var_ = s.mtimeMs >= kaynakStat.mtimeMs;
        } catch {}
        if (!var_) {
          await sharp(kaynak).resize({ width: w, withoutEnlargement: true }).webp({ quality: KALITE, effort: 4 }).toFile(hedef);
          uretilen++;
        } else atlanan++;
        uretilenler.push(w);
      }
      const url = '/' + path.relative(path.resolve('public'), kaynak).split(path.sep).join('/');
      manifest[url] = { w: w0, h: h0, v: uretilenler };
    }
  }
  await Promise.all(Array.from({ length: 4 }, isci));

  const sirali = Object.fromEntries(Object.keys(manifest).sort().map(k => [k, manifest[k]]));
  await fs.writeFile(MANIFEST, JSON.stringify(sirali, null, 0) + '\n');
  log(`[gorsel-varyant] ${kaynaklar.length} görsel · ${uretilen} varyant üretildi · ${atlanan} güncel · ${((Date.now() - t0) / 1000).toFixed(1)} sn`);
  return manifest;
}

export async function temizle() {
  let n = 0;
  async function gez(d) {
    for (const e of await fs.readdir(d, { withFileTypes: true })) {
      const p = path.join(d, e.name);
      if (e.isDirectory()) await gez(p);
      else if (VARYANT_ADI.test(e.name)) { await fs.unlink(p); n++; }
    }
  }
  await gez(KOK);
  console.log(`[gorsel-varyant] ${n} varyant silindi`);
}

/** Astro entegrasyonu: dev ve build öncesi varyantları ve manifesti günceller. */
export default function gorselVaryant() {
  return {
    name: 'gorsel-varyant',
    hooks: {
      'astro:config:setup': async ({ logger }) => {
        await uret((m) => logger.info(m));
      },
    },
  };
}

// Doğrudan çalıştırma: node scripts/gorsel-varyant.mjs [--temizle]
if (process.argv[1] && path.resolve(process.argv[1]) === new URL(import.meta.url).pathname) {
  if (process.argv.includes('--temizle')) await temizle();
  else await uret();
}
