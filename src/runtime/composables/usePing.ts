import { useFetch } from '#imports'

export default async function usePing() {
  const { data } = await useFetch('/api/ping')

  return data
}
