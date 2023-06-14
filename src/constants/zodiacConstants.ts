import type { IZodiac } from '@/types'

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
