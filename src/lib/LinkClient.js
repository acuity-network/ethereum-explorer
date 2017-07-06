// Core library for interactions with the LINK blockchain

import LinkHTTPConnector from './LinkConnector.js';
import  LinkSystemStats from './LinkSystemStats';

export default class LinkClient {

    constructor(nodeUri) {

        if (!nodeUri) {
            throw new Error('No blockchain node specified');
        }

        this._web3 = LinkHTTPConnector.connect(nodeUri);
        this._systemStats = new LinkSystemStats(this._web3);


    }

    getSystemStats() {

        let stats = {};

        try {

            stats = {
                latestBlocks: this._systemStats.getLatestBlocks(),
                peerCount: this._systemStats.getPeerCount(),
                difficulty: this._systemStats.getAverageDifficulty(),
                blockTimes: this._systemStats.getBlockTimes(),
                gasPrice: this._systemStats.getGasPrice(),
                hashRate: this._systemStats.getHashRate()
            };

        } catch (err) {

            alert('Sorry there was an error with this request: ' + err.message);

        }

        return stats;

    }


}