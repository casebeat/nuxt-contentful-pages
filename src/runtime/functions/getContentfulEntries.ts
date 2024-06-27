import type contentful from 'contentful'
import getContentfulClient from './getContentfulClient'

type getPagesQuery = {
  skip: number
  limit: number
  contentType: string
  excludeSlugs: string[] | undefined
}

export async function getContentfulEntries(options: any, query: getPagesQuery) {
  const client = getContentfulClient(options)

  const contentfulQuery = {
    skip: query.skip,
    limit: query.limit,
    content_type: query.contentType ?? undefined,
  } as any

  if (query.excludeSlugs && query.excludeSlugs.length > 0) {
    contentfulQuery['fields.slug[nin]'] = query.excludeSlugs.join(',')
  }

  const entries = await client.getEntries<contentful.EntrySkeletonType, string>(contentfulQuery)

  return entries
}
