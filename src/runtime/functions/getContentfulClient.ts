import contentful from 'contentful'

export default function getContentfulClient(options: any): contentful.ContentfulClientApi<undefined> {
  if (!options) {
    throw new Error('No options found in runtime config')
  }

  const client = contentful.createClient({
    // This is the space ID. A space is like a project folder in Contentful terms
    space: options.spaceId,
    // This is the access token for this space. Normally you get both ID and the token in the Contentful web app
    accessToken: options.accessToken,
  })

  return client
}
