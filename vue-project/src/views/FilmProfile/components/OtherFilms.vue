<template>
  <section class="row my-4" v-if="props.films.length">
    <h2 class="text-danger mb-3 fs-1 fw-bold">{{ props.text }}</h2>

    <div class="d-flex align-items-center gap-2">
      <button @click="x -= 450" class="btn h40 w40 btn-danger left rounded-5">
        <Left />
      </button>

      <section class="d-flex gap-3 overflow-hidden align-items-normal list136" ref="car">
        <router-link
          v-for="sequel in props.films"
          :key="sequel.id"
          :to="'/movie/' + sequel.id"
          class="text-white text-decoration-none w120"
        >
          <img
            :src="sequel.poster?.url || sequel?.image"
            alt="постер фильма"
            class="actorsImage rounded-4"
          />
          <p class="mt-1 mb-0 text-center">{{ sequel.name }}</p>
          <p class="m-0 text-center">{{ sequel.year }}</p>
        </router-link>
      </section>

      <button @click="x += 450" class="btn h40 w40 btn-danger right rounded-5">
        <Right />
      </button>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { useScroll } from '@vueuse/core'
import Left from '~icons/bi/caret-left-fill'
import Right from '~icons/bi/caret-right-fill'

var car = ref(null)

const behavior = 'smooth'
const { x } = useScroll(car, { behavior })

const props = defineProps({
  text: String,
  films: Array
})
</script>

<style scoped>
.btn {
  padding: 4px;
}
</style>
