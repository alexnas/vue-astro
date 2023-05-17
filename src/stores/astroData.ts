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
  const currenLevel = ref<number>(1)
  const idsByLevel = reactive<string[][]>([])

  const convertedInitDataArr = computed(() => {
    const arr = [] as IConverted1[]

    Object.keys(initObj).forEach((planet) => {
      const parent: string = initObj[planet]
      arr.push({ id: planet, parent, level: -1, children: [] })
    })
    return arr
  })

  const convertedInitDataObj = computed((): IConverted2 => {
    return getConvertedDataObj()
  })

  const convertedResultDataObj = computed((): IConverted2 => {
    return getConvertedDataObj()
  })

  const getConvertedDataObj = (): IConverted2 => {
    const obj = {} as IConverted2
    Object.keys(initObj).forEach((planet) => {
      const parent: string = initObj[planet]
      obj[planet] = { id: planet, parent, level: -1, children: [] }
    })
    return obj
  }

  const baseLevelFlatTotal = computed((): string[] => {
    return [...baseLevelFlatMono, ...baseLevelFlatPoly.value]
  })

  const allLevelsFlatTotal = computed((): string[] => {
    let res: string[] = []
    idsByLevel.forEach((item: string[]) => {
      res = [...res, ...item]
    })
    return res
  })

  const idsCurrentRest = computed(() => {
    let difference: string[] = []
    difference = idsAllArr.filter((item) => !allLevelsFlatTotal.value.includes(item))
    return difference
  })

  const getCurrentLevelIds = () => {
    getBaseLevel()

    while (idsCurrentRest.value.length > 0 && currenLevel.value < 12) {
      currenLevel.value += 1

      const levelFlatIds: string[] = []
      idsAllArr.forEach((id) => {
        if (
          allLevelsFlatTotal.value.includes(initObj[id]) &&
          !allLevelsFlatTotal.value.includes(id)
        ) {
          levelFlatIds.push(id)
          convertedRes.value[id]['level'] = currenLevel.value
          if (convertedRes.value[initObj[id]]) {
            convertedRes.value[initObj[id]]['children'].push(id)
          }
        }
      })

      idsByLevel.push(levelFlatIds)
    }
  }

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
    idsByLevel.push(baseLevelFlatTotal.value)

    return { baseLevel, baseLevelFlatMono, baseLevelFlatPoly, idsAllArr }
  }

  return {
    initObj,
    baseLevel,
    baseLevelFlatMono,
    baseLevelFlatPoly,
    baseLevelFlatTotal,
    idsAllArr,
    convertedInitDataArr,
    convertedInitDataObj,
    convertedRes,
    idsCurrentRest,
    currenLevel,
    idsByLevel,
    allLevelsFlatTotal,
    getBaseLevel,
    getCurrentLevelIds
  }
})