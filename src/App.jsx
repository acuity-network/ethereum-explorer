
const config = require('../config');

import React from 'react';
import Navleft from './layout/Navleft.jsx';

import Header from './layout/Header.jsx';
import Footer from './layout/Footer.jsx';

import { BrowserRouter as Router } from 'react-router-dom';
import RoutesList from './RoutesList.jsx';

// TODO: This path needs to be dynamic depending on environment
import LinkClient from '../mix-api/dist/LinkClient';

// This is set up but does not work as ES6 does not currently support
// if(process.env.environment === 'dev'){
//
//     LinkClient = require('../mix-api/dist/LinkClient');
//
// }else{
//
//     // TODO: import node module
//
// }

export default class App extends React.Component {

    constructor(){

        super();

        this.linkClient = null;

        try{

            // The LinkClient will try various methods of connecting to a blockchain network
            this.linkClient = new LinkClient();

        }catch(err){

            console.error(err.message);

        }

    }

    render() {

        return (

            <Router>

                <div className="site-content">

                    <Header linkClient={this.linkClient}></Header>

                    <div className="content-main">

                        <Navleft className="hidden-sm hidden-xs"></Navleft>

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