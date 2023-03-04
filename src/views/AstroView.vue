<script setup lang="ts">
import { ref } from 'vue'
import { dummyData } from '@/data/basicData'
import DataCard from '@/components/DataCard.vue'
import ResultDataCard from '@/components/ResultDataCard.vue'

const initData = ref(dummyData)
</script>

<template>
  <main class="mx-auto max-w-screen-xl">
    <h1 class="text-3xl font-bold underline text-teal-400 text-center my-4">Astro Show Info</h1>
    <div class="card-grid space-x-4 px-4">
      <div>
        <DataCard title="Initial Astro Data" :initData="initData" />
      </div>
      <div>
        <ResultDataCard title="Result Data" :initData="initData" />
      </div>
    </div>
  </main>
</template>

<style scoped>
.card-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
}
</style>
