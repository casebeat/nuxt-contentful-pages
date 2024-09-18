export default async function useFetchContentfulEntriesRaw(
  contentType: string,
  offset: number = 0,
  limit: number = 20,
  filterParams: Record<string, string>[] | undefined = undefined) {
  let query = `?contentType=${contentType}&offset=${offset}&limit=${limit}`

  if (filterParams) {
    // iterate over filter
    for (const filter of filterParams) {
      for (const key in filter) {
        if (Object.prototype.hasOwnProperty.call(filter, key)) {
          const value = filter[key]
          if (value) {
            query = query.concat(`&filter.${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
          }
        }
      }
    }
  }

  const url = `/api/contentful${query}&raw=true`

  const response = await $fetch(url)

  // return items
  return response
}
