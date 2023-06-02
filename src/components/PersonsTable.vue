<script setup lang="ts">
import type { IPerson } from '@/types'
import type { PropType } from 'vue'

defineProps({
  persons: {
    type: Array as PropType<IPerson[]>,
    default: () => []
  }
})

const handleViewClick = (person: IPerson) => {}
const handleEditClick = (person: IPerson) => {}
const handleDeleteClick = (person: IPerson) => {}
</script>

<template>
  <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table class="w-full text-base text-left text-gray-500 dark:text-gray-400 bg-gray-50">
      <thead
        class="text-sm text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400 sticky top-0"
      >
        <tr>
          <th scope="col" class="px-4 py-3">#</th>
          <th scope="col" class="px-4 py-3">ID</th>
          <th scope="col" class="px-4 py-3">name</th>
          <th scope="col" class="px-4 py-3">surname</th>
          <th scope="col" class="px-4 py-3">birthday</th>
          <th scope="col" class="px-4 py-3">timezone</th>
          <th scope="col" class="px-4 py-3">birthplace</th>
          <th scope="col" class="px-4 py-3">description</th>
          <th scope="col" class="px-4 py-3">Created</th>
          <th scope="col" class="px-4 py-3">Updated</th>
          <th scope="col" class="px-4 py-3">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(person, idx) in persons"
          :key="person.id"
          class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600"
        >
          <td class="px-4 py-3">{{ idx + 1 }}</td>
          <td class="px-4 py-3">{{ person.id }}</td>
          <td class="px-4 py-3">{{ person.name }}</td>
          <td class="px-4 py-3">{{ person.surname }}</td>
          <td class="px-4 py-3">{{ person.birthday }}</td>
          <td class="px-4 py-3">{{ person.timezone }}</td>
          <td class="px-4 py-3">{{ person.birthplace }}</td>
          <td class="px-4 py-3">{{ person.description }}</td>
          <td class="px-4 py-3">{{ person.createdAt }}</td>
          <td class="px-4 py-3">{{ person.updatedAt }}</td>
          <td class="px-4 py-3 flex">
            <button
              @click.stop="handleViewClick(person)"
              type="button"
              class="font-medium text-green-400 hover:no-underline hover:text-green-600 dark:text-green-500 hover:underline mr-4"
            >
              VIEW
            </button>
            <button
              @click.stop="handleEditClick(person)"
              type="button"
              class="font-medium text-blue-300 hover:no-underline hover:text-blue-600 dark:text-blue-500 hover:underline mr-4"
            >
              EDIT
            </button>
            <button
              @click.stop="handleDeleteClick(person)"
              type="button"
              class="font-medium text-rose-300 hover:no-underline hover:text-rose-600 dark:text-red-500 hover:underline"
            >
              DEL
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
