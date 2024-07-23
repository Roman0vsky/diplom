import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

import { config } from "dotenv";
config();

const port = process.env.VITE_PORT || 5173;

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ["js-big-decimal"],
  },
  server: {
    port: +port,
  },
  preview: {
    port: +port,
  },
});
