import { defineEventHandler, getQuery, createError } from 'h3'
import { getContentfulEntryBySlug } from '../../../functions/getContentfulEntryBySlug'
import { getContentfulEntries } from '../../../functions/getContentfulEntries'
import { renderEntryFields } from '../../../functions/renderEntryFields'
import { getContentfulEntryById } from '../../../functions/getContentfulEntryById'
import type { getEntriesQuery } from '../../../types/contentfulTypes'
import { useRuntimeConfig } from '#imports'

export default defineEventHandler(async (event) => {
  const options = useRuntimeConfig().nuxtContentfulPages

  const {
    entryId, slug, contentType, excludeSlug, skip, limit, raw,
  } = getQuery(event)

  if (entryId) {
    // get by Id
    return await getById(options, entryId, raw)
  }

  if (!contentType) {
    throw createError({
      statusCode: 400,
      statusMessage: 'contentType is required',
    })
  }

  // convert the excludeSlug to an array of strings
  //
  let excludeSlugs = Array<string>()
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
    const content = await getContentfulEntryBySlug(options, slug ? slug.toString() : 'index', contentType?.toString())
    if (raw) {
      return content
    }
    const page = renderEntryFields(content)
    return page
  }

  const skipNumber = skip ? Number.parseInt(skip.toString()) : 0
  const limitNumber = limit ? Number.parseInt(limit.toString()) : 20
  const query: getEntriesQuery = {
    skip: skipNumber,
    limit: limitNumber,
    // orderBy: '-sys.createdAt',
    contentType: contentType.toString(),
    excludeSlugs: excludeSlugs,
    filter: undefined,
  }

  const filter = getFilterParams(event)

  query.filter = filter

  try {
    const content = await getContentfulEntries(options, query)

    if (raw) {
      return content
    }

    if (content && content.items) {
      const renderedContent = content.items.map(item => renderEntryFields(item))
      return renderedContent
    }
  }
  catch (error) {
    console.error('Error fetching contentful entries:', error)
  }

  return undefined
})

function getFilterParams(event): Record<string, string | undefined> {
  // Get all query parameters
  const query = getQuery(event)

  // Extract parameters that start with 'filter.'
  const filterParams = Object.keys(query)
    .filter(key => key.startsWith('filter.'))
    .reduce((obj, key) => {
      obj[key.replace('filter.', '')] = query[key]?.toString()
      return obj
    }, {} as Record<string, string | undefined>) // Use appropriate type for query values

  return filterParams
}

async function getById(options, entryId, raw) {
  const content = await getContentfulEntryById(options, entryId.toString())
  if (raw) {
    return content
  }
  const page = renderEntryFields(content)
  return page
}
