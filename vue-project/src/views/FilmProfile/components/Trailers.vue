<template>
  <section>
    <h2 class="text-danger">Трейлеры</h2>
    <BCarousel indicators controls>
      <BCarouselSlide v-for="trailer in filteredTrailers" :key="trailer.name">
        <iframe
          width="1280"
          height="544"
          :src="trailer.url"
          title="Начало (Inception) - Русский трейлер"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerpolicy="strict-origin-when-cross-origin"
          allowfullscreen
        ></iframe>
      </BCarouselSlide>
    </BCarousel>
  </section>
</template>

<script setup>
import { BCarousel, BCarouselSlide } from 'bootstrap-vue-next'

const props = defineProps({
  trailers: Array
})

var filteredTrailers = props.trailers.filter((el) => el.site === 'youtube')
</script>

<style scoped></style>
