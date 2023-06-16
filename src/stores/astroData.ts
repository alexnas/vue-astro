import { ref } from 'vue'
import { defineStore } from 'pinia'
import type {
  IConvertedRes,
  IPersonSet,
  IInvertedObj,
  IBaseLevel,
  ISingleSet,
  ICurrentAstroData,
  IPerson
} from '../types'
import { dummyZodiac, dummyZodiac2 } from '@/data/dummyZodiacData'
import zodiacPlanets from '@/constants/zodiacPlanets'
import { initPerson } from '@/constants/personConstants'

const initCurrentAstroData: ICurrentAstroData = {
  0: {
    initZodiacObj: {},
    initAstroObjAllGrades: [],
    convertedResAllGrades: [],
    baseLevelAllGrades: []
  },
  1: {
    initZodiacObj: {},
    initAstroObjAllGrades: [],
    convertedResAllGrades: [],
    baseLevelAllGrades: []
  }
}

export const useAstroDataStore = defineStore('astroData', () => {
  const currentDoubleAstroData = ref<ICurrentAstroData>({ ...initCurrentAstroData })
  const choosenPerson1 = ref<IPerson>({ ...initPerson })
  const choosenPerson2 = ref<IPerson>({ ...initPerson })

  const getResultAstroData = (
    zodiacData1: IPersonSet = { ...dummyZodiac },
    zodiacData2: IPersonSet = { ...dummyZodiac2 }
  ) => {
    currentDoubleAstroData.value[0] = { ...getConvertedResultObj(zodiacData1) }
    currentDoubleAstroData.value[1] = { ...getConvertedResultObj(zodiacData2) }
  }

  const getAstroFromZodiac = (initZodiacObj: IPersonSet) => {
    const initAstroObjFirst: IPersonSet | null = {}
    const initAstroObjSecond: IPersonSet | null = {}
    const initAstroObjThird: IPersonSet | null = {}
    Object.keys(initZodiacObj).forEach((id) => {
      initAstroObjFirst[id] = zodiacPlanets[initZodiacObj[id]][0]
      initAstroObjSecond[id] = zodiacPlanets[initZodiacObj[id]][1]
      initAstroObjThird[id] = zodiacPlanets[initZodiacObj[id]][2]
    })
    const initAstroObjAllGrades = [initAstroObjFirst, initAstroObjSecond, initAstroObjThird]
    return initAstroObjAllGrades
  }

  const getConvertedResultObj = (initZodiacObj: IPersonSet): ISingleSet => {
    const initAstroObjAllGrades: IPersonSet[] = getAstroFromZodiac(initZodiacObj)

    const convertedResAllGrades: IConvertedRes[] = []
    const baseLevelAllGrades: IBaseLevel[] = []

    initAstroObjAllGrades.forEach((initObj) => {
      const { circles, branches } = getAstroData(initObj)
      const baseLevelFlat = circles.flat()

      const invertedObj: IInvertedObj = inverseInitObj({ ...initObj }, baseLevelFlat)
      const convertedRes = getResIdsObj(initObj, invertedObj, branches)
      convertedResAllGrades.push(convertedRes)
      baseLevelAllGrades.push(circles)
    })
    return { initZodiacObj, initAstroObjAllGrades, convertedResAllGrades, baseLevelAllGrades }
  }

  const getResIdsObj = (
    initObj: IPersonSet,
    invertedObj: IInvertedObj,
    branches: string[][]
  ): IConvertedRes => {
    const EmptyResObj = getEmptyResObj({ ...initObj })
    const obj: IConvertedRes = { ...EmptyResObj }

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

  const getEmptyResObj = (initialObj: IPersonSet): IConvertedRes => {
    const resObj = {} as IConvertedRes
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
    const tryArray: string[] = []

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
          if (tryArray.includes(curTail)) break
          tryArray.push(curTail)

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
    currentDoubleAstroData,
    choosenPerson1,
    choosenPerson2,
    getResultAstroData
  }
})
