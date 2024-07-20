<template>
  <div class="d-flex align-items-center justify-content-center gap-2 my-3">
    <button aria-label="move content left" @click="leftX" class="btn btn-danger rounded-5">
      <Left />
    </button>

    <section style="width: calc(-16px + round(down, 100%, 416px))">
      <h2 class="text-danger fs-1">Последние новости</h2>
      <article class="d-flex flex-wrap flex-column overflow-hidden gap-3 h400" ref="carousel">
        <Post
          v-for="post in posts"
          :key="post.kinopoiskId"
          :post="{
            title: post.title,
            description: post.description,
            imageUrl: post.imageUrl,
            id: post.kinopoiskId,
            publishedAd: post.publishedAd,
            url: post.url
          }"
        />
      </article>
    </section>

    <button aria-label="move content right" @click="rigthX" class="btn btn-danger rounded-5">
      <Right />
    </button>
  </div>
</template>

<script>
import axios from 'axios'
import options from '@/options.js'
import Post from './Post.vue'
import { useScroll } from '@vueuse/core'
import Left from '~icons/bi/caret-left-fill'
import Right from '~icons/bi/caret-right-fill'

export default {
  components: {
    Post,
    Left,
    Right
  },
  data() {
    return {
      posts: []
    }
  },
  methods: {
    leftX() {
      const behavior = 'smooth'
      let { x } = useScroll(this.$refs.carousel, { behavior })

      x.value -= 416
    },

    rigthX() {
      const behavior = 'smooth'
      let { x } = useScroll(this.$refs.carousel, { behavior })

      x.value += 416
    },

    async getPosts() {
      let response = await axios.get(
        'https://kinopoiskapiunofficial.tech/api/v1/media_posts',
        options['request2']
      )

      let lastPage = await response.data.totalPages

      let response2 = await axios.get(
        `https://kinopoiskapiunofficial.tech/api/v1/media_posts?page=${lastPage}`,
        options['request2']
      )

      this.posts = response2.data.items
    }
  },
  mounted() {
    this.getPosts()
  }
}
</script>
