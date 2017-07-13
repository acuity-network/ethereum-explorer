
import React from 'react';

import {Bar, defaults as chartDefaults} from 'react-chartjs-2';

// Ethereum Explorer home page - displays system stats

export default class Demo extends React.Component {

    constructor(props) {

        super(props);

        const web3 = this.props.linkClient.getWeb3Instance();

        console.log('Accounts: ');
        console.log(web3.eth.accounts[0]);

        try{

            web3.personal.unlockAccount(web3.eth.accounts[0], 'mistr4ls');

        }catch(err){

            console.error(err.message);

        }

        var solContract = web3.eth.contract([{"constant":false,"inputs":[],"name":"kill","outputs":[],"payable":false,"type":"function"},{"inputs":[],"payable":false,"type":"constructor"}]);
        var browser_untitled_sol_mortal = solContract.new(
            {
                from: web3.eth.accounts[0],
                data: '0x6060604052341561000f57600080fd5b5b336000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505b5b61010c806100616000396000f30060606040526000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806341c0e1b514603d575b600080fd5b3415604757600080fd5b604d604f565b005b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141560dd576000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16ff5b5b5600a165627a7a723058201e9f42859114ba90cb3fe34b31a02000c128850b9cad5567207dbc8a666916590029',
                gas: '4700000'
            }, function (err, contract){

                if(err){
                    console.error(err.message);
                    return;
                }

                if (typeof contract.address !== 'undefined') {
                    console.log('Contract mined! address: ' + contract.address + ' transactionHash: ' + contract.transactionHash);
                }

            })
    }



    componentDidMount() {


    }


    render() {

        return (

            <div className="home-page content-page">
                This is the demo page
            </div>

        )

    }

}