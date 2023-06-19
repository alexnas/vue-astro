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

export { findExistedPersonByName, findNotExistedPersonById }
