import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    host: '0.0.0.0', // Docker環境でアクセス可能にする
    port: 3000,
    strictPort: true,
    watch: {
      usePolling: true, // Dockerでのファイル監視を改善
    },
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
})