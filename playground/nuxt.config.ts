export default defineNuxtConfig({
  modules: ['../src/module'],
  nuxtContentfulPages: {    
  },
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      contentful: {
        space: process.env.CONTENTFUL_SPACE_ID,
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
      },
    },
  },
})
