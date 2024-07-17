import { useFetch } from '#imports'

export default async function useFetchContentfulEntries(contentType: string, offset: number = 0, limit: number = 20) {
  const query = `?contentType=${contentType}&offset=${offset}&limit=${limit}&raw=true`

  const url = `/api/contentful${query}`

  const { data } = await useFetch(url)

  const response = data?.value

  // return items
  return response
}
