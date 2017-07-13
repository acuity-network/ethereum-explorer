

export default class LinkContract{

    constructor(web3){

        this._web3 = web3;

    }

    compileSolidity(soliditySource){

        // Compile contract from *flattened* solidity source.
        return this._web3.compile.solidity(soliditySource);

    }

    // Attempts to add a new contract to the blockchain, returns a handle to the contract
    // instance on success, error message on failure.
    createNew(ABI, compiledCode, constructorArgs = null, paymentAccount, gas, callBack){

        // Create a 'template' of the contract from the ABI.
        const contractTemplate = this._web3.eth.contract(ABI);

        // Now attempt to add the contract to the block chain.
        // - Arguments are passed to the contract constructor via constructorArgs
        // - Adding a contract requires payment for the transaction: an account and a gas limit.

        const contractOptions = {
            from : paymentAccount,
            gas : gas,
            data : compiledCode
        };

       return contractTemplate.new(constructorArgs, contractOptions,
           (err, contractDetails)=>{

                if(err) throw new Error(err.message);

                const newContract = {
                    abi : ABI,
                    address : contractDetails.address,
                    transactionHash : contractDetails.transactionHash
                };

                callBack(newContract);

            }
       );

    }

}