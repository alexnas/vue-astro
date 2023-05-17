type IPersonSet = { [key: string]: string }
// type IPersonSet  = {
//   sun: string
//   moon: string
//   mercury: string
//   venus: string
//   mars: string
//   jupiter: string
//   saturn: string
//   uranus: string
//   neptune: string
//   pluto: string
// }

interface IConverted1 {
  id: string
  parent: string
  level: number
  children: string[]
}

type IConverted2 = { [key: string]: IConverted1 }

export type { IPersonSet, IConverted1, IConverted2 }
