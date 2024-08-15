export default {
  request1: {
    method: 'GET',
    headers: {
      accept: 'application/json',
      'X-API-KEY': import.meta.env.VITE_KEY1 /* KEY1 */
    }
  },
  request2: {
    method: 'GET',
    headers: { accept: 'application/json', 'X-API-KEY': import.meta.env.VITE_KEY2 /* KEY2 */ }
  }
}
