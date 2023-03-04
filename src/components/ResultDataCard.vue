<script setup lang="ts">
import DataCard from '@/components/DataCard.vue'
defineProps({
  title: {
    type: String,
    default: 'Card Name'
  },
  initData: {
    type: Object || Array,
    default: () => {}
  }
})
</script>

<template>
  <h2 class="text-2xl font-medium text-teal-400 text-center">Result Data</h2>
  <div class="flex-col space-y-4">
    <DataCard title="Level1" :initData="['Level1']" />
    <DataCard title="Circles" :initData="['Circles']" />
    <DataCard title="Not Level1" :initData="['Not Level1']" />
  </div>
</template>

<style scoped></style>
