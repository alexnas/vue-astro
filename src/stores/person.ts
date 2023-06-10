import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
import type { IPerson, IZodiac } from '@/types'
import { API_BASE_URL, PERSON_ENDPOINT, ZODIAC_ENDPOINT } from '@/constants/apiConstants'

const personApi = `${API_BASE_URL}${PERSON_ENDPOINT}`
const zodiacApi = `${API_BASE_URL}${ZODIAC_ENDPOINT}`

const initPerson: IPerson = {
  id: -1,
  name: '',
  surname: '',
  birthday: '',
  timezone: '',
  birthplace: '',
  description: '',
  createdAt: '',
  updatedAt: ''
}
const initZodiac: IZodiac = {
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

export const usePersonStore = defineStore('person', () => {
  const persons = ref<IPerson[]>([])
  const currentPerson = ref<IPerson>({ ...initPerson })
  const preEditedPerson = ref<IPerson>({ ...initPerson })
  const currentPersonZodiac = ref<IZodiac>({ ...initZodiac })
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

  const getPersons = async () => {
    try {
      loading.value = true
      const { data } = await axios.get(personApi)
      persons.value = data
      loading.value = false
      error.value = null
    } catch (err: any) {
      loading.value = false
      if (axios.isAxiosError(error)) {
        error.value = err.message
        console.log('Error', err.message)
      } else {
        error.value = 'Unexpected error encountered'
        console.log('Error', err)
      }
    }
  }

  const getPersonById = async (id: number) => {
    try {
      loading.value = true
      const { data } = await axios.get(`${personApi}/${id}`)
      currentPerson.value = data
      loading.value = false
      error.value = null
      getZodiacByPersonId(id)
    } catch (err: any) {
      loading.value = false
      if (axios.isAxiosError(error)) {
        error.value = err.message
        console.log('Error', err.message)
        currentPerson.value = { ...initPerson }
      } else {
        error.value = 'Unexpected error encountered'
        console.log('Error', err)
        currentPerson.value = { ...initPerson }
      }
    }
  }

  const getZodiacByPersonId = async (id: number) => {
    try {
      loading.value = true
      const { data } = await axios.get(`${zodiacApi}/person/${id}`)
      currentPersonZodiac.value = data

      loading.value = false
      error.value = null
    } catch (err: any) {
      loading.value = false
      if (axios.isAxiosError(error)) {
        error.value = err.message
        console.log('Error', err.message)
      } else {
        error.value = 'Unexpected error encountered'
        console.log('Error', err)
      }
      currentPersonZodiac.value = { ...initZodiac }
    }
  }

  const createPersonZodiac = async (personId: number) => {
    const params = {
      ...currentPersonZodiac.value,
      personId
    }

    try {
      loading.value = true
      await axios.post(zodiacApi, params)

      loading.value = false
      error.value = null
    } catch (err: any) {
      loading.value = false
      if (axios.isAxiosError(error)) {
        error.value = err.message
        console.log('Error', err.message)
      } else {
        error.value = 'Unexpected error encountered'
        console.log('Error', err)
      }
    }
  }

  const updatePersonZodiac = async (personId: number) => {
    getZodiacByPersonId(personId)
    const zodiacId = currentPersonZodiac.value.id
    if (personId && (!zodiacId || zodiacId === -1)) {
      createPersonZodiac(personId)
      return
    }

    const params = {
      ...currentPersonZodiac.value,
      personId
    }

    try {
      loading.value = true
      await axios.put(`${zodiacApi}/${zodiacId}`, params)

      loading.value = false
      error.value = null
    } catch (err: any) {
      loading.value = false
      if (axios.isAxiosError(error)) {
        error.value = err.message
        console.log('Error', err.message)
      } else {
        error.value = 'Unexpected error encountered'
        console.log('Error', err)
      }
    }
  }

  const createPerson = async () => {
    const personItem = { ...currentPerson.value }
    const idx = persons.value.findIndex(
      (item) => item.name === personItem.name && item.surname === personItem.surname
    )
    if (idx >= 0) {
      console.log(`Error: There is already such person instance with name=${personItem.name}`)
      throw Error(
        `There is already such person instance with name=${personItem.name} and surname=${personItem.surname} `
      )
    }

    const params = { ...personItem }

    try {
      loading.value = true
      const { data } = await axios.post(personApi, params)
      persons.value.push(data)

      if (data && data.id && data.id > 0) {
        createPersonZodiac(data.id)
      }

      loading.value = false
      error.value = null
    } catch (err: any) {
      loading.value = false
      if (axios.isAxiosError(error)) {
        error.value = err.message
        console.log('Error', err.message)
      } else {
        error.value = 'Unexpected error encountered'
        console.log('Error', err)
      }
    }
  }

  const updatePerson = async () => {
    const personItem = { ...currentPerson.value }
    const id = personItem.id
    const idx = persons.value.findIndex((item) => item.id === id)
    if (idx === -1) {
      console.log(`Error: There is no such person instance with id=${id}`)
      throw Error(`There is no such person instance with id=${id}`)
    }

    const params = { ...personItem }

    try {
      loading.value = true
      const { data } = await axios.put(`${personApi}/${id}`, params)
      persons.value[idx] = data

      if (data && data.id && data.id > 0) {
        updatePersonZodiac(data.id)
      }

      loading.value = false
      error.value = null
    } catch (err: any) {
      loading.value = false
      if (axios.isAxiosError(error)) {
        error.value = err.message
        console.log('Error', err.message)
      } else {
        error.value = 'Unexpected error encountered'
        console.log('Error', err)
      }
    }
  }

  const deletePerson = async (personItem: IPerson) => {
    const id = personItem.id
    const idx = persons.value.findIndex((item) => item.id === id)
    if (idx === -1) {
      console.log(`Error: There is no such person instance with id=${id}`)
      throw Error(`There is no such person instance with id=${id}`)
    }

    try {
      loading.value = true
      await axios.delete(`${personApi}/${id}`)
      persons.value = persons.value.filter((item) => item.id !== id)
      loading.value = false
      error.value = null
    } catch (err: any) {
      loading.value = false
      if (axios.isAxiosError(error)) {
        error.value = err.message
        console.log('Error', err.message)
      } else {
        error.value = 'Unexpected error encountered'
        console.log('Error', err)
      }
    }
  }

  return {
    persons,
    currentPerson,
    preEditedPerson,
    currentPersonZodiac,
    loading,
    error,
    getPersons,
    getPersonById,
    getZodiacByPersonId,
    resetCurrentPerson,
    setCurrentPerson,
    cancelPreEditedPerson,
    resetPreEditedPerson,
    setPreEditedPerson,
    createPerson,
    updatePerson,
    deletePerson
  }
})
