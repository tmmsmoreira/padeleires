// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',

  devtools: { enabled: true },

  routeRules: {
    // prerender index route by default
    '/': { prerender: true },
  },

  modules: [
    '@nuxtjs/tailwindcss',
    'shadcn-nuxt',
    'nuxt-viewport',
    '@pinia/nuxt',
    '@vee-validate/nuxt',
    '@nuxt/eslint'
  ],

  ssr: false,

  runtimeConfig: {
    public: {
      APPWRITE_PROJECT_ID: process.env.APPWRITE_PROJECT_ID,
      APPWRITE_DATABASE_ID: process.env.APPWRITE_DATABASE_ID,
      APPWRITE_PLAYERS_COLLECTION_ID: process.env.APPWRITE_PLAYERS_COLLECTION_ID,
      APPWRITE_COMPETITIONS_COLLECTION_ID: process.env.APPWRITE_COMPETITIONS_COLLECTION_ID,
      APPWRITE_LOCATIONS_COLLECTION_ID: process.env.APPWRITE_LOCATIONS_COLLECTION_ID,
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