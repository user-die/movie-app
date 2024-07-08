<template>
  <article v-if="facts">
    <div class="w-100 d-flex gap-3 col-12 mb-2">
      <h2 class="text-danger m-0">Интереные факты</h2>

      <BButton
        @click="
          () => {
            factsToggle = !factsToggle
          }
        "
        variant="outline-danger"
      >
        <ChevronRight v-if="factsToggle" />
        <ChevronDown v-else />
      </BButton>
    </div>

    <article
      class="ps-4 mb-2 overflow-hidden ps-4 m-0"
      :style="{ maxHeight: factsToggle ? '250px' : '100%' }"
    >
      <p v-for="fact in facts" :key="fact.value" class="mb-2">
        {{ fact.value.replace(/\&.*?;/g, '').replace(/\<.*?>/g, '') }}
      </p>
    </article>
  </article>
</template>

<script setup>
import ChevronRight from '~icons/bi/chevron-right'
import ChevronDown from '~icons/bi/chevron-down'
import { BButton } from 'bootstrap-vue-next'
import { ref } from 'vue'

var factsToggle = ref(true)

defineProps({
  facts: Array
})
</script>

<style scoped></style>
