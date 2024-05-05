import { defineNuxtModule, addComponentsDir, addServerHandler, addImportsDir, createResolver } from '@nuxt/kit'
import { defu } from 'defu'

// Module options TypeScript interface definition
export interface ModuleOptions {
  /**
   * Contentful Space ID
   * @default process.env.CONTENTFUL_SPACE_ID   
   * @type string
   * @docs https://www.contentful.com/help/find-space-id/
   */
  spaceId: string

  /**
   * Contentful Space ID
   * @default process.env.CONTENTFUL_ACCESS_TOKEN   
   * @type string
   * @docs https://www.contentful.com/developers/docs/references/authentication/
   */
  accessToken: string
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'nuxt-contentful-pages',
    configKey: 'nuxtContentfulPages',
  },
  // Default configuration options of the Nuxt module
  defaults: {
    spaceId: process.env.CONTENTFUL_SPACE_ID as string,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN as string,
  },
  setup(options: ModuleOptions, nuxt: any) {

        // Private runtimeConfig
        // nuxt.options.runtimeConfig.nuxtContentfulPages = defu(nuxt.options.runtimeConfig.nuxtContentfulPages, {
        //   accessToken: options.accessToken,
        //   spaceId: options.spaceId,
        // })

        
    const resolver = createResolver(import.meta.url)    
    
    addComponentsDir({
      path: resolver.resolve('runtime/components'),
    })

    addServerHandler({
      route: '/api/contentful',
      handler: resolver.resolve('runtime/server/api/contentful/index.get'),
    })

    addImportsDir(resolver.resolve('runtime/functions'))

    addImportsDir(resolver.resolve('runtime/composables'))
  },
})
