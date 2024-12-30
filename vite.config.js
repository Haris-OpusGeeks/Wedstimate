import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// import visualizer from 'rollup-plugin-visualizer';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // visualizer({
    //   filename: './dist/stats.html',
    //   open: true,
    // }),
  ],
  optimizeDeps: {
    exclude: ['js-big-decimal'],
    include: ['react-chat-elements'],
  },
  build: {
    chunkSizeWarningLimit: 1000, // Adjust the limit as needed, in kB
    rollupOptions: {
      output: {
        manualChunks: {
          'some-large-module': ['react'],
        },
      },
    },
  },
})
