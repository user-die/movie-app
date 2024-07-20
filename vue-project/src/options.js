console.log(import.meta.env.VITE_key1)
console.log(import.meta.env)
console.log(import.meta.env.VERCEL_VITE_key1)
console.log(import.meta.env.VERCEL_key1)

export default {
  request1: {
    method: 'GET',
    headers: { accept: 'application/json', 'X-API-KEY': 'process.env.key1' }
  },
  request2: {
    method: 'GET',
    headers: { accept: 'application/json', 'X-API-KEY': 'process.env.key2' }
  }
}
