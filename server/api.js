const axios = require('axios');
const GITHUB_BASE_URL = 'https://api.github.com'

module.exports= (server)=>{
    server.use(async(ctx,next)=>{
        const path = ctx.path;
        if(path.startsWith('/github/')){
            console.log('api session:',ctx.session)
            const githubAuth = ctx.session.githubAuth;
            const githubPath = `${GITHUB_BASE_URL}${ctx.url.replace('/github/','/')}`;
            const token = githubAuth && githubAuth.access_token;
            let headers = {};
            if(token){
                headers['Authorization'] = `${githubAuth.token_type} ${token}`;
            }
            try {
                const result = await axios({
                    method:'GET',
                    url:githubPath
                });
                if(result.status===200){
                    ctx.body = result.data;
                    ctx.set('Content-type','application/json');
                }else{
                    ctx.status = result.status;
                    ctx.body = {
                        success:false,
                    }
                    ctx.set('Content-type','application/json');
                }
            }catch (e) {
                console.error(e)
                ctx.body = {
                    success:false,
                }
                ctx.set('Content-type','application/json');
            }

        }else{
            await next();
        }
    })
}