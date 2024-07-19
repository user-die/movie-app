<template>
  <div v-if="isError">
    <p class="fs-1 text-center">{{ errorMessage }}</p>
  </div>

  <article v-else class="text-white container mainBg p-4">
    <div class="row gap-2">
      <img :src="actor.data.photo || altImage" :alt="altImage" class="rounded-5 w300" />

      <About :actor="actor?.data" class="col-12 col-sm-12 col-md-7 col-lg-7 col-xl-8 col-xxl-9" />
    </div>

    <article class="d-flex flex-column gap-4 mx-4">
      <Roles
        :movies="
          actor?.data?.movies
            ?.filter((el) => el.enProfession === 'actor')
            .sort((a, b) => b.rating - a.rating)
            .reduce((acc, el) => (acc = [...acc, el.id]), [])
        "
      />

      <Awards :awards="winnings" text="Награды" />

      <Awards :awards="nominations" text="Номинации" />

      <Facts :facts="actor.data?.facts" />
    </article>
  </article>
</template>

<script setup>
import axios from 'axios'
import { onMounted, reactive, watch, ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import options from '../../options.json'
import About from './components/About.vue'
import Roles from './components/Roles.vue'
import Facts from './components/Facts.vue'
import Awards from './components/Awards.vue'
import { useHead } from '@unhead/vue'
import altImage from '@/assets/alt.png'

const isError = ref(false)
const errorMessage = ref()

var actor = reactive({
  data: {}
})

useHead({
  title: computed(() => actor.data.name || actor.data.enName),
  meta: [
    {
      name: 'description',
      content: computed(
        () =>
          actor.data.name +
          '. Информация об актёре / актрисе: рост, дата рождения, место рождения, всего фильмов. участие в фильмах и сериалах, награды, интересные факты'
      )
    }
  ]
})

const route = useRoute()
var id = ref(route.params.id)

var awards = reactive({})

var winnings = computed(() =>
  awards?.data?.filter(
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
  awards?.data?.filter(
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

var getActor = async (id) => {
  let response = await axios(
    `https://api.kinopoisk.dev/v1.4/person/${id}`,
    options['request1']
  ).catch((error) => {
    errorMessage.value = error.response.data.message
    isError.value = true
  })

  actor.data = response.data
}

var getAwards = async (id) => {
  let response = await axios(
    `https://api.kinopoisk.dev/v1.4/person/awards?page=1&limit=250&personId=${id}`,
    options['request1']
  )

  awards.data = response.data.docs
}

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
