<template>
  <BButton
    @click="(event) => click(props.id, event)"
    :variant="(item && 'danger') || 'outline-danger'"
  >
    {{ props.text }} <BookmarksStar />
  </BButton>
</template>

<script setup>
import { BButton } from 'bootstrap-vue-next'
import { computed } from 'vue'
import BookmarksStar from '~icons/bi/bookmark-star'
import { useFavoritesStore } from '@/stores/favoritesStore'

const favoriteStore = useFavoritesStore()

const props = defineProps({
  id: Number,
  text: String
})

var item = computed(() => favoriteStore.favorites.data.includes(props.id))

var click = function (id, event) {
  event.preventDefault()

  item.value ? favoriteStore.deleteFavorite(id) : favoriteStore.addFavorite(id)
}
</script>

<style scoped></style>
