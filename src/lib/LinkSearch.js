
// Search functions for the block chain

export default class LinkSearch{

    constructor(web3){

        this._web3 = web3;

    }

    getBlock(hashOrNumber){

        let block = {};

        try{

            block = this._web3.eth.getBlock(hashOrNumber);

        }catch(err){

            return null;

        }

    }

    getTransaction(hash){

        if(hash.length < 64 || !this._web3.isAddress(hash)){
            return;
        }

        return this._web3.eth.getTransaction(hash);

    }

    getBalance(accountHash){

        if(!this._web3.isAddress(accountHash)){
            return;
        }

        // Balance is returned as big number.
        const balance = this._web3.fromWei(this._web3.eth.getBalance(accountHash), "ether");
        return balance.toString();

    }


}