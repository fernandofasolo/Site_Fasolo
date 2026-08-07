// @ts-check
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://fasolo.ia.br',
  trailingSlash: 'always',
  // Paginas internas ficam fora do sitemap (tambem tem noindex e Disallow no
  // robots.txt). Manter esta lista em sincronia com o public/robots.txt.
  integrations: [mdx(), sitemap({ filter: (page) => !page.includes('/esim-discord') })],
  vite: {
    plugins: [tailwindcss()],
  },
});
