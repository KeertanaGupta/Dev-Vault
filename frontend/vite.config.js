import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // --- ADD THIS 'server' BLOCK ---
  server: {
    proxy: {
      // This says "any request starting with /api"
      '/api': {
        // Should be proxied to your backend
        target: 'http://localhost:5000',
        // This is needed for the cookie to work
        changeOrigin: true,
      },
    },
  },
});