// import type contentful from 'contentful'
import type contentful from 'contentful'

import type { getEntriesQuery } from '../types/contentfulTypes'
import getContentfulClient from './getContentfulClient'

export async function getContentfulEntries(options: any, query: getEntriesQuery) {
  const client = getContentfulClient(options)

  const contentfulQuery = {
    skip: query.skip,
    limit: query.limit,
    // orderBy:  query.orderBy ?? '-sys.createdAt',
    content_type: query.contentType ?? undefined,

  } as any

  if (query.excludeSlugs && query.excludeSlugs.length > 0) {
    contentfulQuery['fields.slug[nin]'] = query.excludeSlugs.join(',')
  }

  if (query.filter !== undefined) {
    Object.keys(query.filter).forEach((key) => {
      if (query.filter !== undefined) {
        contentfulQuery[key] = query.filter[key]
      }
    })
  }

  const entries = await client.getEntries<contentful.EntrySkeletonType, string>(contentfulQuery)
  return entries
}
