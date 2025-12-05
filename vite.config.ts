import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  const env = loadEnv(mode, (process as any).cwd(), '');

  return {
    plugins: [react()],
    define: {
      // Safely inject the API key into the client-side code
      'process.env.API_KEY': JSON.stringify(env.API_KEY || '')
    },
    build: {
      outDir: 'dist',
      sourcemap: false,
      rollupOptions: {
        // Treat @google/genai as external so it uses the CDN link from index.html
        // This prevents build errors if the package isn't installed in node_modules
        external: ['@google/genai']
      }
    }
  };
});