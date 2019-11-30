# GithubPro
React16.8,Next.js,Koa

#### ContextHook
`
const value = useContext(MyContext);
`

接收一个context对象（react.createContext()的返回值），并返回当前context的值。当前context值是有上层距离最近的组件<MyContext.Provider> 的 value prop 决定。
useContext 的参数必须是 context 对象本身：useContext(MyContext)