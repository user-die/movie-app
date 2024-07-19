import { reactive, watch } from 'vue'
import { defineStore } from 'pinia'

const useWishlistStore = defineStore('wishlistStore', () => {
  const wishlist = reactive({ data: [] })

  const wishOnLocalStorage = localStorage.getItem('wishlist')

  if (wishOnLocalStorage) {
    wishlist.data = JSON.parse(wishOnLocalStorage)
  }

  const addWish = (id) => {
    wishlist.data.push(id)
  }

  const deleteWish = (id) => {
    wishlist.data = wishlist.data.filter((element) => element !== id)
  }

  watch(wishlist, (state) => localStorage.setItem('wishlist', JSON.stringify(state.data)), {
    deep: true
  })

  return { wishlist, addWish, deleteWish }
})

const useStarsStore = defineStore('StarsStore', () => {
  const stars = reactive({ data: [] })

  const starsOnLocalStorage = localStorage.getItem('favoriteStars')

  if (starsOnLocalStorage) {
    stars.data = JSON.parse(starsOnLocalStorage)
  }

  const addWish = (id) => {
    stars.data.push(id)
  }

  const deleteWish = (id) => {
    stars.data = stars.data.filter((element) => element !== id)
  }

  watch(stars, (state) => localStorage.setItem('favoriteStars', JSON.stringify(state.data)), {
    deep: true
  })

  return { stars, addWish, deleteWish }
})

const useFavoritesStore = defineStore('FavoritesStore', () => {
  const favorites = reactive({ data: [] })

  const favoriteOnLocalStorage = localStorage.getItem('favorites')

  if (favoriteOnLocalStorage) {
    favorites.data = JSON.parse(favoriteOnLocalStorage)
  }

  const addWish = (id) => {
    favorites.data.push(id)
  }

  const deleteWish = (id) => {
    favorites.data = favorites.data.filter((element) => element !== id)
  }

  watch(favorites, (state) => localStorage.setItem('favorites', JSON.stringify(state.data)), {
    deep: true
  })

  return { favorites, addWish, deleteWish }
})

const stores = {
  wishlist: useWishlistStore,
  favorites: useFavoritesStore,
  stars: useStarsStore
}

export default stores
