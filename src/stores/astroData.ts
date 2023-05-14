import { computed, reactive, ref } from 'vue'
import { defineStore } from 'pinia'
import type { IConverted1, IConverted2, IPersonSet } from './../types'
import { dummyData } from '@/data/basicData'

export const useAstroDataStore = defineStore('astroData', () => {
  const initObj = reactive<IPersonSet>({ ...dummyData }) // Initial data to compute
  const baseLevel = reactive<string[][]>([]) // Base lavel ids all around
  const baseLevelFlatMono = reactive<string[]>([]) // Base lavel ids in MONO groups
  const baseLevelFlatPoly = ref<string[]>([]) // Base lavel ids in POLY groups
  const idsAllArr = reactive<string[]>(Object.keys(initObj)) // All ids (keys) from initial object
  const convertedRes = ref<IConverted2>({}) // Resulted object after all convertions

  const convertedInitDataArr = computed(() => {
    const arr = [] as IConverted1[]

    Object.keys(initObj).forEach((planet) => {
      const parent: string = initObj[planet]
      arr.push({ id: planet, parent, level: -1, children: [] })
    })
    return arr
  })

  const convertedInitDataObj = computed(() => {
    return getConvertedDataObj()
  })

  const convertedResultDataObj = computed(() => {
    return getConvertedDataObj()
  })

  const getConvertedDataObj = () => {
    const obj = {} as IConverted2
    Object.keys(initObj).forEach((planet) => {
      const parent: string = initObj[planet]
      obj[planet] = { id: planet, parent, level: -1, children: [] }
    })
    return obj
  }

  // ==========================================
  const getBaseLevel = () => {
    const checkedIdsSafe = [] // Ids already checked in the cycles

    // Get Earth and Vulcan
    idsAllArr.forEach((id) => {
      if (initObj[id] === 'earth' || initObj[id] === 'vulcan') {
        baseLevelFlatMono.push(initObj[id])
        checkedIdsSafe.push(initObj[id])
        baseLevel.push([initObj[id]])
        convertedResultDataObj.value[id]['level'] = 1
      }
    })

    // Get Mono planets in the base lavel
    idsAllArr.forEach((id) => {
      if (initObj[id] === id) {
        baseLevelFlatMono.push(initObj[id])
        checkedIdsSafe.push(initObj[id])
        baseLevel.push([initObj[id]])
        convertedResultDataObj.value[id]['level'] = 1
      }
    })

    // Get Poly planets in the base lavel
    idsAllArr.forEach((id) => {
      if (baseLevelFlatMono.includes(id) || baseLevelFlatPoly.value.includes(id)) {
        return
      }

      // Find Cycles
      const cycleFoundArr = []
      let currCycleId = id

      let startFoundCycle = id
      let tempCounter = 0
      while (tempCounter <= 10) {
        tempCounter++
        cycleFoundArr.push(currCycleId)
        if (
          !initObj[currCycleId] ||
          baseLevelFlatMono.includes(initObj[currCycleId]) ||
          baseLevelFlatPoly.value.includes(initObj[currCycleId])
        ) {
          break
        }

        if (cycleFoundArr.includes(initObj[currCycleId])) {
          startFoundCycle = initObj[currCycleId]
          const cycleFoundResult = cycleFoundArr.splice(cycleFoundArr.indexOf(startFoundCycle))

          baseLevel.push(cycleFoundResult)
          baseLevelFlatPoly.value = [...baseLevelFlatPoly.value, ...cycleFoundResult]
          break
        }

        currCycleId = initObj[currCycleId]
      }
    })

    baseLevelFlatPoly.value.forEach((id) => {
      convertedResultDataObj.value[id]['level'] = 1
    })

    convertedRes.value = convertedResultDataObj.value

    return { baseLevel, baseLevelFlatMono, baseLevelFlatPoly, idsAllArr }
  }
  // ==========================================

  return {
    initObj,
    baseLevel,
    baseLevelFlatMono,
    baseLevelFlatPoly,
    idsAllArr,
    convertedInitDataArr,
    convertedInitDataObj,
    convertedRes,
    getBaseLevel
  }
})
