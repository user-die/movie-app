<template>
  <section class="ps-4 d-flex flex-column align-items-center p-4">
    <h2 class="text-danger fs-1" style="width: round(down, 100%, 366px)">{{ title }}</h2>
    <article class="d-grid align-items-start justify-content-center gap-3 grid">
      <router-link
        :to="'movie/' + film.id"
        v-for="film in films"
        :key="film.id"
        class="d-grid film rounded-3 bg-primary p-1 text-decoration-none text-dark"
      >
        <img
          :src="`https://st.kp.yandex.net/images/film_iphone/iphone90_${film.id}.jpg`"
          alt="@/assets/alt.png"
          class="img rounded-2"
        />
        <div>
          <p class="fs-5 m-0">{{ film.name }}</p>
          <span class="fs-6 m-0 text-body-secondary">{{ film.premiere }}</span>
        </div>

        <WishlistButton :id="film.id" />
      </router-link>
    </article>
  </section>
</template>

<script>
import WishlistButton from '@/components/WishlistButton.vue'

export default {
  props: {
    title: {
      type: String,
      required: true
    },
    films: {
      type: Array,
      required: true
    }
  },
  components: {
    WishlistButton
  }
}
</script>

<style scoped>
.grid {
  grid-template-columns: repeat(auto-fill, 350px);

  width: round(down, 100%, 366px);
}

.img {
  height: 100px;
}

.film {
  grid-template-columns: 76px auto 44px;
  align-items: start;
}
</style>
