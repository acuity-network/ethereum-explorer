
import React from 'react';

import LinkContract from '../lib/LinkContract.js';

// Ethereum Explorer home page - displays system stats

export default class Demo extends React.Component {

    constructor(props) {

        super(props);

        const web3 = this.props.linkClient.getWeb3Instance();

        const contractData = {
            ABI: [{"constant":false,"inputs":[],"name":"kill","outputs":[],"payable":false,"type":"function"},{"inputs":[],"payable":false,"type":"constructor"}],
            byteCode : '0x6060604052341561000f57600080fd5b5b336000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505b5b61010c806100616000396000f30060606040526000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806341c0e1b514603d575b600080fd5b3415604757600080fd5b604d604f565b005b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141560dd576000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16ff5b5b5600a165627a7a72305820bc48462adefdde92681ae81f5209019cb834b97b474396c1865471eeb9999e980029'
        };

        try{

            web3.personal.unlockAccount(web3.eth.accounts[0], 'password'); // Demo account, you still need a private key to unlock.

            const contract = new LinkContract(web3);

            const contractHandle = contract.createNew(contractData.ABI, contractData.byteCode, 'Hi there', web3.eth.accounts[0], 300000,
                (result)=>{

                    if(!result.address){
                        return;
                    }

                    console.log('success');
                    console.log(result);

                }
            )
        }



        catch(err){

            alert(err.message);

        }



        /*var solContract = web3.eth.contract([{"constant":false,"inputs":[],"name":"kill","outputs":[],"payable":false,"type":"function"},{"inputs":[],"payable":false,"type":"constructor"}]);
        var greeter = solContract.new(
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

                try{

                    console.log('Code: ' + web3.eth.getCode(contract.address));

                }catch(err){

                    console.log(err.message);

                }

            })*/
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