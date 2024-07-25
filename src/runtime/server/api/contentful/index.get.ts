import { defineEventHandler, getQuery, createError } from 'h3'
import { getContentfulEntryBySlug } from '../../../functions/getContentfulEntryBySlug'
import { getContentfulEntries } from '../../../functions/getContentfulEntries'
import { renderEntryFields } from '../../../functions/renderEntryFields'
import { getContentfulEntryById } from '../../../functions/getContentfulEntryById'
import { useRuntimeConfig } from '#imports'

export default defineEventHandler(async (event) => {
  const options = useRuntimeConfig().nuxtContentfulPages

  const {
    entryId,slug, contentType, excludeSlug, skip, limit, raw,
  } = getQuery(event)

  if(entryId){
    const content = await getContentfulEntryById(options, entryId.toString())
    if (raw) {
      return content
    }
    const page = renderEntryFields(content)
    return page;
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

  // Get a list of pages
  const skipNumber = skip ? Number.parseInt(skip.toString()) : 0
  const limitNumber = limit ? Number.parseInt(limit.toString()) : 20
  const content = await getContentfulEntries(options, {
    skip: skipNumber, limit: limitNumber, contentType: contentType?.toString(), excludeSlugs,
  })

  if (raw) {
    return content
  }
  
  const renderedContent = content.items.map(item => renderEntryFields(item))
  return renderedContent
})
