import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";


export default defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets"),
    },
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: '../dist/public',
    assetsDir: 'assets',
    emptyOutDir: true,
    rollupOptions: {
      output: {
        manualChunks: {
          'framer-motion': ['framer-motion'],
          recharts: ['recharts'],
          // No Radix chunk: forcing every Radix package into one chunk loaded
          // all of them on the homepage; Rollup bundles each with its route.
        },
      },
    },
  },
  server: {
    port: 5000,
    host: true,
    fs: {
      strict: true,
      allow: [
        // Allow serving files from the project root
        path.resolve(import.meta.dirname, 'public'),
        path.resolve(import.meta.dirname, 'client'),
      ],
    },
  },
  publicDir: path.resolve(import.meta.dirname, 'public'),
});
