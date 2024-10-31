import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "https://netflix-clone-i72g.onrender.com",
        changeOrigin: true,
        secure: false, // disable SSL verification
      },
    },
  },
});
