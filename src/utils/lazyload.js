

// 需要这个组件的时候就去加载 

// 路由懒加载
import Loadable from "react-loadable";

// 通用的loading 组件
const LoadingComponent=()=>{
    return ( <div> loading.... </div> )   // 自定义loading 
}

// class LoadingComponent extends Component{
//     render(){
//         return (
//             <div> loading.... </div>
//         )
//     }
// }

// loading 加载组件 
// loader  需要懒加载的组件
export default (loader,loading=LoadingComponent)=>{
    return Loadable({
        loader,
        loading
    })
}