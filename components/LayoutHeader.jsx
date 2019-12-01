import { useState,useCallback } from 'react';
import {Layout,Icon,Input,Avatar ,Tooltip,Dropdown,Menu} from 'antd';
import {connect} from 'react-redux';
import { withRouter } from 'next/router';

import axios from 'axios';

import Container from './Container';
import getConfig from 'next/config';
import {logout} from '../store/store';

const {Header} = Layout;

const {publicRuntimeConfig} = getConfig();
function LayoutHeader({user,logout,router}) {

    const [search,setSearch] = useState('');
    const handleSearchChange = useCallback((e)=>{
        setSearch(e.target.value)
    },[search]);
    const handleSearch= useCallback(()=>{

    },[]);
    const handleLogout = useCallback(()=>{
        logout();
    },[logout]);//退出功能依赖logout props

    const githubSty = {
        color:'white',
        fontSize:40,
        display:'block',
        marginRight:50
    };
    /**
     * 退出下来菜单
     * */
    const menu =<Menu>
        <Menu.Item>
            <a target="_blank" rel="noopener noreferrer"  onClick={handleLogout}>
                退出
            </a>
        </Menu.Item>
    </Menu>;
    /**
     * 登录授权
     * @type {Function}
     */
    const handleGoToOAuth = useCallback((e) => {
        e.preventDefault();
        axios.get(`/prepare-auth?url=${router.asPath}`).then(res => {
            if(res.status===200){
                location.href = publicRuntimeConfig.AUTH_CODE_URL;
            }else{
                console.log('prepare oauth failed error:', res);
            }
        }, error => {
            console.log('prepare oauth failed error:', error)
        })
            .catch(error => {
                console.log('prepare oauth failed error:', error)
            })
    });
    return(
        <Header>
            <Container render={<div className="header-wrapper"/>}>
                <div className="header-left">
                    <div className="logo">
                        <Icon type="github" style={githubSty}/>
                    </div>
                    <Input.Search
                        placeholder="搜索仓库"
                        enterButton="Search"
                        value={search}
                        onChange={handleSearchChange}
                        onSearch={handleSearch}
                    />
                    <span>{search}</span>
                </div>
                <div className="header-right">
                    <div className="user">
                        {
                            user&&user.id ?
                                <Dropdown overlay={menu} placement="bottomCenter">
                                    <a>
                                        <Avatar size={40} src={user.avatar_url} icon="user" />
                                    </a>
                                </Dropdown>
                                :
                                <Tooltip title="点击登录">
                                    <a href={publicRuntimeConfig.AUTH_CODE_URL} onClick={handleGoToOAuth}>
                                        <Avatar size={40} icon="user" />
                                    </a>
                                </Tooltip>
                        }

                    </div>
                </div>
            </Container>
            <style jsx>
                {
                `
                .header-wrapper{
                    display:flex;
                    justify-content:space-between;
                    align-items: center;
                }
                .header-left{
                    display:flex;
                    justify-content:flex-start;
                    padding:10px;
                    align-items:center;
                }
                .search-input{
                    height:30px;
                }
                .header-right {
                    display: flex;
                    justify-content: flex-end;
                }
                `
                }
            </style>
        </Header>
    )
}
export default connect(
    function mapState(state) {
        return {
            user:{
                ...state.user
            }
        }
    },
    function mapReducer(dispatch) {
        return {
            logout:()=>dispatch(logout())
        }
    }
)(withRouter(LayoutHeader));