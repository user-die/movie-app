<template>
  <BButton
    @click="(event) => click(props.id, event)"
    :variant="(item && 'danger') || 'outline-danger'"
  >
    {{ props.text }} <Bookmarks v-if="isFavorite" /> <BookmarksStar v-else />
  </BButton>
</template>

<script setup>
import { BButton } from 'bootstrap-vue-next'
import { onMounted, reactive, ref } from 'vue'
import Bookmarks from '~icons/bi/bookmarks'
import BookmarksStar from '~icons/bi/bookmark-star'

var wishlist = reactive({ data: [] })
var item = ref(null)

var click = function (id, event) {
  event.preventDefault()

  if (JSON.parse(localStorage.getItem(props.list))?.find((element) => element == props.id))
    deleteFromFavorite(id)
  else addToFavorite(id)
}

var addToFavorite = function (id) {
  wishlist.data = [...wishlist.data, id]

  localStorage.setItem(props.list, JSON.stringify(wishlist.data))

  item.value = true
}

var deleteFromFavorite = function (id) {
  wishlist.data = wishlist.data.filter((element) => element !== id)

  localStorage.setItem(props.list, JSON.stringify(wishlist.data))

  item.value = false
}

const props = defineProps({
  id: Number,
  text: String,
  list: String,
  isFavorite: Boolean
})

onMounted(() => {
  wishlist.data = JSON.parse(localStorage.getItem(props.list)) || []

  item.value = wishlist.data.find((element) => element == props.id)
})
</script>

<style scoped></style>
