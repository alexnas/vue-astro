<script setup lang="ts">
defineProps({
  title: {
    type: String,
    default: 'Card Name'
  },
  data: {
    type: Object || Array,
    default: () => {}
  }
})
</script>

<template>
  <div class="p-4 max-w-sm mx-auto bg-white rounded-xl shadow-lg flex items-center space-x-4">
    <div>
      <div class="text-xl font-medium text-black">{{ title }}</div>
      <div class="text-slate-500">
        <pre>{{ data }}</pre>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
