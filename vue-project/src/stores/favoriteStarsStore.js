import { reactive, watch } from 'vue'
import { defineStore } from 'pinia'

export const useStarsStore = defineStore('StarsStore', () => {
  const stars = reactive({ data: [] })

  const starsOnLocalStorage = localStorage.getItem('favoriteStars')

  if (starsOnLocalStorage) {
    stars.data = JSON.parse(starsOnLocalStorage)
  }

  const addFavorite = (id) => {
    stars.data.push(id)
  }

  const deleteFavorite = (id) => {
    stars.data = stars.data.filter((element) => element !== id)
  }

  watch(stars, (state) => localStorage.setItem('favoriteStars', JSON.stringify(state.data)), {
    deep: true
  })

  return { stars, addFavorite, deleteFavorite }
})
