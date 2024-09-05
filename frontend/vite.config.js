import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/', // Ensure base path is correct for deployment
  build: {
    chunkSizeWarningLimit: 1000, // Increase chunk size warning limit if needed
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Bundle libraries from node_modules into separate chunks
          if (id.includes('node_modules')) {
            if (id.includes('react')) {
              return 'vendor-react'; // Separate React into its own chunk
            }
            if (id.includes('lodash')) {
              return 'vendor-lodash'; // Separate Lodash into its own chunk
            }
            // Add more specific cases if necessary
            if (id.includes('some-large-library')) {
              return 'vendor-large-lib'; // Example for large libraries
            }
            // Default for other node_modules
            return 'vendor-other'; 
          }
        }
      }
    }
  }
});
