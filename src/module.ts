import { defineNuxtModule, addComponentsDir, addServerHandler, addImportsDir, createResolver } from '@nuxt/kit'
import { defu } from 'defu'

export { getContentfulEntries } from './runtime/functions/getContentfulEntries'
export { getContentfulEntryBySlug } from './runtime/functions/getContentfulEntryBySlug'
export { mapEntryFieldsToPage } from './runtime/functions/mapEntryFieldsToPage'
export { default as renderContent } from './runtime/functions/renderContent'

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

  /**
   * Internal hosts that will not get target="_blank" added to links
   * @default process.env.INTERNAL_HOSTS
   * @type string[]
   * @docs
   */
  internalHosts: string[]
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
    internalHosts: process.env.INTERNAL_HOSTS ? process.env.INTERNAL_HOSTS.split(',').map(host => host.trim()) : [],

  },
  setup(options: ModuleOptions, nuxt: any) {
    // Private runtimeConfig
    nuxt.options.runtimeConfig.nuxtContentfulPages = defu(nuxt.options.runtimeConfig.nuxtContentfulPages, {
      accessToken: options.accessToken,
      spaceId: options.spaceId,
      internalHosts: options.internalHosts,
    })

    const resolver = createResolver(import.meta.url)

    addComponentsDir({
      path: resolver.resolve('runtime/components'),
    })

    addServerHandler({
      route: '/api/contentful',
      handler: resolver.resolve('runtime/server/api/contentful/index.get'),
    })

    addServerHandler({
      route: '/api/ping',
      handler: resolver.resolve('runtime/server/api/contentful/ping.get'),
    })

    addImportsDir(resolver.resolve('runtime/functions'))

    addImportsDir(resolver.resolve('runtime/composables'))
  },
})
