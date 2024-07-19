<template>
  <section class="my-4" v-if="awards.data.filter((el) => el.win === true).length > 0">
    <div class="w-100 d-flex gap-3 col-12 mb-2">
      <h2 class="text-danger m-0 fs-1 fw-bold">Награды</h2>

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
      <li
        v-for="award in awards.data.filter((el) => el.win === true)"
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

  <section class="my-4" v-if="awards.data.filter((el) => el.win === false).length > 0">
    <div class="w-100 d-flex gap-3 col-12 mb-2">
      <h2 class="text-danger m-0 fs-1 fw-bold">Номинации</h2>

      <button
        @click="
          () => {
            awardsToggle1 = !awardsToggle1
          }
        "
        class="btn btn-outline-danger"
      >
        <ChevronRight v-if="awardsToggle1" />
        <ChevronDown v-else />
      </button>
    </div>

    <ul
      class="d-flex flex-column overflow-hidden align-items-start ps-4 m-0"
      :style="{ maxHeight: awardsToggle1 ? '200px' : '100%' }"
    >
      <li
        v-for="award in awards.data.filter((el) => el.win === false)"
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
import axios from 'axios'
import options from '@/options.json'
import { onMounted, reactive, watch, ref } from 'vue'
import ChevronRight from '~icons/bi/chevron-right'
import ChevronDown from '~icons/bi/chevron-down'

const props = defineProps({
  id: Number
})

const awardsToggle = ref(false)
const awardsToggle1 = ref(false)
const awards = reactive({ data: [] })

var getAwards = async (id) => {
  var response = await axios.get(
    `https://kinopoiskapiunofficial.tech/api/v2.2/films/${id}/awards`,
    options['request2']
  )

  awards.data = response.data.items
}

watch(props, () => {
  getAwards(props.id)
})

onMounted(() => {
  getAwards(props.id)
})
</script>
