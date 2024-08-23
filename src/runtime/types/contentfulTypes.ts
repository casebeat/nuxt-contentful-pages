export type FilterQuery = {
  [key: string]: string | string[]
}

export type getEntriesQuery = {
  skip: number
  limit: number
  // orderBy: string | undefined
  contentType: string
  excludeSlugs: string[] | undefined
  filter: Record<string, string | undefined> | undefined
}
