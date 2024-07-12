<template>
  <BButton
    @click="(event) => click(props.id, event)"
    :variant="(item && 'danger') || 'outline-danger'"
  >
    {{ props.text }} <Heart />
  </BButton>
</template>

<script setup>
import { BButton } from 'bootstrap-vue-next'
import { computed } from 'vue'
import Heart from '~icons/bi/heart'
import { useStarsStore } from '@/stores/favoriteStarsStore'

const starsStore = useStarsStore()

const props = defineProps({
  id: Number,
  text: String
})

var item = computed(() => starsStore.stars.data.includes(props.id))

var click = function (id, event) {
  event.preventDefault()

  item.value ? starsStore.deleteFavorite(id) : starsStore.addFavorite(id)
}
</script>

<style scoped></style>
