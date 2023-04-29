// https://nuxt.com/docs/api/configuration/nuxt-config
import NodePolyfillPlugin from "node-polyfill-webpack-plugin";

export default defineNuxtConfig({
  builder: "webpack",
  modules: ["@nuxtjs/tailwindcss", "@nuxtjs/color-mode", "@pinia/nuxt"],
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
