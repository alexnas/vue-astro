<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { formatDateTime } from '@/tools/formatDate'
import { usePersonStore } from '@/stores/person'
import { useModalStore } from '@/stores/modal'
import FormSubtitle from './FormSubtitle.vue'
import { Field, ErrorMessage } from 'vee-validate'

const personStore = usePersonStore()
const { currentPerson } = storeToRefs(personStore)
const modalStore = useModalStore()
const { isNewItem, isViewItem } = storeToRefs(modalStore)
</script>

<template>
  <div>
    <FormSubtitle>Person Info (id:{{ currentPerson?.id }})</FormSubtitle>

    <div v-if="currentPerson" class="grid lg:grid-cols-4 grid-cols-3 gap-4">
      <div>
        <label class="person-label">Name</label>
        <Field
          name="name"
          type="text"
          v-model="currentPerson.name"
          :disabled="isViewItem"
          class="person-input"
          placeholder="Person name"
        />
        <ErrorMessage name="name" />
      </div>

      <div>
        <label class="person-label">Surname</label>
        <Field
          name="surname"
          type="text"
          v-model="currentPerson.surname"
          :disabled="isViewItem"
          class="person-input"
          placeholder="Person surname"
        />
        <ErrorMessage name="surname" />
      </div>

      <div>
        <label class="person-label">Birthday</label>
        <Field
          name="birthday"
          type="text"
          v-model="currentPerson.birthday"
          :disabled="isViewItem"
          class="person-input"
          placeholder="Person birthday"
        />
        <ErrorMessage name="birthday" />
      </div>

      <div>
        <label class="person-label">Time zone</label>
        <Field
          name="timezone"
          type="text"
          v-model="currentPerson.timezone"
          :disabled="isViewItem"
          class="person-input"
          placeholder="Person timezone"
        />
        <ErrorMessage name="timezone" />
      </div>

      <div>
        <label class="person-label">Birthplace</label>
        <Field
          name="birthplace"
          type="text"
          v-model="currentPerson.birthplace"
          :disabled="isViewItem"
          class="person-input"
          placeholder="Person surname"
        />
        <ErrorMessage name="birthplace" />
      </div>

      <div>
        <label class="person-label">Description</label>
        <Field
          name="description"
          type="text"
          v-model="currentPerson.description"
          :disabled="isViewItem"
          class="person-input"
          placeholder="Person surname"
        />
        <ErrorMessage name="description" />
      </div>

      <div v-if="!isNewItem">
        <label class="person-label">Created</label>
        <input
          name="createdAt"
          :value="formatDateTime(currentPerson.createdAt)"
          :disabled="true"
          class="person-input"
          placeholder="Date of creation"
        />
      </div>

      <div v-if="!isNewItem">
        <label class="person-label">Updated</label>
        <input
          name="updatedAt"
          :value="formatDateTime(currentPerson.updatedAt)"
          :disabled="true"
          class="person-input"
          placeholder="Date of update"
        />
      </div>
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.person-label {
  @apply text-gray-500 pl-3 text-sm uppercase font-bold leading-tight tracking-normal;
}
.person-input {
  @apply mt-1 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border;
}
</style>
