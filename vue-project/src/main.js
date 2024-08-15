import './assets/styles/style.scss'
import App from './App.vue'
import router from './router'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createHead } from '@vueuse/head'
import { UnheadPlugin } from '@unhead/vue/vue2'
import VueLazyload from 'vue-lazyload'
import errorimage from '@/assets/images/alt.png'

const head = createHead()

createApp(App)
  .use(createPinia())
  .use(VueLazyload, {
    error: errorimage
  })
  .use(router)
  .use(head)
  .use(UnheadPlugin)
  .mount('#app')
