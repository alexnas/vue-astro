import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
import type { IPerson } from '@/types'
import { API_BASE_URL, PERSON_ENDPOINT } from '@/constants/apiConstants'

const personApi = `${API_BASE_URL}${PERSON_ENDPOINT}`

export const usePersonStore = defineStore('person', () => {
  const persons = ref<IPerson[]>([])
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

  return {
    persons,
    loading,
    error,
    getPersons
  }
})
