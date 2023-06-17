import type { IPersonSet } from '@/types'
import { planetItems } from '@/constants/planetsConstants'

const checkEmptyValue = (initZodiacObj: IPersonSet): boolean => {
  let isEmptyValue = false
  Object.values(initZodiacObj).filter((item) => {
    if (item.trim() === '') {
      isEmptyValue = true
    }
  })
  return isEmptyValue
}

const getBaseLevel = (initObj: IPersonSet) => {
  const baseLevelFlatMono: string[] = []
  let baseLevelFlatPoly: string[] = []
  const baseLevel: string[][] = []

  // Get special planets on the base lavel
  planetItems.forEach((item) => {
    if (initObj[item] === 'earth' || initObj[item] === 'vulcan') {
      if (!baseLevelFlatMono.includes(initObj[item])) {
        baseLevelFlatMono.push(initObj[item])
        baseLevel.push([initObj[item]])
      }
    }
  })

  // Get Mono planets on the base lavel
  planetItems.forEach((item) => {
    if (initObj[item] === item) {
      baseLevelFlatMono.push(initObj[item])
      baseLevel.push([initObj[item]])
    }
  })

  // Get Poly planets on the base lavel
  planetItems.forEach((item) => {
    if (baseLevelFlatMono.includes(item) || baseLevelFlatPoly.includes(item)) {
      return
    }

    // Get Cycles of planets
    const cycleFoundArr = []
    let currCycleItem = item

    let startFoundCycle = item
    let tempCounter = 0
    while (tempCounter <= 10) {
      tempCounter++
      cycleFoundArr.push(currCycleItem)
      if (
        !initObj[currCycleItem] ||
        baseLevelFlatMono.includes(initObj[currCycleItem]) ||
        baseLevelFlatPoly.includes(initObj[currCycleItem])
      ) {
        break
      }

      if (cycleFoundArr.includes(initObj[currCycleItem])) {
        startFoundCycle = initObj[currCycleItem]
        const cycleFoundResult = cycleFoundArr.splice(cycleFoundArr.indexOf(startFoundCycle))

        baseLevel.push(cycleFoundResult)
        baseLevelFlatPoly = [...baseLevelFlatPoly, ...cycleFoundResult]
        break
      }

      currCycleItem = initObj[currCycleItem]
    }
  })

  const baseLevelFlat = [...baseLevelFlatMono, ...baseLevelFlatPoly]
  return { baseLevel, baseLevelFlat, baseLevelFlatMono, baseLevelFlatPoly }
}

export { checkEmptyValue, getBaseLevel }
