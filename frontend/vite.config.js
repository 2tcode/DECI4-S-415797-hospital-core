import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
require("dotenv").config({
  path: path.resolve(__dirname, "../.env"),
});

const PORT = process.env.VITE_API_URL;
const microPORT = process.env.VITE_MICRO_API_URL;

export default defineConfig({
  base: "./",
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: PORT,
        changeOrigin: true,
      },
      "/appointments": {
        target: microPORT,
        changeOrigin: true,
      },
    },
  },
});
