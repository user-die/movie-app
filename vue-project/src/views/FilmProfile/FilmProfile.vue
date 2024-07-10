<template>
  <div :style="backgroundStyles(film?.data?.backdrop?.url)">
    <article class="text-white container bckgrnd">
      <div>
        <About :film="film.data" />
      </div>

      <section v-if="film.data?.description" class="row my-4">
        <h2 class="text-danger">Описание</h2>
        <p>{{ film.data?.description }}</p>
      </section>

      <Staff :staff="actors.data" text="Актёры" />

      <Staff :staff="mainStaff.data" text="Над фильмом работали" :prof="true" />

      <Staff :staff="dubbingActors.data" text="Актёры дубляжа" />

      <Cadrs :id="id" />

      <OtherFilms
        v-if="film.data.sequelsAndPrequels"
        :films="film.data.sequelsAndPrequels"
        text="Другие части"
      />

      <OtherFilms
        v-if="film.data.similarMovies"
        :films="film.data.similarMovies"
        text="Похожие фильмы"
      />

      <Facts
        text="Интересные факты"
        :facts="film?.data?.facts?.filter((el) => el.type === 'FACT')"
      />

      <Facts
        text="Ошибки в фильме (спойлеры !)"
        :facts="film?.data?.facts?.filter((el) => el.type !== 'FACT')"
      />
    </article>
  </div>
</template>

<script setup>
import axios from 'axios'
import { onMounted, reactive, watch, ref } from 'vue'
import { useRoute } from 'vue-router'
import options from '../../options.json'
import Staff from './components/Staff.vue'
import Cadrs from './components/Cadrs.vue'
import About from './components/About.vue'
import OtherFilms from './components/OtherFilms.vue'
import Facts from './components/Facts.vue'

const route = useRoute()
var id = ref(route.params.id)
var film = reactive({
  data: {}
})
var actors = reactive({
  data: []
})
var staff = reactive({
  data: []
})
var trailers = reactive({
  data: []
})

var backgroundStyles = (img) => {
  return {
    background: `linear-gradient(rgba(33, 37, 41, 0.8) 0%, rgba(33, 37, 41, 0.8)), url(${img})`,

    'background-repeat': 'no-repeat',
    'background-size': '100%',
    'background-attachment': 'fixed'
  }
}

var sorderStaff = reactive({ data: [] })
var mainStaff = reactive({ data: [] })
var dubbingActors = reactive({ data: [] })

var getFilm = async (id) => {
  let response = await axios(`https://api.kinopoisk.dev/v1.4/movie/${id}`, options)

  film.data = response.data
  actors.data = response.data.persons.filter((el) => el.profession === 'актеры')
  staff.data = response.data.persons.filter((el) => el.profession !== 'актеры')
  trailers.data = response.data.videos
}

watch(staff, (newValue) => {
  sorderStaff.data = newValue.data.reduce((acc, el) => {
    acc[el.name] = acc[el.name] || { name: el.name, id: el.id, photo: el.photo, professions: [] }
    acc[el.name].professions.push(el.profession)
    return acc
  }, {})
})

watch(sorderStaff, (newValue) => {
  mainStaff.data = Object.fromEntries(
    Object.entries(newValue.data)
      .filter((el) => !el[1].professions.includes('актеры дубляжа'))
      .sort((a, b) => b[1].professions.length - a[1].professions.length)
  )

  dubbingActors.data = Object.fromEntries(
    Object.entries(newValue.data)
      .filter((el) => el[1].professions.includes('актеры дубляжа'))
      .sort((a, b) => b[1].professions.length - a[1].professions.length)
  )
})

watch(route, (newValue) => {
  id.value = newValue.params.id

  getFilm(newValue.params.id)
})

onMounted(() => {
  getFilm(id.value)
})
</script>

<style scoped>
.bckgrnd {
}
</style>
