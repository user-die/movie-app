<template>
  <div v-if="isError">
    <p class="fs-1 text-center">{{ error }}</p>
  </div>

  <article v-if="isFinished" class="text-white container mainBg p-4">
    <div class="row gap-2">
      <img :src="data?.photo || altImage" :alt="altImage" class="rounded-5 w300" />

      <About :actor="data" class="col-12 col-sm-12 col-md-7 col-lg-7 col-xl-8 col-xxl-9" />
    </div>

    <article class="d-flex flex-column gap-4 mx-4">
      <Roles
        :movies="
          data?.movies
            ?.filter((el) => el.enProfession === 'actor')
            .sort((a, b) => b.rating - a.rating)
            .reduce((acc, el) => (acc = [...acc, el.id]), [])
        "
      />

      <Awards :id="id" />

      <Facts :facts="data?.facts" />
    </article>
  </article>
</template>

<script setup>
import { onBeforeRouteUpdate, useRoute } from 'vue-router'
import { onMounted, ref, computed } from 'vue'
import About from './components/About.vue'
import Roles from './components/Roles.vue'
import Facts from './components/Facts.vue'
import Awards from './components/Awards.vue'
import { useHead } from '@unhead/vue'
import altImage from '@/assets/images/alt.png'
import useFetch from '@/fetch.js'

const route = useRoute()
var id = ref(route.params.id)

var url = computed(() => `/person/${id.value}`)

const { data, isFinished, error, isError } = useFetch(url, {
  refetch: true
}).json()

useHead({
  title: computed(() => data?.value?.name || data?.value?.enName),
  meta: [
    {
      name: 'description',
      content: computed(
        () =>
          data?.value?.name +
          '. Информация об актёре / актрисе: рост, дата рождения, место рождения, всего фильмов. участие в фильмах и сериалах, награды, интересные факты'
      )
    }
  ]
})

onBeforeRouteUpdate((updageGuard) => {
  id.value = updageGuard.params.id
})
</script>
