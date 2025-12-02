import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // 設置 base 為 './' 確保在 GitHub Pages 等子路徑部署時資源路徑正確
  base: './',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
});