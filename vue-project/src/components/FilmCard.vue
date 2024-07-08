<template>
  <router-link :to="'/movie/' + item?.id" class="text-decoration-none">
    <BCard tag="article" class="rounded-5 bg-light-subtle" style="height: 60vh">
      <BCardBody
        class="h-100 d-grid gap-2 align-items-center justify-content-between justify-items-center"
      >
        <div class="d-flex flex-column align-items-center">
          <BImg
            :src="item.poster?.url || item.poster?.previewUrl || ''"
            class="rounded-3 w-75 h-75"
          />

          <h3 class="m-0 fs-4 mt-2 text-center">
            {{ item.name || item.alternativeName }}
          </h3>
        </div>

        <p class="m-0 text-center">
          {{ item.year }}
          <span v-for="elem in item?.genres" :key="elem.name">{{ ', ' + elem.name }}</span>
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

            <WishlistButton :id="item.id" :list="'favorites'" />

            <WishlistButton :id="item.id" :list="'wishlist'" :isFavorite="true" />
          </article>
        </BCardText>
      </BCardBody>
    </BCard>
  </router-link>
</template>

<script setup>
import { BCard, BImg } from 'bootstrap-vue-next'
import WishlistButton from './WishlistButton.vue'

defineProps({
  item: Object
})
</script>

<style scoped></style>
