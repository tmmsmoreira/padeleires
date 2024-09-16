// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  routeRules: {
    // prerender index route by default
    '/': { prerender: true },
  },

  ssr: false,
  css: ['~/assets/base.css', '~/node_modules/@nordhealth/css/lib/nord.css'],

  runtimeConfig: {
    public: {
      APPWRITE_PROJECT_ID: process.env.APPWRITE_PROJECT_ID,
      APPWRITE_DATABASE_ID: process.env.APPWRITE_DATABASE_ID,
      APPWRITE_GIFT_CARD_COLLECTION_ID: process.env.APPWRITE_GIFT_CARD_COLLECTION_ID
    }
  },

  vite: {
    vue: {
      template: {
        compilerOptions: {
          // treat all tags with a dash as custom elements
          isCustomElement: (tag) => tag.includes('-')
        }
      }
    }
  },

  compatibilityDate: '2024-09-07',
  modules: ['@pinia/nuxt', '@nuxt/test-utils/module', 'nuxt-viewport'],
});