export default {
  request1: {
    method: 'GET',
    headers: { accept: 'application/json', 'X-API-KEY': process.env.key1 }
  },
  request2: {
    method: 'GET',
    headers: { accept: 'application/json', 'X-API-KEY': process.env.key2 }
  }
}
