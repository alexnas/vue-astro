<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { Icon } from '@iconify/vue'
import type { IPerson, PersonKeys } from '@/types'
import { usePersonStore } from '@/stores/person'
import { useModalStore } from '@/stores/modal'
import { formatDateTime } from '@/tools/formatDate'
import { makeSortedByProperty } from '@/services/personService'
import PersonForm from '@/components/personForm/PersonForm.vue'

const personStore = usePersonStore()
const { persons, sortProperty, sortOrder, filterStr } = storeToRefs(personStore)
const modalStore = useModalStore()

const filteredPersons = computed(() => {
  const filtered = persons.value.filter((item) => {
    if (filterStr.value === '') return true
    const isFound =
      item.name.toLowerCase().indexOf(filterStr.value.toLowerCase()) >= 0 ||
      item.surname.toLowerCase().indexOf(filterStr.value.toLowerCase()) >= 0
    return isFound
  })
  return filtered
})

const sortedPersons = computed(() => {
  const sorted = [...filteredPersons.value]
  sorted.sort(makeSortedByProperty(sortProperty.value, sortOrder.value))
  return sorted
})

const sortSymbol = computed(() => {
  return sortOrder.value === 'asc' ? '\u{0020}\u{21E7}' : '\u{0020}\u{21E9}'
})

const handleSort = (property: PersonKeys) => {
  if (sortProperty.value === property) {
    sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortProperty.value = property
    sortOrder.value = 'asc'
  }
}

const handleAddNewClick = () => {
  personStore.cancelPreEditedPerson()
  personStore.cancelZodiac()
  modalStore.openNewItemModal()
}

const handleViewClick = (person: IPerson) => {
  personStore.getPersonById(person.id)
  personStore.setPreEditedPerson(person)
  personStore.setCurrentPerson(person)
  modalStore.openViewItemModal()
}
const handleEditClick = (person: IPerson) => {
  personStore.getPersonById(person.id)
  personStore.setPreEditedPerson(person)
  personStore.setCurrentPerson(person)
  modalStore.openEditItemModal()
}
const handleDeleteClick = async (person: IPerson) => {
  const { id, name, surname } = person
  const confirmed = confirm(
    `Are you sure to delete all data for the personerson: ${name} ${surname}, ID=${id}?`
  )
  if (confirmed) {
    await personStore.deletePerson(person)
  }
  modalStore.resetModalState()
}

onMounted(() => {
  personStore.getPersons()
})
</script>

<template>
  <div class="flex items-center justify-end -mt-20 h-24">
    <button @click.stop="handleAddNewClick()" type="button">
      <Icon
        class="text-5xl text-green-400 hover:text-green-500"
        icon="material-symbols:add-box-outline-rounded"
        :inline="true"
      />
    </button>
  </div>
  {{ filterStr }}

  <div class="relative shadow-md sm:rounded-lg overflow-y-auto h-[calc(100%-5rem)]">
    <table
      class="w-full max-w-full mb-12 text-base text-left text-gray-500 dark:text-gray-400 bg-gray-50"
    >
      <thead
        class="text-sm text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400 sticky top-0"
      >
        <tr>
          <th scope="col" class="px-4 py-3">#</th>
          <th
            scope="col"
            class="px-4 py-3 hover:bg-teal-100 rounded-lg cursor-pointer whitespace-nowrap"
            :class="sortProperty === 'id' ? 'text-teal-600' : ''"
            @click="handleSort('id')"
          >
            ID<span class="" v-if="sortProperty === 'id'">{{ sortSymbol }}</span>
          </th>
          <th
            scope="col"
            class="px-4 py-3 hover:bg-teal-100 rounded-lg cursor-pointer whitespace-nowrap"
            :class="sortProperty === 'name' ? 'text-teal-600' : ''"
            @click="handleSort('name')"
          >
            Name<span class="" v-if="sortProperty === 'name'">{{ sortSymbol }}</span>
          </th>
          <th
            scope="col"
            class="px-4 py-3 hover:bg-teal-100 rounded-lg cursor-pointer whitespace-nowrap"
            :class="sortProperty === 'surname' ? 'text-teal-600' : ''"
            @click="handleSort('surname')"
          >
            Surname<span v-if="sortProperty === 'surname'">{{ sortSymbol }}</span>
          </th>
          <th
            scope="col"
            class="px-4 py-3 hover:bg-teal-100 rounded-lg cursor-pointer whitespace-nowrap"
            :class="sortProperty === 'birthday' ? 'text-teal-600' : ''"
            @click="handleSort('birthday')"
          >
            Birthday<span class="" v-if="sortProperty === 'birthday'">{{ sortSymbol }}</span>
          </th>
          <th
            scope="col"
            class="px-4 py-3 hover:bg-teal-100 rounded-lg cursor-pointer whitespace-nowrap"
            :class="sortProperty === 'timezone' ? 'text-teal-600' : ''"
            @click="handleSort('timezone')"
          >
            TZ<span class="" v-if="sortProperty === 'timezone'">{{ sortSymbol }}</span>
          </th>
          <th
            scope="col"
            class="px-4 py-3 hover:bg-teal-100 rounded-lg cursor-pointer whitespace-nowrap"
            :class="sortProperty === 'birthplace' ? 'text-teal-600' : ''"
            @click="handleSort('birthplace')"
          >
            Birthplace<span class="" v-if="sortProperty === 'birthplace'">{{ sortSymbol }}</span>
          </th>
          <th
            scope="col"
            class="px-4 py-3 hover:bg-teal-100 rounded-lg cursor-pointer whitespace-nowrap"
            :class="sortProperty === 'description' ? 'text-teal-600' : ''"
            @click="handleSort('description')"
          >
            Description<span class="" v-if="sortProperty === 'description'">{{ sortSymbol }}</span>
          </th>
          <th
            scope="col"
            class="px-4 py-3 hover:bg-teal-100 rounded-lg cursor-pointer whitespace-nowrap"
            :class="sortProperty === 'createdAt' ? 'text-teal-600' : ''"
            @click="handleSort('createdAt')"
          >
            Created<span class="" v-if="sortProperty === 'createdAt'">{{ sortSymbol }}</span>
          </th>
          <th
            scope="col"
            class="px-4 py-3 hover:bg-teal-100 rounded-lg cursor-pointer whitespace-nowrap"
            :class="sortProperty === 'updatedAt' ? 'text-teal-600' : ''"
            @click="handleSort('updatedAt')"
          >
            Updated<span class="" v-if="sortProperty === 'updatedAt'">{{ sortSymbol }}</span>
          </th>
          <th scope="col" class="px-4 py-3">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(person, idx) in sortedPersons"
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
          <td class="px-4 py-3">{{ formatDateTime(person.createdAt) }}</td>
          <td class="px-4 py-3">{{ formatDateTime(person.updatedAt) }}</td>
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

  <!-- Person Modal Form -->
  <PersonForm />
</template>
