<template>
  <article class="text-white container-fluid">
    <div class="row gap-2">
      <div class="col-12 col-sm-12 col-md-4 col-lg-4 col-xl-3 col-xxl-2 h-100">
        <img :src="actor.data?.photo || ''" alt="" class="rounded-5 w-100 h-100" />
      </div>

      <About :actor="actor?.data" class="col-12 col-sm-12 col-md-7 col-lg-7 col-xl-8 col-xxl-9" />
    </div>

    <article class="d-flex flex-column gap-4">
      <Roles :movies="actor?.data?.movies?.sort((a, b) => b.rating - a.rating)" />

      <Awards :awards="winnings.data" text="Награды" />

      <Awards :awards="nominations.data" text="Номинации" />

      <Facts :facts="actor.data?.facts" />
    </article>
  </article>
</template>

<script setup>
import axios from 'axios'
import { onMounted, reactive, watch, ref } from 'vue'
import { useRoute } from 'vue-router'
import options from '../../options.json'
import About from './components/About.vue'
import Roles from './components/Roles.vue'
import Facts from './components/Facts.vue'
import Awards from './components/Awards.vue'

const route = useRoute()
var id = ref(route.params.id)

var actor = reactive({
  data: {}
})

var awards = reactive({
  data: []
})

var winnings = reactive({ data: [] })

var nominations = reactive({ data: [] })

var getActor = async (id) => {
  let response = await axios(`https://api.kinopoisk.dev/v1.4/person/${id}`, options)

  actor.data = response.data
}

var getAwards = async (id) => {
  let response = await axios(
    `https://api.kinopoisk.dev/v1.4/person/awards?page=1&limit=250&personId=${id}`,
    options
  )

  awards.data = response.data.docs
}

watch(awards, (newValue) => {
  winnings.data = newValue.data.filter(
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

  nominations.data = newValue.data.filter(
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
})

watch(route, (newValue) => {
  id.value = newValue.params.id

  getActor(newValue.params.id)
  getAwards(newValue.params.id)
})

onMounted(() => {
  getActor(id.value)
  getAwards(id.value)
})
</script>

<style scoped></style>
