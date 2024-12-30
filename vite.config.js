import { defineConfig } from 'vite';
import { resolve } from 'path';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig({
  plugins: [
    viteStaticCopy({
      targets: [
        {
          src: './_redirects', // Path to your _redirects file
          dest: '.'            // Place it in the root of dist
        }
      ]
    })
  ],
});
