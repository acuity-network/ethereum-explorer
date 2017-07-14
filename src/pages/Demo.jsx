import React from 'react';

import CreateContractForm from '../components/CreateContractForm.jsx';

import LinkContract from '../lib/LinkContract.js';

// Ethereum Explorer home page - displays system stats

export default class Demo extends React.Component {

    constructor(props) {

        super(props);

        this.web3 = this.props.linkClient.getWeb3Instance();

        this.createClass = this.createClass.bind(this);
    }


    createClass(data){

        const contractData = JSON.parse(JSON.stringify(data));

        console.log(contractData.message);

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

                        this.setState({ mining : true });
                        console.log('mining...');
                        return;
                    }

                    console.log('success');
                    console.log(result);

                    const greeter = web3.eth.contract(result.abi).at(result.address);

                    console.log(greeter.greet());
                }
            )


        }

        catch (err) {

            alert(err.message);

        }

    }

    render() {

        return (

            <div className="home-page content-page">

                <h3>Deploy new smart contract</h3>

                <div className="demo-content col-md-6 col-md-offset-3 ">

                    <CreateContractForm submitForm={this.createClass}/>

                </div>

            </div>

        )

    }

}