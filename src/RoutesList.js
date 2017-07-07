
import React from 'react'
import {Route} from 'react-router-dom'

import Home from './pages/Home.jsx';
import Search from './pages/Search.jsx';

export default class RoutesList extends React.Component{

    render(){

        return (

            <div className="page-content">

                <Route exact path="/" render={()=><Home linkClient={this.props.linkClient}/>}/> />
                <Route exact path="/search" render={()=><Search linkClient={this.props.linkClient}/>}/>
                <Route path="/search/:searchquery" render={()=><Search linkClient={this.props.linkClient}/>}/>

                <div className="clearfix"></div>
            </div>

        )

    }

}