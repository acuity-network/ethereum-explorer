
import React from 'react'
import {Route} from 'react-router-dom'

import Home from './pages/Home.jsx';
import Search from './pages/Search.jsx';
import Block from './pages/Block.jsx';

export default class RoutesList extends React.Component{

    constructor(props){

        // this.props.linkClient is supplied via App.jsx
        super(props);


    }

    render(){

        // Send all props to the child - this is needed to send query params from react-router
        const SearchPage = (props) => {
            return (
                <Search
                    linkClient={this.props.linkClient}
                    {...props}
                />
            );
        };

        const BlockPage = (props) => {
            return (
                <Block
                    linkClient={this.props.linkClient}
                    {...props}
                />
            );
        };

        return (

            <div className="page-content">

                <Route exact path="/" render={()=><Home linkClient={this.props.linkClient}/>} />
                <Route path="/block/:blockid?" render={BlockPage} />
                <Route exact path="/search" render={SearchPage} />
                <Route path="/search/:searchquery" render={SearchPage} />

                <div className="clearfix"></div>
            </div>

        )

    }

}