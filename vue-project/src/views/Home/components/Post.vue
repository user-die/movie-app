<template>
  <BCard bg-variant="info" class="rounded-5" style="height: 400px; width: 400px">
    <BCardBody class="p-0 d-grid h-100 align-content-between">
      <BCardTitle class="text-center">{{ post.title }}</BCardTitle>

      <BCardImg
        :src="post.imageUrl.replace('orig', '320x180')"
        class="rounded-4"
        loading="lazy"
        alt="@/assets/alt.png"
      />
    </BCardBody>
  </BCard>
</template>

<script>
import { BCard, BCardImg, BCardTitle, BCardBody } from 'bootstrap-vue-next'

export default {
  components: {
    BCard,
    BCardImg,
    BCardTitle,
    BCardBody
  },
  props: {
    post: {
      title: String,
      description: String,
      imageUrl: String,
      id: Number,
      publishedAd: String
    }
  }
}
</script>

<style scoped></style>
