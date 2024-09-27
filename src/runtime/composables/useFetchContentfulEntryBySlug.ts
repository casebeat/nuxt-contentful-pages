// import { mapEntryFieldsToPage } from '../functions/mapEntryFieldsToPage'
import { useRoute } from '#imports'
/**
 * Get entry from contentful by slug
 * @param contentType target ContentType of contentful entry
 * @returns
 */
export default async function useFetchContentfulEntryBySlug<T>(contentType: string, slug: string = ''): Promise<T | null> {
  const route = useRoute()

  const routeSlugs = route.params.slug

  //  let slug = ''

  if (!routeSlugs) {
    slug = 'index'
  }
  else {
    Array.isArray(routeSlugs) ? slug = routeSlugs.join('/') : slug = routeSlugs.toString()
    slug = slug.replace(/\/$/, '')
  }

  const query = `?slug=${encodeURIComponent(slug)}&contentType=${contentType}`

  const url = `/api/contentful${query}`

  const entry = await $fetch(url)

  if (!entry) {
    return null
  }

  return entry as T
}
