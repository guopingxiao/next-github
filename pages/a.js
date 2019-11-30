/**
 * withRouter可以往子组件传递父组件router的porps
 */
import { withRouter } from 'next/router';
import dynamic from 'next/dynamic';//异步加载组件
import Link from 'next/link';

import getConfig from 'next/config';

import styled from 'styled-components';
// import moment from 'moment';
// import Comp from "../components/Comp";

const Comp = dynamic(import ('../components/Comp'));//执行渲染时，才加载

const { serverRuntimeConfig, publicRuntimeConfig } = getConfig();

const Title = styled.h1`
  color: yellow;
  font-size: 40px;
`

const color = '#113366'

const RouterA = ({router,name,time})=>{
    console.log(serverRuntimeConfig, publicRuntimeConfig)
    return (
        <>
            <Title>This is Title {time}</Title>
            <Comp />
            <Link href="#aaa">
                <a className="link">
                    A {router.query.id} {name} {process.env.customKey}
                </a>
            </Link>
            <style jsx>{`
        a {
          color: blue;
        }
        .link {
          color: ${color};
        }
      `}</style>
        </>
    )
};

RouterA.getInitialProps = async (ctx)=>{
    const moment = await import('moment');
    const promise = new Promise((resolve)=>{
        setTimeout(()=>{
            resolve({
                name:'Jim',
                time: moment.default(Date.now()-60*1000).fromNow()
            })
        },1000)
    })
    return await promise;
}

export default withRouter(RouterA);