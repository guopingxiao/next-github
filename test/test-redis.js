
async function test(){
    const Redis = require('ioredis');

    const redis = new Redis({
        port:6379,
    });
    //链接数据库是异步操作
    const keys = await redis.keys('*');
    console.log(keys)
}
test();
