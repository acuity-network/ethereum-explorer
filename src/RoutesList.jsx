import React from 'react'
import {Route, Switch, withRouter, Link} from 'react-router-dom';

import Home from './pages/Home.jsx';
import Search from './pages/Search.jsx';
import Block from './pages/Block.jsx';
import Transaction from './pages/Transaction.jsx';
import Account from './pages/Account.jsx';
import Settings from './pages/Settings.jsx';

export class RoutesList extends React.Component {

    constructor(props) {

        // this.props.linkClient is supplied via App.jsx
        super(props);


    }

    render() {

        if (!this.props.linkClient && this.props.location.pathname !== '/settings') {

            return (
                <div className="page-content">

                    <div className="alert alert-danger">
                        The explorer was unable to connect to any network. Please check your blockchain configuration and client settings
                        by <Link to="/settings">clicking here</Link>
                    </div>

                </div>
            )

        }

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
                    <Route exact path="/settings" component={Settings}/>
                    <Route render={() => <div className="alert alert-info">Sorry this page was not found</div> }/>

                </Switch>

                <div className="clearfix"></div>

            </div>

        )
    }

}

export default withRouter(RoutesList);