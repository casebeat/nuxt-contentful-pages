<template>
  <div>
    <nav
      class="navbar navbar-expand navbar-dark bg-dark"
      aria-label="Second navbar example"
    >
      <div class="container-fluid">
        <a
          class="navbar-brand"
          href="/"
        >
          Nuxt Contentful Module
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarsExample02"
          aria-controls="navbarsExample02"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon" />
        </button>

        <div
          id="navbarsExample02"
          class="collapse navbar-collapse"
        >
          <ul
            v-if="menu && menu.items"
            class="navbar-nav me-auto"
          >
            <li class="nav-item">
              <a
                class="nav-link active"
                aria-current="page"
                href="/"
              >Home</a>
            </li>

            <li
              v-for="(menuItem) in menu.items"
              :key="menuItem.id"
              class="nav-item"
            >
              <a
                class="nav-link"
                :href="menuItem.slug"
              >{{ menuItem.title }}</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <div
      class="col-lg-8 mx-auto p-4 py-md-5"
    >
      <main>
        <h1 class="text-body-emphasis">
          {{ page?.title }}
        </h1>
        <div
          class="fs-5 col-md-8"
          v-html="page?.body"
        />
      </main>
      <footer class="pt-5 my-5 text-body-secondary border-top">
        Spwaned by Casebeat · © 2024
      </footer>
    </div>
  </div>
</template>

<script setup lang="ts">
import { type StandardPage } from '../types/StandardPage'
import { type SiteMenu } from '../types/SiteMenu'

// Get the current page by slug
//
const page = await useFetchContentfulPageBySlug<StandardPage>('standardPage')

// Get the menu
//
const menuResponse = await useFetchContentfulEntriesMapped<SiteMenu>('menu')

const menu = menuResponse[0]

/*

Some examples of how to use the get content from Contentful

Get the site menu by Entry ID

const menuEntryId = "xxxxx"
const menu = await useFetchContentfulEntryById<SiteMenu>(menuEntryId)

export type SiteMenu = {
  id: string
  title: string
  items: Array<any>
}

*/

/*

Get Page from Contentful

const page = await useFetchContentfulPageBySlug<StandardPage>('standardPage')

or

const untypedPage = await useFetchContentfulEntryBySlug("standardPage")

export type StandardPage = {
  contentType: string
  id: string
  slug: string
  teaser: string
  title: string
  body: string
  maingImage: string
}

*/
</script>
