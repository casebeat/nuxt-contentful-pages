import { useFetch } from '#imports'
/**
 * Get entry from contentful by slug
 * @param contentType target ContentType of contentful entry
 * @returns
 */
export default async function useFetchContentfulEntryById<T>(entryId: string): Promise<T | null> {
 
  const query = `?entryId=${entryId}`

  const url = `/api/contentful${query}`

  const { data } = await useFetch(url)

  const entry = data.value

  if (!data) {
    return null
  }

  return entry as T
}
