import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  base: "https://data.irozhlas.cz/dzp/",
  plugins: [react()],
  build: {
    rollupOptions: {
      input: [
        "index.html",
        "graf1.html",
        "graf3.html",
        "graf2.html",
        "graf4.html",
        "graf5.html",
        "graf6.html",
        "graf7.html",
        "graf8.html",
        "graf9.html",
        "graf10.html",
        "graf11.html",
        "graf12.html",
        "potraviny.html",
        "potraviny-komodity.html",
        "potraviny-scatter.html",
      ],
    },
  },
});
