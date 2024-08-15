<template>
  <button
    aria-label="Add to favorites"
    @click="(event) => click(props.id, event)"
    class="btn d-flex align-items-center gap-1"
    :class="(item && 'btn') || 'outline '"
  >
    {{ props.text }}
    <Bookmarks v-if="props.type === 1" />
    <BookmarksStar v-if="props.type === 2" />
    <Heart v-if="props.type === 3" />
  </button>
</template>

<script setup>
import { computed } from 'vue'
import Heart from '~icons/bi/heart'
import Bookmarks from '~icons/bi/bookmarks'
import BookmarksStar from '~icons/bi/bookmark-star'
import store from '@/stores/index.js'

const props = defineProps({
  list: String,
  id: Number,
  text: String,
  type: Number
})

const listStore = store[props.list]()

var item = computed(() => listStore[props.list].data.includes(props.id))

var click = function (id, event) {
  event.preventDefault()

  item.value ? listStore.deleteWish(id) : listStore.addWish(id)
}
</script>

<style scoped>
.outline {
  background: none;
  border: 2px solid #99c8ff;
}
</style>
