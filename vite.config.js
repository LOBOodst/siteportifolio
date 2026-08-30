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
  },
});
