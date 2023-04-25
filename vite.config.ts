import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  base: "https://data.irozhlas.cz/dzp/",
  plugins: [react()],
  build: {
    rollupOptions: {
      input: ["index.html", "graf1.html", "graf2.html", "graf4.html"],
    },
  },
});
