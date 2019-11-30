export default (Comp)=>{
    function TestHocComp({Component,pageProps,...reset}) {
        console.log(Component,pageProps)
        return <Comp Component={Component} pageProps={pageProps} {...reset}/>
    }

    /**
     * getInitialProps：app.js中
     */
    TestHocComp.getInitialProps = Comp.getInitialProps;
    return TestHocComp
}
