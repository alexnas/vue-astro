<script setup lang="ts">
import PersonsTable from '@/components/PersonsTable.vue'
import { onMounted, ref } from 'vue'
import axios from 'axios'
import { API_BASE_URL, PERSON_ENDPOINT } from '@/constants/apiConstants'
import type { IPerson } from '@/types'
const personApi = `${API_BASE_URL}${PERSON_ENDPOINT}`

const persons = ref<IPerson[]>([])

const getPersons = async () => {
  const { data } = await axios.get(personApi)
  persons.value = data
  return persons.value
}

onMounted(() => {
  getPersons()
})
</script>

<template>
  <main class="container mx-auto max-w-screen-xl p-4">
    <h1 class="mb-6 text-3xl font-bold underline text-teal-500">Persons List</h1>
    <persons-table :persons="persons" />
  </main>
</template>
