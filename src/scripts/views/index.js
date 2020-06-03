import { 
    Switch ,
    Route ,
    Redirect
} from "react-router-dom";

import Login from "./login/index";
import NotFound from "./404/index";
import Main from "./main/index";

import LazyLoad from "&/lazyload";

export default class Layout extends Component{
    render(){
        return(
                <Switch>
                    <Route path="/" exact render={()=><Redirect to="/login" />}/>
                    <Route path="/404" component ={NotFound}/>
                    {/* <Route path="/main" component ={Main}/> */}
                    <Route path="/main" component={ LazyLoad(()=>import("./main")) } />
                    <Route path="/login" component = {Login} />
                    <Route render={()=><Redirect to="/404" />}/>
                </Switch>
        )
    }
}