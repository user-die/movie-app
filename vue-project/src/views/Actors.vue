<template></template>

<script setup>
import axios from 'axios'

import { onMounted } from 'vue'

var array = Array.from({ length: 200 }, (_, i = 10) => i * 10)

onMounted(() => {
  array.forEach((el) =>
    axios.get(
      `https://avatars.mds.yandex.net/get-kinopoisk-post-thumb/5410517/dd7a9927f955f69cec6df611bf7c0594/x${el}`
    )
  )
})
</script>

<style scoped></style>
