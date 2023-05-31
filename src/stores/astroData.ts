import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { IConverted2, IPersonSet, IInvertedObj, IBaseLevel } from '../types'
import { dummyZodiac } from '@/data/dummyZodiacData'
import zodiacPlanets from '@/constants/zodiacPlanets'

export const useAstroDataStore = defineStore('astroData', () => {
  const initZodiacObj = ref<IPersonSet>({}) // Initial zodiac data to compute - from dummy Zodiac
  const initAstroObjAllGrades = ref<IPersonSet[]>([]) // Initial astro data from zodiac to compute - from dummy Zodiac
  const convertedResAllByGrades = ref<IConverted2[]>([]) // Resulted object after all convertions
  const baseLevelAllGrades = ref<IBaseLevel[]>([]) // Base lavel ids all around

  const getZodiacData = () => {
    initZodiacObj.value = { ...dummyZodiac }
  }

  const getAstroFromZodiac = () => {
    const initAstroObjFirst: IPersonSet | null = {}
    const initAstroObjSecond: IPersonSet | null = {}
    const initAstroObjThird: IPersonSet | null = {}
    Object.keys(initZodiacObj.value).forEach((id) => {
      initAstroObjFirst[id] = zodiacPlanets[initZodiacObj.value[id]][0]
      initAstroObjSecond[id] = zodiacPlanets[initZodiacObj.value[id]][1]
      initAstroObjThird[id] = zodiacPlanets[initZodiacObj.value[id]][2]
    })
    initAstroObjAllGrades.value = [initAstroObjFirst, initAstroObjSecond, initAstroObjThird]

    return [initAstroObjFirst, initAstroObjSecond, initAstroObjThird]
  }

  const getConvertedResultObj = (): void => {
    getZodiacData()
    getAstroFromZodiac()

    initAstroObjAllGrades.value.forEach((initObj) => {
      const { circles, branches } = getAstroData(initObj)
      const baseLevelFlat = circles.flat()

      const invertedObj: IInvertedObj = inverseInitObj({ ...initObj }, baseLevelFlat)
      const convertedRes = getResIdsObj(initObj, invertedObj, branches)
      convertedResAllByGrades.value.push(convertedRes)
      baseLevelAllGrades.value.push(circles)
    })
  }

  const getResIdsObj = (
    initObj: IPersonSet,
    invertedObj: IInvertedObj,
    branches: string[][]
  ): IConverted2 => {
    const EmptyResObj = getEmptyResObj({ ...initObj })
    const obj: IConverted2 = { ...EmptyResObj }

    branches.forEach((branch) => {
      for (let i = 0; i < branch.length; i++) {
        const planet = branch[i]
        const parent: string = initObj[planet] || planet
        obj[planet]['parent'] = parent
        obj[planet]['level'] = branch.length - i
      }
      Object.keys(invertedObj).forEach((currKey) => {
        obj[currKey]['children'] = invertedObj[currKey]
      })
    })

    return obj
  }

  const getEmptyResObj = (initialObj: IPersonSet): IConverted2 => {
    const resObj = {} as IConverted2
    Object.keys(initialObj).forEach((planet) => {
      const parent: string = initialObj[planet]
      resObj[planet] = { id: planet, parent, level: -1, children: [] }
    })
    Object.values(initialObj).forEach((planet) => {
      if (planet === 'earth' || planet === 'vulcan') {
        resObj[planet] = { id: planet, parent: planet, level: 1, children: [] }
      }
    })
    return resObj
  }

  const inverseInitObj = (initialObj: IPersonSet, baseLevelFlat: string[]): IInvertedObj => {
    const invertedObj = {} as IInvertedObj
    Object.values(initialObj).forEach((currVal) => {
      invertedObj[currVal] = []
    })

    Object.keys(initialObj).forEach((currKey) => {
      const currVal: string = initialObj[currKey]
      if (!baseLevelFlat.includes(currKey)) {
        invertedObj[currVal].push(currKey)
      }
    })
    return invertedObj
  }

  const getAstroData = (initObj: IPersonSet) => {
    const ids = Object.keys({ ...initObj })
    const parents = Object.values({ ...initObj })
    const tails = ids.filter((id) => !parents.includes(id))

    let stack: string[] = []
    const lines: string[][] = []
    const branches: string[][] = []
    const circles: string[][] = []

    tails.forEach((tail) => {
      let curTail: string = tail
      stack.push(curTail)

      do {
        if (!stack.includes(curTail)) stack.push(curTail)
        if (!stack.includes(initObj[curTail])) stack.push(initObj[curTail])
        curTail = initObj[curTail]
        let branch: string[] = []
        let circle: string[] = []

        if (curTail === 'earth' || curTail === 'vulcan') {
          branch = stack
          circle = [curTail]
          branches.push(branch)
          circles.push(circle)
          break
        }
        if (stack.includes(initObj[curTail])) {
          const { lineArr, circleArr } = separateLineAndCircle(stack, initObj[curTail])
          branch = lineArr
          circle = circleArr

          branches.push(branch)
        }
        const isIncludedAlready = isItemExist(circles, circle[0])
        if (circle.length > 0 && !isIncludedAlready) {
          circles.push(circle)
        }
      } while (!stack.includes(initObj[curTail]))

      lines.push(stack)
      stack = []
    })

    return { circles, branches }
  }

  const isItemExist = (circles: string[][], item: string) => {
    let res = false
    circles.forEach((circleItem) => {
      if (circleItem.includes(item)) {
        res = true
      }
    })
    return res
  }

  const separateLineAndCircle = (arr: string[], item: string) => {
    const idx: number = arr.findIndex((i) => i === item)
    const lineArr = arr.slice(0, idx + 1)
    const circleArr = arr.slice(idx, arr.length)

    return { lineArr, circleArr }
  }

  return {
    initZodiacObj,
    initAstroObjAllGrades,
    convertedResAllByGrades,
    baseLevelAllGrades,
    getConvertedResultObj
  }
})
