import contentful from 'contentful';
import { useRuntimeConfig } from '#imports';

export function getContentfulClient() : contentful.ContentfulClientApi<undefined> {
  const options = useRuntimeConfig().nuxtContentfulPages;
  
  const client = contentful.createClient({
    // This is the space ID. A space is like a project folder in Contentful terms
    space: options.spaceId,
    // This is the access token for this space. Normally you get both ID and the token in the Contentful web app
    accessToken: options.accessToken,
  });

  return client;
}