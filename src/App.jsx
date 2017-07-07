
import React from 'react';


import Navleft from './layout/Navleft.jsx';

import Header from './layout/Header.jsx';
import Footer from './layout/Footer.jsx';

import { BrowserRouter as Router } from 'react-router-dom';
import RoutesList from './RoutesList';

import {config} from '../config';
import LinkClient from './lib/LinkClient';


export default class App extends React.Component {

    constructor(){

        super();
        this.linkClient = new LinkClient(config.node_uri);

    }

    render() {

        return (

            <Router>

                <div className="site-content">

                    <Header></Header>

                    <div className="content-main">

                        <Navleft></Navleft>

                        <div className="content-middle">

                            <RoutesList linkClient={this.linkClient}/>
                            <Footer></Footer>

                        </div>

                    </div>

                </div>

            </Router>

            );

        }


}