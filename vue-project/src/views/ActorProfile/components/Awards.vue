<template>
  <article v-if="awards?.length > 0">
    <div class="w-100 mb-2 mt-4 d-flex gap-3">
      <h2 class="text-danger m-0 fs-1 fw-bold">{{ props.text }}</h2>

      <button
        @click="
          () => {
            awardsToggle = !awardsToggle
          }
        "
        class="btn btn-outline-danger"
      >
        <ChevronRight v-if="awardsToggle" />
        <ChevronDown v-else />
      </button>
    </div>

    <ul
      class="d-flex flex-column overflow-hidden align-items-start ps-4 m-0"
      :style="{ maxHeight: awardsToggle ? '200px' : '100%' }"
    >
      <li v-for="award in props.awards" :key="award?.nomination?.title">
        {{ award?.nomination?.award?.title }}, {{ award?.nomination?.award?.year }} -
        {{ award?.nomination?.title }}
        <router-link
          v-if="award?.movie?.name"
          :to="'/movie/' + award?.movie?.id"
          class="text-secondary text-decoration-none"
        >
          {{ ', ' + award?.movie?.name }}
        </router-link>
      </li>
    </ul>
  </article>
</template>

<script setup>
import ChevronRight from '~icons/bi/chevron-right'
import ChevronDown from '~icons/bi/chevron-down'
import { ref } from 'vue'

var awardsToggle = ref(true)

const props = defineProps({
  awards: Array,
  text: String
})
</script>

<style scoped></style>
