type IZodiacSet = { [key: string]: string[] }

type IPersonSet = { [key: string]: string }

interface IConverted1 {
  id: string
  parent: string
  level: number
  children: string[]
}

type IConverted2 = { [key: string]: IConverted1 }

type IInvertedObj = { [key: string]: string[] }

export type { IPersonSet, IConverted1, IConverted2, IZodiacSet, IInvertedObj }
