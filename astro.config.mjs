import { defineConfig } from 'astro/config';
import { site } from './src/config.ts';

export default defineConfig({
  site: site.url,
  build: { inlineStylesheets: 'always' },
  compressHTML: true,
});
