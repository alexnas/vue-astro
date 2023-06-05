<script setup lang="ts">
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { usePersonStore } from '@/stores/person'
import { useModalStore } from '@/stores/modal'
import { formatDateTime } from '@/tools/formatDate'
import BaseModal from '@/components/BaseModal.vue'

const personStore = usePersonStore()
const { currentPerson } = storeToRefs(personStore)
const modalStore = useModalStore()
const { isNewItem, isViewItem } = storeToRefs(modalStore)

const modalTitle = computed(() => {
  return isViewItem.value || !isNewItem.value
    ? `Person: ${currentPerson.value.name} ${currentPerson.value.surname} (id: ${currentPerson.value.id})`
    : 'New Person'
})

const closeModal = () => {
  personStore.resetCurrentPerson()
  modalStore.resetModalState()
}

const resetModalForm = () => {
  personStore.resetPreEditedPerson()
}

const handleEditClick = () => {
  personStore.setCurrentPerson(currentPerson.value)
  modalStore.openEditItemModal()
}

const handleSubmit = async () => {
  if (isNewItem.value) {
    await personStore.createPerson(currentPerson.value)
  } else {
    await personStore.updatePerson(currentPerson.value)
  }
  personStore.resetCurrentPerson()
  modalStore.resetModalState()
}
</script>

<template>
  <base-modal @closeModal="closeModal" :modalTitle="modalTitle">
    <form
      class="relative py-4 px-5 my-8 md:px-10 bg-gray-50 border border-gray-200 shadow-md rounded"
    >
      <div class="grid grid-cols-2 gap-4">
        <div>
          <label
            class="text-gray-500 pl-3 text-sm uppercase font-bold leading-tight tracking-normal"
            >Name</label
          >
          <input
            name="name"
            type="text"
            v-model="currentPerson.name"
            :disabled="isViewItem"
            class="mt-1 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
            placeholder="Person name"
          />
        </div>

        <div>
          <label
            class="text-gray-500 pl-3 text-sm uppercase font-bold leading-tight tracking-normal"
            >Surname</label
          >
          <input
            name="suname"
            type="text"
            v-model="currentPerson.surname"
            :disabled="isViewItem"
            class="mt-1 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
            placeholder="Person surname"
          />
        </div>

        <div>
          <label
            class="text-gray-500 pl-3 text-sm uppercase font-bold leading-tight tracking-normal"
            >Birthday</label
          >
          <input
            name="birthday"
            type="text"
            v-model="currentPerson.birthday"
            :disabled="isViewItem"
            class="mt-1 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
            placeholder="Person birthday"
          />
        </div>

        <div>
          <label
            class="text-gray-500 pl-3 text-sm uppercase font-bold leading-tight tracking-normal"
            >Time zone</label
          >
          <input
            name="timezone"
            type="text"
            v-model="currentPerson.timezone"
            :disabled="isViewItem"
            class="mt-1 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
            placeholder="Person timezone"
          />
        </div>

        <div>
          <label
            class="text-gray-500 pl-3 text-sm uppercase font-bold leading-tight tracking-normal"
            >Birth place</label
          >
          <input
            name="birthplace"
            type="text"
            v-model="currentPerson.birthplace"
            :disabled="isViewItem"
            class="mt-1 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
            placeholder="Person surname"
          />
        </div>

        <div>
          <label
            class="text-gray-500 pl-3 text-sm uppercase font-bold leading-tight tracking-normal"
            >Description</label
          >
          <input
            name="description"
            as="textarea"
            v-model="currentPerson.description"
            :disabled="isViewItem"
            class="mt-1 pt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
            placeholder="Person description"
          />
        </div>

        <div v-if="!isNewItem">
          <label
            class="text-gray-500 pl-3 text-sm uppercase font-bold leading-tight tracking-normal"
            >Created</label
          >
          <input
            name="createdAt"
            :value="formatDateTime(currentPerson.createdAt)"
            readonly
            class="mt-1 read-only:bg-gray-100 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
            placeholder="Date of creation"
          />
        </div>

        <div v-if="!isNewItem">
          <label
            class="text-gray-500 pl-3 text-sm uppercase font-bold leading-tight tracking-normal"
            >Updated</label
          >
          <input
            name="updatedAt"
            :value="formatDateTime(currentPerson.updatedAt)"
            readonly
            class="mt-1 read-only:bg-gray-100 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
            placeholder="Date of update"
          />
        </div>
      </div>
      <div class="flex items-center justify-start w-full mt-8">
        <button
          @click.prevent="handleEditClick"
          v-if="isViewItem"
          class="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-700 transition duration-150 ease-in-out hover:bg-orange-600 bg-orange-700 rounded-sm sm:rounded-lg text-white px-8 py-2 text-sm"
          type="button"
        >
          Edit
        </button>
        <button
          v-if="!isViewItem"
          class="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-700 transition duration-150 ease-in-out enabled:hover:bg-teal-600 enabled:bg-teal-700 disabled:bg-gray-400 rounded-sm sm:rounded-lg text-white px-8 py-2 text-sm"
          type="submit"
          @click.prevent="handleSubmit"
        >
          Submit
        </button>
        <button
          class="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 ml-3 bg-gray-100 transition duration-150 text-gray-600 ease-in-out hover:border-gray-400 hover:bg-gray-300 border rounded-sm sm:rounded-lg px-8 py-2 text-sm"
          type="reset"
          @click.prevent="closeModal"
        >
          Cancel
        </button>

        <div class="ml-auto sm:visible invisible">
          <button
            class="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 ml-3 bg-gray-500 transition duration-150 text-gray-100 ease-in-out hover:border-gray-400 hover:bg-gray-400 border sm:rounded-lg px-8 py-2 text-sm"
            @click.prevent="resetModalForm"
            type="reset"
          >
            Reset
          </button>
        </div>
      </div>
    </form>
  </base-modal>
</template>
