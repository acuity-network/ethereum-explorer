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

    // Watch the network for new blocks
    watchNetwork(callback, errorCallback){

        const filter = this._web3.eth.filter('latest'),
            that = this;

        filter.watch(function(error, result){

            if(error){
                return errorCallback(error);
            }

            callback(result);

        });

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

    // Add a new block to the latestBlocks list and update the stats
    // Update the block list and stats with a new block
    updateBlocks(latestBlocks){

        this._systemStats.setLatestBlocks(latestBlocks);

        return {

            state : this._systemStats.getState(),
            latestBlocks: latestBlocks,
            peerCount: this._systemStats.getPeerCount(),
            difficulty: this._systemStats.getAverageDifficulty(),
            blockTimes: this._systemStats.getBlockTimes(),
            gasPrice: this._systemStats.getGasPrice(),
            hashRate: this._systemStats.getHashRate()

        }

    }

    getBlocks(){

        this._systemStats.getState();
        return this._systemStats.getLatestBlocks();

    }

    getBlock(hashOrNumber){

        return this._linkSearch.getBlock(hashOrNumber);

    }

    getTransactions(){



    }

    getTransaction(transactionHash){

        return this._linkSearch.getTransaction(transactionHash);

    }


}