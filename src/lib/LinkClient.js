// Core library for interactions with the LINK blockchain

import LinkHTTPConnector from './LinkConnector.js';
import  LinkSystemStats from './LinkSystemStats.js';
import LinkSearch from './LinkSearch.js';

export default class LinkClient {

    constructor(nodeUri) {

        if (!nodeUri) {
            throw new Error('No blockchain node specified');
        }

        this._web3 = LinkHTTPConnector.connect(nodeUri);

        if(!this._web3.isConnected()){
            throw new Error('Not connected to network');
        }

        this._systemStats = new LinkSystemStats(this._web3);
        this._linkSearch = new LinkSearch(this._web3);


    }

    getWeb3Instance(){

        return this._web3;

    }

    // Take a hash or number and search for:
    // - An account balance
    // - A transaction
    // - A block
    doSearch(query){

       const results = {
           block : this._linkSearch.getBlock(query),
           balance : this._linkSearch.getBalance(query),
           transaction : this._linkSearch.getTransaction(query)
       };

       return results;

    }

    getSystemStats() {

        const stats = {
            state : this._systemStats.getState(),
            latestBlocks: this._systemStats.getLatestBlocks(),
            peerCount: this._systemStats.getPeerCount(),
            difficulty: this._systemStats.getAverageDifficulty(),
            blockTimes: this._systemStats.getBlockTimes(),
            gasPrice: this._systemStats.getGasPrice(),
            hashRate: this._systemStats.getHashRate()
        };

        return stats;

    }


}