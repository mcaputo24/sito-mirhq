import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        consulenzaPA: resolve(__dirname, 'consulenza-pa.html'),
        grazie: resolve(__dirname, 'grazie.html'),
      },
    },
  },
});
