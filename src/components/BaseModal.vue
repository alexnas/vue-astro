<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useModalStore } from '@/stores/modal'

defineEmits(['close-modal'])
defineProps({
  modalTitle: {
    type: String,
    default: 'Card Title'
  }
})

const modalStore = useModalStore()
const { isModalActive } = storeToRefs(modalStore)
</script>

<template>
  <Teleport to="body">
    <div
      v-show="isModalActive"
      class="absolute w-full bg-black bg-opacity-30 h-full top-0 left-0 flex justify-center px-8 overflow-auto"
    >
      <div
        v-if="isModalActive"
        role="alert"
        class="relative mx-auto mb-6 w-11/12 md:w-2/3 max-w-lg p-6 text-green-700 bg-gray-100 self-start mt-32 max-w-screen-md shadow-md rounded-lg sm:rounded-2xl"
      >
        <h1 class="text-2xl mb-4">{{ modalTitle }}</h1>
        <button
          class="cursor-pointer absolute top-0 right-0 mt-4 mr-5 text-gray-400 hover:text-gray-600 transition duration-150 ease-in-out rounded focus:ring-2 focus:outline-none focus:ring-gray-600"
          @click="$emit('close-modal')"
          aria-label="close modal"
          role="button"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="icon icon-tabler icon-tabler-x"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            stroke-width="2.5"
            stroke="currentColor"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" />
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        <slot />
      </div>
    </div>
  </Teleport>
</template>
