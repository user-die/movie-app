import './assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import createBootstrap from 'bootstrap-vue-next'
import './assets/custom.scss'
import App from './App.vue'
import router from './router'
import { createHead } from '@vueuse/head'
import { UnheadPlugin } from '@unhead/vue/vue2'

const head = createHead()

createApp(App)
  .use(createPinia())
  .use(router)
  .use(head)
  .use(UnheadPlugin)
  .use(createBootstrap({ plugins: { modalController: true } }))
  .mount('#app')

// Ошибки при запросе
// Трейлеры в фильме
// Шрифт
// Оптимизация
// Сменить style на class

// Готовы: Wishlist, Favorite
