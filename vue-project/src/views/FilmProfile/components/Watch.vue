<template>
  <section>
    <h2 class="text-danger fs-1">Где посмотреть</h2>

    <div class="d-flex gap-2 align-items-normal">
      <a
        v-for="item in props.watch"
        :key="'/' + item.name"
        :href="item.url"
        target="_blank"
        class="d-flex flex-column gap-2 align-items-center text-decoration-none text-white"
      >
        <img :src="item.logo?.url?.replace('orig', 'x60')" alt="@/assets/alt.png" class="img" />
        <span class="name">{{ item.name }}</span>
      </a>
    </div>
  </section>
</template>

<script setup>
const props = defineProps({
  watch: Array
})
</script>

<style scoped>
.name {
  width: 90px;
  text-align: center;
}
.img {
  width: 60px;
}
</style>
