<template>
  <header ref="header" class="header">
    <nav
      class="h36 d-flex flex-column justify-content-center align-items-center gap-3 overflow-hidden flex-wrap"
      ref="navLinks"
      v-if="widthRef > 900"
    >
      <router-link v-for="r in routes" :key="r.name" :to="'/' + r.route" class="link">
        {{ r.name }}
      </router-link>
    </nav>

    <Search />

    <div class="dropdown">
      <button
        aria-label="expand  list"
        class="btn btn-danger"
        @click="show = !show"
        v-if="widthRef < 900"
      >
        <List />
      </button>

      <nav
        class="dropdown-menu position-absolute end-0 bg-dark p-1"
        ref="drop"
        :class="{ 'd-block': show, 'd-none': !show }"
      >
        <router-link
          v-for="route in routes"
          :key="route.name"
          :to="'/' + route.route"
          class="btn my-1 btn-dark border border-danger text-white text-decoration-none d-flex justify-content-center gap-3 px-4 align-items-center w170"
          ><component :is="route.icon" class="text-danger" />
          {{ route.name }}
        </router-link>
      </nav>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue'
import { useScroll, useResizeObserver } from '@vueuse/core'
import Search from './Search.vue'
import List from '~icons/bi/list'

var navLinks = ref(null)
const drop = ref(null)
var show = ref(false)
var header = ref(null)
var widthRef = ref(null)

useResizeObserver(header, (entries) => {
  const entry = entries[0]
  const { width } = entry.contentRect
  widthRef.value = width
})

const behavior = 'smooth'
const { x } = useScroll(navLinks, { behavior })

const routes = [
  { route: '', name: 'Movie App' },
  { route: 'films', name: 'Фильмы' },
  { route: 'serials', name: 'Сериалы' },
  { route: 'top250', name: 'Топ 250' },
  { route: 'favorite', name: 'Избранное' },
  { route: 'wishlist', name: 'Закладки' }
]
</script>

<style scoped lang="scss">
@use 'sass:map';
@import './../assets/styles/style.scss';

.header {
  display: flex;
  flex-direction: row;
  width: 100%;
  position: relative;
  align-items: center;
  gap: 1rem;
  padding: 1rem;

  @media (max-width: map.get($breakpoints, 'lg')) {
    padding: 0.75rem;
  }

  @media (max-width: map.get($breakpoints, 'md')) {
    padding: 0.5rem;
  }

  @media (max-width: map.get($breakpoints, 'sm')) {
    padding: 0.25rem;
  }
}

.link {
  text-decoration: none;
  color: map.get($colors, 'blue');
  font-size: 16px;
  font-weight: 700;

  &:hover {
    color: map.get($colors, 'red');
  }
}

.router-link-active {
  color: map.get($colors, 'red');
}
</style>
