import { useFetch, useRoute } from '#imports'
/**
 * Get entry from contentful by slug
 * @param contentType target ContentType of contentful entry
 * @returns
 */
export default async function useFetchContentfulEntryBySlug(slug: string, contentType: string) {
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

  const { data } = await useFetch(url)

  const entry = data.value

  return entry
}
