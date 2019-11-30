const Koa = require('koa')
const Router = require('koa-router')
const next = require('next')
const session = require('koa-session')
const Redis = require('ioredis')
//auth授权
const auth = require('./server/auth');

const RedisSessionStore = require('./server/session-store');

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()


//创建redis   client
const redis = new Redis();

app.prepare().then(() => {
    const server = new Koa();
    const router = new Router();
    server.keys = ['YAN develop github App'];
    const SESSION_CONFIG = {
        key: 'Yan',
        // maxAge:10*1000,//过期时间
        store: new RedisSessionStore(redis)
    };
    server.use(session(SESSION_CONFIG, server))
    //处理github oAuth登录
    auth(server);


    server.use(async (ctx,next)=>{
        console.log('session is:',ctx.session)
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
        ctx.respond = false;
    });
    router.get('/delete/user', async (ctx) => {
        ctx.session = null;
        ctx.body = 'set session success';
    });

    router.get('/set/user', async (ctx) => {
        ctx.session.user = {
            name: 'Yan',
            age: 20
        };
        ctx.body = 'set session success';
    });

    server.use(router.routes());

    //koa中间键 核心方法
    server.use(async (ctx, next) => {
        // ctx.cookies.set('id','userid:xxxx')
        await handle(ctx.req, ctx.res);
        ctx.respond = false
    })
    server.listen(3000, () => {
        console.log('koa server listening on 3000');
    })
})

    