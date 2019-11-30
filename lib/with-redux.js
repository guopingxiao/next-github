import React from 'react';
import createSore   from '../store/store'

//是否是服务端
const isServer = typeof window==='undefined';
const __NEXT_REUDX_STORE__  = '__NEXT_REUDX_STORE__ ';
function getOrCreateStore(initialState) {

    if(isServer) return createSore  (initialState);

    if(!window[__NEXT_REUDX_STORE__ ]){
        window[__NEXT_REUDX_STORE__ ] = createSore  (initialState);
    }
    return window[__NEXT_REUDX_STORE__ ]

}
export  default Comp=>{
    class WithReduxApp extends React.Component{
        constructor(props){
            super(props);
            this.reduxStore = getOrCreateStore(props.initialReduxState)
        }
        render(){
            const {components,pageProps,...reset} = this.props;
            return <Comp components={components} pageProps={pageProps} {...reset} reduxStore = {this.reduxStore}/>
        }
    }
    WithReduxApp.getInitialProps = async ctx=>{
        const reduxStore = getOrCreateStore();
        ctx.reduxStore = reduxStore;
        let appProps = {};

        if (typeof Comp.getInitialProps === 'function') {
            appProps = await Comp.getInitialProps(ctx)
        }

        return {
            ...appProps,
            initialReduxState: reduxStore.getState(),
        }
    }
    return WithReduxApp;
}