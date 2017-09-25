// Core library for interactions with Ethereum blockchains

import LinkHTTPConnector from './LinkConnector.js';
import LinkSystemStats from './LinkSystemStats.js';
import LinkSearch from './LinkSearch.js';


export default class LinkClient {

    // Connect to a network via Metamask (https://metamask.io/) or explicit URI stored in localstorage.
    // Explicit URI overrides Metamask.
    constructor(nodeURI = null) {

        this._web3 = null;

        // If a node URI has been specified, it will be stored in localstorage
        const nodeUri = nodeURI || localStorage.getItem('link-node-uri');

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

        return filter;

    }

    // Take a hash or number and search for:
    // - An account balance
    // - A transaction
    // - A block
    doSearch(query){

        const promises = [
            this._linkSearch.getBlock(query),
            this._linkSearch.getBalance(query),
            this._linkSearch.getTransaction(query)
        ];

        return new Promise(
            (resolve, reject)=>{

                Promise.all(promises).then(
                    (results)=>{

                        resolve(
                            {
                                block : results[0],
                                account : results[1],
                                transaction : results[2]
                            }
                        )

                    }
                ).catch(
                    (error)=>{

                        reject(error);

                    }
                )


            }
        )

    }

    // Numerous asynchronous calls to various APIs. getLatestBlocks will initially
    // make an asynchronous call to retrieve each individual block (I'm not aware of any other way
    // of doing that with the web3 api). You can avoid that if you supply an existing list of
    // latestBlocks via the param.
    getSystemStats(latestBlocks = null) {

        // Must get system state before everything else.
        return new Promise(
            (resolve, reject)=>{

                let stats = {};

                this._systemStats.getState().then(
                    (state)=>{

                        stats.state = state;

                        let promises = [
                            this._systemStats.getPeerCount(),
                            this._systemStats.getGasPrice()
                        ];

                        if(!latestBlocks){
                            promises.push(this._systemStats.getLatestBlocks());
                        }

                        Promise.all(promises).then(
                            (results)=>{

                                stats.peerCount = results[0];
                                stats.gasPrice = results[1];

                                stats.latestBlocks = latestBlocks || results[2];

                                stats.difficulty = this._systemStats.getAverageDifficulty(stats.latestBlocks);
                                stats.blockTimes = this._systemStats.getBlockTimes(stats.latestBlocks);
                                stats.hashRate = this._systemStats.getHashRate();

                                resolve(stats);

                            }
                        ).catch(
                            (error)=>{

                                console.error(error.message);
                                reject(error);

                            }
                        );

                    }
                );

            }
        )
    }

    // Add a new block to the latestBlocks list and update the stats
    // Update the block list and stats with a new block
    updateBlocks(latestBlocks){

        this._systemStats.setLatestBlocks(latestBlocks);

        // Returns promise
        return this.getSystemStats(latestBlocks);

    }

    getBlocks(){

        return new Promise(
            (resolve, reject)=>{

                this._systemStats.getState().then(
                    ()=>{

                        this._systemStats.getLatestBlocks().then(
                            (latestBlocks)=>{

                                resolve(latestBlocks);

                            }
                        )

                    }
                )

            }
        );




    }

    getBlock(hashOrNumber){

        // Returns promise
        return this._linkSearch.getBlock(hashOrNumber);

    }

    getTransaction(transactionHash){

        // Returns promise
        return this._linkSearch.getTransaction(transactionHash);

    }

    getAccountBalance(accountHash){

        // Returns promise
        return this._linkSearch.getBalance(accountHash);

    }

}