<template>
  <section v-if="cadrs.data">
    <h2 class="text-danger mb-3">Кадры</h2>

    <BCarousel
      controls
      indicators
      ride="carousel"
      class="rounded-5"
      style="width: 800px; height: 400px; border-radius: 20px"
    >
      <BCarouselSlide v-for="cadr in cadrs.data" :key="cadr.id">
        <template #img>
          <img :src="cadr.url" alt="" style="height: 400px; object-fit: cover; width: 100%" />
        </template>
      </BCarouselSlide>
    </BCarousel>
  </section>
</template>

<script setup>
import axios from 'axios'
import options from '../../../options.json'
import { onMounted, reactive, watch } from 'vue'
import { BCarousel, BCarouselSlide } from 'bootstrap-vue-next'

var cadrs = reactive({
  data: []
})

var getPhotos = async (id) => {
  let response = await axios(
    `https://api.kinopoisk.dev/v1.4/image?page=1&limit=10&selectFields=&movieId=${id}`,
    options
  )

  cadrs.data = response.data.docs
}

const props = defineProps({
  id: String
})

watch(props, (newValue) => {
  getPhotos(newValue.id)
})

onMounted(() => {
  getPhotos(props.id)
})
</script>

<style scoped></style>
