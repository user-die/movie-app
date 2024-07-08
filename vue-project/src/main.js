import './assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import createBootstrap from 'bootstrap-vue-next'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-next/dist/bootstrap-vue-next.css'
import App from './App.vue'
import router from './router'

createApp(App)
  .use(createPinia())
  .use(router)
  .use(createBootstrap({ plugins: { modalController: true } }))
  .mount('#app')

// Шрифт
// сделать страницу 404
// Иконки для навигации
