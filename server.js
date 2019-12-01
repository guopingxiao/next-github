const Koa = require('koa')
const Router = require('koa-router')
const next = require('next')
const session = require('koa-session')
const Redis = require('ioredis')

//post请求的数据处理；
const KoaBody = require('koa-body');

//auth授权
const authFilter = require('./server/authFilter')
//git api
const api = require('./server/api');

const RedisSessionStore = require('./server/session-store')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()


//创建redis   client
const redis = new Redis();

app.prepare().then(() => {
    const server = new Koa();
    const router = new Router();

    // 这个是用来给session加密的
    server.keys = ['xiaoguoping develop github App'];
    //post请求的数据处理；,ctx的request中可以获取到请求的body
    server.use(KoaBody());

    const SESSION_CONFIG = {
        key: 'xiaoguoping', // 设置到客户端cookie中的key
        // maxAge:10*1000,//过期时间
        store: new RedisSessionStore(redis) // 用来存取session的一个连接功能；
    };
    server.use(session(SESSION_CONFIG, server))
    //处理github oAuth登录
    authFilter(server);

    api(server);


    // 打印session
    server.use(async (ctx,next)=>{
        // console.log('session is:',ctx.session)
        await next();
    })

    router.get('/a/:id', async (ctx) => {
        const id = ctx.params.id;

        await handle(ctx.req, ctx.res, {
            path: '/a',
            query: {
                id
            },
        });
        ctx.respond = false; // 不在使用koa ctx.body, 直接handle 返回了ctx.body内容
    });
    router.get('/delete/user', async (ctx) => {
        ctx.session = null;
        ctx.body = 'set session success';
    });

    
    

    

    server.use(router.routes());

    //koa中间键 核心方法
    server.use(async (ctx, next) => {
        // ctx.cookies.set('id','userid:xxxx')
        ctx.req.session = ctx.session;
        await handle(ctx.req, ctx.res);
        ctx.respond = false
    })
    server.listen(3000, () => {
        console.log('koa server listening on 3000');
    })
})

    