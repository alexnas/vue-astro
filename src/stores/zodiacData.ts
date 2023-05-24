import { onMounted, reactive } from 'vue'
import { defineStore } from 'pinia'
import type { IPersonSet, IZodiacSet } from './../types'
import { dummyZodiac } from '@/data/dummyZodiacData'
import zodiacPlanets from '@/constants/zodiacPlanets'

export const useZodiacDataStore = defineStore('zodiacData', () => {
  const initZodiacObj = reactive<IPersonSet>({ ...dummyZodiac }) // Initial zodiac data to compute
  const initAstroObjByGrade = reactive<IPersonSet>({ ...dummyZodiac })
  const initAstroObjAllGrades = reactive<IZodiacSet>({})

  const getAstroFromZodiac = () => {
    Object.keys(initZodiacObj).forEach((id) => {
      initAstroObjByGrade[id] = zodiacPlanets[initZodiacObj[id]][0]
      initAstroObjAllGrades[id] = zodiacPlanets[initZodiacObj[id]]
    })
  }

  onMounted(() => {
    getAstroFromZodiac()
  })

  return {
    initZodiacObj,
    initAstroObjByGrade,
    initAstroObjAllGrades
  }
})
