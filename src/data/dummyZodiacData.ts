import {
  SUN,
  MOON,
  MERCURY,
  VENUS,
  MARS,
  JUPITER,
  SATURN,
  URANUS,
  NEPTUNE,
  PLUTO
} from '../constants/planetsConstants'

import {
  ARIES,
  TAURUS,
  GEMINI,
  CANCER,
  LEO,
  VIRGO,
  LIBRA,
  SCORPIO,
  SAGITTARIUS,
  CAPRICORN,
  AQUARIUS,
  PISCES
} from '../constants/zodiacConstants'

const dummyZodiac1 = {
  [SUN]: PISCES,
  [MOON]: LIBRA,
  [MERCURY]: PISCES,
  [VENUS]: PISCES,
  [MARS]: GEMINI,
  [JUPITER]: VIRGO,
  [SATURN]: SAGITTARIUS,
  [URANUS]: LEO,
  [NEPTUNE]: SCORPIO,
  [PLUTO]: LEO
}

const dummyZodiac2 = {
  [SUN]: TAURUS,
  [MOON]: SCORPIO,
  [MERCURY]: TAURUS,
  [VENUS]: GEMINI,
  [MARS]: AQUARIUS,
  [JUPITER]: LEO,
  [SATURN]: SAGITTARIUS,
  [URANUS]: CANCER,
  [NEPTUNE]: LIBRA,
  [PLUTO]: LEO
}

export { dummyZodiac1 as dummyZodiac, dummyZodiac2 }
