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


    createClass(contractData){

        contractData.ABI = JSON.parse(contractData.ABI);

        const web3 = this.web3,
            TRANSACTION_GAS = 3000000;  // The transaction will fail silently if there is not enough gas.

        try {

            web3.personal.unlockAccount(web3.eth.accounts[0], 'password'); // Demo account, you still need a private key to unlock.

            const contract = new LinkContract(web3);

            new Promise(
                (resolve, reject) => {

                    contract.createNew(contractData.ABI, contractData.byteCode, 'Hi there', web3.eth.accounts[0], TRANSACTION_GAS,
                        (err, result) => {

                            if (err) {
                                return alert(err);
                            }

                            if (!result.address) {
                                console.log('mining...');
                                return;
                            }

                            console.log('success');
                            console.log(result);

                            resolve(result);

                        }
                    )

                }
            ).then(
                (newContract) => {

                    // Now get the contract instance with the ABI and the address
                    const greeter = web3.eth.contract(newContract.abi).at(newContract.address);
                    console.log(greeter.greet());


                }
            ).catch(
                (error) => {

                    console.error(error.message);

                }
            );


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