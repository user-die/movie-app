import { reactive, watch } from 'vue'
import { defineStore } from 'pinia'

export const useFavoritesStore = defineStore('FavoritesStore', () => {
  const favorites = reactive({ data: [] })

  const favoriteOnLocalStorage = localStorage.getItem('favorites')

  if (favoriteOnLocalStorage) {
    favorites.data = JSON.parse(favoriteOnLocalStorage)
  }

  const addFavorite = (id) => {
    favorites.data.push(id)
  }

  const deleteFavorite = (id) => {
    favorites.data = favorites.data.filter((element) => element !== id)
  }

  watch(favorites, (state) => localStorage.setItem('favorites', JSON.stringify(state.data)), {
    deep: true
  })

  return { favorites, addFavorite, deleteFavorite }
})
