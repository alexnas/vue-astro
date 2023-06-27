interface IPlanetConst {
  [key: string]: string
}

export const SUN = 'sun'
export const MOON = 'moon'
export const MERCURY = 'mercury'
export const VENUS = 'venus'
export const EARTH = 'earth'
export const MARS = 'mars'
export const JUPITER = 'jupiter'
export const SATURN = 'saturn'
export const URANUS = 'uranus'
export const NEPTUNE = 'neptune'
export const PLUTO = 'pluto'
export const VULCAN = 'vulcan'

export const planetItems: string[] = [
  'sun',
  'moon',
  'mercury',
  'venus',
  'earth',
  'mars',
  'jupiter',
  'saturn',
  'uranus',
  'neptune',
  'pluto',
  'vulcan'
]

export const planetSymbols: IPlanetConst = {
  sun: '\u{2609}',
  moon: '\u{263D}',
  mercury: '\u{263F}',
  venus: '\u{2640}',
  mars: '\u{2642}',
  jupiter: '\u{2643}',
  saturn: '\u{2644}',
  uranus: '\u{2645}',
  neptune: '\u{2646}',
  pluto: '\u{2647}',
  earth: '\u{2641}',
  vulcan: '\u{25B3}'
}

export const planetShort: IPlanetConst = {
  sun: 'Sun',
  moon: 'Moo',
  mercury: 'Mer',
  venus: 'Ven',
  mars: 'Mar',
  jupiter: 'Jup',
  saturn: 'Sat',
  uranus: 'Ura',
  neptune: 'Nep',
  pluto: 'Plu',
  earth: 'Ear',
  vulcan: 'Vul'
}
