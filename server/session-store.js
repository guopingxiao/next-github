function getRedisSessionId(sid) {
    return `ssid:${sid}`
}

class RedisSessionStore {
    constructor(client){
        this.client = client;
    }
    /**
     * 获取session存储的数据
     * @param sid
     * @returns {Promise<void>}
     */
    async get(sid){
        console.log('get session:',sid)
        const id = getRedisSessionId(sid);
        const data = await this.client.get(id);
        if(!data) {
            return null;
        }
        try {
            const  result = JSON.parse(data);
            return result;
        }
        catch (error) {
            console.log(error)
        }
    }

    /**
     * 存储session数据到redis
     * @param sid
     * @param sess
     * @param ttl
     * @returns {Promise<void>}
     */
    async set(sid,sess,ttl){
        console.log('set session:',sid)
        const id = getRedisSessionId(sid);
        if (typeof ttl==="number"){
            ttl = Math.ceil(ttl/1000);//转换为妙
        }
        try {
            const sessStr = JSON.stringify(sess);
            if(ttl){
                //setex设置过期时间
                await this.client.setex(id,ttl,sessStr);
            }else{
                await this.client.set(id,sessStr);
            }
        }catch (error) {
            console.log(error)
        }
    }

    /**
     * 从redis当中删除某个session
     * @param sid
     * @returns {Promise<void>}
     */
    async destroy(sid){
        console.log('destory session:',sid)
        const id = getRedisSessionId(sid);
        await this.client.del(id);
    }
}
module.exports = RedisSessionStore;