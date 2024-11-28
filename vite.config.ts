import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/eapepe0.github.io/",
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
