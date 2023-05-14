import type { IPersonSet } from '@/types'

const dummyData1: IPersonSet = {
  sun: 'moon',
  moon: 'venus',
  mercury: 'neptune',
  venus: 'saturn',
  mars: 'venus',
  jupiter: 'earth',
  saturn: 'mars',
  uranus: 'uranus',
  neptune: 'pluto',
  pluto: 'neptune'
}

const dummyData2: IPersonSet = {
  sun: 'pluto',
  moon: 'saturn',
  mercury: 'pluto',
  venus: 'pluto',
  mars: 'earth',
  jupiter: 'jupiter',
  saturn: 'moon',
  uranus: 'uranus',
  neptune: 'uranus',
  pluto: 'sun'
}
export { dummyData1, dummyData2 as dummyData }
