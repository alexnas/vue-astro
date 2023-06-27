import type { IZodiac, IZodiacChart } from '@/types'

interface IZodiacSymbols {
  [key: string]: string
}

export const ARIES = 'aries'
export const TAURUS = 'taurus'
export const GEMINI = 'gemini'
export const CANCER = 'cancer'
export const LEO = 'leo'
export const VIRGO = 'virgo'
export const LIBRA = 'libra'
export const SCORPIO = 'scorpio'
export const SAGITTARIUS = 'sagittarius'
export const CAPRICORN = 'capricorn'
export const AQUARIUS = 'aquarius'
export const PISCES = 'pisces'

export const zodiacItems: string[] = [
  'aries',
  'taurus',
  'gemini',
  'cancer',
  'leo',
  'virgo',
  'libra',
  'scorpio',
  'sagittarius',
  'capricorn',
  'aquarius',
  'pisces'
]

export const initZodiac: IZodiac = {
  id: -1,
  sun: '',
  moon: '',
  mercury: '',
  venus: '',
  mars: '',
  jupiter: '',
  saturn: '',
  uranus: '',
  neptune: '',
  pluto: '',
  retro: [],
  description: '',
  createdAt: '',
  updatedAt: '',
  personId: -1
}

export const initZodiacChart: IZodiacChart = {
  sun: '',
  moon: '',
  mercury: '',
  venus: '',
  mars: '',
  jupiter: '',
  saturn: '',
  uranus: '',
  neptune: '',
  pluto: ''
}

const noEmoji = '\u{FE0E}'

export const zodiacSymbols: IZodiacSymbols = {
  aries: '\u{2648}' + noEmoji,
  taurus: '\u{2649}' + noEmoji,
  gemini: '\u{264A}' + noEmoji,
  cancer: '\u{264B}' + noEmoji,
  leo: '\u{264C}' + noEmoji,
  virgo: '\u{264D}' + noEmoji,
  libra: '\u{264E}' + noEmoji,
  scorpio: '\u{264F}' + noEmoji,
  sagittarius: '\u{2650}' + noEmoji,
  capricorn: '\u{2651}' + noEmoji,
  aquarius: '\u{2652}' + noEmoji,
  pisces: '\u{2653}' + noEmoji
}
