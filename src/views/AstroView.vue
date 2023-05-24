<script setup lang="ts">
import { storeToRefs } from 'pinia'
import DataCard from '@/components/DataCard.vue'
import { useAstroDataStore } from '@/stores/astroData'
import { useZodiacDataStore } from '@/stores/zodiacData'
import zodiacPlanets from '@/constants/zodiacPlanets'

const astroDataStore = useAstroDataStore()
const { initObj, baseLevel, convertedRes, baseLevelFlatTotal, idsByLevel, allLevelsFlatTotal } =
  storeToRefs(astroDataStore)

const zodiacDataStore = useZodiacDataStore()
const { initZodiacObj, initAstroObjAllGrades, initAstroObjByGrade } = storeToRefs(zodiacDataStore)
</script>

<template>
  <main class="mx-auto max-w-screen-xl">
    <h1 class="text-3xl font-bold underline text-teal-400 text-center my-4">Astro Show Info</h1>
    <div class="grid grid-cols-2 gap-4 px-4">
      <div>
        <h2 class="text-2xl font-medium text-teal-400 text-center">Initial Data</h2>
        <div class="flex-col space-y-4">
          <DataCard title="Initial Astro Data" :data="initObj" />
          <hr class="w-full h-1 py-3 bg-teal-200 border-0 rounded dark:bg-gray-700" />
          <DataCard title="Initial Zodiac Data" :data="initZodiacObj" />
          <DataCard title="initAstroObjByGrade[0]" :data="initAstroObjByGrade" />
          <DataCard title="initAstroObjAllGrades" :data="initAstroObjAllGrades" />
          <DataCard title="Zodiac to Planets transform" :data="zodiacPlanets" />
        </div>
      </div>
      <div>
        <h2 class="text-2xl font-medium text-teal-400 text-center">Result Data</h2>
        <div class="flex-col space-y-4">
          <DataCard title="BASE Level" :data="baseLevel" />
          <DataCard title="BASE Level Flat TOTAL" :data="baseLevelFlatTotal" />
          <DataCard title="All Parent IDs by Level" :data="idsByLevel" />
          <DataCard title="Parent IDs Flat TOTAL" :data="allLevelsFlatTotal" />

          <hr class="w-full h-1 py-3 bg-teal-200 border-0 rounded dark:bg-gray-700" />

          <DataCard title="Result Astro Data" :data="convertedRes" />
        </div>
      </div>
    </div>
  </main>
</template>
