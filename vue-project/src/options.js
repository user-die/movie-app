console.log(KEY1)
console.log(KEY2)

export default {
  request1: {
    method: 'GET',
    headers: { accept: 'application/json', 'X-API-KEY': KEY1 }
  },
  request2: {
    method: 'GET',
    headers: { accept: 'application/json', 'X-API-KEY': KEY2 }
  }
}
