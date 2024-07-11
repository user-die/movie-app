import { reactive, watch } from 'vue'
import { defineStore } from 'pinia'

export const useWishlistStore = defineStore('wishlistStore', () => {
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
