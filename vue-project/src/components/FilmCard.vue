<template>
  <router-link :to="'/movie/' + item?.id" class="text-decoration-none text-white">
    <article
      class="card rounded-5 bg-light-subtle"
      style="height: 400px"
      :style="backgroundStyles(item.image || altImage)"
    >
      <div
        class="card-body h-100 d-grid gap-2 align-items-center justify-content-between justify-items-center align-content-between text-white"
      >
        <div class="d-flex flex-column align-items-center text-break">
          <h3 class="m-0 fs-3 text-center fw-bold">
            {{ item.name || item.alternativeName }}
          </h3>
        </div>

        <p class="m-0 text-center">
          {{ item.year }}
          <span v-for="elem in item?.genres" :key="elem">{{ ', ' + elem }}</span>
        </p>

        <div>
          <article class="d-flex gap-3 align-items-start justify-content-evenly">
            <section v-if="item?.rating?.imdb" class="d-flex flex-column align-items-center">
              <img src="./../assets/imdb.png" class="w-75" alt="@/assets/alt.png" />
              <p class="text-warning m-0">{{ item.rating?.imdb }}</p>
            </section>

            <section v-if="item?.rating?.kp" class="d-flex flex-column align-items-center">
              <img src="./../assets/kp.png" class="w-75" alt="@/assets/alt.png" />
              <p class="text-warning m-0">{{ item.rating?.kp.toFixed(1) }}</p>
            </section>

            <WishlistButton :type="2" list="favorites" :id="item.id" />

            <WishlistButton :type="1" list="wishlist" :id="item.id" />
          </article>
        </div>
      </div>
    </article>
  </router-link>
</template>

<script setup>
import altImage from '@/assets/alt.png'
import WishlistButton from './WishlistButton.vue'

var backgroundStyles = (img) => {
  return {
    background: `linear-gradient(rgba(29 , 29, 30, 0.8) 0%, rgba(29, 29, 30, 0.8)), url(${img})`,
    'background-size': 'cover',
    'background-position': 'center'
  }
}

defineProps({
  item: Object
})
</script>

<style scoped></style>
