import { useAsyncData } from '#imports'
/**
 * Fetches a Contentful entry by its entry ID.
 *
 * @template T The type of the Contentful entry to be returned.
 * @param {string} entryId - The ID of the Contentful entry to fetch.
 * @returns {Promise<T | null>} A promise that resolves to the fetched Contentful entry of type `T`, or `null` if not found.
 */
export default async function useFetchContentfulEntryById<T>(entryId: string): Promise<T | null> {
  const query = `?entryId=${entryId}`

  const url = `/api/contentful${query}`

  return useAsyncData(url, () => $fetch(url))
}
