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
            <ul class="navbar-nav me-auto" v-if="menu && menu[0].items">
              <li class="nav-item">
                <a
                  class="nav-link active"
                  aria-current="page"
                  href="/"
                >Home</a>
              </li>
  
              <li
                v-for="(menuItem) in menu[0].items"
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
  
      <div class="col-lg-8 mx-auto p-4 py-md-5">
        <main>
          <div v-if="false">
            {{ menu[0].items }}
          </div>
          <h1 class="text-body-emphasis">
            {{ page?.title }}
          </h1>
          <div
            class="fs-5 col-md-8"
            v-html="page?.body"
          />
        </main>
        <footer class="pt-5 my-5 text-body-secondary border-top">
          Created by the Casebeat Team · © 2024
        </footer>
      </div>
    </div>
  </template>
  <script setup lang="ts">
  
  import { useFetchContentfulPageBySlug, useFetchContentfulEntriesMapped } from '#imports';
  import { type PageModel } from '../models/PageModel';
  import { type MenuModel } from '../models/MenuModel';
  
  // Get the current page by slug
  //
  const page = await useFetchContentfulPageBySlug<PageModel>('standardPage');
  
  // Get the menu
  //
  const menu = await useFetchContentfulEntriesMapped<MenuModel>('menu');
  
  </script>
  