
import React from 'react';
import {Link} from 'react-router-dom';

const MixHTTPConnector = require('mix-api').MixConnector;

export default class Settings extends React.Component {

    constructor() {

        super();

        this.mixConnector = new MixHTTPConnector();

        this.state = {
            metaMaskExists : (typeof web3 !== 'undefined'),
            nodeUri : localStorage.getItem('mix-node-uri') || ''
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.updateURI = this.updateURI.bind(this);

    }

    handleInputChange(event) {

        const target = event.target,
            value = target.type === 'checkbox' ? target.checked : target.value,
            name = target.name;

        this.setState({
            [name]: value
        });

    }

    updateURI(ev) {

        ev.preventDefault();

        // If the input is blank, the uri is being deleted
        if(!this.state.nodeUri){

            localStorage.removeItem('mix-node-uri');

            this.setState(
                {
                    uriUpdated : true
                }
            );


            setTimeout(
                ()=>{

                    this.setState(
                        { uriUpdated : false }
                    )

                }, 3000
            );

            return;

        }


        // Test the connection
        let connection = null;

        try{

            connection = this.mixConnector.blockchainConnect(this.state.nodeUri);

        }catch(err){

            console.error(err.message);

        }

        if(!connection || !connection.isConnected()){

            this.setState(
                {
                    configBad : true
                }
            );


            setTimeout(
                ()=>{

                    this.setState(
                        { configBad : false }
                    )

                }, 4000
            );

            return;

        }

        // Config good. Store it and show notification.
        localStorage.setItem('mix-node-uri', this.state.nodeUri);

        this.setState(
            {
                connectionGood : true
            }
        );

        setTimeout(
            ()=>{

                this.setState(
                    { connectionGood : false }
                )

            }, 3000
        );


    }

    render() {

        return <div className="settings-page">

            <h3 className="content-heading">Connection settings</h3>

            <div className="col-md-8 col-md-offset-2">

                <p>
                    The Ethereum Block Explorer can connect to an Ethereum blockchain via two methods:
                </p>

                <ul>
                    <li>
                        Blockchain node URI (e.g. http://[blockchain node]:[port]). Could be a blockchain node running on your
                        localhost. The node will need to have CORS enabled for this to work.
                    </li>
                    <li>
                        Metamask. See <a href="https://metamask.io/" target="_blank">https://metamask.io/</a>. Metamask is a clever
                        Chrome and Firefox browser extension that manages blockchain connections and accounts for established and
                        individual blockchains. You will need to install and enable Metamask for this option to work.
                    </li>
                </ul>

                <p>
                    If a blockchain node URI is specified, this will override any Metamask connections
                </p>

            </div>

            <div className="col-md-8 col-md-offset-2 metamask-exists">

                Metamask is &nbsp;
                {
                    this.state.metaMaskExists ?
                        <span className="btn btn-sm btn-success">available</span> :
                        <span className="btn btn-sm btn-danger">not available</span>
                }

            </div>

            <div className="col-md-8 col-md-offset-2">

                <form onSubmit={this.updateURI}>

                    <div className="form-group">

                        <label>Blockchain node URI (leave blank if you want to use Metamask)</label>

                        <input type="text"
                               name="nodeUri"
                               className="form-control"
                               placeholder="http://localhost:8545"
                               onChange={this.handleInputChange}
                               value={this.state.nodeUri} />

                    </div>

                    <p className={ this.state.uriUpdated ? 'alert alert-info' : 'no-display'}>
                        URI Updated
                    </p>

                    <p className={ this.state.connectionGood ? 'alert alert-success' : 'no-display'}>
                        Connection to blockchain successful. <Link to="/">Click here</Link> to see system stats or use the left hand
                        menu to view blocks, transactions or account balances.
                    </p>

                    <p className={ this.state.configBad ? 'alert alert-danger' : 'no-display'}>
                        Could not connect to a node with this URI. Generally this is because the URI is wrong or CORS is not enabled for this node.
                        Please check the settings for the node and try again.
                    </p>

                    <div className="form-group">

                        <button type="submit" className="btn btn-primary pull-right">Submit</button>

                    </div>

                </form>

            </div>

        </div>

    }

}