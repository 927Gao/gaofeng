

import "./index.scss"

import{
    Button
}from "antd"

export default class Main extends Component{
    render(){
        return(
            <div>
                <h2> Main--Main--Main</h2>
                <div>
                <Button type="primary">Primary</Button>
                <Button>Default</Button>
                <Button type="dashed">Dashed</Button>
                <Button type="link">Link</Button>
                </div>
            </div>
        )
    }
}