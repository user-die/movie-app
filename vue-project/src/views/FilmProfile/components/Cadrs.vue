<template>
  <section v-if="cadrs.data">
    <h2 class="text-danger mb-3 fs-1 fw-bold">Кадры</h2>

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
  data: [
    {
      url: 'https://image.openmoviedb.com/kinopoisk-images/1600647/a4a7d0fa-eb0f-4b29-a444-995cf162265f/orig',
      createdAt: '2022-09-24T01:33:30.859Z',
      height: 534,
      movieId: 586397,
      previewUrl:
        'https://image.openmoviedb.com/kinopoisk-images/1600647/a4a7d0fa-eb0f-4b29-a444-995cf162265f/360',
      type: 'screenshot',
      updatedAt: '2024-05-15T02:56:40.671Z',
      width: 1280,
      id: '632e5e6aaff710671ba912cc'
    },
    {
      url: 'https://image.openmoviedb.com/kinopoisk-images/1773646/571256d5-982c-4e43-a275-460496cc26a6/orig',
      createdAt: '2022-09-24T01:33:28.572Z',
      height: 534,
      movieId: 586397,
      previewUrl:
        'https://image.openmoviedb.com/kinopoisk-images/1773646/571256d5-982c-4e43-a275-460496cc26a6/360',
      type: 'screenshot',
      updatedAt: '2024-05-15T02:56:40.574Z',
      width: 1280,
      id: '632e5e68aff710671ba9109f'
    },
    {
      url: 'https://image.openmoviedb.com/kinopoisk-images/1599028/60d9313d-f56b-4113-80a8-0d2b88f455af/orig',
      createdAt: '2022-09-24T01:33:26.306Z',
      height: 534,
      movieId: 586397,
      previewUrl:
        'https://image.openmoviedb.com/kinopoisk-images/1599028/60d9313d-f56b-4113-80a8-0d2b88f455af/360',
      type: 'screenshot',
      updatedAt: '2024-05-15T02:56:40.510Z',
      width: 1280,
      id: '632e5e66aff710671ba90ea9'
    },
    {
      url: 'https://image.openmoviedb.com/kinopoisk-images/1600647/edf8314a-0af8-457c-b7b8-a2c56815d610/orig',
      createdAt: '2022-09-24T01:33:24.083Z',
      height: 534,
      movieId: 586397,
      previewUrl:
        'https://image.openmoviedb.com/kinopoisk-images/1600647/edf8314a-0af8-457c-b7b8-a2c56815d610/360',
      type: 'screenshot',
      updatedAt: '2024-05-15T02:56:40.451Z',
      width: 1280,
      id: '632e5e64aff710671ba90c59'
    },
    {
      url: 'https://image.openmoviedb.com/kinopoisk-images/1600647/73002173-c5e6-4e59-bcc1-9428a8439894/orig',
      createdAt: '2022-09-24T01:33:21.866Z',
      height: 534,
      movieId: 586397,
      previewUrl:
        'https://image.openmoviedb.com/kinopoisk-images/1600647/73002173-c5e6-4e59-bcc1-9428a8439894/360',
      type: 'screenshot',
      updatedAt: '2024-05-15T02:56:40.414Z',
      width: 1280,
      id: '632e5e61aff710671ba90a61'
    },
    {
      url: 'https://image.openmoviedb.com/kinopoisk-images/1600647/1ad4a9e4-8682-4b15-a0f3-7dce4013c8fd/orig',
      createdAt: '2022-09-24T01:33:19.674Z',
      height: 534,
      movieId: 586397,
      previewUrl:
        'https://image.openmoviedb.com/kinopoisk-images/1600647/1ad4a9e4-8682-4b15-a0f3-7dce4013c8fd/360',
      type: 'screenshot',
      updatedAt: '2024-05-15T02:56:40.392Z',
      width: 1280,
      id: '632e5e5faff710671ba90812'
    },
    {
      url: 'https://image.openmoviedb.com/kinopoisk-images/1600647/925841c2-cb00-4ddd-a707-8c383e70e2ae/orig',
      createdAt: '2022-09-24T01:33:17.515Z',
      height: 534,
      movieId: 586397,
      previewUrl:
        'https://image.openmoviedb.com/kinopoisk-images/1600647/925841c2-cb00-4ddd-a707-8c383e70e2ae/360',
      type: 'screenshot',
      updatedAt: '2024-05-15T02:56:40.357Z',
      width: 1280,
      id: '632e5e5daff710671ba905d5'
    },
    {
      url: 'https://image.openmoviedb.com/kinopoisk-images/1777765/91def675-9e4d-4915-9777-7f0eee0e3a1b/orig',
      createdAt: '2022-09-24T01:33:15.362Z',
      height: 534,
      movieId: 586397,
      previewUrl:
        'https://image.openmoviedb.com/kinopoisk-images/1777765/91def675-9e4d-4915-9777-7f0eee0e3a1b/360',
      type: 'screenshot',
      updatedAt: '2024-05-15T02:56:40.332Z',
      width: 1280,
      id: '632e5e5baff710671ba9034d'
    },
    {
      url: 'https://image.openmoviedb.com/kinopoisk-images/1773646/8414e6e4-20b7-4e7a-bd9d-27ce0aaedd58/orig',
      createdAt: '2022-09-24T01:33:13.204Z',
      height: 534,
      movieId: 586397,
      previewUrl:
        'https://image.openmoviedb.com/kinopoisk-images/1773646/8414e6e4-20b7-4e7a-bd9d-27ce0aaedd58/360',
      type: 'screenshot',
      updatedAt: '2024-05-15T02:56:40.295Z',
      width: 1280,
      id: '632e5e59aff710671ba90105'
    },
    {
      url: 'https://image.openmoviedb.com/kinopoisk-images/1773646/7029721c-88b7-4615-8fa6-f2a7d4bf522d/orig',
      createdAt: '2022-09-24T01:33:11.125Z',
      height: 534,
      movieId: 586397,
      previewUrl:
        'https://image.openmoviedb.com/kinopoisk-images/1773646/7029721c-88b7-4615-8fa6-f2a7d4bf522d/360',
      type: 'screenshot',
      updatedAt: '2024-05-15T02:56:40.257Z',
      width: 1280,
      id: '632e5e57aff710671ba8fed5'
    }
  ]
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
  //getPhotos(newValue.id)
})

onMounted(() => {
  //getPhotos(props.id)
})
</script>

<style scoped></style>
