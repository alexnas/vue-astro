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

export type {
  IPersonSet,
  IConverted,
  IConvertedRes,
  IZodiacSet,
  IInvertedObj,
  IBaseLevel,
  ISingleSet,
  ICurrentAstroData
}
