import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/React-Heruku-BaybaySalita/",
  server: {
    host: true, // use specific IP address
    port: 3000,
  },
});
