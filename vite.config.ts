import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // 設定 base 為儲存庫名稱 (請確保您的 GitHub Repository 名稱為 Niigata01)
  base: '/Niigata01/',
  build: {
    outDir: 'docs',
    assetsDir: 'assets',
  },
});