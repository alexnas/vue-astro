<script setup lang="ts">
defineProps({
  data: {
    type: Object || Array,
    default: () => {}
  },
  planet: {
    type: String,
    required: true
  }
})
</script>

<template>
  <div
    v-if="data[planet] && data[planet]['children'] && data[planet]['children'].length > 0"
    class="px-2"
  >
    <ul class="flex" v-for="planetChild in data[planet]['children']" :key="planetChild">
      <div class="flex items-center w-6 h-12">{{ '<--' }}</div>
      <div class="p-2 mb-1 min-w-sm w-20 h-12 rounded-xl border-2">
        {{ planetChild }}
      </div>
      <ChartItem :data="data" :planet="planetChild" />
    </ul>
  </div>
</template>
