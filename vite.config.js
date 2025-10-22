import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
  ],

  // 👇 ADD THIS BLOCK HERE
  // server: {
  //   proxy: {
  //     '/api': {
  //       target: 'https://wedstimateapi.com', // your live API
  //       changeOrigin: true,
  //       secure: false,
  //       // rewrite: (path) => path.replace(/^\/api/, '/api/v1'), 
  //     },
  //   },
  // },
  // 👆 END OF NEW CODE

  optimizeDeps: {
    exclude: ['js-big-decimal'],
    include: ['react-chat-elements'],
  },
  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          'some-large-module': ['react'],
        },
      },
    },
  },
})
