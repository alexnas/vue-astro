<script setup lang="ts">
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import DataCard from '@/components/DataCard.vue'
import { useAstroDataStore } from '@/stores/astroData'

const astroDataStore = useAstroDataStore()
const { currentDoubleAstroData } = storeToRefs(astroDataStore)

onMounted(() => {
  astroDataStore.getResultAstroData()
})
</script>

<template>
  <main class="mx-auto max-w-screen-xl">
    <h1 class="text-3xl font-bold underline text-teal-400 text-center my-4">Astro Show Info</h1>
    <div class="grid grid-cols-2 gap-4 px-4 overflow-y-auto h-[calc(100%-5rem)]">
      <div>
        <div>
          <h2 class="text-2xl font-medium text-teal-400 text-center">Initial Data First</h2>
          <div class="flex-col space-y-4">
            <DataCard
              title="Initial Zodiac All --SECOND-- (initAstroObjAllGrades)"
              :data="currentDoubleAstroData[1].initAstroObjAllGrades"
            />
          </div>
        </div>
        <div>
          <h2 class="mt-6 text-2xl font-medium text-teal-400 text-center">Initial Data Second</h2>
          <div class="flex-col space-y-4">
            <DataCard
              title="Initial Zodiac All --FIRST-- (initAstroObjAllGrades)"
              :data="currentDoubleAstroData[0].initAstroObjAllGrades"
            />
          </div>
        </div>
      </div>
      <div>
        <div>
          <h2 class="text-2xl font-medium text-teal-400 text-center">Result Data SECOND</h2>
          <div class="flex-col space-y-4">
            <hr class="w-full h-1 py-3 bg-teal-200 border-0 rounded dark:bg-gray-700" />
            <DataCard
              title="BASE Level  [-2-]  (all grades)"
              :data="currentDoubleAstroData[1].baseLevelAllGrades"
            />
          </div>
          <DataCard
            title="Result Astro Data [-2-] (all grades)"
            :data="currentDoubleAstroData[1].convertedResAllGrades"
          />
        </div>
        <div>
          <h2 class="mt-6 text-2xl font-medium text-teal-400 text-center">Result Data FIRST</h2>
          <div class="flex-col space-y-4">
            <hr class="w-full h-1 py-3 bg-teal-200 border-0 rounded dark:bg-gray-700" />
            <DataCard
              title="BASE Level  [-1-]  (all grades)"
              :data="currentDoubleAstroData[0].baseLevelAllGrades"
            />
          </div>
          <DataCard
            title="Result Astro Data  [-1-]  (all grades)"
            :data="currentDoubleAstroData[0].convertedResAllGrades"
          />
        </div>
      </div>
    </div>
  </main>
</template>
