
import React from 'react'
import {Route} from 'react-router-dom'

import Home from './pages/Home.jsx';
import Search from './pages/Search.jsx';

export default class RoutesList extends React.Component{

    constructor(props){

        super(props);


    }

    render(){

        // Send all props to the child
        const SearchPage = (props) => {
            return (
                <Search
                    linkClient={this.props.linkClient}
                    {...props}
                />
            );
        };

        return (

            <div className="page-content">

                <Route exact path="/" render={()=><Home linkClient={this.props.linkClient}/>} />
                <Route exact path="/search" render={SearchPage} />
                <Route path="/search/:searchquery" render={SearchPage} />

                <div className="clearfix"></div>
            </div>

        )

    }

}