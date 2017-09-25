
// Search functions for the block chain

export default class LinkSearch{

    constructor(web3){

        this._web3 = web3;

    }

    getBlock(hashOrNumber){

        return new Promise(
            (resolve, reject)=>{

                this._web3.eth.getBlock(hashOrNumber, true,
                    (error, block)=>{

                        if(error || !block) return resolve(null);

                        resolve(block);

                    }
                )

            }
        );

    }

    getTransaction(hash){

        return new Promise(
            (resolve, reject)=>{

                if(hash.length < 64) return resolve(null);

                this._web3.eth.getTransaction(hash,
                    (error, transaction)=>{

                        if(error || !transaction) return resolve(null);

                        resolve(transaction);

                    }
                )

            }
        )

    }

    getBalance(accountHash){

        return new Promise(
            (resolve, reject)=>{

                if(!this._web3.isAddress(accountHash)){
                    return resolve(null);
                }

                this._web3.eth.getBalance(accountHash,
                    (error, balance)=>{

                        if(error) return resolve(null);

                        // Balance is returned as big number.
                        const newBalance = this._web3.fromWei(balance, "ether");
                        resolve(newBalance.toString(10));

                    }
                )

            }
        );


    }


}