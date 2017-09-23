
import React from 'react';


import Navleft from './layout/Navleft.jsx';

import Header from './layout/Header.jsx';
import Footer from './layout/Footer.jsx';

import { BrowserRouter as Router } from 'react-router-dom';
import RoutesList from './RoutesList.jsx';
import LinkClient from './lib/LinkClient';

const config = require('../config');

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