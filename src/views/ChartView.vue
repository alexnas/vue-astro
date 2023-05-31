<script setup lang="ts">
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import ChartCard from '@/components/ChartCard.vue'
import { useAstroDataStore } from '@/stores/astroData'

const astroDataStore = useAstroDataStore()
const { currentDoubleAstroData } = storeToRefs(astroDataStore)

onMounted(() => {
  astroDataStore.getResultAstroData()
})
</script>

<template>
  <main class="grid grid-cols-2 mx-auto max-w-screen-xl">
    <div>
      <h1 class="text-3xl font-bold underline text-teal-400 text-center my-4">
        Astro Chart: Pers1
      </h1>
      <div class="px-4">
        <ChartCard
          title="Chart 1: Stage 1"
          :data="currentDoubleAstroData[0].convertedResAllGrades[0]"
          :baseLevel="currentDoubleAstroData[0].baseLevelAllGrades[0]"
        />
        <ChartCard
          title="Chart 1: Stage 2"
          :data="currentDoubleAstroData[0].convertedResAllGrades[1]"
          :baseLevel="currentDoubleAstroData[0].baseLevelAllGrades[1]"
        />
        <ChartCard
          title="Chart 1: Stage 3"
          :data="currentDoubleAstroData[0].convertedResAllGrades[2]"
          :baseLevel="currentDoubleAstroData[0].baseLevelAllGrades[2]"
        />
      </div>
    </div>
    <div>
      <h1 class="text-3xl font-bold underline text-teal-400 text-center my-4">
        Astro Chart: Pers2
      </h1>
      <div class="px-4">
        <ChartCard
          title="Chart 2: Stage 1"
          :data="currentDoubleAstroData[1].convertedResAllGrades[0]"
          :baseLevel="currentDoubleAstroData[1].baseLevelAllGrades[0]"
        />
        <ChartCard
          title="Chart 2: Stage 2"
          :data="currentDoubleAstroData[1].convertedResAllGrades[1]"
          :baseLevel="currentDoubleAstroData[1].baseLevelAllGrades[1]"
        />
        <ChartCard
          title="Chart 2: Stage 3"
          :data="currentDoubleAstroData[1].convertedResAllGrades[2]"
          :baseLevel="currentDoubleAstroData[1].baseLevelAllGrades[2]"
        />
      </div>
    </div>
  </main>
</template>
