<template>
  <nav
    class="d-flex flex-row w-100 p-3 gap-3 justify-content-center mainBg position-relavite"
    style="width: 250px"
  >
    <div class="text-danger d-flex align-items-center gap-2">
      <Camera />
      <h2 class="m-0 text-white">Movie App</h2>
    </div>

    <Search />

    <router-link
      v-for="route in routes"
      :key="route.name"
      :to="'/' + route.route"
      class="btn btn-dark px-4 border border-danger text-white text-decoration-none d-flex align-items-center justify-content-center gap-3"
      ><component :is="route.icon" class="text-danger" />
      <span style="width: 70px">{{ route.name }}</span>
    </router-link>
  </nav>
</template>

<script setup>
import Camera from '~icons/bi/camera-reels'
import Film from '~icons/bi/film'
import People from '~icons/bi/people'
import Award from '~icons/bi/award'
import Bookmarks from '~icons/bi/bookmarks'
import BookmarksStar from '~icons/bi/bookmark-star'
import Search from './Search.vue'

const routes = [
  //{ route: 'search', name: 'Поиск', icon: Search },
  { route: 'films', name: 'Фильмы', icon: Film },
  { route: 'serials', name: 'Сериалы', icon: Camera },
  { route: 'actors', name: 'Актёры', icon: People },
  { route: 'top250', name: 'Топ 250', icon: Award },
  { route: 'favorite', name: 'Избранное', icon: BookmarksStar },
  { route: 'wishlist', name: 'Закладки', icon: Bookmarks }
]
</script>

<style scoped></style>
