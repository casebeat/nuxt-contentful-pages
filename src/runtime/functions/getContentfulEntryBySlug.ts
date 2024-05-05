import type { EntrySkeletonType } from 'contentful'
import { getContentfulClient } from './getContentfulClient'

/**
 * Get single contentful entry by matching slug and content type
 * @param slug target slug of contentful entry
 * @param contentType target content type of contentful entry
 * @returns
 */
export const getContentfulEntryBySlug = async (slug: string, contentType: string) => {
  if (!slug) {
    console.error('no slug')
    return undefined
  }

  if (!contentType) {
    console.error('no content type')
    return undefined
  }

  const client = getContentfulClient()

  const contentBySlug = await client.getEntries<EntrySkeletonType, string>({
    'content_type': contentType,
    'fields.slug': slug,
  })

  if (!contentBySlug || !contentBySlug.items[0]) {
    return undefined
  }

  const entry = contentBySlug.items[0]

  return entry
}
