import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        consulenzaPA: resolve(__dirname, 'consulenza-pa.html'),
        consulenzaLibreria: resolve(__dirname, 'consulenza-libreria.html'),
        consulenzaEditoriale: resolve(__dirname, 'consulenza-editoriale.html'),
        grazie: resolve(__dirname, 'grazie.html'),
      },
    },
  },
});
