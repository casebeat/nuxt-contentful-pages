# Nuxt Contentful Pages

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]
[![Nuxt][nuxt-src]][nuxt-href]

A Nuxt module for easy use of pages from Contentful

- [✨ &nbsp;Release Notes](/CHANGELOG.md)


## Features
- Nuxt 3 ready
- Contentful Integration

## Quick Setup

Install the module to your Nuxt application with one command:

```bash
npx nuxi module add nuxt-contentful-pages
```

Then add your contentful space id and access token
```bash
CONTENTFUL_SPACE_ID=<YOUR_SPACE_ID>
CONTENTFUL_ACCESS_TOKEN=<YOUR_ACCESS_TOKEN>
```

To get all wired up you need to add the NuxtPage component to your App.vue

```bash
<template>
  <div>
    <NuxtPage />
  </div>
</template>
```

and add a page /page/[...slug.vue] to handle all requests like the example below

```bash
<template>
    
    <div>        
        <div v-html="page?.body"></div>        
    </div>    
</template>
<script setup lang="ts">

  // import your type matching the fields in your Contentful content type
  import { type StandardPage } from '../types/StandardPage'


  // Get the page
  //
  const page = await useFetchContentfulPageBySlug<StandardPage>('standardPage')

</script>

```bash



That's it! You can now use Contentful in your Nuxt app ✨


## Contribution

<details>
  <summary>Local development</summary>
  
  ```bash
  # Install dependencies
  npm install
  
  # Generate type stubs
  npm run dev:prepare
  
  # Develop with the playground
  npm run dev
  
  # Build the playground
  npm run dev:build
  
  # Run ESLint
  npm run lint
  
  # Run Vitest
  npm run test
  npm run test:watch
  
  # Release new version
  npm run release
  ```

</details>


<!-- Badges -->
[npm-version-src]: https://img.shields.io/npm/v/nuxt-contentful-pages/latest.svg?style=flat&colorA=020420&colorB=00DC82
[npm-version-href]: https://npmjs.com/package/nuxt-contentful-pages

[npm-downloads-src]: https://img.shields.io/npm/dm/nuxt-contentful-pages.svg?style=flat&colorA=020420&colorB=00DC82
[npm-downloads-href]: https://npmjs.com/package/nuxt-contentful-pages

[license-src]: https://img.shields.io/npm/l/nuxt-contentful-pages.svg?style=flat&colorA=020420&colorB=00DC82
[license-href]: https://npmjs.com/package/nuxt-contentful-pages

[nuxt-src]: https://img.shields.io/badge/Nuxt-020420?logo=nuxt.js
[nuxt-href]: https://nuxt.com
