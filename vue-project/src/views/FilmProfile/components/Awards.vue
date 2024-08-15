<template>
  <section class="my-3">
    <openListButton
      text="Награды"
      :length="data?.items?.filter((el) => el.win === true).length"
      :toggle="awardsToggle"
      @toggleList="() => (awardsToggle = !awardsToggle)"
    />

    <ul
      class="d-flex flex-column overflow-hidden align-items-start ps-4 m-0 gap-2"
      :style="{ maxHeight: awardsToggle ? '100%' : '200px' }"
    >
      <li
        v-for="award in data?.items?.filter((el) => el.win === true)"
        :key="award?.nomination?.title"
      >
        {{ award?.name }} , {{ award?.year }} , {{ award?.nominationName }} -
        {{ award?.persons[0]?.nameRu }}
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
  </section>

  <section id="nominations" class="my-4">
    <openListButton
      text="Номинации"
      :length="data?.items?.filter((el) => el.win === false).length"
      :toggle="awardsToggle1"
      @toggleList="() => (awardsToggle1 = !awardsToggle1)"
    />

    <ul
      class="d-flex flex-column overflow-hidden align-items-start ps-4 m-0 gap-2"
      :style="{ maxHeight: awardsToggle1 ? '100%' : '200px' }"
    >
      <li
        v-for="award in data?.items?.filter((el) => el.win === false)"
        :key="award?.nomination?.title"
      >
        {{ award?.name }} , {{ award?.year }} , {{ award?.nominationName }} -
        {{ award?.persons[0]?.nameRu }}
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
  </section>
</template>

<script setup>
import { computed, ref } from 'vue'

import { useFetch2 } from '@/fetch'

const props = defineProps({
  id: Number
})

var url = computed(() => `films/${props.id}/awards`)

const { data, isFinished } = useFetch2(url, { refetch: true }).json()

const awardsToggle = ref(false)
const awardsToggle1 = ref(false)
</script>
