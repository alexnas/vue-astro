<script setup lang="ts">
import { dummyData } from '@/data/basicData'
import { ref } from 'vue'

const initData = ref(dummyData)
</script>

<template>
  <main class="container mx-auto p-4">
    <h1 class="text-3xl font-bold underline text-red-400">This is astro show page</h1>
    <pre>{{ initData }}</pre>
  </main>
</template>
