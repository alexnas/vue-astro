<script setup lang="ts">
import { storeToRefs } from 'pinia'
import DataCard from '@/components/DataCard.vue'
import ChartCard from '@/components/ChartCard.vue'
import { useAstroDataStore } from '@/stores/astroData'

const astroDataStore = useAstroDataStore()
const { initObj, convertedRes, idsByLevel, allLevelsFlatTotal, baseLevelFlatTotal } =
  storeToRefs(astroDataStore)
</script>

<template>
  <main class="mx-auto max-w-screen-xl">
    <h1 class="text-3xl font-bold underline text-teal-400 text-center my-4">Astro Show Chart</h1>
    <div class="px-4">
      <ChartCard title="Result Astro Data" :data="convertedRes" :show="baseLevelFlatTotal" />
    </div>

    <h1 class="text-3xl font-bold underline text-teal-400 text-center my-4">Computed Data</h1>
    <div class="grid grid-cols-2 gap-4 px-4">
      <div>
        <h2 class="text-2xl font-medium text-teal-400 text-center">Result Data</h2>
        <div class="flex-col space-y-4">
          <DataCard title="Result Astro Data" :data="convertedRes" />

          <hr class="w-full h-1 py-3 bg-teal-200 border-0 rounded dark:bg-gray-700" />
        </div>
      </div>
      <div>
        <h2 class="text-2xl font-medium text-teal-400 text-center">Initial Data</h2>
        <div class="flex-col space-y-4">
          <DataCard title="All Parent IDs by Level" :data="idsByLevel" />
          <DataCard title="Parent IDs Flat TOTAL" :data="allLevelsFlatTotal" />
          <DataCard title="Initial Astro Data" :data="initObj" />
        </div>
      </div>
    </div>
  </main>
</template>
