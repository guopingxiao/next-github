const axios = require('axios');

const config = require('../config');

const {
    CLIENT_ID,
    CLIENT_SECRET,
    TOKEN_URL
} = config.GITHUB_AUTH

module.exports =(server)=>{
    server.use(async (ctx, next) => {
        console.log('=========>', ctx.path)
        if(ctx.path==='/auth'){
            const code =ctx.query.code;
            console.log(code)
            if(!code){
                ctx.body = 'code not exist';
            }
            const result = await axios({
                method:'post',
                url:TOKEN_URL,
                data:{
                    client_id: CLIENT_ID,
                    client_secret: CLIENT_SECRET,
                    code
                },
                headers:{
                    Accept:'application/json'
                }
            })
            console.log(result.status,result.data)
            //
            if(result.status===200 && (result.data&&!result.data.error)){
                ctx.session.githubAuth = result.data;
                const {access_token,token_type} = result.data;

                //获取用户信息
                const userInfo = await axios({
                    method:'GET',
                    url:"https://api.github.com/user",
                    headers:{
                        'Authorization':`${token_type} ${access_token}`
                    }
                })

                ctx.session.userInfo = userInfo.data;
                // 从哪个页面登录，回跳到哪个页面，默认到首页
                ctx.redirect((ctx.session&&ctx.session.urlBeforeOAuth) || '/');
                ctx.session.urlBeforeOAuth = '';
            }else{
                const errorMsg = result.data&&result.data.error;
                ctx.body = `request token failed ${errorMsg}`
            }
        }else {
            await next();
        }
    })

    /**
     * 退出功能
     */
    server.use(async(ctx,next)=>{

        const path = ctx.path;
        const method = ctx.method;
        if(path==='/logout'&&method==='POST'){
            ctx.session = null;
            ctx.body = 'logout success';
        }else{
            await next();
        }
    })
    /**
     *
     */
    server.use(async(ctx,next)=>{
        const path = ctx.path;
        const method = ctx.method;
        if(path==='/prepare-auth'&&method==='GET'){
            const {url} = ctx.query;
            ctx.session.urlBeforeOAuth = url;
            ctx.body = 'ready';
        }else{
            await next();
        }
    })
}