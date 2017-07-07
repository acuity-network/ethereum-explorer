
// Search functions for the block chain

export default class LinkSearch{

    constructor(web3){

        this._web3 = web3;

    }

    getBlock(hashOrNumber){

        return this._web3.eth.getBlock(hashOrNumber);

    }

    getTransaction(hash){

        return web3.eth.getTransaction(hash);

    }

    getBalance(accountHash){

        web3.fromWei(web3.eth.getBalance(accountHash));

    }


}