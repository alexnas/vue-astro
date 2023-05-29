import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { IConverted2, IPersonSet } from '../types'
import { dummyZodiac } from '@/data/dummyZodiacData'
import zodiacPlanets from '@/constants/zodiacPlanets'
import { dummyData } from '@/data/basicData'

export const useAstroDataStore = defineStore('astroData', () => {
  const initObj = ref<IPersonSet>({}) // Initial data to compute - old fashion
  const initAstroDummyObj = ref<IPersonSet>({}) // Initial data to compute - from dummy Astro
  const initZodiacObj = ref<IPersonSet>({}) // Initial zodiac data to compute - from dummy Zodiac
  const initAstroObjAll = ref<IPersonSet[]>([]) // Initial astro data from zodiac to compute - from dummy Zodiac
  const baseLevel = ref<string[][]>([]) // Base lavel ids all around
  const baseLevelFlat = ref<string[]>([]) // Base lavel ids all around - flat array
  const allBranches = ref<string[][]>([]) // All branches
  const tails = ref<string[]>([]) // tail items in all branches
  const convertedRes = ref<IConverted2>({}) // Resulted object after all convertions

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

  type IInvertedObj = { [key: string]: string[] }

  const inverseInitObj = (initialObj: IPersonSet): IInvertedObj => {
    const invertedObj = {} as IInvertedObj
    Object.values(initialObj).forEach((currVal) => {
      invertedObj[currVal] = []
    })

    Object.keys(initialObj).forEach((currKey) => {
      const currVal: string = initialObj[currKey]
      if (!baseLevelFlat.value.includes(currKey)) {
        invertedObj[currVal].push(currKey)
      }
    })
    return invertedObj
  }

  const getResIdsObj = (): IConverted2 => {
    const EmptyResObj = getEmptyResObj({ ...initObj.value })
    const invertedObj: IInvertedObj = inverseInitObj({ ...initObj.value })
    const obj: IConverted2 = { ...EmptyResObj }

    allBranches.value.forEach((branch) => {
      for (let i = 0; i < branch.length; i++) {
        const planet = branch[i]
        const parent: string = initObj.value[planet] || planet
        obj[planet]['parent'] = parent
        obj[planet]['level'] = branch.length - i
      }
      Object.keys(invertedObj).forEach((currKey) => {
        obj[currKey]['children'] = invertedObj[currKey]
      })
    })

    convertedRes.value = obj
    return convertedRes.value
  }
  const chooseInitialAstroData = () => {
    initObj.value = { ...initAstroObjAll.value[0] }
    // initObj.value = { ...initAstroObjAll.value[1] }
    // initObj.value = { ...initAstroObjAll.value[2] }
    // initObj.value = { ...initAstroDummyObj.value }
  }

  const getDummyAstroData = () => {
    initAstroDummyObj.value = { ...dummyData }
  }

  const getZodiacData = () => {
    initZodiacObj.value = { ...dummyZodiac }
  }

  const getAstroFromZodiac = () => {
    getZodiacData()
    getDummyAstroData()
    const initAstroObjFirst: IPersonSet | null = {}
    const initAstroObjSecond: IPersonSet | null = {}
    const initAstroObjThird: IPersonSet | null = {}
    Object.keys(initZodiacObj.value).forEach((id) => {
      initAstroObjFirst[id] = zodiacPlanets[initZodiacObj.value[id]][0]
      initAstroObjSecond[id] = zodiacPlanets[initZodiacObj.value[id]][1]
      initAstroObjThird[id] = zodiacPlanets[initZodiacObj.value[id]][2]
    })
    initAstroObjAll.value = [initAstroObjFirst, initAstroObjSecond, initAstroObjThird]
    return [initAstroObjFirst, initAstroObjSecond, initAstroObjThird]
  }

  const getAstroData = () => {
    chooseInitialAstroData()

    const ids = Object.keys({ ...initObj.value })
    const parents = Object.values({ ...initObj.value })
    tails.value = ids.filter((id) => !parents.includes(id))

    let stack: string[] = []
    const lines: string[][] = []
    const branches: string[][] = []
    const circles: string[][] = []

    tails.value.forEach((tail) => {
      let curTail: string = tail
      stack.push(curTail)

      do {
        if (!stack.includes(curTail)) stack.push(curTail)
        if (!stack.includes(initObj.value[curTail])) stack.push(initObj.value[curTail])
        curTail = initObj.value[curTail]
        let branch: string[] = []
        let circle: string[] = []

        if (curTail === 'earth' || curTail === 'vulcan') {
          branch = stack
          circle = [curTail]
          branches.push(branch)
          circles.push(circle)
          break
        }
        if (stack.includes(initObj.value[curTail])) {
          const { lineArr, circleArr } = separateLineAndCircle(stack, initObj.value[curTail])
          branch = lineArr
          circle = circleArr

          branches.push(branch)
        }
        const isIncludedAlready = isItemExist(circles, circle[0])
        if (circle.length > 0 && !isIncludedAlready) {
          circles.push(circle)
        }
      } while (!stack.includes(initObj.value[curTail]))

      lines.push(stack)
      stack = []
    })
    baseLevel.value = circles
    baseLevelFlat.value = circles.flat()
    allBranches.value = branches
    return 'inside'
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
    initObj,
    initAstroDummyObj,
    initAstroObjAll,
    initZodiacObj,
    baseLevel,
    allBranches,
    convertedRes,
    tails,
    getDummyAstroData,
    getAstroData,
    getAstroFromZodiac,
    getResIdsObj
  }
})
