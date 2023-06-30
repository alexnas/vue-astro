<script setup lang="ts">
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { usePersonStore } from '@/stores/person'
import { useModalStore } from '@/stores/modal'
import { formatDateTime } from '@/tools/formatDate'
import BaseModal from '@/components/BaseModal.vue'
import { zodiacSymbols } from '@/constants/zodiacConstants'
import { zodiacItems } from '@/constants/zodiacConstants'

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
      <div class="form-subtitle">Person Info (id:{{ currentPerson.id }})</div>

      <div class="grid lg:grid-cols-4 grid-cols-3 gap-4">
        <div>
          <label class="person-label">Name</label>
          <input
            name="name"
            type="text"
            v-model="currentPerson.name"
            :disabled="isViewItem"
            class="person-input"
            placeholder="Person name"
          />
        </div>

        <div>
          <label class="person-label">Surname</label>
          <input
            name="surname"
            type="text"
            v-model="currentPerson.surname"
            :disabled="isViewItem"
            class="person-input"
            placeholder="Person surname"
          />
        </div>

        <div>
          <label class="person-label">Birthday</label>
          <input
            name="birthday"
            type="text"
            v-model="currentPerson.birthday"
            :disabled="isViewItem"
            class="person-input"
            placeholder="Person birthday"
          />
        </div>

        <div>
          <label class="person-label">Time zone</label>
          <input
            name="timezone"
            type="text"
            v-model="currentPerson.timezone"
            :disabled="isViewItem"
            class="person-input"
            placeholder="Person timezone"
          />
        </div>

        <div>
          <label class="person-label">Birthplace</label>
          <input
            name="birthplace"
            type="text"
            v-model="currentPerson.birthplace"
            :disabled="isViewItem"
            class="person-input"
            placeholder="Person surname"
          />
        </div>

        <div>
          <label class="person-label">Description</label>
          <input
            name="description"
            type="text"
            v-model="currentPerson.description"
            :disabled="isViewItem"
            class="person-input"
            placeholder="Person surname"
          />
        </div>

        <div v-if="!isNewItem">
          <label class="person-label">Created</label>
          <input
            name="createdAt"
            :value="formatDateTime(currentPerson.createdAt)"
            readonly
            class="person-input"
            placeholder="Date of creation"
          />
        </div>

        <div v-if="!isNewItem">
          <label class="person-label">Updated</label>
          <input
            name="updatedAt"
            :value="formatDateTime(currentPerson.updatedAt)"
            readonly
            class="person-input"
            placeholder="Date of update"
          />
        </div>
      </div>

      <div class="form-subtitled">Zodiac (id:{{ currentPersonZodiac.id }})</div>

      <div class="grid grid-cols-3 gap-4">
        <div>
          <label class="planet-label"><span class="planet-symbol">&#9737;&nbsp;</span>Sun</label>
          <div class="flex mt-1">
            <span class="zodiac-symbol">
              {{ zodiacSymbols[`${currentPersonZodiac.sun}`] }}
            </span>
            <select
              name="sun"
              v-model="currentPersonZodiac.sun"
              :disabled="isViewItem"
              class="zodiac-select"
            >
              <option value="-1" disabled selected>- Select option -</option>
              <option
                class="bg-gray-50"
                v-for="option in zodiacItems"
                :value="option"
                :key="option"
              >
                {{ option }}
              </option>
            </select>
          </div>
        </div>

        <div>
          <label class="planet-label"><span class="planet-symbol">&#9789;&nbsp;</span>Moon</label>
          <div class="flex mt-1">
            <span class="zodiac-symbol">
              {{ zodiacSymbols[`${currentPersonZodiac.moon}`] }}
            </span>
            <select
              name="moon"
              v-model="currentPersonZodiac.moon"
              :disabled="isViewItem"
              class="zodiac-select"
            >
              <option value="-1" disabled selected>- Select option -</option>
              <option
                class="bg-gray-50"
                v-for="option in zodiacItems"
                :value="option"
                :key="option"
              >
                {{ option }}
              </option>
            </select>
          </div>
        </div>

        <div>
          <label class="planet-label"
            ><span class="planet-symbol">&#9791;&nbsp;</span>Mercury</label
          >
          <div class="flex mt-1">
            <span class="zodiac-symbol">
              {{ zodiacSymbols[`${currentPersonZodiac.mercury}`] }}
            </span>
            <select
              name="mercury"
              v-model="currentPersonZodiac.mercury"
              :disabled="isViewItem"
              class="zodiac-select"
            >
              <option value="-1" disabled selected>- Select option -</option>
              <option
                class="bg-gray-50"
                v-for="option in zodiacItems"
                :value="option"
                :key="option"
              >
                {{ option }}
              </option>
            </select>
          </div>
        </div>

        <div>
          <label class="planet-label">
            <span class="planet-symbol">&#x2640;&nbsp;</span>Venus</label
          >
          <div class="flex mt-1">
            <span class="zodiac-symbol">
              {{ zodiacSymbols[`${currentPersonZodiac.venus}`] }}
            </span>
            <select
              name="venus"
              v-model="currentPersonZodiac.venus"
              :disabled="isViewItem"
              class="zodiac-select"
            >
              <option value="-1" disabled selected>- Select option -</option>
              <option
                class="bg-gray-50"
                v-for="option in zodiacItems"
                :value="option"
                :key="option"
              >
                {{ option }}
              </option>
            </select>
          </div>
        </div>

        <div>
          <label class="planet-label"> <span class="planet-symbol">&#9794;&nbsp;</span>Mars</label>
          <div class="flex mt-1">
            <span class="zodiac-symbol">
              {{ zodiacSymbols[`${currentPersonZodiac.mars}`] }}
            </span>
            <select
              name="mars"
              v-model="currentPersonZodiac.mars"
              :disabled="isViewItem"
              class="zodiac-select"
            >
              <option value="-1" disabled selected>- Select option -</option>
              <option
                class="bg-gray-50"
                v-for="option in zodiacItems"
                :value="option"
                :key="option"
              >
                {{ option }}
              </option>
            </select>
          </div>
        </div>

        <div>
          <label class="planet-label">
            <span class="planet-symbol">&#9795;&nbsp;</span>Jupiter</label
          >
          <div class="flex mt-1">
            <span class="zodiac-symbol">
              {{ zodiacSymbols[`${currentPersonZodiac.jupiter}`] }}
            </span>
            <select
              name="jupiter"
              v-model="currentPersonZodiac.jupiter"
              :disabled="isViewItem"
              class="zodiac-select"
            >
              <option value="-1" disabled selected>- Select option -</option>
              <option
                class="bg-gray-50"
                v-for="option in zodiacItems"
                :value="option"
                :key="option"
              >
                {{ option }}
              </option>
            </select>
          </div>
        </div>

        <div>
          <label class="planet-label">
            <span class="planet-symbol">&#9796;&nbsp;</span>Saturn</label
          >
          <div class="flex mt-1">
            <span class="zodiac-symbol">
              {{ zodiacSymbols[`${currentPersonZodiac.saturn}`] }}
            </span>
            <select
              name="saturn"
              v-model="currentPersonZodiac.saturn"
              :disabled="isViewItem"
              class="zodiac-select"
            >
              <option value="-1" disabled selected>- Select option -</option>
              <option
                class="bg-gray-50"
                v-for="option in zodiacItems"
                :value="option"
                :key="option"
              >
                {{ option }}
              </option>
            </select>
          </div>
        </div>

        <div>
          <label class="planet-label">
            <span class="planet-symbol">&#9797;&nbsp;</span>Uranus</label
          >
          <div class="flex mt-1">
            <span class="zodiac-symbol">
              {{ zodiacSymbols[`${currentPersonZodiac.uranus}`] }}
            </span>
            <select
              name="uranus"
              v-model="currentPersonZodiac.uranus"
              :disabled="isViewItem"
              class="zodiac-select"
            >
              <option value="-1" disabled selected>- Select option -</option>
              <option
                class="bg-gray-50"
                v-for="option in zodiacItems"
                :value="option"
                :key="option"
              >
                {{ option }}
              </option>
            </select>
          </div>
        </div>

        <div>
          <label class="planet-label">
            <span class="planet-symbol">&#9798;&nbsp;</span>Neptune</label
          >
          <div class="flex mt-1">
            <span class="zodiac-symbol">
              {{ zodiacSymbols[`${currentPersonZodiac.neptune}`] }}
            </span>
            <select
              name="neptune"
              v-model="currentPersonZodiac.neptune"
              :disabled="isViewItem"
              class="zodiac-select"
            >
              <option value="-1" disabled selected>- Select option -</option>
              <option
                class="bg-gray-50"
                v-for="option in zodiacItems"
                :value="option"
                :key="option"
              >
                {{ option }}
              </option>
            </select>
          </div>
        </div>

        <div>
          <label class="planet-label"> <span class="planet-symbol">&#9799;&nbsp;</span>pluto</label>
          <div class="flex mt-1">
            <span class="zodiac-symbol">
              {{ zodiacSymbols[`${currentPersonZodiac.pluto}`] }}
            </span>
            <select
              name="pluto"
              v-model="currentPersonZodiac.pluto"
              :disabled="isViewItem"
              class="zodiac-select"
            >
              <option value="-1" disabled selected>- Select option -</option>
              <option
                class="bg-gray-50"
                v-for="option in zodiacItems"
                :value="option"
                :key="option"
              >
                {{ option }}
              </option>
            </select>
          </div>
        </div>
      </div>

      <div class="flex items-center justify-start w-full mt-8">
        <button
          @click.prevent="handleEditClick"
          v-if="isViewItem"
          class="form-button button-edit"
          type="button"
        >
          Edit
        </button>
        <button
          v-if="!isViewItem"
          class="form-button button-submit"
          type="submit"
          @click.prevent="handleSubmit"
        >
          Submit
        </button>
        <button class="form-button button-cancel" type="reset" @click.prevent="closeModal">
          Cancel
        </button>

        <div class="ml-auto sm:visible invisible">
          <button class="form-button button-reset" @click.prevent="resetModalForm" type="reset">
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
.form-subtitle {
  @apply mb-2 text-xl text-center bg-teal-200 border-0 rounded;
}
.person-label {
  @apply text-gray-500 pl-3 text-sm uppercase font-bold leading-tight tracking-normal;
}
.person-input {
  @apply mt-1 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border;
}
.planet-label {
  @apply block pl-3 text-sm capitalize font-bold text-gray-500;
}
.planet-symbol {
  @apply text-base font-bold text-teal-400 hover:text-teal-500;
}
.zodiac-symbol {
  @apply inline-flex items-center px-3 text-xl font-bold text-teal-400 hover:text-teal-500 bg-gray-100 hover:bg-gray-50 border border-r-0 border-gray-300 rounded-l-md;
}
.zodiac-select {
  @apply bg-gray-50 rounded-none rounded-r-md border text-gray-700 focus:outline-none focus:ring-gray-500 focus:border-gray-400 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2;
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
