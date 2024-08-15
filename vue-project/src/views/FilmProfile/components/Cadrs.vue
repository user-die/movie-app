<template>
  <section id="cadrs" v-if="isFinished" class="cv">
    <h2 class="text-blue mb-3 fs-5 fw-bold">Кадры</h2>

    <Carousel>
      <img
        v-for="cadr in data.items"
        :key="cadr.id"
        v-lazy="cadr.previewUrl"
        alt="Кадры из фильма"
        class="rounded-4 h400 w-100 object-fit-cover"
      />
    </Carousel>
  </section>
</template>

<script setup>
import { useFetch2 } from '@/fetch'
import { computed } from 'vue'
import Carousel from '@/components/Carousel.vue'

const props = defineProps({
  id: String
})

var url = computed(() => `films/${props.id}/images?type=STILL&page=1`)

const { data, isFinished } = useFetch2(url, { refetch: true }).json()
</script>
