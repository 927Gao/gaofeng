
// import React , {Component} from "react";
import {
    HashRouter as Hash,
    Route
} from "react-router-dom"

import Layout from "./views/index";

export default class MainRouter extends Component{
    render(){
        return (
            <div className = "main">
                <Hash>
                    <Route component = {Layout}/>
                </Hash>
            </div>
        )
    }
}

class Mypro extends React.Component{
    render(){
        return(
            <div className="box">
                Mypro--Mypro--Mypro
            </div>
        )
    }
}