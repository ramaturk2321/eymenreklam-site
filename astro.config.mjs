// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import compress from 'astro-compress';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.eymenreklam.com.tr',
  server: { port: 4321 },
  integrations: [
    sitemap(),
    compress({
      Image: false,   // public/images zaten WebP, Sharp ile ayrıca işliyoruz
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
