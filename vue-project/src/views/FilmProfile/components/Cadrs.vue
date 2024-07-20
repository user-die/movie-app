<template>
  <section v-if="cadrs.data">
    <h2 class="text-danger mb-3 fs-1 fw-bold">Кадры</h2>

    <Carousel>
      <img
        v-for="cadr in cadrs.data"
        :key="cadr.id"
        :src="cadr.previewUrl"
        alt=""
        class="rounded-4 h400 w-100 object-fit-cover"
      />
    </Carousel>
  </section>
</template>

<script setup>
import axios from 'axios'
import options from '../../../options.js'
import { onMounted, reactive, watch } from 'vue'
import Carousel from '@/components/Carousel.vue'

var cadrs = reactive({
  data: []
})

var getPhotos = async (id) => {
  let response = await axios(
    `https://kinopoiskapiunofficial.tech/api/v2.2/films/${id}/images?type=STILL&page=1`,
    options['request2']
  )

  cadrs.data = response.data.items
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
