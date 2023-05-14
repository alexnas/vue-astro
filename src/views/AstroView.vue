<script setup lang="ts">
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import DataCard from '@/components/DataCard.vue'
import { useAstroDataStore } from '@/stores/astroData'

const astroDataStore = useAstroDataStore()
const {
  initObj,
  baseLevel,
  baseLevelFlatMono,
  baseLevelFlatPoly,
  idsAllArr,
  convertedInitDataArr,
  convertedInitDataObj,
  convertedRes
} = storeToRefs(astroDataStore)

onMounted(() => {
  astroDataStore.getBaseLevel()
})
</script>

<template>
  <main class="mx-auto max-w-screen-xl">
    <h1 class="text-3xl font-bold underline text-teal-400 text-center my-4">Astro Show Info</h1>
    <div class="grid grid-cols-2 gap-4 px-4">
      <div>
        <h2 class="text-2xl font-medium text-teal-400 text-center">Initial Data</h2>
        <div class="flex-col space-y-4">
          <DataCard title="Initial Astro Data" :data="initObj" />
          <DataCard title="Converted Astro Data Arr" :data="convertedInitDataArr" />
          <DataCard title="Converted Astro Data obj" :data="convertedInitDataObj" />
        </div>
      </div>
      <div>
        <h2 class="text-2xl font-medium text-teal-400 text-center">Result Data</h2>
        <div class="flex-col space-y-4">
          <DataCard title="BASE Level" :data="baseLevel" />
          <DataCard title="BASE Level Flat MONO" :data="baseLevelFlatMono" />
          <DataCard title="BASE Level Flat POLY" :data="baseLevelFlatPoly" />
          <DataCard title=" All IDs Flat" :data="idsAllArr" />

          <hr class="w-full h-1 py-3 bg-teal-200 border-0 rounded dark:bg-gray-700" />

          <DataCard title="Result Astro Data" :data="convertedRes" />
        </div>
      </div>
    </div>
  </main>
</template>
