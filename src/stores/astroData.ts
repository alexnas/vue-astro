import { computed, reactive } from 'vue'
import { defineStore } from 'pinia'
import type { IConverted1, IConverted2, IPersonSet } from './../types'
import { dummyData } from '@/data/basicData'

export const useAstroDataStore = defineStore('astroData', () => {
  const initObj = reactive<IPersonSet>({ ...dummyData })

  const convertedInitDataObj = computed(() => {
    return getConvertedDataObj()
  })

  const convertedResultDataObj = computed(() => {
    return getConvertedDataObj()
  })

  // ==========================================
  const getBaseLevel = computed(() => {
    const baseLevelFlatMono: string[] = [] // Base lavel ids in MONO groups
    let baseLevelFlatPoly: string[] = [] // Base lavel ids in POLY groups
    const baseLevel: string[][] = [] // Base lavel ids all around
    const idsAllArr = Object.keys(initObj) // All ids (keys) from initial object
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
      if (baseLevelFlatMono.includes(id) || baseLevelFlatPoly.includes(id)) {
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
          baseLevelFlatPoly.includes(initObj[currCycleId])
        ) {
          break
        }

        if (cycleFoundArr.includes(initObj[currCycleId])) {
          startFoundCycle = initObj[currCycleId]
          const cycleFoundResult = cycleFoundArr.splice(cycleFoundArr.indexOf(startFoundCycle))

          baseLevel.push(cycleFoundResult)
          baseLevelFlatPoly = [...baseLevelFlatPoly, ...cycleFoundResult]
          break
        }

        currCycleId = initObj[currCycleId]
      }
    })

    baseLevelFlatPoly.forEach((id) => {
      convertedResultDataObj.value[id]['level'] = 1
    })

    return { baseLevel, baseLevelFlatMono, baseLevelFlatPoly, idsAllArr }
  })
  // ==========================================

  const convertedInitDataArr = computed(() => {
    const arr = [] as IConverted1[]

    Object.keys(initObj).forEach((planet) => {
      const parent: string = initObj[planet]
      arr.push({ id: planet, parent, level: -1, children: [] })
    })
    return arr
  })

  const getConvertedDataObj = () => {
    const obj = {} as IConverted2
    Object.keys(initObj).forEach((planet) => {
      const parent: string = initObj[planet]
      obj[planet] = { id: planet, parent, level: -1, children: [] }
    })
    return obj
  }

  return {
    initObj,
    convertedInitDataArr,
    convertedInitDataObj,
    convertedResultDataObj,
    getBaseLevel
  }
})
