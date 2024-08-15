<template>
  <section v-if="facts?.length > 0">
    <openListButton
      text="Интересные факты"
      :length="facts.length"
      :toggle="toggle"
      @toggleList="() => (toggle = !toggle)"
    />

    <ul
      class="p-0 mb-2 overflow-hidden m-0"
      :style="{ maxHeight: oggle ? '250px' : '100%', listStyleType: 'none' }"
    >
      <li v-for="fact in facts" :key="fact.value" class="mb-0 py-3 border-bottom">
        {{ fact.value.replace(/\&.*?;/g, '').replace(/\<.*?>/g, '') }}
      </li>
    </ul>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import openListButton from '@/components/openListButton.vue'

var toggle = ref(true)

defineProps({
  facts: Array
})
</script>
