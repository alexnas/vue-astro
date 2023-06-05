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
  updatedAt: ''
}

export const usePersonStore = defineStore('person', () => {
  const persons = ref<IPerson[]>([])
  const currentPerson = ref<IPerson>({ ...initPerson })
  const currentPersonZodiac = ref<IZodiac>({ ...initZodiac })
  const loading = ref<boolean>(false)
  const error = ref<string | null>(null)

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
      const { data } = await axios.get(`${zodiacApi}/${id}`)
      currentPersonZodiac.value = data
      loading.value = false
      error.value = null
    } catch (err: any) {
      loading.value = false
      if (axios.isAxiosError(error)) {
        error.value = err.message
        console.log('Error', err.message)
        currentPersonZodiac.value = { ...initZodiac }
      } else {
        error.value = 'Unexpected error encountered'
        console.log('Error', err)
        currentPersonZodiac.value = { ...initZodiac }
      }
    }
  }

  return {
    persons,
    currentPerson,
    currentPersonZodiac,
    loading,
    error,
    getPersons,
    getPersonById,
    getZodiacByPersonId
  }
})
