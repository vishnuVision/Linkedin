import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig({
  plugins: [
    react(), // React plugin for Vite
    viteStaticCopy({
      targets: [
        {
          src: './_redirects', // Path to your _redirects file
          dest: '.'            // Place it in the root of dist
        }
      ]
    })
  ],
  build: {
    outDir: 'dist', // Ensure the output directory is correctly specified
  },
});
