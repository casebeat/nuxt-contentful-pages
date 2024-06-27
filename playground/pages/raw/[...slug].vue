<template>
  <div>
    <div>
      <main>
        {{ entry }}
      </main>
      <footer class="pt-5 my-5 text-body-secondary border-top">
        Created by the Casebeat Team · © 2024
      </footer>
    </div>
  </div>
</template>

<script setup lang="ts">
// import { useFetchContentfulPageBySlug, useFetchContentfulEntriesMapped } from '#imports'

// Get the current page by slug
//
const entry = await useFetchContentfulEntryBySlug('standardPage')

// Get the menu
//
</script>
