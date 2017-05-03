import redis from 'redis'

let redisClient

export const connect = () => {
  if (!redisClient) {
    redisClient = redis.createClient({ url: 'redis://localhost:6379/1' })
    redisClient.on('error', (err) => { console.error(`Error ${err}`) })
  }

  return redisClient
}

export async function disconnect() {
  return new Promise((resolve, reject) => {
    if (!redisClient) {
      resolve()
      return
    }

    redisClient.quit((error) => {
      if (error) {
        reject(error)
      } else {
        redisClient = null
        resolve()
      }
    })
  })
}
