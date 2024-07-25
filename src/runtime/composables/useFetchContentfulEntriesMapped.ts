import { useFetch } from '#imports'

export default async function useFetchContentfulEntriesMapped<T>(contentType: string, offset: number = 0, limit: number = 20) : Promise<T[]> {
  const query = `?contentType=${contentType}&offset=${offset}&limit=${limit}`

  const url = `/api/contentful${query}`

  const { data } = await useFetch(url)

  const response = data?.value

  // return items
  return response as T[]
}
