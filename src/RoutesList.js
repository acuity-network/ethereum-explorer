
import React from 'react'
import {Route} from 'react-router-dom'

import Home from './pages/Home.jsx';
import Account from './pages/Account.jsx';


export default class RoutesList extends React.Component{

    render(){
        return (

            <div className="page-content">
                <Route exact path="/" component={Home}></Route>
                <Route path="/account" component={Account}></Route>
                <div className="clearfix"></div>
            </div>


        )


    }

}