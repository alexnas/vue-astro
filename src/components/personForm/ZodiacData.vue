<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { usePersonStore } from '@/stores/person'
import { useModalStore } from '@/stores/modal'
import { zodiacSymbols } from '@/constants/zodiacConstants'
import { zodiacItems } from '@/constants/zodiacConstants'
import FormSubtitle from './FormSubtitle.vue'
import { Field, ErrorMessage } from 'vee-validate'

const personStore = usePersonStore()
const { currentPersonZodiac } = storeToRefs(personStore)
const modalStore = useModalStore()
const { isViewItem } = storeToRefs(modalStore)
</script>

<template>
  <FormSubtitle>Zodiac (id:{{ currentPersonZodiac.id }})</FormSubtitle>

  <div class="grid grid-cols-3 gap-4">
    <div>
      <label class="planet-label"><span class="planet-symbol">&#9737;&nbsp;</span>Sun</label>
      <div class="flex mt-1">
        <span class="zodiac-symbol">
          {{ zodiacSymbols[`${currentPersonZodiac.sun}`] }}
        </span>
        <Field
          as="select"
          name="sun"
          v-model="currentPersonZodiac.sun"
          :disabled="isViewItem"
          class="zodiac-select"
        >
          <option value="-1" disabled selected>- Select option -</option>
          <option class="bg-gray-50" v-for="option in zodiacItems" :value="option" :key="option">
            {{ option }}
          </option>
        </Field>
      </div>
      <ErrorMessage name="sun" class="form-field-error" />
    </div>

    <div>
      <label class="planet-label"><span class="planet-symbol">&#9789;&nbsp;</span>Moon</label>
      <div class="flex mt-1">
        <span class="zodiac-symbol">
          {{ zodiacSymbols[`${currentPersonZodiac.moon}`] }}
        </span>
        <Field
          as="select"
          name="moon"
          v-model="currentPersonZodiac.moon"
          :disabled="isViewItem"
          class="zodiac-select"
        >
          <option value="-1" disabled selected>- Select option -</option>
          <option class="bg-gray-50" v-for="option in zodiacItems" :value="option" :key="option">
            {{ option }}
          </option>
        </Field>
      </div>
      <ErrorMessage name="moon" class="form-field-error" />
    </div>

    <div>
      <label class="planet-label"><span class="planet-symbol">&#9791;&nbsp;</span>Mercury</label>
      <div class="flex mt-1">
        <span class="zodiac-symbol">
          {{ zodiacSymbols[`${currentPersonZodiac.mercury}`] }}
        </span>
        <Field
          as="select"
          name="mercury"
          v-model="currentPersonZodiac.mercury"
          :disabled="isViewItem"
          class="zodiac-select"
        >
          <option value="-1" disabled selected>- Select option -</option>
          <option class="bg-gray-50" v-for="option in zodiacItems" :value="option" :key="option">
            {{ option }}
          </option>
        </Field>
      </div>
      <ErrorMessage name="mercury" class="form-field-error" />
    </div>

    <div>
      <label class="planet-label"> <span class="planet-symbol">&#x2640;&nbsp;</span>Venus</label>
      <div class="flex mt-1">
        <span class="zodiac-symbol">
          {{ zodiacSymbols[`${currentPersonZodiac.venus}`] }}
        </span>
        <Field
          as="select"
          name="venus"
          v-model="currentPersonZodiac.venus"
          :disabled="isViewItem"
          class="zodiac-select"
        >
          <option value="-1" disabled selected>- Select option -</option>
          <option class="bg-gray-50" v-for="option in zodiacItems" :value="option" :key="option">
            {{ option }}
          </option>
        </Field>
      </div>
      <ErrorMessage name="venus" class="form-field-error" />
    </div>

    <div>
      <label class="planet-label"> <span class="planet-symbol">&#9794;&nbsp;</span>Mars</label>
      <div class="flex mt-1">
        <span class="zodiac-symbol">
          {{ zodiacSymbols[`${currentPersonZodiac.mars}`] }}
        </span>
        <Field
          as="select"
          name="mars"
          v-model="currentPersonZodiac.mars"
          :disabled="isViewItem"
          class="zodiac-select"
        >
          <option value="-1" disabled selected>- Select option -</option>
          <option class="bg-gray-50" v-for="option in zodiacItems" :value="option" :key="option">
            {{ option }}
          </option>
        </Field>
      </div>
      <ErrorMessage name="mars" class="form-field-error" />
    </div>

    <div>
      <label class="planet-label"> <span class="planet-symbol">&#9795;&nbsp;</span>Jupiter</label>
      <div class="flex mt-1">
        <span class="zodiac-symbol">
          {{ zodiacSymbols[`${currentPersonZodiac.jupiter}`] }}
        </span>
        <Field
          as="select"
          name="jupiter"
          v-model="currentPersonZodiac.jupiter"
          :disabled="isViewItem"
          class="zodiac-select"
        >
          <option value="-1" disabled selected>- Select option -</option>
          <option class="bg-gray-50" v-for="option in zodiacItems" :value="option" :key="option">
            {{ option }}
          </option>
        </Field>
      </div>
      <ErrorMessage name="jupiter" class="form-field-error" />
    </div>

    <div>
      <label class="planet-label"> <span class="planet-symbol">&#9796;&nbsp;</span>Saturn</label>
      <div class="flex mt-1">
        <span class="zodiac-symbol">
          {{ zodiacSymbols[`${currentPersonZodiac.saturn}`] }}
        </span>
        <Field
          as="select"
          name="saturn"
          v-model="currentPersonZodiac.saturn"
          :disabled="isViewItem"
          class="zodiac-select"
        >
          <option value="-1" disabled selected>- Select option -</option>
          <option class="bg-gray-50" v-for="option in zodiacItems" :value="option" :key="option">
            {{ option }}
          </option>
        </Field>
      </div>
      <ErrorMessage name="saturn" class="form-field-error" />
    </div>

    <div>
      <label class="planet-label"> <span class="planet-symbol">&#9797;&nbsp;</span>Uranus</label>
      <div class="flex mt-1">
        <span class="zodiac-symbol">
          {{ zodiacSymbols[`${currentPersonZodiac.uranus}`] }}
        </span>
        <Field
          as="select"
          name="uranus"
          v-model="currentPersonZodiac.uranus"
          :disabled="isViewItem"
          class="zodiac-select"
        >
          <option value="-1" disabled selected>- Select option -</option>
          <option class="bg-gray-50" v-for="option in zodiacItems" :value="option" :key="option">
            {{ option }}
          </option>
        </Field>
      </div>
      <ErrorMessage name="uranus" class="form-field-error" />
    </div>

    <div>
      <label class="planet-label"> <span class="planet-symbol">&#9798;&nbsp;</span>Neptune</label>
      <div class="flex mt-1">
        <span class="zodiac-symbol">
          {{ zodiacSymbols[`${currentPersonZodiac.neptune}`] }}
        </span>
        <Field
          as="select"
          name="neptune"
          v-model="currentPersonZodiac.neptune"
          :disabled="isViewItem"
          class="zodiac-select"
        >
          <option value="-1" disabled selected>- Select option -</option>
          <option class="bg-gray-50" v-for="option in zodiacItems" :value="option" :key="option">
            {{ option }}
          </option>
        </Field>
      </div>
      <ErrorMessage name="neptune" class="form-field-error" />
    </div>

    <div>
      <label class="planet-label"> <span class="planet-symbol">&#9799;&nbsp;</span>pluto</label>
      <div class="flex mt-1">
        <span class="zodiac-symbol">
          {{ zodiacSymbols[`${currentPersonZodiac.pluto}`] }}
        </span>
        <Field
          as="select"
          name="pluto"
          v-model="currentPersonZodiac.pluto"
          :disabled="isViewItem"
          class="zodiac-select"
        >
          <option value="-1" disabled selected>- Select option -</option>
          <option class="bg-gray-50" v-for="option in zodiacItems" :value="option" :key="option">
            {{ option }}
          </option>
        </Field>
      </div>
    </div>
    <ErrorMessage name="pluto" class="form-field-error" />
  </div>
</template>

<style lang="postcss" scoped>
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
.form-field-error {
  @apply text-orange-600 text-sm;
}
</style>
