<script setup lang="ts">
import { storeToRefs } from 'pinia'
import PersonsTable from '@/components/PersonsTable.vue'
import { usePersonStore } from '@/stores/person'

const personStore = usePersonStore()
const { filterStr } = storeToRefs(personStore)
</script>

<template>
  <main class="container mx-auto max-w-screen-xl p-4">
    <div class="">
      <h1 class="mb-6 text-3xl font-bold underline text-teal-500">Persons List</h1>
      <div class="flex">
        <input
          type="text"
          v-model="filterStr"
          class="mb- max-w-xs text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
          placeholder="Search pattern"
        />
      </div>
    </div>

    <persons-table />
  </main>
</template>
