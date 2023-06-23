<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import type { IZodiac, IZodiacChart } from '@/types'
import ChartCard from '@/components/ChartCard.vue'
import { useAstroDataStore } from '@/stores/astroData'
import { usePersonStore } from '@/stores/person'
import { initZodiacChart } from '@/constants/zodiacConstants'
import type { IPerson } from '@/types'
import { initPerson } from '@/constants/personConstants'

const personStore = usePersonStore()
const { persons } = storeToRefs(personStore)

const astroDataStore = useAstroDataStore()
const { currentDoubleAstroData, choosenPerson1, choosenPerson2 } = storeToRefs(astroDataStore)
const tempPersonVal = ref<IPerson>({ ...initPerson })

const toShow = computed(() => {
  return { person1: choosenPerson1.value.id > 0, person2: choosenPerson2.value.id > 0 }
})

watch([() => choosenPerson1.value, () => choosenPerson2.value], async ([newValue1, newValue2]) => {
  const person1 = await personStore.getPersonById(newValue1.id)
  const person2 = await personStore.getPersonById(newValue2.id)

  let cleanedZodiac1: IZodiacChart = { ...initZodiacChart }
  let cleanedZodiac2: IZodiacChart = { ...initZodiacChart }

  if (person1 && person1.zodiac) {
    cleanedZodiac1 = cleanZodiacData(person1.zodiac)
  }

  if (person2 && person2.zodiac) {
    cleanedZodiac2 = cleanZodiacData(person2.zodiac)
  }
  if (toShow.value) {
    astroDataStore.getResultAstroData(cleanedZodiac1, cleanedZodiac2)
  }
})

const cleanZodiacData = (personZodiac: IZodiac) => {
  const res: IZodiacChart = { ...initZodiacChart }

  Object.keys(res).forEach((key) => {
    res[key] = personZodiac[key]
  })

  return res
}

const toggleCharts = () => {
  tempPersonVal.value = { ...choosenPerson1.value }
  choosenPerson1.value = { ...choosenPerson2.value }
  choosenPerson2.value = { ...tempPersonVal.value }
  tempPersonVal.value = { ...initPerson }
}

onMounted(() => {
  personStore.getPersons()
})
</script>

<template>
  <main class="px-3 mx-auto max-w-screen-xl">
    <div class="mt-6 mb-4 grid grid-cols-2 text-xl font-bold underline text-teal-400 text-center">
      <h1 class="max-w-xs">Astro Chart: {{ choosenPerson1.name }} {{ choosenPerson1.surname }}</h1>
      <h1 class="max-w-xs">Astro Chart: {{ choosenPerson2.name }} {{ choosenPerson2.surname }}</h1>
    </div>

    <div class="overflow-y-auto h-[calc(100%-5rem)]">
      <form class="grid grid-cols-12 text-white gap-6">
        <div class="col-span-5 flex mt-1 max-w-xs">
          <span
            class="inline-flex items-center px-3 text-xl font-bold text-teal-400 hover:text-teal-500 bg-gray-100 hover:bg-gray-50 border border-r-0 border-gray-300 rounded-l-md"
          >
            1
          </span>

          <select
            name="choosen1"
            v-model="choosenPerson1"
            class="bg-gray-50 rounded-none rounded-r-md border text-gray-700 focus:outline-none focus:ring-gray-500 focus:border-gray-400 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2"
          >
            <option value="-1" disabled selected>- Select option -</option>
            <option class="bg-gray-50" v-for="person in persons" :value="person" :key="person.id">
              {{ person.name }} {{ person.surname }}
            </option>
          </select>
        </div>
        <div class="col-span-2 flex justify-self-center mt-1 max-w-xs">
          <button
            class="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-700 transition duration-150 ease-in-out enabled:hover:bg-teal-600 bg-teal-500 rounded-md sm:rounded-lg text-white px-3 text-lg"
            type="button"
            @click.prevent="toggleCharts()"
          >
            {{ '\u{21C4}' }}
          </button>
        </div>
        <div class="col-span-5 flex mt-1 max-w-xs">
          <span
            class="inline-flex items-center px-3 text-xl font-bold text-teal-400 hover:text-teal-500 bg-gray-100 hover:bg-gray-50 border border-r-0 border-gray-300 rounded-l-md"
          >
            2
          </span>

          <select
            name="choosen2"
            v-model="choosenPerson2"
            class="bg-gray-50 rounded-none rounded-r-md border text-gray-700 focus:outline-none focus:ring-gray-500 focus:border-gray-400 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2"
          >
            <option value="-1" disabled selected>- Select option -</option>
            <option class="bg-gray-50" v-for="person in persons" :value="person" :key="person.id">
              {{ person.name }} {{ person.surname }}
            </option>
          </select>
        </div>
      </form>

      <div v-if="true">
        <div class="grid grid-cols-2 grid-flow-row gap-4 border-b-4">
          <div>
            <div v-if="toShow.person1">
              <ChartCard
                title="Chart 1: Stage 1"
                :data="currentDoubleAstroData[0].convertedResAllGrades[0]"
                :baseLevel="currentDoubleAstroData[0].baseLevelAllGrades[0]"
              />
            </div>
          </div>
          <div>
            <div v-if="toShow.person2">
              <ChartCard
                title="Chart 2: Stage 1"
                :data="currentDoubleAstroData[1].convertedResAllGrades[0]"
                :baseLevel="currentDoubleAstroData[1].baseLevelAllGrades[0]"
              />
            </div>
          </div>
        </div>
        <div class="grid grid-cols-2 grid-flow-row gap-6 border-b-4">
          <div>
            <div v-if="toShow.person1">
              <ChartCard
                title="Chart 1: Stage 2"
                :data="currentDoubleAstroData[0].convertedResAllGrades[1]"
                :baseLevel="currentDoubleAstroData[0].baseLevelAllGrades[1]"
              />
            </div>
          </div>
          <div>
            <div v-if="toShow.person2">
              <ChartCard
                title="Chart 2: Stage 2"
                :data="currentDoubleAstroData[1].convertedResAllGrades[1]"
                :baseLevel="currentDoubleAstroData[1].baseLevelAllGrades[1]"
              />
            </div>
          </div>
        </div>
        <div class="grid grid-cols-2 grid-flow-row gap-6">
          <div>
            <div v-if="toShow.person1">
              <ChartCard
                title="Chart 1: Stage 3"
                :data="currentDoubleAstroData[0].convertedResAllGrades[2]"
                :baseLevel="currentDoubleAstroData[0].baseLevelAllGrades[2]"
              />
            </div>
          </div>
          <div>
            <div v-if="toShow.person2">
              <ChartCard
                title="Chart 2: Stage 3"
                :data="currentDoubleAstroData[1].convertedResAllGrades[2]"
                :baseLevel="currentDoubleAstroData[1].baseLevelAllGrades[2]"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
