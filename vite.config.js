import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://127.0.0.1:8091",
        changeOrigin: true,
      },
    },
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      "@/components": fileURLToPath(new URL("./src/components", import.meta.url)),
      "@/pages": fileURLToPath(new URL("./src/pages", import.meta.url)),
      "@/data": fileURLToPath(new URL("./src/data", import.meta.url)),
      "@/lib": fileURLToPath(new URL("./src/lib", import.meta.url)),
      "@/store": fileURLToPath(new URL("./src/store", import.meta.url)),
    },
    // Prefer editable source modules over generated JS siblings checked into src.
    extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
    dedupe: ["react", "react-dom"],
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          "three-core": ["three"],
          "three-r3f": ["@react-three/fiber", "@react-three/drei"],
          "map-bundle": ["maplibre-gl"],
          "pdf-bundle": ["jspdf"],
        },
      },
    },
  },
});
