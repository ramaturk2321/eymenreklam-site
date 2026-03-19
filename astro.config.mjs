// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://eymenreklam.com',
  server: { port: 4321 },
  integrations: [sitemap()],
  i18n: {
    defaultLocale: 'tr',
    locales: ['tr'],
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
