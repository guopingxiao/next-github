import axios from 'axios';

const api = require('../lib/api');

 function Index() {
     return(
         <span>index</span>
     )
 }
 Index.getInitialProps = async(ctx)=> {
     /*const result = axios.get('/github/search/repositories?q=react').then(res=>{
         console.log(res);
     },error=>{
         console.error(error)
     })*/
     //以上代码简化为封装后得request
     //ctx：服务端渲染得是和，有req，res
     console.log(ctx)
     const result = api.request({url:`/search/repositories?q=react`},ctx.req,ctx.res);
     return {
         data:result.data
     }
 }
export default Index;