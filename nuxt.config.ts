// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',

  devtools: { enabled: true },

  routeRules: {
    // prerender index route by default
    '/': { prerender: true },
  },
  
  modules: ['@nuxtjs/tailwindcss', 'shadcn-nuxt', 'nuxt-viewport', '@pinia/nuxt',],

  ssr: false,
  
  runtimeConfig: {
    public: {
      APPWRITE_PROJECT_ID: process.env.APPWRITE_PROJECT_ID,
      APPWRITE_DATABASE_ID: process.env.APPWRITE_DATABASE_ID,
      APPWRITE_GIFT_CARD_COLLECTION_ID: process.env.APPWRITE_GIFT_CARD_COLLECTION_ID
    }
  },
  
  shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: '',
    /**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
    componentDir: './components/ui'
  }
})