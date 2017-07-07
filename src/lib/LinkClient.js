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

        this._systemStats = new LinkSystemStats(this._web3);
        this._linkSearch = new LinkSearch(this._web3);


    }

    // Take a hash and search for:
    // An account balance
    // A transaction
    // A block
    doSearch(query){

       this._linkSearch


    }

    getSystemStats() {

        const stats = {
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