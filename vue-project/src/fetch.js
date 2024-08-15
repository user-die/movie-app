import { createFetch } from '@vueuse/core'
const Token1 = import.meta.env.VITE_KEY1
const Token2 = import.meta.env.VITE_KEY2

const useFetch = createFetch({
  baseUrl: 'https://api.kinopoisk.dev/v1.4',
  options: {
    async beforeFetch({ options }) {
      /*
      const cache = await caches.open('my-cache')

      let request = await cache.match(
        new Request(url, {
          method: 'GET',
          headers: {
            accept: 'application/json',
            'X-API-KEY': Token1
          }
        })
      )
      //.then((r) => r.json())

      if (request) {
        //throw Error(JSON.stringify(request))
        return {
          then: () => request
        }
      }
        */

      options.headers = {
        ...options.headers,
        accept: 'application/json',
        'X-API-KEY': Token1
      }

      return { options }
    }

    /*
    async afterFetch({ response }) {
      const cache = await caches.open('my-cache')
      cache.put(response.url, response.clone())
    }
      */
  },

  fetchOptions: {
    mode: 'cors'
  }
})

export const useFetch2 = createFetch({
  baseUrl: 'https://kinopoiskapiunofficial.tech/api/v2.2',
  options: {
    async beforeFetch({ options }) {
      options.headers = {
        ...options.headers,
        accept: 'application/json',
        'X-API-KEY': Token2
      }

      return { options }
    }
  },
  fetchOptions: {
    mode: 'cors'
  }
})

export default useFetch
