import { computed, onMounted, reactive } from 'vue'
import { defineStore } from 'pinia'
import type { IPersonSet } from './../types'
import { dummyZodiac } from '@/data/dummyZodiacData'
import zodiacPlanets from '@/constants/zodiacPlanets'

export const useZodiacDataStore = defineStore('zodiacData', () => {
  const initZodiacObj = reactive<IPersonSet>({ ...dummyZodiac }) // Initial zodiac data to compute
  const initAstroObjFirst = reactive<IPersonSet>({ ...dummyZodiac })
  const initAstroObjSecond = reactive<IPersonSet>({ ...dummyZodiac })
  const initAstroObjThird = reactive<IPersonSet>({ ...dummyZodiac })

  const initAstroObjAll = computed<IPersonSet[]>(() => {
    return [initAstroObjFirst, initAstroObjSecond, initAstroObjThird]
  })

  const getAstroFromZodiac = () => {
    Object.keys(initZodiacObj).forEach((id) => {
      initAstroObjFirst[id] = zodiacPlanets[initZodiacObj[id]][0]
      initAstroObjSecond[id] = zodiacPlanets[initZodiacObj[id]][1]
      initAstroObjThird[id] = zodiacPlanets[initZodiacObj[id]][2]
    })
  }

  onMounted(() => {
    getAstroFromZodiac()
  })

  return {
    initZodiacObj,
    initAstroObjAll
  }
})
