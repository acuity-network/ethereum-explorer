// Core library for interactions with Ethereum blockchains

import LinkHTTPConnector from './LinkConnector.js';
import  LinkSystemStats from './LinkSystemStats.js';
import LinkSearch from './LinkSearch.js';


export default class LinkClient {

    // Connect to a network via Metamask (https://metamask.io/) or explicit URI stored in localstorage.
    // Explicit URI overrides Metamask.
    constructor() {

        this._web3 = null;

        // If a node URI has been specified, it will be stored in localstorage
        const nodeUri = localStorage.getItem('link-node-uri');

        if (nodeUri) {

            this._web3 = LinkHTTPConnector.connect(nodeUri);

        // No direct connection specified. Try metamask.
        }else if( typeof web3 !== 'undefined'){

            this._web3 = web3;

        }

        if(!this._web3 || !this._web3.isConnected()){
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

        const promises = [
            this._systemStats.getState()
        ];

        Promise.all(promises).then(
            (...results)=>{


                console.log(...results);

                return {};

            }
        ).catch(
            (error)=>{

                throw new Error(error);

            }
        );


        // const stats = {
        //     state : this._systemStats.getState(),
        //     latestBlocks: this._systemStats.getLatestBlocks(),
        //     peerCount: this._systemStats.getPeerCount(),
        //     difficulty: this._systemStats.getAverageDifficulty(),
        //     blockTimes: this._systemStats.getBlockTimes(),
        //     gasPrice: this._systemStats.getGasPrice(),
        //     hashRate: this._systemStats.getHashRate()
        // };

        // return stats;

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

    getTransaction(transactionHash){

        return this._linkSearch.getTransaction(transactionHash);

    }

    getAccountBalance(accountHash){

        return this._linkSearch.getBalance(accountHash);

    }

}