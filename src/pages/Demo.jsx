import React from 'react';

import CreateContractForm from '../components/CreateContractForm.jsx';

import LinkContract from '../lib/LinkContract.js';

// Ethereum Explorer demo page - creates, deploys and calls into a smart contract.

export default class Demo extends React.Component {

    constructor(props) {

        super(props);

        this.web3 = this.props.linkClient.getWeb3Instance();
        this.createClass = this.createClass.bind(this);
        this.activateContract = this.activateContract.bind(this);
        this.finished = this.finished.bind(this);

        this.state = {
            showForm: true
        };

    }


    createClass(data) {

        const contractData = JSON.parse(JSON.stringify(data));
        contractData.ABI = JSON.parse(contractData.ABI);

        const web3 = this.web3,
            TRANSACTION_GAS = 3000000;  // The transaction will fail silently if there is not enough gas.

        try {

            // Retrieve an account with some gas in it
            web3.personal.unlockAccount(web3.eth.accounts[0], 'password'); // Demo account, you still need a private key to unlock.

            const contract = new LinkContract(web3);

            contract.createNew(contractData.ABI, contractData.byteCode, contractData.message, web3.eth.accounts[0], TRANSACTION_GAS,
                (err, result) => {

                    if (err) {
                        return alert(err);
                    }

                    if (!result.address) {

                        this.setState({mining: true});
                        console.log('mining...');
                        return;
                    }

                    console.log('success');
                    console.log(result);

                    this.greeter = web3.eth.contract(result.abi).at(result.address);
                    this.setState({mining: false, contractCreated: true});

                }
            )


        }

        catch (err) {

            alert(err.message);

        }

    }

    activateContract() {

        const result = this.greeter.greet();
        this.setState({ contractResult : result, contractCreated: false });

    }

    finished(){

        this.setState({ contractResult : '', showForm: true })

    }

    render() {

        let content ;

        if(this.state.showForm){

            content = <CreateContractForm submitForm={this.createClass}/>

        }

        if(this.state.mining){

            content = <p className="alert alert-info">Mining. Please wait...</p>

        }

        if(this.state.contractCreated){

            content = <div className="activate-contract">
                        <button className="btn btn-success btn-lg" onClick={this.activateContract}>ACTIVATE CONTRACT</button>
                      </div>

        }

        if(this.state.contractResult){

            content = <div className="result">
                        <h1>{this.state.contractResult}</h1>
                            <button className="btn btn-default pull-right" onClick={this.finished}>OK</button>
                      </div>

        }

        return (

            <div className="home-page content-page">

                <h3>Deploy new smart contract</h3>

                <div className="demo-content col-md-6 col-md-offset-3 ">

                    {content}

                </div>

            </div>

        )

    }

}