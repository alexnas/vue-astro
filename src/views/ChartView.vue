<script setup lang="ts">
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import ChartCard from '@/components/ChartCard.vue'
import { useAstroDataStore } from '@/stores/astroData'

const astroDataStore = useAstroDataStore()
const { convertedResAllGrades, baseLevelAllGrades } = storeToRefs(astroDataStore)

onMounted(() => {
  astroDataStore.getConvertedResultObj()
})
</script>

<template>
  <main class="mx-auto max-w-screen-xl">
    <h1 class="text-3xl font-bold underline text-teal-400 text-center my-4">Astro Chart: AAA</h1>
    <div class="px-4">
      <ChartCard
        title="Chart Stage 1"
        :data="convertedResAllGrades[0]"
        :baseLevel="baseLevelAllGrades[0]"
      />
      <ChartCard
        title="Chart Stage 2"
        :data="convertedResAllGrades[1]"
        :baseLevel="baseLevelAllGrades[1]"
      />
      <ChartCard
        title="Chart Stage 3"
        :data="convertedResAllGrades[2]"
        :baseLevel="baseLevelAllGrades[2]"
      />
    </div>
  </main>
</template>
