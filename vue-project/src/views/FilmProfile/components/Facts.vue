<template>
  <article v-if="props.facts?.length > 0">
    <h1 class="text-danger">{{ props.text }}</h1>

    <ul style="list-style-type: none">
      <li v-for="fact in facts" :key="fact.value" class="mb-0 py-3 px-4 border-bottom">
        {{ fact.value.replace(/\&.*?;/g, '').replace(/\<.*?>/g, '') }}
      </li>
    </ul>
  </article>
</template>

<script setup>
const props = defineProps({
  text: String,
  facts: Array
})
</script>

<style scoped></style>
