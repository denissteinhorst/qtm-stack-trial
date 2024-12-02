// https://nuxt.com/docs/api/configuration/nuxt-config
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  build: {
    transpile: ['vuetify'],
  },
  modules: [
    '@pinia/nuxt',
    'pinia-plugin-persistedstate/nuxt',
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }))
      })
    },
  ],
  plugins: [{ src: "~/plugins/highcharts.client.ts", mode: "client" }],
  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
      // @ts-expect-error
      compilerOptions: {
        // @ts-expect-error
        isCustomElement: (tag) => tag === 'highcharts',
      }
    },
  },
})