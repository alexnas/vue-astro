import type { IPerson } from '@/types'

const checkIfExistByName = (tryPerson: IPerson, persons: IPerson[]) => {
  const idx = persons.findIndex(
    (item) =>
      item.name === tryPerson.name && item.surname === tryPerson.surname && item.id !== tryPerson.id
  )
  if (idx >= 0) {
    console.log(
      `Error: There is already such person instance with name=${tryPerson.name} and surname=${tryPerson.surname}`
    )
    return !!idx
  }
  return null
}

const checkIfNotExistById = (id: number, persons: IPerson[]) => {
  const idx = persons.findIndex((item) => item.id === id)
  if (idx === -1) {
    console.log(`Error: There is no such person instance with id=${id}`)
    return
  }
  return idx
}

export { checkIfExistByName, checkIfNotExistById }
