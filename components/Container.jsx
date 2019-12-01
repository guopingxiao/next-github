import { cloneElement } from 'react';

const style = {
    width:'100%',
    maxWidth:1200,
    marginLeft:'auto',
    marginRight:'auto',
    padding:'0 20px'
}
/**
 * cloneElement：copy一个element节点
 * @param children
 * @param render
 * @returns {React.DetailedReactHTMLElement<{style: {width: string, maxWidth: number, marginLeft: string, marginRight: string}, children: *}, HTMLElement> | React.ReactHTMLElement<HTMLElement> | React.ReactSVGElement | React.DOMElement<{style: {width: string, maxWidth: number, marginLeft: string, marginRight: string}, children: *}, Element> | React.FunctionComponentElement<any> | React.CElement<any, React.Component<P, React.ComponentState>> | React.ReactElement<any>}
 */
export default ({children,render=<div/>})=>{

    return cloneElement(render,
        {
            style:Object.assign({},style,render.props.style),
            children
        }
    )
}