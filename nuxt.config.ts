// https://nuxt.com/docs/api/configuration/nuxt-config
import NodePolyfillPlugin from "node-polyfill-webpack-plugin";
const dev = process.env.NODE_ENV !== "production";

export default defineNuxtConfig({
  hooks: {
    "webpack:config"(configs) {
      if (configs[0]) {
        // Set experiments.asyncWebAssembly to true
        configs[0].experiments = {
          ...configs[0].experiments,
          asyncWebAssembly: true,
        };
        // Set webassemblyModuleFilename in the output object
        configs[0].output = {
          ...configs[0].output,
          webassemblyModuleFilename:
            !process.client && !dev
              ? "../public/wasm/[modulehash].wasm"
              : "public/wasm/[modulehash].wasm",
        };
      }
    },
  },
  builder: "webpack",
  modules: ["@nuxtjs/tailwindcss", "@nuxtjs/color-mode", "@pinia/nuxt"],
  nitro: { experimental: { wasm: true } },
  colorMode: {
    preference: "system", // default theme
    dataValue: "theme", // activate data-theme in <html> tag
    classSuffix: "",
  },
  //https://web3auth.io/docs/troubleshooting/webpack-issues#vuejs
  webpack: {
    plugins: [new NodePolyfillPlugin()],
    optimization: {
      splitChunks: {
        chunks: "all",
      },
    },
  },

  build: {},
  pinia: {
    autoImports: [
      // automatically imports `defineStore`
      "defineStore", // import { defineStore } from 'pinia'
      ["defineStore", "definePiniaStore"], // import { defineStore as definePiniaStore } from 'pinia'
    ],
  },
});
