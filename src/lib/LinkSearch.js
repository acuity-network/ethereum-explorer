
// Search functions for the block chain

export default class LinkSearch{

    constructor(web3){

        this._web3 = web3;

    }

    getBlock(hashOrNumber){

        return this._web3.eth.getBlock(hashOrNumber);

    }

    getTransaction(hash){

        return this._web3.eth.getTransaction(hash);

    }

    getBalance(accountHash){

        const balance = this._web3.fromWei(this._web3.eth.getBalance(accountHash), "ether");

        return balance.toString();

    }


}