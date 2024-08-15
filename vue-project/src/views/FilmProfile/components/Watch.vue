<template>
  <section v-if="props.watch" class="my-3">
    <h2 class="text-danger fs-5 text-blue mb-3">Где посмотреть</h2>

    <div class="d-flex flex-wrap gap-4 align-items-normal">
      <a
        v-for="item in props.watch"
        :key="'/' + item.name"
        :href="item.url"
        target="_blank"
        class="watchItem"
      >
        <img :src="item.logo?.url?.replace('orig', 'x60')" alt="@/assets/alt.png" width="60px" />
        <span>{{ item.name }}</span>
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
.watchItem {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  text-decoration: none;
  color: #cbd0d4;

  span {
    width: 60px;
    text-align: center;
    word-break: break-all;
  }
}
</style>
