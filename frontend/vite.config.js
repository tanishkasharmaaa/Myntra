import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 1000, // Set to a larger value to avoid warnings
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react')) {
              return 'vendor-react'; // React remains in its own chunk
            }
            if (id.includes('lodash')) {
              return 'vendor-lodash'; // Lodash remains in its own chunk
            }
            // Add more cases if needed
            if (id.includes('some-large-library')) {
              return 'vendor-large-lib'; // Example for very large libraries
            }
            return 'vendor-other'; // Default for other node_modules
          }
        }
      }
    }
  }
});
