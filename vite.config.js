//import { defineConfig } from "vite";

//export default defineConfig({
//base: "/vite-crypto-exchange/",
//});

import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  base: "/vite-crypto-exchange/", // замініть на назву вашого GitHub репозиторію
  build: {
    outDir: "dist",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        dailyStats: resolve(__dirname, "dailyStats.html"),
        convertPage: resolve(__dirname, "convertPage.html"),
        // додайте інші HTML сторінки за необхідності
      },
    },
  },
});
