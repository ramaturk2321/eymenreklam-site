// Site haritasına <lastmod> ekler — her URL için sayfanın kaynak dosyasının son git commit tarihi.
//
// - Astro entegrasyonu; astro.config.mjs'de sitemap()'ten SONRA gelmeli (sitemap-0.xml yazılmış olmalı).
// - Kaynak eşlemesi: içerik dosyası (proje .md, ürün/hizmet .json, blog .md) varsa o; liste sayfalarında
//   sayfa dosyası + koleksiyon klasörü; diğer sayfalarda src/pages altındaki .astro dosyası.
//   Header/Footer/layout değişikliği tarihleri BİLEREK yansıtılmaz (her şablon dokunuşunda 216 sayfa "değişti" olmasın).
// - Commit'lenmemiş değişikliği olan kaynak → bugünün tarihi (yerelde build alıp sonra commit edilecek iş).
// - Tarihler src/lib/lastmod.json'a yazılır ve repoya girer. Git geçmişi sığ ise (Vercel sığ klonlar)
//   ya da git yoksa yeniden hesaplanmaz, repodaki dosya kullanılır → push'tan ÖNCE yerelde `npm run build` al.

import { promises as fs, existsSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import path from 'node:path';

const SITE = 'https://www.eymenreklam.com.tr';
const MANIFEST = path.resolve('src/lib/lastmod.json');

function git(args) {
  return execFileSync('git', args, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim();
}

function gitKullanilabilir() {
  try {
    return git(['rev-parse', '--is-shallow-repository']) === 'false';
  } catch {
    return false;
  }
}

/** URL yolu → kaynak dosya/klasör listesi (repo köküne göre). */
async function kaynaklar(yolu, distDir) {
  const parca = yolu.split('/').filter(Boolean);
  let dil = 'tr';
  if (parca[0] === 'en' || parca[0] === 'ar') dil = parca.shift();
  const altKlasor = dil === 'tr' ? '' : `${dil}/`;
  const var_ = (p) => existsSync(p);

  // Detay sayfaları
  if (parca.length === 2) {
    const [bolum, id] = parca;
    if (bolum === 'statik-hesap') return ['public/statik-hesap'];
    if (bolum === 'blog') return [`src/content/blog/${id}.md`];
    if (bolum === 'urunlerimiz') return [`src/content/urunler/${id}.json`];
    if (bolum === 'projelerimiz' || bolum === 'projects') return [`src/content/projeler/${altKlasor}${id}.md`];
    if (bolum === 'hizmetlerimiz') return [`src/content/hizmetler/${id}.json`];
    if (bolum === 'services') {
      // EN/AR hizmet slug'ı TR'den farklı → TR karşılığını sayfanın hreflang="tr" bağlantısından bul
      const html = await fs.readFile(path.join(distDir, yolu, 'index.html'), 'utf8').catch(() => '');
      const m = html.match(/hreflang="?tr"?\s+href="?[^"\s>]*\/hizmetlerimiz\/([^/"\s>]+)\//) ||
                html.match(/href="?[^"\s>]*\/hizmetlerimiz\/([^/"\s>]+)\/"?\s+hreflang="?tr"?/);
      if (m) return [`src/content/hizmetler/${altKlasor}${m[1]}.json`];
      return [`src/content/hizmetler/${altKlasor}`];
    }
  }

  // Liste (hub) sayfaları: sayfa dosyası + koleksiyon klasörü
  const hub = {
    projelerimiz: ['src/content/projeler'], projects: ['src/content/projeler'],
    hizmetlerimiz: ['src/content/hizmetler'], services: ['src/content/hizmetler'],
    urunlerimiz: ['src/content/urunler'], blog: ['src/content/blog'],
    'statik-hesap': ['public/statik-hesap'],
  };
  const sayfaKok = dil === 'tr' ? 'src/pages' : `src/pages/${dil}`;
  const ad = parca[0];
  const adaylar = ad
    ? [`${sayfaKok}/${ad}.astro`, `${sayfaKok}/${ad}/index.astro`]
    : [`${sayfaKok}/index.astro`];
  const sayfa = adaylar.filter(var_);
  return [...sayfa, ...(hub[ad] ?? [])];
}

function tarih(dosyalar) {
  const mevcut = dosyalar.filter((d) => existsSync(d));
  if (!mevcut.length) return null;
  if (git(['status', '--porcelain', '--', ...mevcut])) return new Date().toISOString().slice(0, 10);
  const t = git(['log', '-1', '--format=%cs', '--', ...mevcut]);
  return t || null;
}

export default function sitemapLastmod() {
  return {
    name: 'sitemap-lastmod',
    hooks: {
      'astro:build:done': async ({ dir, logger }) => {
        const distDir = dir.pathname;
        const xmlYolu = path.join(distDir, 'sitemap-0.xml');
        let xml;
        try {
          xml = await fs.readFile(xmlYolu, 'utf8');
        } catch {
          logger.warn('sitemap-0.xml bulunamadı, lastmod eklenmedi');
          return;
        }
        let manifest = {};
        try { manifest = JSON.parse(await fs.readFile(MANIFEST, 'utf8')); } catch {}

        const urller = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
        if (gitKullanilabilir()) {
          const yeni = {};
          for (const u of urller) {
            const yolu = u.replace(SITE, '');
            const t = tarih(await kaynaklar(yolu, distDir));
            if (t) yeni[yolu] = t;
          }
          const sirali = Object.fromEntries(Object.entries(yeni).sort(([a], [b]) => a.localeCompare(b)));
          await fs.writeFile(MANIFEST, JSON.stringify(sirali, null, 2) + '\n');
          manifest = sirali;
          logger.info(`lastmod: ${Object.keys(sirali).length}/${urller.length} URL git'ten hesaplandı → src/lib/lastmod.json`);
        } else {
          logger.info(`lastmod: git geçmişi sığ/yok — src/lib/lastmod.json kullanılıyor (${Object.keys(manifest).length} kayıt)`);
        }

        let eklenen = 0;
        xml = xml.replace(/<url><loc>([^<]+)<\/loc>/g, (tam, u) => {
          const t = manifest[u.replace(SITE, '')];
          if (!t) return tam;
          eklenen++;
          return `${tam}<lastmod>${t}</lastmod>`;
        });
        await fs.writeFile(xmlYolu, xml);
        logger.info(`lastmod: ${eklenen}/${urller.length} URL'ye eklendi`);
      },
    },
  };
}
