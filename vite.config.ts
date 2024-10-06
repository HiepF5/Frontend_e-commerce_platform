import react from '@vitejs/plugin-react-swc'
import path from 'path'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000
  },
  css: {
    devSourcemap: true
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@routes': path.resolve(__dirname, './src/routes'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@constants': path.resolve(__dirname, './src/constants'),
      '@layouts': path.resolve(__dirname, './src/layouts'),
      '@redux': path.resolve(__dirname, './src/redux'),
      '@plugin': path.resolve(__dirname, './src/plugin'),
      '@api': path.resolve(__dirname, './src/api'),
      '@css': path.resolve(__dirname, './src/assets/css'),
      '@helper': path.resolve(__dirname, './src/helper'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@middleware': path.resolve(__dirname, './src/middleware'),
      '@type': path.resolve(__dirname, './src/type'),
      '@features': path.resolve(__dirname, './src/features'),
      '@shared': path.resolve(__dirname, './src/shared'),
    }
  }
})
