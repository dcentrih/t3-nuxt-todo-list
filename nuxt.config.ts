import { defineNuxtConfig } from "nuxt/config";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  srcDir: "src/",
  modules: ["@sidebase/nuxt-auth"],
  css: ["@mdi/font/css/materialdesignicons.css", "vuetify/styles"],
  build: {
    transpile: ["trpc-nuxt", "vuetify"],
  },
  typescript: {
    shim: false,
  },
});
