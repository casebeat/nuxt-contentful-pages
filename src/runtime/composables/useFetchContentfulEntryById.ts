/**
 * Get entry from contentful by slug
 * @param contentType target ContentType of contentful entry
 * @returns
 */
export default async function useFetchContentfulEntryById<T>(entryId: string): Promise<T | null> {
  const query = `?entryId=${entryId}`

  const url = `/api/contentful${query}`

  const entry = await $fetch(url)

  if (!entry) {
    return null
  }

  return entry as T
}
