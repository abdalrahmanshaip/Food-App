import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    rollupOptions: {
      external: ["@fortawesome/fontawesome-free/css/all.min.css"],
    },
  },
  plugins: [react()],
  base: "/Food-App/",
});
