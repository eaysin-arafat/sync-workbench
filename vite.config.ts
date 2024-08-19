import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 4173,
  },
  preview: {
    host: true,
    port: 4173,
  },
  resolve: {
    alias: {
      "@": "/src",
    },
  },
});
