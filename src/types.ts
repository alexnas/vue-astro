type IZodiacSet = { [key: string]: string[] }

type IPersonSet = { [key: string]: string }

interface IConverted {
  id: string
  parent: string
  level: number
  children: string[]
}

type IConvertedRes = { [key: string]: IConverted }

type IInvertedObj = { [key: string]: string[] }

type IBaseLevel = string[][]

interface ISingleSet {
  initZodiacObj: IPersonSet
  initAstroObjAllGrades: IPersonSet[]
  convertedResAllGrades: IConvertedRes[]
  baseLevelAllGrades: IBaseLevel[]
}

type ICurrentAstroData = { [id: number]: ISingleSet }

interface IPerson {
  id: number
  name: string
  surname: string
  birthday: string
  timezone: string
  birthplace: string
  description: string
  createdAt: string
  updatedAt: string
}

interface IZodiac {
  id: number
  sun: string
  moon: string
  mercury: string
  venus: string
  mars: string
  jupiter: string
  saturn: string
  uranus: string
  neptune: string
  pluto: string
  retro: string[]
  description: string
  createdAt: string
  updatedAt: string
  personId: number
}

export type {
  IPersonSet,
  IConverted,
  IConvertedRes,
  IZodiacSet,
  IInvertedObj,
  IBaseLevel,
  ISingleSet,
  ICurrentAstroData,
  IPerson,
  IZodiac
}
