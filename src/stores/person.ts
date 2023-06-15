import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { IPerson, IZodiac } from '@/types'
import { PERSON_API, ZODIAC_API } from '@/constants/apiConstants'
import { initPerson } from '@/constants/personConstants'
import { getAll, getOneById, create, update, deleteById } from '@/services/apiService'
import { initZodiac } from '@/constants/zodiacConstants'
import { checkIfExistByName, checkIfNotExistById } from '@/services/personService'

export const usePersonStore = defineStore('person', () => {
  const persons = ref<IPerson[]>([])
  const currentPerson = ref<IPerson>({ ...initPerson })
  const preEditedPerson = ref<IPerson>({ ...initPerson })
  const currentPersonZodiac = ref<IZodiac>({ ...initZodiac })
  const preEditedPersonZodiac = ref<IZodiac>({ ...initZodiac })
  const loading = ref<boolean>(false)
  const error = ref<string | null>(null)

  const resetCurrentPerson = () => {
    preEditedPerson.value = { ...initPerson }
    currentPerson.value = { ...initPerson }
    return currentPerson.value
  }

  const setCurrentPerson = (person: IPerson) => {
    currentPerson.value = { ...person }
    return currentPerson.value
  }

  const cancelPreEditedPerson = () => {
    preEditedPerson.value = { ...initPerson }
  }

  const resetPreEditedPerson = () => {
    currentPerson.value = { ...preEditedPerson.value }
  }

  const setPreEditedPerson = (person: IPerson) => {
    preEditedPerson.value = { ...person }
    return preEditedPerson.value
  }

  const cancelZodiac = () => {
    currentPersonZodiac.value = { ...initZodiac }
    preEditedPersonZodiac.value = { ...initZodiac }
  }

  const restoreZodiac = () => {
    currentPersonZodiac.value = { ...preEditedPersonZodiac.value }
  }

  const getPersons = async () => {
    const { data, dataLoading, dataError } = await getAll(PERSON_API)
    if (data) {
      persons.value = data
    }
    loading.value = dataLoading
    error.value = dataError
    return { data, loading: dataLoading, error: dataError }
  }

  const createPerson = async (newPerson: IPerson, newZodiac: IZodiac) => {
    const isNameDuplicated = checkIfExistByName(newPerson, persons.value)
    if (isNameDuplicated) return

    const { data, dataLoading, dataError } = await create(PERSON_API, newPerson)
    let zodiac = { ...initZodiac }

    if (data) {
      persons.value.push(data)

      const { data: zodiacData } = await create(ZODIAC_API, {
        ...newZodiac,
        personId: data.id
      })
      if (zodiacData) {
        zodiac = { ...zodiacData }
      }
    }
    loading.value = dataLoading
    error.value = dataError
    return { data, loading: dataLoading, error: dataError, zodiac }
  }

  const getPersonById = async (id: number) => {
    const idx = checkIfNotExistById(id, persons.value)
    if (!idx) return

    const { data, dataLoading, dataError } = await getOneById(PERSON_API, id)
    if (data) {
      currentPerson.value = data
      let zodiac = { ...initZodiac }
      const { data: zodiacData } = await getOneById(ZODIAC_API, data.id, 'person')

      if (zodiacData) {
        currentPersonZodiac.value = { ...zodiacData }
        preEditedPersonZodiac.value = { ...zodiacData }
        zodiac = { ...zodiacData }
      }

      loading.value = dataLoading
      error.value = dataError
      return { data, loading: dataLoading, error: dataError, zodiac }
    }
  }

  const updatePerson = async (updatedPerson: IPerson, updatedZodiac: IZodiac) => {
    const isNameDuplicated = checkIfExistByName(updatedPerson, persons.value)
    if (isNameDuplicated) return

    const personItem = { ...currentPerson.value }
    const id = personItem.id
    const idx = checkIfNotExistById(id, persons.value)
    if (!idx) return

    const { data, dataLoading, dataError } = await update(PERSON_API, id, updatedPerson)
    if (data) {
      persons.value[idx] = data

      let zodiac = { ...initZodiac }
      const { data: oldZodiac } = await getOneById(ZODIAC_API, data.id, 'person')
      if (oldZodiac && oldZodiac.id && oldZodiac.id > 0) {
        const { data: zodiacData } = await update(ZODIAC_API, oldZodiac.id, {
          ...updatedZodiac,
          personId: data.id
        })
        if (zodiacData) {
          zodiac = { ...zodiacData }
        }
      }

      loading.value = dataLoading
      error.value = dataError
      return { data, loading: dataLoading, error: dataError, zodiac }
    }
  }

  const deletePerson = async (personItem: IPerson) => {
    const id = personItem.id
    const idx = checkIfNotExistById(id, persons.value)
    if (!idx) return

    const { data, dataLoading, dataError } = await deleteById(PERSON_API, id)
    if (data.id) {
      persons.value = persons.value.filter((item) => item.id !== id)
    }

    loading.value = dataLoading
    error.value = dataError
    return { data, loading: dataLoading, error: dataError }
  }

  return {
    persons,
    currentPerson,
    preEditedPerson,
    currentPersonZodiac,
    preEditedPersonZodiac,
    loading,
    error,
    getPersons,
    getPersonById,
    resetCurrentPerson,
    setCurrentPerson,
    cancelPreEditedPerson,
    resetPreEditedPerson,
    setPreEditedPerson,
    createPerson,
    updatePerson,
    deletePerson,
    cancelZodiac,
    restoreZodiac
  }
})
