import {useState,useCallback} from 'react';
import { Layout, Icon, Input, Avatar } from 'antd';
import Container from './Container';

const  {Header,Content,Footer} = Layout;

const Comp=({color,children,style})=>(<div style={{color,...style}}>{children}</div>)

export default ({children})=>{
    const [search,setSearch] = useState('');
    const handleSearchChange = useCallback((e)=>{
        setSearch(e.target.value)
    },[search]);
    const handleSearch= useCallback(()=>{

    },[]);

    const githubSty = {
        color:'white',
        fontSize:40,
        display:'block',
        marginRight:50
    };
    const footerSty={
        textAlign:'center'
    }
    return (<Layout className="layout">
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
                        <Avatar size={40} icon="user" />
                    </div>
                </div>
            </Container>
        </Header>
        <Content>
            {/*render传入的是一个jsx的标签，等同于react.createElement('div')，返回的是一个element类型
            cloneElement：copy一个Element
            */}
            <Container render={<Comp color="red" style={{fontSize:20}}/>}>{children}</Container>
        </Content>
        <Footer style={footerSty}>Develop By Yan@<a href="mailto:2056587192@qq.com">2056587192@qq.com</a></Footer>
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
        <style jsx global>

            {
                `
                body{
                    padding:0;
                    margin:0;
                }
                #__next{
                    height:100%;
                }
                .ant-layout{
                    height:100%;
                }
                .ant-layout-header{
                    padding:0;
                }
                `
            }
        </style>
    </Layout>)
}