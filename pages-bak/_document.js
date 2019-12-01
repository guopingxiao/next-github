import Document, { Html, Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

export default class MyDocument extends Document {
    static async getInitialProps(ctx) {
        //如果要使用css-in-js库，要定制renderPage，它以一个对象作为参数进行定制
        //重新renderPage作用：1.集成css-in-js：主要是为了解决在服务端渲染过程中，拿到某一个js具体渲染的css文本，然后把它加到header文件中，作为html内容返回到服务端，这个过程在document完成
        const styleSheet = new ServerStyleSheet();
        const originalRenderPage = ctx.renderPage;
        try{
            //这块其实就是经典的hoc
            ctx.renderPage = () => originalRenderPage({
                //用于包装整个react树，App其实就是自定义的app文件，没有自定义是next/app中默认的app
                //collectStyles：把整个页面上的东西挂载到styleSheet
                enhanceApp: App => props=>styleSheet.collectStyles(<App {...props}/>),
                //Component：pages下面定义的每一个js文件
                // enhanceComponent: Component => withLog(Component),
            })
            //使用“ctx”运行父类“getInitialProps”，它现在包含了我们自定义的“renderPage”
            const props = await Document.getInitialProps(ctx);
            return { 
                ...props,
                styles:(<>{props.styles}{styleSheet.getStyleElement()}</>)
             }
        }finally{
            styleSheet.seal();
        }
       
        
    }
    render() {
        return (
            <Html>
                {/* 不推荐这里定义title，因为每个页面不一致，可以在每个页面引用head进行定义 */}
                <Head />
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}