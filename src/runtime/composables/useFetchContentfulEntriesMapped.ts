// import { useFetch, mapEntryFieldsToPage } from '#imports'

export default async function useFetchContentfulEntriesMapped<T>(contentType: string, offset: number = 0, limit: number = 20) {
  // get type of T

  const query = `?contentType=${contentType}&offset=${offset}&limit=${limit}`

  const url = `/api/contentful${query}`

  // console.log('useFetchContentfulEntriesMapped url', url)
  const { data } = await useFetch(url)

  const response = data?.value

  // console.log('useFetchContentfulEntriesMapped.response', response);
  // console.log('useFetchContentfulEntriesMapped.response.items.length', response?.length);

  // if (!response || !response.items) {
  //   return []
  // }
  // const items = response.items.map(item => mapEntryFieldsToPage<T>(item))

  // const items = response.items;

  // return items
  return response as T[]
}
