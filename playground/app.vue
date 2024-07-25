<template>
  <div>
    <NuxtPage />
  </div>
</template>

<script setup>
import { useHead } from '#imports'

useHead({
  link: [{ rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css' }],
})

</script>
