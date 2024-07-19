<template>
  <nav
    ref="nav"
    class="d-flex flex-row w-100 p-3 justify-content-evenly mainBg position-relavite align-items-center"
  >
    <div class="text-danger d-flex gap-2">
      <Camera class="fs-3" />
      <h2 class="m-0 text-white">Movie App</h2>
    </div>

    <Search />

    <div class="d-flex flex-row gap-2" :class="nav?.offsetWidth < 1700 && 'w-50'">
      <button v-if="nav?.offsetWidth < 1700" @click="x -= 186" class="btn btn-danger rounded-5">
        <Left />
      </button>

      <div
        class="h40 d-flex flex-column align-items-center gap-3 overflow-hidden flex-wrap"
        ref="navLinks"
      >
        <router-link
          v-for="route in routes"
          :key="route.name"
          :to="'/' + route.route"
          class="btn btn-dark border border-danger text-white text-decoration-none d-flex justify-content-center gap-3 px-4 align-items-center w170"
          ><component :is="route.icon" class="text-danger" />
          <span>{{ route.name }}</span>
        </router-link>
      </div>

      <button v-if="nav?.offsetWidth < 1700" @click="x += 186" class="btn btn-danger rounded-5">
        <Right />
      </button>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue'
import { useScroll } from '@vueuse/core'
import Camera from '~icons/bi/camera-reels'
import Film from '~icons/bi/film'
import Award from '~icons/bi/award'
import Bookmarks from '~icons/bi/bookmarks'
import BookmarksStar from '~icons/bi/bookmark-star'
import Search from './Search.vue'
import Left from '~icons/bi/caret-left-fill'
import Right from '~icons/bi/caret-right-fill'

var navLinks = ref(null)
var nav = ref(null)

const behavior = 'smooth'
const { x } = useScroll(navLinks, { behavior })

const routes = [
  { route: '', name: 'Главная' },
  { route: 'films', name: 'Фильмы', icon: Film },
  { route: 'serials', name: 'Сериалы', icon: Camera },
  { route: 'top250', name: 'Топ 250', icon: Award },
  { route: 'favorite', name: 'Избранное', icon: BookmarksStar },
  { route: 'wishlist', name: 'Закладки', icon: Bookmarks }
]
</script>
