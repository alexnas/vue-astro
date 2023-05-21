<script setup lang="ts">
import ChartItem from './ChartItem.vue'

defineProps({
  title: {
    type: String,
    default: 'Card Name'
  },
  data: {
    type: Object || Array,
    default: () => {}
  },
  show: {
    type: Object || Array,
    default: () => {}
  }
})
</script>

<template>
  <div class="p-4 max-w-xl mx-auto bg-white rounded-xl shadow-lg flex items-center space-x-4">
    <div>
      <div class="mb-4 text-xl font-medium text-black">{{ title }}</div>
      <div class="text-slate-500" v-for="planet in show" :key="planet">
        <div class="flex">
          <div class="p-2 mb-4 min-w-sm w-20 h-12 rounded-xl border-2">{{ planet }}</div>

          <ChartItem :data="data" :planet="planet" />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
