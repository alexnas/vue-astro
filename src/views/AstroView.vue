<script setup lang="ts">
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import DataCard from '@/components/DataCard.vue'
import { useAstroDataStore } from '@/stores/astroData'

const astroDataStore = useAstroDataStore()
const {
  initObj,
  convertedRes,
  baseLevel,
  allBranches,
  initAstroDummyObj,
  initZodiacObj,
  initAstroObjAll
} = storeToRefs(astroDataStore)

onMounted(() => {
  astroDataStore.getDummyAstroData()
  astroDataStore.getAstroFromZodiac()
  astroDataStore.getAstroData()
  astroDataStore.getResIdsObj()
})
</script>

<template>
  <main class="mx-auto max-w-screen-xl">
    <h1 class="text-3xl font-bold underline text-teal-400 text-center my-4">Astro Show Info</h1>
    <div class="grid grid-cols-2 gap-4 px-4">
      <div>
        <h2 class="text-2xl font-medium text-teal-400 text-center">Initial Data</h2>
        <div class="flex-col space-y-4">
          <DataCard title="Initial Astro (choosen)" :data="initObj" />
          <DataCard title="Initial Astro (dummy)" :data="initAstroDummyObj" />
          <DataCard title="Initial Zodiac All (initAstroObjAll)" :data="initAstroObjAll" />
          <DataCard title="Initial Zodiac (initZodiacObj) " :data="initZodiacObj" />
        </div>
      </div>
      <div>
        <h2 class="text-2xl font-medium text-teal-400 text-center">Result Data</h2>
        <DataCard title="Result Astro Data (convertedRes)" :data="convertedRes" />
        <div class="flex-col space-y-4">
          <hr class="w-full h-1 py-3 bg-teal-200 border-0 rounded dark:bg-gray-700" />
          <DataCard title="BASE Level" :data="baseLevel" />
          <DataCard title="All Branches" :data="allBranches" />
        </div>
      </div>
    </div>
  </main>
</template>
