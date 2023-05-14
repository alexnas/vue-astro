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
const { fullTree } = findTrees(level1)

function swapObject(obj) {
  const swaped = {}
  Object.keys(obj).forEach((key) => {
    if (!obj[key]) {
      res[obj[key]] = [key]
    }
    if (swaped[obj[key]]) {
      swaped[obj[key]] = swaped[obj[key]].concat([key])
    } else {
      swaped[obj[key]] = [key]
    }
  })
  return swaped
}

function findTrees(level1Tree: any) {
  let usedItems = [...level1Flat]

  const level2: string[] = []
  const itemsL2 = {}
  initArr.value.forEach((item) => {
    if (!usedItems.includes(item) && level1Flat.includes(initObj[item])) {
      level2.push(item)
      itemsL2[item] = initObj[item]
    }
  })
  let swapedL2 = swapObject(itemsL2)

  let tree = level1Tree.map((branch) =>
    branch.map((item) => {
      if (Object.keys(swapedL2).includes(item)) {
        usedItems = [...usedItems, ...swapedL2[item]]
        item = { [item]: swapedL2[item] }
      }
      return item
    })
  )
  console.log('usedItems', usedItems)
  // let used1_2 = [...level1Flat, ...level2]

  console.log('newItems', itemsL2, swapedL2, level2, usedItems)
  return { fullTree: tree }
}
</script>

<template>
  <div class="flex-col space-y-4">
    <DataCard title="Full Tree" :initData="fullTree" />
    <DataCard title="Level1" :initData="level1" />
  </div>
</template>

<style scoped></style>
