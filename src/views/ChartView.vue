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
  <main class="px-3 mx-auto max-w-screen-xl">
    <div class="my-6 grid grid-cols-2 text-3xl font-bold underline text-teal-400 text-center">
      <h1 class="">Astro Chart: Pers1</h1>
      <h1 class="">Astro Chart: Pers2</h1>
    </div>
    <div class="grid grid-cols-2 grid-flow-row gap-6 border-b-4">
      <div>
        <ChartCard
          title="Chart 1: Stage 1"
          :data="currentDoubleAstroData[0].convertedResAllGrades[0]"
          :baseLevel="currentDoubleAstroData[0].baseLevelAllGrades[0]"
        />
      </div>
      <div>
        <ChartCard
          title="Chart 2: Stage 1"
          :data="currentDoubleAstroData[1].convertedResAllGrades[0]"
          :baseLevel="currentDoubleAstroData[1].baseLevelAllGrades[0]"
        />
      </div>
    </div>
    <div class="grid grid-cols-2 grid-flow-row gap-6 border-b-4">
      <div>
        <ChartCard
          title="Chart 1: Stage 2"
          :data="currentDoubleAstroData[0].convertedResAllGrades[1]"
          :baseLevel="currentDoubleAstroData[0].baseLevelAllGrades[1]"
        />
      </div>
      <div>
        <ChartCard
          title="Chart 2: Stage 2"
          :data="currentDoubleAstroData[1].convertedResAllGrades[1]"
          :baseLevel="currentDoubleAstroData[1].baseLevelAllGrades[1]"
        />
      </div>
    </div>
    <div class="grid grid-cols-2 grid-flow-row gap-6">
      <div>
        <ChartCard
          title="Chart 1: Stage 3"
          :data="currentDoubleAstroData[0].convertedResAllGrades[2]"
          :baseLevel="currentDoubleAstroData[0].baseLevelAllGrades[2]"
        />
      </div>
      <div>
        <ChartCard
          title="Chart 2: Stage 3"
          :data="currentDoubleAstroData[1].convertedResAllGrades[2]"
          :baseLevel="currentDoubleAstroData[1].baseLevelAllGrades[2]"
        />
      </div>
    </div>
  </main>
</template>
