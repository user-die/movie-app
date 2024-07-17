import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/Home/Home.vue'),
      meta: { title: 'My app' }
    },
    {
      path: '/films',
      name: 'films',
      component: () => import('../views/Films.vue'),
      props: { isSeries: false }
    },
    {
      path: '/serials',
      name: 'serials',
      component: () => import('../views/Films.vue'),
      props: { isSeries: true }
    },
    {
      path: '/favorite',
      name: 'favorite',
      component: () => import('../views/Wishlist.vue'),
      props: { list: 'favorites' }
    },
    {
      path: '/wishlist',
      name: 'wishlist',
      component: () => import('../views/Wishlist.vue'),
      props: { list: 'wishlist' }
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
    },
    { path: '/:catchAll(.*)', component: () => import('../views/NotFound.vue') }
  ]
})

export default router
