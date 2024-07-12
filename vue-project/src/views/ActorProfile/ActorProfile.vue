<template>
  <article class="text-white container mainBg p-4">
    <div class="row gap-2">
      <img :src="actor.data?.photo || ''" alt="" class="rounded-5" style="width: 300px" />

      <About :actor="actor?.data" class="col-12 col-sm-12 col-md-7 col-lg-7 col-xl-8 col-xxl-9" />
    </div>

    <article class="d-flex flex-column gap-4 mx-4">
      <Roles :movies="actor?.data?.movies?.sort((a, b) => b.rating - a.rating)" />

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

const route = useRoute()
var id = ref(route.params.id)

var actor = reactive({
  data: {}
})

var awards = reactive({
  data: [
    {
      nomination: {
        award: { title: 'Британская академия', year: 2017 },
        title: 'Восходящая звезда'
      },
      winning: false,
      personId: 3360189,
      movie: null,
      createdAt: '2024-04-13T02:47:35.619Z',
      updatedAt: '2024-04-13T02:47:35.619Z',
      id: '6619f2475421889f6f53e241'
    },
    {
      nomination: {
        award: { title: 'Эмми', year: 2021 },
        title: 'Лучшая женская роль в мини-сериале или телефильме'
      },
      winning: false,
      personId: 3360189,
      movie: { id: 1253633, name: 'Ход королевы', rating: 8.281 },
      createdAt: '2024-04-13T02:47:35.616Z',
      updatedAt: '2024-04-13T02:47:35.616Z',
      id: '6619f2475421889f6f53e23f'
    },
    {
      nomination: {
        award: { title: 'Премия канала «MTV»', year: 2021 },
        title: 'Лучший актер или актриса в ТВ-шоу'
      },
      winning: false,
      personId: 3360189,
      movie: { id: 1253633, name: 'Ход королевы', rating: 8.281 },
      createdAt: '2024-04-13T02:47:35.613Z',
      updatedAt: '2024-04-13T02:47:35.613Z',
      id: '6619f2475421889f6f53e23d'
    },
    {
      nomination: {
        award: { title: 'Премия Гильдии актеров', year: 2021 },
        title: 'Лучшая женская роль в телефильме или минисериале'
      },
      winning: true,
      personId: 3360189,
      movie: { id: 1253633, name: 'Ход королевы', rating: 8.281 },
      createdAt: '2024-04-13T02:47:35.609Z',
      updatedAt: '2024-04-13T02:47:35.609Z',
      id: '6619f2475421889f6f53e23b'
    },
    {
      nomination: { award: { title: 'Сатурн', year: 2017 }, title: 'Лучший молодой актер/актриса' },
      winning: false,
      personId: 3360189,
      movie: { id: 865302, name: 'Ведьма', rating: 6.614 },
      createdAt: '2024-04-13T02:47:35.605Z',
      updatedAt: '2024-04-13T02:47:35.605Z',
      id: '6619f2475421889f6f53e239'
    },
    {
      nomination: { award: { title: 'Сатурн', year: 2024 }, title: 'Лучшая актриса' },
      winning: false,
      personId: 3360189,
      movie: { id: 1257264, name: 'Меню', rating: 6.719 },
      createdAt: '2024-04-13T02:47:35.600Z',
      updatedAt: '2024-04-13T02:47:35.600Z',
      id: '6619f2475421889f6f53e237'
    },
    {
      nomination: {
        award: { title: 'Каннский кинофестиваль', year: 2017 },
        title: 'Приз компании «Шопар» лучшей молодой актрисе'
      },
      winning: true,
      personId: 3360189,
      movie: null,
      createdAt: '2024-04-13T02:47:35.596Z',
      updatedAt: '2024-04-13T02:47:35.596Z',
      id: '6619f2475421889f6f53e235'
    },
    {
      nomination: {
        award: { title: 'Золотой глобус', year: 2021 },
        title: 'Лучшая женская роль (комедия или мюзикл)'
      },
      winning: false,
      personId: 3360189,
      movie: { id: 1244402, name: 'Эмма.', rating: 6.947 },
      createdAt: '2024-04-13T02:47:35.593Z',
      updatedAt: '2024-04-13T02:47:35.593Z',
      id: '6619f2475421889f6f53e233'
    },
    {
      nomination: {
        award: { title: 'Золотой глобус', year: 2021 },
        title: 'Лучшая актриса мини-сериала или фильма на ТВ'
      },
      winning: true,
      personId: 3360189,
      movie: { id: 1253633, name: 'Ход королевы', rating: 8.281 },
      createdAt: '2024-04-13T02:47:35.588Z',
      updatedAt: '2024-04-13T02:47:35.588Z',
      id: '6619f2475421889f6f53e231'
    },
    {
      nomination: {
        award: { title: 'Золотой глобус', year: 2023 },
        title: 'Лучшая женская роль (комедия или мюзикл)'
      },
      winning: false,
      personId: 3360189,
      movie: { id: 1257264, name: 'Меню', rating: 6.719 },
      createdAt: '2024-04-13T02:47:35.584Z',
      updatedAt: '2024-04-13T02:47:35.584Z',
      id: '6619f2475421889f6f53e22f'
    },
    {
      nomination: {
        award: { title: 'Британская академия', year: 2017 },
        title: 'Восходящая звезда'
      },
      winning: false,
      personId: 3360189,
      movie: null,
      createdAt: '2024-03-15T10:51:01.224Z',
      updatedAt: '2024-03-15T10:51:01.224Z',
      id: '65f428159b5b0a37ccb82400'
    },
    {
      nomination: {
        award: { title: 'Эмми', year: 2021 },
        title: 'Лучшая женская роль в мини-сериале или телефильме'
      },
      winning: false,
      personId: 3360189,
      movie: { id: 1253633, name: 'Ход королевы', rating: 8.283 },
      createdAt: '2024-03-15T10:51:01.222Z',
      updatedAt: '2024-03-15T10:51:01.222Z',
      id: '65f428159b5b0a37ccb823fe'
    },
    {
      nomination: {
        award: { title: 'Премия канала «MTV»', year: 2021 },
        title: 'Лучший актер или актриса в ТВ-шоу'
      },
      winning: false,
      personId: 3360189,
      movie: { id: 1253633, name: 'Ход королевы', rating: 8.283 },
      createdAt: '2024-03-15T10:51:01.220Z',
      updatedAt: '2024-03-15T10:51:01.220Z',
      id: '65f428159b5b0a37ccb823fc'
    },
    {
      nomination: {
        award: { title: 'Премия Гильдии актеров', year: 2021 },
        title: 'Лучшая женская роль в телефильме или минисериале'
      },
      winning: true,
      personId: 3360189,
      movie: { id: 1253633, name: 'Ход королевы', rating: 8.283 },
      createdAt: '2024-03-15T10:51:01.218Z',
      updatedAt: '2024-03-15T10:51:01.218Z',
      id: '65f428159b5b0a37ccb823fa'
    },
    {
      nomination: { award: { title: 'Сатурн', year: 2017 }, title: 'Лучший молодой актер/актриса' },
      winning: false,
      personId: 3360189,
      movie: { id: 865302, name: 'Ведьма', rating: 6.611 },
      createdAt: '2024-03-15T10:51:01.215Z',
      updatedAt: '2024-03-15T10:51:01.215Z',
      id: '65f428159b5b0a37ccb823f8'
    },
    {
      nomination: { award: { title: 'Сатурн', year: 2024 }, title: 'Лучшая актриса' },
      winning: false,
      personId: 3360189,
      movie: { id: 1257264, name: 'Меню', rating: 6.72 },
      createdAt: '2024-03-15T10:51:01.212Z',
      updatedAt: '2024-03-15T10:51:01.212Z',
      id: '65f428159b5b0a37ccb823f6'
    },
    {
      nomination: {
        award: { title: 'Каннский кинофестиваль', year: 2017 },
        title: 'Приз компании «Шопар» лучшей молодой актрисе'
      },
      winning: true,
      personId: 3360189,
      movie: null,
      createdAt: '2024-03-15T10:51:01.209Z',
      updatedAt: '2024-03-15T10:51:01.209Z',
      id: '65f428159b5b0a37ccb823f4'
    },
    {
      personId: 3360189,
      nomination: {
        award: { title: 'Золотой глобус', year: 2021 },
        title: 'Лучшая женская роль (комедия или мюзикл)'
      },
      movie: { id: 1244402, name: 'Эмма.', rating: 6.9 },
      winning: false,
      createdAt: '2023-03-05T18:59:47.006Z',
      updatedAt: '2023-03-05T18:59:47.006Z',
      id: '6404e6a3b645fd8a227949e3'
    },
    {
      personId: 3360189,
      nomination: {
        award: { title: 'Золотой глобус', year: 2023 },
        title: 'Лучшая женская роль (комедия или мюзикл)'
      },
      movie: { id: 1257264, name: 'Меню', rating: null },
      winning: false,
      createdAt: '2023-03-05T18:59:46.930Z',
      updatedAt: '2023-03-05T18:59:46.930Z',
      id: '6404e6a2b645fd8a227949cf'
    },
    {
      personId: 3360189,
      nomination: {
        award: { title: 'Золотой глобус', year: 2021 },
        title: 'Лучшая актриса мини-сериала или фильма на ТВ'
      },
      movie: { id: 1253633, name: 'Ход королевы', rating: 8.3 },
      winning: true,
      createdAt: '2023-03-05T18:59:46.853Z',
      updatedAt: '2023-03-05T18:59:46.853Z',
      id: '6404e6a2b645fd8a227949b9'
    }
  ]
})

var winnings = computed(() =>
  awards.data.filter(
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
  awards.data.filter(
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
  let response = await axios(`https://api.kinopoisk.dev/v1.4/person/${id}`, options['request1'])

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

<style scoped></style>
