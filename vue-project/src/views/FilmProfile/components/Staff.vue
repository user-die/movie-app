<template>
  <section class="w-100 row my-4 gap-3">
    <div class="w-100 d-flex gap-3 col-12">
      <h2 class="m-0 text-danger fs-1 fw-bold">{{ props.text }}</h2>

      <button
        @click="
          () => {
            actorsToggle = !actorsToggle
          }
        "
        class="btn btn-outline-danger"
      >
        <ChevronRight v-if="!actorsToggle" />
        <ChevronDown v-else />
      </button>
    </div>

    <div
      :class="{
        'flex-wrap': actorsToggle,
        'overflow-hidden': !actorsToggle,
        'd-flex row-gap-0 align-items-start p-0 column-gap-2 m-auto list128px': true
      }"
    >
      <router-link
        class="d-flex gap-1 justify-content-center flex-column align-items-center text-white text-decoration-none text-center w120"
        v-for="actor in props.staff"
        :key="actor.id"
        :to="'/actor/' + actor.id"
      >
        <img
          :src="`https://image.openmoviedb.com/kinopoisk-st-images//actor_iphone/iphone90_${actor.id}.jpg`"
          alt="Портрет актёра"
          class="actorsImage rounded-4"
        />
        <p class="m-0 w120">{{ actor.name }}</p>
        <p v-if="actor?.description">{{ actor?.description }}</p>

        <p class="m-0 text-warning w120">
          <span v-for="prof in actor?.professions" :key="prof">{{ prof.slice(0, -1) + ' ' }}</span>
        </p>
      </router-link>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import ChevronRight from '~icons/bi/chevron-right'
import ChevronDown from '~icons/bi/chevron-down'
import altImage from '@/assets/alt.png'

var actorsToggle = ref(false)

const props = defineProps({
  staff: Object,
  text: String,
  prof: Boolean
})
</script>
