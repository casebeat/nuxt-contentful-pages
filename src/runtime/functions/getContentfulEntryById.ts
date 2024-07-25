import type contentful from 'contentful'
import getContentfulClient from './getContentfulClient'


export async function getContentfulEntryById(options: any, entryId: string) {
  const client = getContentfulClient(options)

  const entries = await client.getEntry<contentful.EntrySkeletonType, string>(entryId)

  return entries
}
