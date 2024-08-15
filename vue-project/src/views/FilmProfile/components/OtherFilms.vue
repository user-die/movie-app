<template>
  <section class="row my-4" v-if="props.films.length">
    <openListButton
      :text="props.text"
      :length="props.films.length"
      :toggle="toggle"
      @toggleList="() => (toggle = !toggle)"
    />

    <div
      :class="{
        'flex-wrap': toggle,
        'overflow-hidden': !toggle,
        'd-flex row-gap-0 align-items-start p-0 gap-3 cv list136px': true
      }"
    >
      <router-link
        v-for="sequel in props.films"
        :key="sequel.id"
        :to="'/movie/' + sequel.id"
        class="text-white text-decoration-none w120"
      >
        <img
          v-lazy="sequel.poster?.previewUrl?.replace('1000', '240') || sequel?.image"
          alt="постер фильма"
          class="actorsImage rounded-4"
          width="120px"
        />
        <p class="mt-1 mb-0 text-center">{{ sequel.name }}</p>
        <p class="m-0 text-center">{{ sequel.year }}</p>
      </router-link>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import openListButton from '@/components/openListButton.vue'

let toggle = ref(false)

const props = defineProps({
  text: String,
  films: Array
})
</script>
