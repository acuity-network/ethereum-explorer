import React from 'react'
import {Route, Switch} from 'react-router-dom'

import Home from './pages/Home.jsx';
import Search from './pages/Search.jsx';
import Block from './pages/Block.jsx';
import Transaction from './pages/Transaction.jsx';
import Account from './pages/Account.jsx';

export default class RoutesList extends React.Component {

    constructor(props) {

        // this.props.linkClient is supplied via App.jsx
        super(props);


    }

    render() {

        // Send all props to the child - this method is needed to send query params from react-router
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

        const TransactionPage = (props) => {
            return (
                <Transaction
                    linkClient={this.props.linkClient}
                    {...props}
                />
            );
        };

        const AccountPage = (props) => {
            return (
                <Account
                    linkClient={this.props.linkClient}
                    {...props}
                />
            );
        };


        return (

            <div className="page-content">

                <Switch>

                    <Route exact path="/" render={() => <Home linkClient={this.props.linkClient}/>}/>
                    <Route exact path="/block/:blockid" component={BlockPage}/>
                    <Route exact path="/block" component={BlockPage}/>
                    <Route exact path="/transaction/:transactionid" component={TransactionPage}/>
                    <Route exact path="/transaction" component={TransactionPage}/>
                    <Route exact path="/account/:accounthash" component={AccountPage}/>
                    <Route exact path="/account" component={AccountPage}/>
                    <Route exact path="/search" render={SearchPage}/>
                    <Route path="/search/:searchquery" render={SearchPage}/>
                    <Route render={() => <div className="alert alert-info">Sorry this page was not found</div> }/>

                </Switch>

                <div className="clearfix"></div>

            </div>

        )
    }

}