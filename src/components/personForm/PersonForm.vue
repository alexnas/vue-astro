<script setup lang="ts">
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { usePersonStore } from '@/stores/person'
import { useModalStore } from '@/stores/modal'
import BaseModal from '@/components/BaseModal.vue'
import PersonData from './PersonData.vue'
import ZodiacData from './ZodiacData.vue'

const personStore = usePersonStore()
const { currentPerson, currentPersonZodiac } = storeToRefs(personStore)
const modalStore = useModalStore()
const { isNewItem, isViewItem } = storeToRefs(modalStore)

const modalTitle = computed(() => {
  return isViewItem.value || !isNewItem.value
    ? `Person: ${currentPerson.value.name} ${currentPerson.value.surname} (id: ${currentPerson.value.id})`
    : 'New Person'
})

const closeModal = () => {
  personStore.resetCurrentPerson()
  personStore.cancelZodiac()
  modalStore.resetModalState()
}

const resetModalForm = () => {
  personStore.resetPreEditedPerson()
  personStore.restoreZodiac()
}

const handleEditClick = () => {
  personStore.setCurrentPerson(currentPerson.value)
  modalStore.openEditItemModal()
}

const handleSubmit = async () => {
  if (isNewItem.value) {
    await personStore.createPerson(currentPerson.value, currentPersonZodiac.value)
  } else {
    await personStore.updatePerson(currentPerson.value, currentPersonZodiac.value)
  }
  personStore.resetCurrentPerson()
  personStore.cancelZodiac()
  modalStore.resetModalState()
}
</script>

<template>
  <base-modal @closeModal="closeModal" :modalTitle="modalTitle">
    <form class="form">
      <PersonData class="mb-6" />
      <ZodiacData />

      <div class="flex items-center justify-start w-full mt-8">
        <button
          v-if="isViewItem"
          type="button"
          class="form-button button-edit"
          @click.prevent="handleEditClick"
        >
          Edit
        </button>
        <button
          v-if="!isViewItem"
          type="submit"
          class="form-button button-submit"
          @click.prevent="handleSubmit"
        >
          Submit
        </button>
        <button class="form-button button-cancel" type="reset" @click.prevent="closeModal">
          Cancel
        </button>

        <div class="ml-auto sm:visible invisible">
          <button class="form-button button-reset" type="reset" @click.prevent="resetModalForm">
            Reset
          </button>
        </div>
      </div>
    </form>
  </base-modal>
</template>

<style lang="postcss" scoped>
.form {
  @apply relative py-4 px-5 my-8 md:px-10 bg-gray-50 border border-gray-200 shadow-md rounded;
}
.form-button {
  @apply focus:outline-none focus:ring-2 focus:ring-offset-2 transition duration-150 ease-in-out px-8 py-2 text-sm rounded-sm sm:rounded-lg border;
}
.button-edit {
  @apply focus:ring-orange-700 hover:bg-orange-600 bg-orange-700 text-white;
}
.button-submit {
  @apply focus:ring-teal-700 enabled:hover:bg-teal-600 enabled:bg-teal-700 disabled:bg-gray-400 text-white;
}
.button-cancel {
  @apply focus:ring-gray-400 ml-3 bg-gray-100 text-gray-600 ease-in-out hover:bg-gray-300;
}
.button-reset {
  @apply focus:ring-gray-400 ml-3 bg-gray-500 text-gray-100 ease-in-out hover:bg-gray-400;
}
</style>
