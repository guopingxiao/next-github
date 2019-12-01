import React,{useState, useEffect,useReducer,useContext,useRef} from 'react';
import MyContext from  '../../lib/MyContext';
// class MyCount extends React.Component{
//     constructor(props){
//         supper(props);
//         this.ref=React.createRef();
//     }
//     state = {
//         count : 0
//     }
//     componentDidMount(){
//         this.interval = setInterval(()=>{
//             this.setState({ count: this.state.count + 1})
//         },1000)
//     }
//
//     componentWillUnmount(){
//         if(this.interval){
//             clearInterval(this.interval);
//         }
//
//     }
//     render(){
//         return(
//             <>
//                 <span ref={this.ref}>{this.state.count}</span>
//             </>
//         )
//     }
// }

function countReducer(state,action){
    switch(action.type){
        case 'add':
            return state+1;
        case 'minus':
            return state-1;
        default :
            return state;
    }
}
function MyCountFun(){
    //声明一个count
    //useState 会返回一对值：当前状态和一个让你更新它的函数，
    //useState(0):参数是初始值（第一次渲染用到），这个初始值和this.state不同的是，它不一定是一个对象。
    //const [count, setCount] = useState(0);//state hook方法，一个组件中多次使用 State Hook:
    const [count,dispatchCount] = useReducer(countReducer,20);//返回[初始值，reducer函数]
    const  [name,setName] = useState('hello');
    const context = useContext(MyContext);
    const inputRef = useRef();
    // useEffect(()=>{
    //     const interval=setInterval(()=>{
    //         //setCount(c=>c+1);
    //         dispatchCount({type:'minus'})
    //     },1000);
    //     return ()=>clearInterval(interval);
    // },[]);
    //[]可选参数：
    useEffect(()=>{
        console.log('effect invoke');
        console.log(inputRef)
        return ()=>console.log('effect delete');
    },[]);
    return <div>
        <input ref={inputRef} value={name} onChange={(e)=>setName(e.target.value)}/>
        <button onClick={()=>dispatchCount({type:'add'})}>{count}</button>
        <p>{context}</p>
    </div>
}
export default MyCountFun;