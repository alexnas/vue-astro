<script setup lang="ts">
import type { PropType } from 'vue'
import type { IBaseLevel } from '../types'
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
  baseLevel: {
    type: Array as PropType<IBaseLevel>,
    default: () => []
  }
})
</script>

<template>
  <div
    class="p-4 w-fit min-w-1/2 max-w-fit mx-auto bg-white rounded-xl shadow-lg flex items-center space-x-4"
  >
    <div>
      <div class="mb-4 w-full text-xl font-medium text-black">{{ title }}</div>
      <div
        class="p-3 mb-6 text-slate-500 rounded-xl border-t-2 border-l-8 border-l-teal-200"
        v-for="(planetGroup, idx) in baseLevel"
        :key="idx"
      >
        <div class="text-slate-500" v-for="planet in planetGroup" :key="planet">
          <div class="flex">
            <div class="p-2 min-w-sm w-20 min-h-fit rounded-xl border-2 border-teal-200">
              {{ planet }}
            </div>

            <ChartItem :data="data" :planet="planet" />
          </div>
          <hr class="h-0.5 my-2 border-0 rounded bg-gray-300" />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
