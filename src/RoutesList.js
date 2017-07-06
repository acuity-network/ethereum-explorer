
import React from 'react'
import {Route} from 'react-router-dom'

import Home from './pages/Home.jsx';
import Search from './pages/Search.jsx';

export default class RoutesList extends React.Component{

    render(){

        return (

            <div className="page-content">

                <Route exact path="/" component={Home}></Route>
                <Route path="/search" component={Search}></Route>
                <Route path="/search/:searchquery" component={Search}></Route>

                <div className="clearfix"></div>
            </div>


        )

    }

}