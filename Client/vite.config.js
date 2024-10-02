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
      output: {
        manualChunks(id) {
          // Split third-party dependencies into separate chunks
          if (id.includes("node_modules")) {
            return id
              .toString()
              .split("node_modules/")[1]
              .split("/")[0]
              .toString();
          }
          if (id.includes("node_modules")) {
            return "vendor"; // All node_modules go into a common "vendor" chunk
          }
          if (id.includes("src/components/common/")) {
            return "common"; // Commonly used components in the "common" chunk
          }
        },
      },
    },
    chunkSizeWarningLimit: 1000, // You can customize this limit as per your needs
  },
});
