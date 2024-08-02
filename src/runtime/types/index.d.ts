declare module '@nuxt/schema' {
  interface PublicRuntimeConfig {
    nuxtContentfulPages: {
      spaceId: string
      accessToken: string
      internalHosts: Array<string>
    }
  }
}
