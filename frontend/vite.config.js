import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/',  // Adjust the base URL if needed for deployment
  build: {
    sourcemap: true,  // Generate sourcemaps for easier debugging
    chunkSizeWarningLimit: 1000,  // Increase chunk size warning limit
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react')) {
              return 'vendor-react';  // Chunk for React
            }
            if (id.includes('lodash')) {
              return 'vendor-lodash';  // Chunk for Lodash
            }
            return 'vendor-other';  // Default chunk for other libraries
          }
        },
      },
    },
  },
});
