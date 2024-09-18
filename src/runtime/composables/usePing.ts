export default async function usePing() {
  const data = await $fetch('/api/ping')

  return data
}
