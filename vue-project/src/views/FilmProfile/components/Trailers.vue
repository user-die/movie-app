<template>
  <section>
    <h2 class="text-danger">Трейлер</h2>
  </section>
</template>

<script setup>
import axios from 'axios'
import options from '@/options.json'
import { onMounted, reactive, watch } from 'vue'

const props = defineProps({
  id: Number
})

const trailers = reactive({ data: [] })

var getTrailers = async (id) => {
  var response = await axios.get(
    `https://kinopoiskapiunofficial.tech/api/v2.2/films/${id}/videos`,
    options['request2']
  )

  trailers.data = response.data.items
}

watch(props, () => {
  getTrailers(props.id)
})

onMounted(() => {
  getTrailers(props.id)
})
</script>
