import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/",
  server: {
    host: true, // use specific IP address
    port: 3000,
  },
  build: {
    minify: "esbuild",
    esbuild: {
      drop: ["console", "debugger"], // Remove console logs and debugger statements
    },
    outDir: "dist",
    assetsDir: "assets",
    rollupOptions: {
      output: {},
    },
    chunkSizeWarningLimit: 1000, // You can customize this limit as per your needs
  },
});
