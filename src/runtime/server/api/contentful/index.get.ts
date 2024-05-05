import { defineEventHandler, getQuery, createError } from 'h3'
import { getContentfulEntryBySlug } from '../../../functions/getContentfulEntryBySlug'
import { getContentfulEntries } from '../../../functions/getContentfulEntries'

export default defineEventHandler(async (event) => {
  const {
    slug, contentType, excludeSlug, skip, limit,
  } = getQuery(event)

  if (!contentType) {
    throw createError({
      statusCode: 400,
      statusMessage: 'contentType is required',
    })
  }

  // convert the excludeSlug to an array of strings
  //
  let excludeSlugs = [] // Array<string>();
  if (excludeSlug && excludeSlug.toString() !== '') {
    if (Array.isArray(excludeSlug)) {
      excludeSlugs = excludeSlug.map(s => s.toString())
    }
    else {
      excludeSlugs.push(excludeSlug.toString())
    }
  }

  if (slug && slug.toString() !== '') {
    // Get a single page by slug
    const content = await getContentfulEntryBySlug(slug ? slug.toString() : 'index', contentType?.toString())
    return content
  }
  // Get a list of pages
  const skipNumber = skip ? Number.parseInt(skip.toString()) : 0
  const limitNumber = limit ? Number.parseInt(limit.toString()) : 20
  const content = await getContentfulEntries({
    skip: skipNumber, limit: limitNumber, contentType: contentType?.toString(), excludeSlugs,
  })
  return content
})
