import {Layout} from 'antd';
import Container from './Container';
import LayoutHeader from './LayoutHeader';
import Comp from './Comp';

const { Content, Footer } = Layout;

function LayoutWrapper ({children}) {
  const footerSty={
      textAlign:'center'
  }

  return (<Layout className="layout">
    
    
      <LayoutHeader />
      <Content>
          {/*render传入的是一个jsx的标签，等同于react.createElement('div')，返回的是一个element类型
          cloneElement：copy一个Element
          */}
          <Container render={<Comp color="red" style={{fontSize:20}}/>}>{children}</Container>
      </Content>
      <Footer style={footerSty}>Develop By xiaoguoping@<a href="mailto:765166961@qq.com">765166961@qq.com</a></Footer>
    
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
              min-height:100%;
          }
          .ant-layout-header{
              padding:0;
          }
          `
      }
  </style>
</Layout>)
}
export default LayoutWrapper;