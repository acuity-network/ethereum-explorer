
import React from 'react';

import LinkContract from '../lib/LinkContract.js';

// Ethereum Explorer home page - displays system stats

export default class Demo extends React.Component {

    constructor(props) {

        super(props);

        const web3 = this.props.linkClient.getWeb3Instance(),
            TRANSACTION_GAS = 3000000;  // The transaction will fail silently if there is not enough gas.

        const contractData = {
            ABI: [{"constant":false,"inputs":[],"name":"kill","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"greet","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"inputs":[{"name":"_greeting","type":"string"}],"payable":false,"type":"constructor"}],
            byteCode : '0x6060604052341561000f57600080fd5b6040516103a83803806103a8833981016040528080518201919050505b5b336000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505b806001908051906020019061008492919061008c565b505b50610131565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106100cd57805160ff19168380011785556100fb565b828001600101855582156100fb579182015b828111156100fa5782518255916020019190600101906100df565b5b509050610108919061010c565b5090565b61012e91905b8082111561012a576000816000905550600101610112565b5090565b90565b610268806101406000396000f30060606040526000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806341c0e1b514610049578063cfae32171461005e575b600080fd5b341561005457600080fd5b61005c6100ed565b005b341561006957600080fd5b61007161017f565b6040518080602001828103825283818151815260200191508051906020019080838360005b838110156100b25780820151818401525b602081019050610096565b50505050905090810190601f1680156100df5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141561017c576000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16ff5b5b565b610187610228565b60018054600181600116156101000203166002900480601f01602080910402602001604051908101604052809291908181526020018280546001816001161561010002031660029004801561021d5780601f106101f25761010080835404028352916020019161021d565b820191906000526020600020905b81548152906001019060200180831161020057829003601f168201915b505050505090505b90565b6020604051908101604052806000815250905600a165627a7a723058203118a1e2a25424d0f92e49d5bedde9a3eb1e236e186bb89bcfc546d1bcb514730029'
        };

        try{

            web3.personal.unlockAccount(web3.eth.accounts[0], 'password'); // Demo account, you still need a private key to unlock.

            const contract = new LinkContract(web3);

            new Promise(
                (resolve, reject)=>{

                    contract.createNew(contractData.ABI, contractData.byteCode, 'Hi there', web3.eth.accounts[0], TRANSACTION_GAS,
                        (err, result)=>{

                            if(err){
                                return alert(err);
                            }

                            if(!result.address){
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
                (newContract)=>{

                    // Now get the contract instance with the ABI and the address
                    const greeter = web3.eth.contract(newContract.abi).at(newContract.address);
                    console.log(greeter.greet());


                }
            ).catch(
                (error)=>{

                    console.error(error.message);

                }
            );


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