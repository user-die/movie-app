import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/home',
      name: 'home',
      component: () => import('../views/Home.vue')
    },
    {
      path: '/films',
      name: 'films',
      component: () => import('../views/Films.vue')
    },
    {
      path: '/serials',
      name: 'serials',
      component: () => import('../views/Serials.vue')
    },
    {
      path: '/actors',
      name: 'actors',
      component: () => import('../views/Actors.vue')
    },
    {
      path: '/search',
      name: 'search',
      component: () => import('../views/Search.vue')
    },
    {
      path: '/favorite',
      name: 'favorite',
      component: () => import('../views/Favorite.vue')
    },
    {
      path: '/wishlist',
      name: 'wishlist',
      component: () => import('../views/Wishlist.vue')
    },
    {
      path: '/top250',
      name: 'top250',
      component: () => import('../views/Top250.vue')
    },
    {
      path: '/movie/:id',
      name: 'movie',
      component: () => import('../views/FilmProfile/FilmProfile.vue')
    },
    {
      path: '/actor/:id',
      name: 'actor',
      component: () => import('../views/ActorProfile/ActorProfile.vue')
    },
    {
      path: '/persons/:id',
      name: 'persons',
      component: () => import('../views/ActorProfile/ActorProfile.vue')
    }
  ]
})

export default router
