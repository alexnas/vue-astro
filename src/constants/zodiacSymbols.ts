const noEmoji = '\u{FE0E}'
const aries = '\u{2648}' + noEmoji
const taurus = '\u{2649}' + noEmoji
const gemini = '\u{264A}' + noEmoji
const cancer = '\u{264B}' + noEmoji
const leo = '\u{264C}' + noEmoji
const virgo = '\u{264D}' + noEmoji
const libra = '\u{264E}' + noEmoji
const scorpio = '\u{264F}' + noEmoji
const sagittarius = '\u{2650}' + noEmoji
const capricorn = '\u{2651}' + noEmoji
const aquarius = '\u{2652}' + noEmoji
const pisces = '\u{2653}' + noEmoji

interface IZodiacSymbols {
  [key: string]: string
}

export const zodiacSymbols: IZodiacSymbols = {
  aries,
  taurus,
  gemini,
  cancer,
  leo,
  virgo,
  libra,
  scorpio,
  sagittarius,
  capricorn,
  aquarius,
  pisces
}
