<template>
  <section v-if="winnings">
    <openListButton
      text="Награды"
      :length="winnings.length"
      :toggle="awardsToggle"
      @toggleList="() => (awardsToggle = !awardsToggle)"
    />

    <ul
      class="d-flex flex-column overflow-hidden align-items-start ps-4 m-0"
      :style="{ maxHeight: awardsToggle ? '200px' : '100%' }"
    >
      <li v-for="award in winnings" :key="award.nomination?.title">
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
  </section>

  <section v-if="nominations">
    <openListButton
      text="Награды"
      :length="nominations.length"
      :toggle="nominationToggle"
      @toggleList="() => (nominationToggle = !nominationToggle)"
    />

    <ul
      class="d-flex flex-column overflow-hidden align-items-start ps-4 m-0"
      :style="{ maxHeight: nominationToggle ? '200px' : '100%' }"
    >
      <li v-for="award in nominations" :key="award?.nomination?.title">
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
  </section>
</template>

<script setup>
import useFetch from '@/fetch'
import { ref, computed } from 'vue'
import openListButton from '@/components/openListButton.vue'

var awardsToggle = ref(true)
var nominationToggle = ref(true)

const props = defineProps({
  id: Number
})

var url = computed(() => `person/awards?page=1&limit=250&personId=${props.id}`)

const { data, isFinished, error, isError } = useFetch(url, {
  refetch: true
}).json()

var winnings = computed(() =>
  data?.value?.docs?.filter(
    (el, index, arr) =>
      el.winning === true &&
      index ===
        arr.findIndex(
          (t) =>
            t.nomination.title === el.nomination.title &&
            t.nomination.award.title === el.nomination.award.title &&
            t.nomination.award.year === el.nomination.award.year
        )
  )
)
var nominations = computed(() =>
  data?.value?.docs?.filter(
    (el, index, arr) =>
      el.winning !== true &&
      index ===
        arr.findIndex(
          (t) =>
            t.nomination.title === el.nomination.title &&
            t.nomination.award.title === el.nomination.award.title &&
            t.nomination.award.year === el.nomination.award.year
        )
  )
)
</script>
