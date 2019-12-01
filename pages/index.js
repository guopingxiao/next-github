import {Icon,Tabs} from 'antd';
import getConfig from 'next/config';
import { connect } from 'react-redux';
import Router,{ withRouter } from 'next/router';

//仓库概述组件
import Repo from '../components/Repo';

const {publicRuntimeConfig} = getConfig();

function Index({ userRepos, userStarredRepos, user, router }) {
     // console.log(userStarredRepos,isLogin)
    const tabsKey = router.query.key || '1';

    const handleTabsEvent = (tabsKey)=>{
         Router.push(`/?key=${tabsKey}`)
    };
    
    if (!user || !user.id) {
        return (
            <div className="root">
                <p>您还未登录哦！</p>
                <a className="login-btn" href={publicRuntimeConfig.OAUTH_URL}>点击登录</a>
                <style jsx>
                    {`
                        .root{
                            height:400px;
                            display:flex;
                            flex-direction:column;
                            justify-content:center;
                            align-items:center;
                        }
                        .login-btn{
                            line-height:32px;
                            display:inline-block;
                            font-weight:400;
                            white-space:nowrap;
                            color: #fff;
                            background-color: #1890ff;
                            border-color: #1890ff;
                            text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.12);
                            box-shadow: 0 2px 0 rgba(0, 0, 0, 0.045);
                            cursor: pointer;
                            transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
                            user-select: none;
                            touch-action: manipulation;
                            height: 32px;
                            padding: 0 15px;
                            font-size: 14px;
                            border-radius: 4px;
                        }
                     `}
                </style>
            </div>
        )
    } else { 
        return(
         <div className="root">
             <div className="user-info">
                 <img src={user.avatar_url} alt="user avatar" className="avatar"/>
                 <span className="login">{user.login}</span>
                 <span className="name">{user.name}</span>
                 <span className="bio">{user.bio}</span>
                 <p className="email">
                     <Icon type="mail" style={{marginRight:'10px'}}/>
                     <a href={`mailto:${user.email}`}>{user.email}</a>
                 </p>
             </div>
             <div className={"user-repos"}>
                <Tabs defaultActiveKey={tabsKey} animated={false} onChange={handleTabsEvent}>
                     <Tabs.TabPane tab="我的仓库" key="1">
                         {
                             userRepos.map((item, ind) => <Repo repo={item} key={ind}/>)
                         }
                     </Tabs.TabPane>
                     <Tabs.TabPane tab="我关注的仓库" key="2">
                         {
                             userStarredRepos.map((item, ind) => <Repo repo={item} key={ind}/>)
                         }
                     </Tabs.TabPane>
                 </Tabs>
             </div>
             <style jsx>
                 {`
                 .root{
                    display:flex;
                    align-items:flex-start;
                    padding:20px 0;
                 }
                 .user-info{
                    display:flex;
                    width:200px;
                    margin-right:40px;
                    flex-shrink:0;//禁止被压缩
                    flex-direction:column;
                    justify-content:center;
                 }
                 .login{
                    font-weight:800;
                    font-size:20px;
                    margin-top:20px;
                 }
                 .name{
                    font-size:16px;
                    color:#777;
                 }
                 .bio{
                    margin-top:20px;
                    color:#333;
                 }
                 .avatar{
                    width:100%;
                    border-radius:5px;
                 }
                 .user-repos{
                    flex-grow:1;
                 }
                 `}
             </style>
         </div>
     )
    }
     
 }
     
 //getInitialProps页面进入的时候，调用
 Index.getInitialProps = async({ctx,reduxStore})=> {
     //ctx：服务端渲染得是和，有req，res
     //判断用户是否登录
     const user = reduxStore.getState().user;
     if(!user  || !user.id){
         return {
             isLogin:false
         }
     }
     //用户所有的仓库
     const userRepos = await api.request({url:`/user/repos`},ctx.req,ctx.res);
     //自己创建的仓库
     const userStarredRepos = await api.request({url:`/user/starred`},ctx.req,ctx.res);
     return {
         data:result.data,
         isLogin:true,
         userRepos:userRepos.data,
         userStarredRepos:userStarredRepos.data
     }
 }
export default connect(
    function mapState(state) {
        console.log(state)
        return {
            user:state.user
        }
    }
)(withRouter(Index))