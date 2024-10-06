import { useRoute, useAsyncData } from '#imports'
/**
 * Fetches a Contentful entry by its slug and content type.
 *
 * @template T The type of the Contentful entry to be returned.
 * @param {string} contentType - The target content type of the Contentful entry.
 * @param {string} [slug] - The slug of the Contentful entry. If not provided, the slug is derived from the route parameters.
 * @returns {Promise<T | null>} A promise that resolves to the fetched Contentful entry of type `T`, or `null` if not found.
 */
export default async function useFetchContentfulEntryBySlug<T>(contentType: string, slug: string = ''): Promise<T | null> {
  const route = useRoute()

  const routeSlugs = route.params.slug

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
