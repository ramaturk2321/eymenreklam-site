// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import compress from 'astro-compress';
import gorselVaryant from './scripts/gorsel-varyant.mjs';
import sitemapLastmod from './scripts/sitemap-lastmod.mjs';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.eymenreklam.com.tr',
  trailingSlash: 'always',
  server: { port: 4321 },
  integrations: [
    gorselVaryant(),   // public/images → -240/-480/-800/-1200 varyantları + src/lib/gorsel-manifest.json
    sitemap({
      filter: (sayfa) => !sayfa.includes('/ara/'),   // arama sonuç sayfası dizine girmez
      // public/statik-hesap = Next.js ile derlenmiş hesap aracı; Astro sayfası olmadığı için elle eklenir
      customPages: [
        'https://www.eymenreklam.com.tr/statik-hesap/',
        'https://www.eymenreklam.com.tr/statik-hesap/yonlendirme/',
      ],
    }),
    compress({
      Exclude: [(dosya) => dosya.includes('statik-hesap')],   // Next.js ile derlenmiş hesap aracı; olduğu gibi yayınlanır
      Image: false,   // görseller zaten WebP; boyut varyantları scripts/gorsel-varyant.mjs üretiyor
      CSS: true,
      HTML: true,
      JavaScript: true,
      SVG: true,
    }),
    sitemapLastmod(),   // sitemap-0.xml'e <lastmod> — sitemap ve compress'ten SONRA çalışmalı
  ],
  i18n: {
    defaultLocale: 'tr',
    locales: ['tr', 'en', 'ar'],
    routing: {
      // TR kökte kalır (/), EN /en/ ve AR /ar/ altında yayınlanır.
      // Yol adları dile göre değiştiği için (/hizmetlerimiz/ ↔ /en/services/)
      // sayfalar elle oluşturulur; Astro yalnızca Astro.currentLocale'i sağlar.
      prefixDefaultLocale: false,
      redirectToDefaultLocale: false,
      fallbackType: 'rewrite',
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
