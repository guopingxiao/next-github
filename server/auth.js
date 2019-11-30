const axios = require('axios');

const config = require('../config');

const  {client_id,client_secret,request_token_url} = config.github;

module.exports =(server)=>{
    server.use(async(ctx,next)=>{
        if(ctx.path==='/auth'){
            const code =ctx.query.code;
            console.log(code)
            if(!code){
                ctx.body = 'code not exist';
            }
            const result = await axios({
                method:'post',
                url:request_token_url,
                data:{
                    client_id,
                    client_secret,
                    code
                },
                headers:{
                    Accept:'application/json'
                }
            })
            console.log(result.status,result.data)
            //
            if(result.code===200&&(result.data&&!result.data.error)){
                ctx.session.githubAuth = result.data;

                //

                ctx.redirect('/');
            }else{
                const errorMsg = result.data&&result.data.error;
                ctx.body = `request token failed ${errorMsg}`
            }
        }else {
            await next();
        }
    })
}