import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
import { useZodiacStore } from '@/stores/zodiac'
import type { IPerson } from '@/types'
import { API_BASE_URL, PERSON_ENDPOINT } from '@/constants/apiConstants'

const personApi = `${API_BASE_URL}${PERSON_ENDPOINT}`

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

export const usePersonStore = defineStore('person', () => {
  const persons = ref<IPerson[]>([])
  const currentPerson = ref<IPerson>({ ...initPerson })
  const preEditedPerson = ref<IPerson>({ ...initPerson })
  const loading = ref<boolean>(false)
  const error = ref<string | null>(null)

  const zodiacStore = useZodiacStore()

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
      zodiacStore.getZodiacByPersonId(id)
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
        zodiacStore.createPersonZodiac(data.id)
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
        zodiacStore.updatePersonZodiac(data.id)
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
    deletePerson
  }
})
