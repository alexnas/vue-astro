import type { IPerson } from '@/types'

const findExistedPersonByName = (tryPerson: IPerson, persons: IPerson[]) => {
  const idx = persons.findIndex(
    (item) =>
      item.name === tryPerson.name && item.surname === tryPerson.surname && item.id !== tryPerson.id
  )
  if (idx >= 0) {
    console.log(
      `Error: There is already such person instance with name=${tryPerson.name} and surname=${tryPerson.surname}`
    )
  }
  return idx
}

const findNotExistedPersonById = (id: number, persons: IPerson[]) => {
  const idx = persons.findIndex((item) => item.id === id)
  if (idx === -1) {
    console.log(`Error: There is no such person instance with id=${id}`)
  }
  return idx
}

function makeSortedByProperty<T extends Object>(sortProperty: keyof T, sortOrder: 'asc' | 'desc') {
  const compareFn = (a: T, b: T) => {
    const val1 = a[sortProperty]
    const val2 = b[sortProperty]
    const order = sortOrder !== 'desc' ? 1 : -1

    switch (typeof val1) {
      case 'number': {
        const valb = val2 as number
        const result = val1 - valb
        return result * order
      }
      case 'string': {
        const valb = val2 as string
        const result = val1.localeCompare(valb)
        return result * order
      }
      // add other cases like boolean, etc.
      default:
        return 0
    }
  }
  return compareFn
}

export { findExistedPersonByName, findNotExistedPersonById, makeSortedByProperty }
