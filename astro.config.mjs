// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import compress from 'astro-compress';
import gorselVaryant from './scripts/gorsel-varyant.mjs';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.eymenreklam.com.tr',
  trailingSlash: 'always',
  server: { port: 4321 },
  integrations: [
    gorselVaryant(),   // public/images → -240/-480/-800/-1200 varyantları + src/lib/gorsel-manifest.json
    sitemap(),
    compress({
      Image: false,   // görseller zaten WebP; boyut varyantları scripts/gorsel-varyant.mjs üretiyor
      CSS: true,
      HTML: true,
      JavaScript: true,
      SVG: true,
    }),
  ],
  i18n: {
    defaultLocale: 'tr',
    locales: ['tr'],
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
