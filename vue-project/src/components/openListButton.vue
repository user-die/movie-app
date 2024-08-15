<template>
  <div class="w-100 d-flex gap-3 col-12 mb-3 align-items-center">
    <h2 class="m-0 fs-5 fw-bold text-blue">{{ text }}</h2>

    <button v-if="length > 7" @click="$emit('toggleList', $event, id)" class="btn d-flex">
      <ChevronRight v-if="!toggle" />
      <ChevronDown v-else />
    </button>
  </div>
</template>

<script setup>
import ChevronRight from '~icons/bi/chevron-right'
import ChevronDown from '~icons/bi/chevron-down'

defineProps({
  text: String,
  length: Number,
  toggle: Boolean
})
</script>
