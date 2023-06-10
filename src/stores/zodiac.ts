import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
import type { IZodiac } from '@/types'
import { API_BASE_URL, ZODIAC_ENDPOINT } from '@/constants/apiConstants'

const zodiacApi = `${API_BASE_URL}${ZODIAC_ENDPOINT}`

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

export const useZodiacStore = defineStore('zodiac', () => {
  const currentPersonZodiac = ref<IZodiac>({ ...initZodiac })
  const loading = ref<boolean>(false)
  const error = ref<string | null>(null)

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

  return {
    currentPersonZodiac,
    getZodiacByPersonId,
    createPersonZodiac,
    updatePersonZodiac
  }
})
