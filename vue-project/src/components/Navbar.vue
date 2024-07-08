<template>
  <nav
    class="position-fixed d-flex flex-column border-end border-danger h-100 p-4 gap-3"
    style="width: 250px"
  >
    <div class="text-danger d-flex align-items-center gap-2">
      <Camera />
      <h2 class="m-0 text-white">Movie App</h2>
    </div>

    <router-link
      v-for="route in routes"
      :key="route.name"
      :to="'/' + route.route"
      class="btn btn-dark border border-danger text-white-50 text-decoration-none"
      >{{ route.name }}</router-link
    >
  </nav>
</template>

<script setup>
import Camera from '~icons/bi/camera-reels'

const routes = [
  { route: 'search', name: 'Поиск' },
  { route: 'films', name: 'Фильмы' },
  { route: 'serials', name: 'Сериалы' },
  { route: 'actors', name: 'Актёры' },
  { route: 'top250', name: 'Топ 250' },
  { route: 'favorite', name: 'Избранное' },
  { route: 'wishlist', name: 'Закладки' }
]
</script>

<style scoped></style>
