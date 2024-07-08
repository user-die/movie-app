<template>
  <article class="mt-4">
    <div class="w-100 d-flex gap-3 col-12 mb-2">
      <h2 class="text-danger m-0">Участие в проектах</h2>

      <BButton
        @click="
          () => {
            rolesToggle = !rolesToggle
          }
        "
        variant="outline-danger"
      >
        <ChevronRight v-if="rolesToggle" />
        <ChevronDown v-else />
      </BButton>
    </div>

    <ul
      class="d-flex flex-wrap overflow-hidden align-items-start ps-4 m-0 justify-content-between"
      :style="{ maxHeight: rolesToggle ? '250px' : '100%' }"
    >
      <li v-for="movie in movies" :key="movie.id" style="flex: 1 1 400px" class="p-0">
        <router-link :to="'/movie/' + movie.id" class="text-decoration-none text-white"
          >{{ movie.name || movie.alternativeName }}

          <span class="text-secondary">{{ movie.description && ', ' + movie.description }}</span>
        </router-link>
      </li>
    </ul>
  </article>
</template>

<script setup>
import ChevronRight from '~icons/bi/chevron-right'
import ChevronDown from '~icons/bi/chevron-down'
import { BButton } from 'bootstrap-vue-next'
import { ref } from 'vue'

var rolesToggle = ref(true)

defineProps({
  movies: Array
})
</script>

<style scoped></style>
