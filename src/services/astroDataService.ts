import type { IPersonSet } from '@/types'

export const checkEmptyValue = (initZodiacObj: IPersonSet): boolean => {
  let isEmptyValue = false
  Object.values(initZodiacObj).filter((item) => {
    if (item.trim() === '') {
      isEmptyValue = true
    }
  })
  return isEmptyValue
}
