<template>
  <article v-if="facts?.length > 0">
    <div class="w-100 d-flex gap-3 col-12 mb-2">
      <h2 class="text-danger m-0 fs-1 fw-bold">Интереные факты</h2>

      <button
        @click="
          () => {
            factsToggle = !factsToggle
          }
        "
        class="btn btn-outline-danger"
      >
        <ChevronRight v-if="factsToggle" />
        <ChevronDown v-else />
      </button>
    </div>

    <ul
      class="p-0 mb-2 overflow-hidden m-0"
      :style="{ maxHeight: factsToggle ? '250px' : '100%', listStyleType: 'none' }"
    >
      <li v-for="fact in facts" :key="fact.value" class="mb-0 py-3 border-bottom">
        {{ fact.value.replace(/\&.*?;/g, '').replace(/\<.*?>/g, '') }}
      </li>
    </ul>
  </article>
</template>

<script setup>
import ChevronRight from '~icons/bi/chevron-right'
import ChevronDown from '~icons/bi/chevron-down'
import { ref } from 'vue'

var factsToggle = ref(true)

defineProps({
  facts: Array
})
</script>
