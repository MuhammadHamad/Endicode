import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
import faviconPlugin from "./vite.favicon.js";

export default defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    faviconPlugin(),
    ...(process.env.NODE_ENV !== "production" &&
    process.env.REPL_ID !== undefined
      ? [
          await import("@replit/vite-plugin-cartographer").then((m) =>
            m.cartographer(),
          ),
        ]
      : []),
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
    outDir: 'dist',
    assetsDir: 'assets',
    emptyOutDir: true,
  },
  server: {
    port: 5000,
    host: true,
    fs: {
      strict: true,
      allow: [
        // Allow serving files from the project root
        path.resolve(import.meta.dirname, 'public'),
      ],
    },
  },
  publicDir: path.resolve(import.meta.dirname, 'public'),
});
