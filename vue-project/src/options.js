console.log(meta.env.VITE_VERCEL_key1)
console.log(process.env.VITE_VERCEL_key1)
console.log(import.meta.env.VITE_VERCEL_key1)
console.log(import.meta.process.env.VITE_VERCEL_key1)

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
