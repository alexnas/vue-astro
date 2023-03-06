<script setup lang="ts">
import DataCard from '@/components/DataCard.vue'
import { reactive, computed } from 'vue'

const props = defineProps({
  title: {
    type: String,
    default: 'Card Name'
  },
  initData: {
    type: Object || Array,
    default: () => {}
  }
})

const initObj = reactive(props.initData)

const initArr = computed(() => {
  return Object.keys(initObj)
})

function findLevel1() {
  let level1Flat: string[] = []
  let level1: string[][] = []

  initArr.value.forEach((item) => {
    let tryCircle = []
    let i = item

    if (initObj[item] === 'Earth' || initObj[item] === 'Vulcan') {
      level1.push([initObj[item]])
      level1Flat.push(initObj[item])
    }

    if (level1Flat.includes(item)) {
      return
    }
    tryCircle.push(i)

    let step = 0
    let startPoint = null

    while (step < 10) {
      step++
      if (!tryCircle.includes(i)) {
        tryCircle.push(i)
      }

      i = initObj[i]

      if (tryCircle.includes(i)) {
        startPoint = i
        break
      }

      if (level1Flat.includes(i)) {
        tryCircle = []
        return
      }
    }

    if (!startPoint) return
    const foundCirle = tryCircle.splice(tryCircle.indexOf(startPoint))
    level1.push(foundCirle)
    level1Flat = [...level1Flat, ...foundCirle]
  })
  return { level1, level1Flat }
}

const { level1, level1Flat } = findLevel1()
</script>

<template>
  <h2 class="text-2xl font-medium text-teal-400 text-center">Result Data</h2>
  <div class="flex-col space-y-4">
    <DataCard title="Level1" :initData="level1" />
  </div>
</template>

<style scoped></style>
