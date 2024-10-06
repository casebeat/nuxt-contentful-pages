import type { EntrySkeletonType } from 'contentful'
import getContentfulClient from './getContentfulClient'

/**
 * Fetches a Contentful entry by its slug and content type.
 *
 * @param {any} options - Options for configuring the Contentful client.
 * @param {string} slug - The slug of the Contentful entry to fetch.
 * @param {string} contentType - The content type of the Contentful entry.
 * @returns {Promise<EntrySkeletonType | undefined>} A promise that resolves to the fetched Contentful entry or `undefined` if not found or if required parameters are missing.
 */
export const getContentfulEntryBySlug = async (options: any, slug: string, contentType: string) => {
  if (!slug) {
    console.error('no slug')
    return undefined
  }

  if (!contentType) {
    console.error('no content type')
    return undefined
  }

  const client = getContentfulClient(options)

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
