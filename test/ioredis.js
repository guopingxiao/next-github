const Redis = require('ioredis')

const redis = new Redis({
  port: 6379
})

async function test() { 
  await redis.setex('c', 100, 123)
  const keys = await redis.keys('*')

  console.log(keys)
}

test()