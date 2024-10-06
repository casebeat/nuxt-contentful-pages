import { useAsyncData } from '#imports'

export default async function usePing() {
  return useAsyncData('/api/ping', () => $fetch('/api/ping'))
}
