<template>
  <article bg-variant="info" class="bg-info p-3 rounded-5" style="height: 400px; width: 400px">
    <div class="card-body p-0 d-grid h-100 align-content-between">
      <p class="fs-4 text-center text-dark">{{ post.title }}</p>

      <img
        :src="post.imageUrl.replace('orig', '320x180')"
        class="rounded-4 w-100"
        loading="lazy"
        alt="@/assets/alt.png"
      />
    </div>
  </article>
</template>

<script>
export default {
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
