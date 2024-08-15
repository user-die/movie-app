<template>
  <section class="w-100 my-3">
    <openListButton
      :text="props.text"
      :length="props.staff.length"
      :toggle="toggle"
      @toggleList="() => (toggle = !toggle)"
    />

    <div
      :class="{
        'flex-wrap': toggle,
        'overflow-hidden': !toggle,
        'd-flex row-gap-0 align-items-start p-0 column-gap-2 cv list128px': true
      }"
    >
      <router-link
        class="d-flex gap-1 justify-content-center flex-column align-items-center text-white text-decoration-none text-center w120"
        v-for="actor in props.staff"
        :key="actor.id"
        :to="'/actor/' + actor.id"
      >
        <img
          v-lazy="
            `https://image.openmoviedb.com/kinopoisk-st-images//actor_iphone/iphone90_${actor.id}.jpg`
          "
          alt="Портрет актёра"
          class="actorsImage rounded-4"
          height="143"
          width="90"
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
let toggle = ref(false)

const props = defineProps({
  staff: Object,
  text: String,
  prof: Boolean
})
</script>
