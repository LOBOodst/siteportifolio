import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  base: "/siteportifolio/",
  plugins: [react(), tailwindcss()],
  server: {
    port: 3000,
    open: false,
    host: true,
    watch: {
      ignored: [
        "**/three.js-master/**",
        "**/DreamCoreProject/**",
        "**/MecanicalGame/**",
        "**/TaticalRPG-main/**",
        "**/dist/**",
      ],
    },
  },
  optimizeDeps: {
    entries: ["index.html"],
    exclude: ["three.js-master"],
  },
  build: {
    outDir: "dist",
    sourcemap: false,
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules/three")) {
            return "vendor-three";
          }
          if (id.includes("node_modules/motion")) {
            return "vendor-motion";
          }
          if (id.includes("node_modules/lucide-react")) {
            return "vendor-icons";
          }
          if (
            id.includes("node_modules/react") ||
            id.includes("node_modules/react-dom")
          ) {
            return "vendor-react";
          }
        },
      },
    },
  },
});
