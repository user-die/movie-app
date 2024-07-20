<template>
  <button
    aria-label="Add to favorites"
    @click="(event) => click(props.id, event)"
    class="btn border-danger"
    :class="(item && 'bg-danger text-white') || 'bg-outline-danger text-danger'"
  >
    {{ props.text }}
    <Bookmarks v-if="props.type === 1" :class="(item && 'text-dark') || 'text-danger'" />
    <BookmarksStar v-if="props.type === 2" :class="(item && 'text-dark') || 'text-danger'" />
    <Heart v-if="props.type === 3" :class="(item && 'text-dark') || 'text-danger'" />
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
