import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useModalStore = defineStore('modal', () => {
  const isModalActive = ref<boolean>(false)
  const isNewItem = ref<boolean>(true)
  const isViewItem = ref<boolean>(false)

  const resetModalState = () => {
    isModalActive.value = false
    isNewItem.value = true
    isViewItem.value = false
  }

  const openNewItemModal = () => {
    resetModalState()
    isModalActive.value = true
  }

  const openEditItemModal = () => {
    resetModalState()
    isModalActive.value = true
    isNewItem.value = false
  }

  const openViewItemModal = () => {
    resetModalState()
    isModalActive.value = true
    isNewItem.value = false
    isViewItem.value = true
  }

  return {
    isModalActive,
    isNewItem,
    isViewItem,
    openNewItemModal,
    openEditItemModal,
    openViewItemModal,
    resetModalState
  }
})
