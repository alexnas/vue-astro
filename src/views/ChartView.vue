<script setup lang="ts">
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import ChartCard from '@/components/ChartCard.vue'
import { useAstroDataStore } from '@/stores/astroData'

const astroDataStore = useAstroDataStore()
const { convertedRes, baseLevel } = storeToRefs(astroDataStore)

onMounted(() => {
  astroDataStore.getDummyAstroData()
  astroDataStore.getAstroFromZodiac()
  astroDataStore.getAstroData()
  astroDataStore.getResIdsObj()
})
</script>

<template>
  <main class="mx-auto max-w-screen-xl">
    <h1 class="text-3xl font-bold underline text-teal-400 text-center my-4">Astro Chart: AAA</h1>
    <div class="px-4">
      <ChartCard title="Chart Stage 1" :data="convertedRes" :show="baseLevel" />
      <ChartCard title="Chart Stage 2" :data="convertedRes" :show="baseLevel" />
      <ChartCard title="Chart Stage 3" :data="convertedRes" :show="baseLevel" />
    </div>
  </main>
</template>
