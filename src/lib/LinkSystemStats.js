

export default class LinkSystemStats{

    constructor(web3){

        this._web3 = web3;

    }

    getLatestBlocks(){

        this._latestBlocks = [];

        const latestBlockNumber = this._web3.eth.blockNumber;

        for(let i = latestBlockNumber - 9; i <= latestBlockNumber; i++ ){

            this._latestBlocks.push(this._web3.eth.getBlock(i));

        }

        return this._latestBlocks;

    }

    getBlockTimes(){

        if(!this._latestBlocks || !this._latestBlocks.length){
            throw new Error('Must retrieve latest blocks to determine block times');
        }

        let blockTimes = [];

        // Get individual block times at the same time we figure out the average
        const totalTime = this._latestBlocks.reduce(
            (total, block, index)=>{

                if(index !== 0){

                    blockTimes.push(this._latestBlocks[index].timestamp - this._latestBlocks[index - 1].timestamp)

                }

                return  total + block.timestamp;

            }, 0);

        const averageTime = totalTime / this._latestBlocks.length;

        return {
            blockTimes : blockTimes,
            average : averageTime
        }


    }

    getAverageDifficulty(){

        if(!this._latestBlocks || !this._latestBlocks.length){
            throw new Error('Must retrieve latest blocks to determine difficulty');
        }

        const difficultySum = this._latestBlocks.reduce(
            (total, block)=>{

                return  total + parseInt(block.difficulty.toString());

            }, 0);

        return ((difficultySum / this._latestBlocks.length) / 1000000).toFixed(2);

    }

    getPeerCount(){

        return this._web3.net.peerCount;

    }

    getSync(){

        return this._web3.eth.syncing;

    }

    getGasPrice(){

        const wei = this._web3.eth.gasPrice.toString();
        return wei / 1000000000; // Return value in Gwei.

    }

    getHashRate(){  // Applies only to miner on the specific node

        return this._web3.eth.hashrate.toString()

    }

}