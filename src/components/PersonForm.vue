<script setup lang="ts">
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { usePersonStore } from '@/stores/person'
import { useModalStore } from '@/stores/modal'
import { formatDateTime } from '@/tools/formatDate'
import BaseModal from '@/components/BaseModal.vue'
import { zodiacSymbols } from '@/constants/zodiacSymbols'
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
    <form
      class="relative py-4 px-5 my-8 md:px-10 bg-gray-50 border border-gray-200 shadow-md rounded"
    >
      <div class="mb-2 text-xl text-center bg-teal-200 border-0 rounded">
        Person Info (id:{{ currentPerson.id }})
      </div>

      <div class="grid lg:grid-cols-4 grid-cols-3 gap-4">
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
            name="surname"
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
            >Birthplace</label
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
            type="text"
            v-model="currentPerson.description"
            :disabled="isViewItem"
            class="mt-1 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
            placeholder="Person surname"
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

      <div class="mt-6 mb-2 text-xl text-center bg-teal-200 border-0 rounded">
        Zodiac (id:{{ currentPersonZodiac.id }})
      </div>

      <div class="grid grid-cols-3 gap-4">
        <div>
          <label class="block pl-3 text-sm capitalize font-bold text-gray-500">
            <span class="text-base font-bold text-teal-400 hover:text-teal-500">&#9737;&nbsp;</span
            >Sun</label
          >
          <div class="flex mt-1">
            <span
              class="inline-flex items-center px-3 text-xl font-bold text-teal-400 hover:text-teal-500 bg-gray-100 hover:bg-gray-50 border border-r-0 border-gray-300 rounded-l-md"
            >
              {{ zodiacSymbols[`${currentPersonZodiac.sun}`] }}
            </span>
            <select
              name="sun"
              v-model="currentPersonZodiac.sun"
              :disabled="isViewItem"
              class="bg-gray-50 rounded-none rounded-r-md border text-gray-700 focus:outline-none focus:ring-gray-500 focus:border-gray-400 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2"
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
          <label class="block pl-3 text-sm capitalize font-bold text-gray-500">
            <span class="text-base font-bold text-teal-400 hover:text-teal-500">&#9789;&nbsp;</span
            >Moon</label
          >
          <div class="flex mt-1">
            <span
              class="inline-flex items-center px-3 text-xl font-bold text-teal-400 hover:text-teal-500 bg-gray-100 hover:bg-gray-50 border border-r-0 border-gray-300 rounded-l-md"
            >
              {{ zodiacSymbols[`${currentPersonZodiac.moon}`] }}
            </span>
            <select
              name="moon"
              v-model="currentPersonZodiac.moon"
              :disabled="isViewItem"
              class="bg-gray-50 rounded-none rounded-r-md border text-gray-700 focus:outline-none focus:ring-gray-500 focus:border-gray-400 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2"
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
          <label class="block pl-3 text-sm capitalize font-bold text-gray-500">
            <span class="text-base font-bold text-teal-400 hover:text-teal-500">&#9791;&nbsp;</span
            >Mercury</label
          >
          <div class="flex mt-1">
            <span
              class="inline-flex items-center px-3 text-xl font-bold text-teal-400 hover:text-teal-500 bg-gray-100 hover:bg-gray-50 border border-r-0 border-gray-300 rounded-l-md"
            >
              {{ zodiacSymbols[`${currentPersonZodiac.mercury}`] }}
            </span>
            <select
              name="mercury"
              v-model="currentPersonZodiac.mercury"
              :disabled="isViewItem"
              class="bg-gray-50 rounded-none rounded-r-md border text-gray-700 focus:outline-none focus:ring-gray-500 focus:border-gray-400 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2"
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
          <label class="block pl-3 text-sm capitalize font-bold text-gray-500">
            <span class="text-base font-bold text-teal-400 hover:text-teal-500">&#x2640;&nbsp;</span
            >Venus</label
          >
          <div class="flex mt-1">
            <span
              class="inline-flex items-center px-3 text-xl font-bold text-teal-400 hover:text-teal-500 bg-gray-100 hover:bg-gray-50 border border-r-0 border-gray-300 rounded-l-md"
            >
              {{ zodiacSymbols[`${currentPersonZodiac.venus}`] }}
            </span>
            <select
              name="venus"
              v-model="currentPersonZodiac.venus"
              :disabled="isViewItem"
              class="bg-gray-50 rounded-none rounded-r-md border text-gray-700 focus:outline-none focus:ring-gray-500 focus:border-gray-400 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2"
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
          <label class="block pl-3 text-sm capitalize font-bold text-gray-500">
            <span class="text-base font-bold text-teal-400 hover:text-teal-500">&#9794;&nbsp;</span
            >Mars</label
          >
          <div class="flex mt-1">
            <span
              class="inline-flex items-center px-3 text-xl font-bold text-teal-400 hover:text-teal-500 bg-gray-100 hover:bg-gray-50 border border-r-0 border-gray-300 rounded-l-md"
            >
              {{ zodiacSymbols[`${currentPersonZodiac.mars}`] }}
            </span>
            <select
              name="mars"
              v-model="currentPersonZodiac.mars"
              :disabled="isViewItem"
              class="bg-gray-50 rounded-none rounded-r-md border text-gray-700 focus:outline-none focus:ring-gray-500 focus:border-gray-400 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2"
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
          <label class="block pl-3 text-sm capitalize font-bold text-gray-500">
            <span class="text-base font-bold text-teal-400 hover:text-teal-500">&#9795;&nbsp;</span
            >Jupiter</label
          >
          <div class="flex mt-1">
            <span
              class="inline-flex items-center px-3 text-xl font-bold text-teal-400 hover:text-teal-500 bg-gray-100 hover:bg-gray-50 border border-r-0 border-gray-300 rounded-l-md"
            >
              {{ zodiacSymbols[`${currentPersonZodiac.jupiter}`] }}
            </span>
            <select
              name="jupiter"
              v-model="currentPersonZodiac.jupiter"
              :disabled="isViewItem"
              class="bg-gray-50 rounded-none rounded-r-md border text-gray-700 focus:outline-none focus:ring-gray-500 focus:border-gray-400 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2"
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
          <label class="block pl-3 text-sm capitalize font-bold text-gray-500">
            <span class="text-base font-bold text-teal-400 hover:text-teal-500">&#9796;&nbsp;</span
            >Saturn</label
          >
          <div class="flex mt-1">
            <span
              class="inline-flex items-center px-3 text-xl font-bold text-teal-400 hover:text-teal-500 bg-gray-100 hover:bg-gray-50 border border-r-0 border-gray-300 rounded-l-md"
            >
              {{ zodiacSymbols[`${currentPersonZodiac.saturn}`] }}
            </span>
            <select
              name="saturn"
              v-model="currentPersonZodiac.saturn"
              :disabled="isViewItem"
              class="bg-gray-50 rounded-none rounded-r-md border text-gray-700 focus:outline-none focus:ring-gray-500 focus:border-gray-400 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2"
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
          <label class="block pl-3 text-sm capitalize font-bold text-gray-500">
            <span class="text-base font-bold text-teal-400 hover:text-teal-500">&#9797;&nbsp;</span
            >Uranus</label
          >
          <div class="flex mt-1">
            <span
              class="inline-flex items-center px-3 text-xl font-bold text-teal-400 hover:text-teal-500 bg-gray-100 hover:bg-gray-50 border border-r-0 border-gray-300 rounded-l-md"
            >
              {{ zodiacSymbols[`${currentPersonZodiac.uranus}`] }}
            </span>
            <select
              name="uranus"
              v-model="currentPersonZodiac.uranus"
              :disabled="isViewItem"
              class="bg-gray-50 rounded-none rounded-r-md border text-gray-700 focus:outline-none focus:ring-gray-500 focus:border-gray-400 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2"
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
          <label class="block pl-3 text-sm capitalize font-bold text-gray-500">
            <span class="text-base font-bold text-teal-400 hover:text-teal-500">&#9798;&nbsp;</span
            >Neptune</label
          >
          <div class="flex mt-1">
            <span
              class="inline-flex items-center px-3 text-xl font-bold text-teal-400 hover:text-teal-500 bg-gray-100 hover:bg-gray-50 border border-r-0 border-gray-300 rounded-l-md"
            >
              {{ zodiacSymbols[`${currentPersonZodiac.neptune}`] }}
            </span>
            <select
              name="neptune"
              v-model="currentPersonZodiac.neptune"
              :disabled="isViewItem"
              class="bg-gray-50 rounded-none rounded-r-md border text-gray-700 focus:outline-none focus:ring-gray-500 focus:border-gray-400 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2"
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
          <label class="block pl-3 text-sm capitalize font-bold text-gray-500">
            <span class="text-base font-bold text-teal-400 hover:text-teal-500">&#9799;&nbsp;</span
            >pluto</label
          >
          <div class="flex mt-1">
            <span
              class="inline-flex items-center px-3 text-xl font-bold text-teal-400 hover:text-teal-500 bg-gray-100 hover:bg-gray-50 border border-r-0 border-gray-300 rounded-l-md"
            >
              {{ zodiacSymbols[`${currentPersonZodiac.pluto}`] }}
            </span>
            <select
              name="pluto"
              v-model="currentPersonZodiac.pluto"
              :disabled="isViewItem"
              class="bg-gray-50 rounded-none rounded-r-md border text-gray-700 focus:outline-none focus:ring-gray-500 focus:border-gray-400 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2"
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
        <!-- ======================================= -->
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
