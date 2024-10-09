import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),  // Make sure this is correctly set
    },
  },
  base: '/', // Base URL of the application
  plugins: [vue()]
})
