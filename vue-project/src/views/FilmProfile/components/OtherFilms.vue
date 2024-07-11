<template>
  <section class="row my-4 position-relative" v-if="props.films.length">
    <h2 class="text-danger mb-3 fs-1 fw-bold">{{ props.text }}</h2>
    <button @click="x -= 450" class="position-absolute btn btn-danger left rounded-5">
      <Left />
    </button>

    <section class="d-flex gap-4 overflow-hidden" ref="car">
      <router-link
        v-for="sequel in props.films"
        :key="sequel.id"
        :to="'/movie/' + sequel.id"
        style="width: 120px"
        class="text-white text-decoration-none"
      >
        <img :src="sequel.poster?.url || sequel?.image" alt="" class="actorsImage rounded-4" />
        <p class="mt-1 mb-0 text-center">{{ sequel.name }}</p>
        <p class="m-0 text-center">{{ sequel.year }}</p>
      </router-link>
    </section>

    <button @click="x += 450" class="position-absolute btn btn-danger right rounded-5">
      <Right />
    </button>
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
  top: 35%;
  width: 40px;
  height: 40px;
  padding: 4px;
}

.right {
  right: -30px;
}

.left {
  left: -30px;
}
</style>
