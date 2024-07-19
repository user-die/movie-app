import './assets/main.css'
import './assets/custom.scss'

import App from './App.vue'
import router from './router'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createHead } from '@vueuse/head'
import { UnheadPlugin } from '@unhead/vue/vue2'

const head = createHead()

createApp(App).use(createPinia()).use(router).use(head).use(UnheadPlugin).mount('#app')

// Починить роли актёров
// Добавить трейлер к фильмам
// Ошибки при запросе
// Шрифт
// Оптимизация
// Сменить style на class
// Адаптивность

// Готовы:
