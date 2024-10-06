import { useRoute, useAsyncData } from '#imports'

/**
 * Fetches an entry from Contentful by its slug.
 * @param contentType - The target ContentType of the Contentful entry.
 * @returns A promise that resolves to the Contentful entry data fetched by the given slug.
 */
export default async function useFetchContentfulEntryBySlugUntyped(contentType: string) {
  const route = useRoute()

  const routeSlugs = route.params.slug

  let slug = ''

  if (!routeSlugs) {
    slug = 'index'
  }
  else {
    Array.isArray(routeSlugs) ? slug = routeSlugs.join('/') : slug = routeSlugs.toString()
    slug = slug.replace(/\/$/, '')
  }

  const query = `?slug=${encodeURIComponent(slug)}&contentType=${contentType}`

  const url = `/api/contentful${query}`

  return useAsyncData(url, () => $fetch(url))
}
