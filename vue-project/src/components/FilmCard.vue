<template>
  <router-link :to="'/movie/' + item?.id" class="text-decoration-none">
    <BCard
      tag="article"
      class="rounded-5 bg-light-subtle"
      style="height: 400px"
      :style="backgroundStyles(item.image)"
    >
      <BCardBody
        class="h-100 d-grid gap-2 align-items-center justify-content-between justify-items-center p-0 align-content-between"
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

        <BCardText>
          <article class="d-flex gap-3 align-items-start justify-content-evenly">
            <section v-if="item?.rating?.imdb" class="d-flex flex-column align-items-center">
              <img src="./../assets/imdb.png" class="w-75" alt="" />
              <p class="text-warning m-0">{{ item.rating?.imdb }}</p>
            </section>

            <section v-if="item?.rating?.kp" class="d-flex flex-column align-items-center">
              <img src="./../assets/kp.png" class="w-75" alt="" />
              <p class="text-warning m-0">{{ item.rating?.kp.toFixed(1) }}</p>
            </section>

            <FavoriteButton :id="item.id" />

            <WishlistButton :id="item.id" />
          </article>
        </BCardText>
      </BCardBody>
    </BCard>
  </router-link>
</template>

<script setup>
import { BCard, BCardText, BCardBody } from 'bootstrap-vue-next'
import WishlistButton from './WishlistButton.vue'
import FavoriteButton from './FavoriteButton.vue'

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
