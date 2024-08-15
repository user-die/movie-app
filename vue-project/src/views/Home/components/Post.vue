<template>
  <a
    target="blank"
    :href="post.url"
    bg-variant="blue"
    class="cv bg-blue p-3 rounded-5 text-decoration-none h400 w400"
  >
    <div class="card-body p-0 d-grid h-100 align-content-between">
      <p class="fs-4 text-center text-dark m-0" style="line-height: 30px">{{ post.title }}</p>

      <img
        :src="post.imageUrl.replace('orig', '320x180')"
        class="rounded-4 w-100"
        loading="lazy"
        alt="@/assets/alt.png"
      />
    </div>
  </a>
</template>

<script>
export default {
  props: {
    post: {
      title: String,
      description: String,
      imageUrl: String,
      id: Number,
      publishedAd: String,
      url: String
    }
  }
}
</script>
