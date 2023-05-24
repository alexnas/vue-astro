import {
  SUN,
  MOON,
  MERCURY,
  VENUS,
  EARTH,
  MARS,
  JUPITER,
  SATURN,
  URANUS,
  NEPTUNE,
  PLUTO,
  VULCAN
} from './planetsConstants'

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
} from './zodiacConstants'
import type { IZodiacSet } from '@/types'

const zodiacPlanets: IZodiacSet = {
  [ARIES]: [MARS, MERCURY, MERCURY],
  [TAURUS]: [VENUS, VULCAN, VULCAN],
  [GEMINI]: [MERCURY, VENUS, EARTH],
  [CANCER]: [MOON, NEPTUNE, NEPTUNE],
  [LEO]: [SUN, SUN, SUN],
  [VIRGO]: [MERCURY, MOON, JUPITER],
  [LIBRA]: [MERCURY, URANUS, SATURN],
  [SCORPIO]: [MARS, MARS, MERCURY],
  [SAGITTARIUS]: [JUPITER, EARTH, MARS],
  [CAPRICORN]: [SATURN, SATURN, VENUS],
  [AQUARIUS]: [URANUS, JUPITER, MOON],
  [PISCES]: [JUPITER, PLUTO, PLUTO]
}

export default zodiacPlanets
