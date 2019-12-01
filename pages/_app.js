/**
 * 自定义_app文件
 * 控制页面初始化；如：
 * 1.当页面变化时保持页面布局
 * 2.当路由变化时保持页面状态
 * 3.使用componentDidCatch自定义处理错误
 * 4.注入额外数据到页面里 (如 GraphQL 查询)
 */
import App,{Container} from 'next/app';
import Router from 'next/router';
import Link from 'next/Link';
import  {Provider} from 'react-redux';

import axios from 'axios';

import LayoutWrapper from '../components/Layout';
import WithRedux from '../lib/with-redux';
import PageLoading from '../components/PageLoading';
import 'antd/dist/antd.css';

class MyApp extends App{
    //每次页面切换都执行此方法
    static async getInitialProps(ctx) {
        console.log('---app init----');
        const {Component} = ctx;
        let pageProps={};
        if(Component.getInitialProps){
            pageProps = await Component.getInitialProps(ctx);
        }
        return {pageProps};
    }

    state={
        loading:false
    }

    starLoading=()=>{
        this.setState({
            loading:true
        })
    }
    stopLoading=()=>{
        this.setState({
            loading:false
        })
    }
    componentDidMount(){
        Router.events.on('routeChangeStart',this.starLoading);
        Router.events.on('routeChangeComplete',this.stopLoading);
        Router.events.on('routeChangeError',this.stopLoading);

    }
    componentWillUnmount(){
        Router.events.off('routeChangeStart',this.stopLoading);
        Router.events.off('routeChangeComplete',this.stopLoading);
        Router.events.off('routeChangeError',this.stopLoading);
    }


    render(){
        const { Component,pageProps,reduxStore } = this.props;
        return (
            <Container>
                <Provider store={reduxStore}>
                    {
                        this.state.loading ? <PageLoading/> :null
                    }
                    <LayoutWrapper>
                        <Link href="/">
                            <a>index</a>
                        </Link>
                        <Link href="/detail">
                            <a>detail</a>
                        </Link>
                        <Component {...pageProps} />
                    </LayoutWrapper>
                </Provider>
        </Container>
        )
    }
}

export default WithRedux(MyApp);