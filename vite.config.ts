import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    target: "es2020",
    // Read by scripts/prerender.mjs to preload each page's chunk.
    manifest: true,
    rollupOptions: {
      output: {
        // Keep long-lived libraries in their own files so a copy change
        // does not invalidate them in visitors' caches.
        manualChunks(id) {
          if (!id.includes("node_modules")) return;
          if (/[\\/]node_modules[\\/](react|react-dom|react-router|react-router-dom|scheduler|@remix-run)[\\/]/.test(id)) {
            return "react";
          }
          if (/[\\/]node_modules[\\/](framer-motion|motion-dom|motion-utils)[\\/]/.test(id)) {
            return "motion";
          }
        },
      },
    },
  },
  ssr: {
    // Bundle these into the prerender build so Node does not have to resolve
    // their mixed CommonJS/ESM entry points at runtime.
    noExternal: ["recharts", "lucide-react", "framer-motion"],
  },
});
