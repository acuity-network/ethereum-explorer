

export default class LinkSystemStats{

    constructor(web3){

        this._web3 = web3;

    }

    // Function will determine the state of the system: 'synced' or 'synchronising'.
    // It is necessary to call this function before any of the others that require block calculations
    // as web3.eth.blockNumber (latest block) will be zero if the node is syncing (in that case use the
    // current block as the latest block).
    getState(){

        const that = this;

        return new Promise(
            (resolve, reject)=>{

                that._web3.eth.getSyncing(
                    (error, result)=>{

                        if(error) return reject(error);

                        if(result){  // Still syncing

                            this._syncing = true;
                            this._latestBlockNumber = result.currentBlock;

                            return resolve('synchronising');
                        }

                        this._syncing = false;

                        // Synchronised. Need to get the latest block number.
                        that._web3.eth.getBlockNumber(
                            (err, blockNumber)=>{

                                if(err) return reject(err);

                                this._latestBlockNumber = blockNumber;
                                resolve('synchronised');

                            }
                        )

                    }
                )

            }
        );

    }

    getBlock(blockID){

        return new Promise(
            (resolve, reject)=>{

                this._web3.eth.getBlock(blockID,
                    (error, block)=>{

                        if(error) return reject(error);

                        resolve(block);

                    }
                )

            }
        )

    }

    getLatestBlocks(blocksToRetrieve = 9){

        if(typeof this._syncing === 'undefined'){
            throw new Error('Must call system state to get latest blocks');
        }

        let promises = [];

        for(let i = this._latestBlockNumber - blocksToRetrieve; i <= this._latestBlockNumber; i++ ){

            promises.push(this.getBlock(i));

        }

        return new Promise(
            (resolve, reject)=>{

                Promise.all(promises).then(
                    (latestBlocks)=>{

                        resolve(latestBlocks);

                    }
                ).catch(
                    (error)=>{

                        reject(error);

                    }
                );

            }
        );

    }

    setLatestBlocks(blocks){

        this._latestBlocks = blocks;

    }

    getBlockTimes(latestBlocks = null){

        if(latestBlocks){
            this._latestBlocks = latestBlocks;
        }

        if(!this._latestBlocks || !this._latestBlocks.length){
            throw new Error('Must retrieve latest blocks to determine block times');
        }

        let blockTimes = [];

        // Get individual block times at the same time as we figure out the average
        this._totalTime = this._latestBlocks.reduce(
            (total, block, index)=>{

                let blockTime = 0;

                if(index !== 0){

                    blockTime = this._latestBlocks[index].timestamp - this._latestBlocks[index - 1].timestamp;
                    blockTimes.push(blockTime);

                }

                return  total + blockTime;

            }, 0);

        this._averageTime = this._totalTime / this._latestBlocks.length;

        return {
            blockTimes : blockTimes,
            average : this._averageTime
        }


    }

    getAverageDifficulty(latestBlocks = null){

        if(latestBlocks){
            this._latestBlocks = latestBlocks.filter((block)=> block && block.difficulty );
        }

        if(!this._latestBlocks || !this._latestBlocks.length){
            throw new Error('Must retrieve latest blocks to determine difficulty');
        }

        this._difficultySum = this._latestBlocks.reduce(
            (total, block)=>{

                return  total + parseInt(block.difficulty.toString());

            }, 0);

        this._averageDifficulty = (this._difficultySum / this._latestBlocks.length);
        return this._averageDifficulty;

    }

    getPeerCount(){

        return new Promise(
            (resolve, reject)=>{

                this._web3.net.getPeerCount(
                    (error, peerCount)=>{

                        if(error) return reject(error);

                        resolve(peerCount);

                    }
                )

            }
        );

    }

    getSync(){

        return this._web3.eth.syncing;

    }

    getGasPrice(){

        return new Promise(
            (resolve, reject)=>{

                this._web3.eth.getGasPrice(
                    (error, gasPrice)=>{

                        if(error) return reject(error);

                        // Price in gwei
                        resolve(parseInt(gasPrice.toString()) / 1000000000);

                    }
                )

            }
        );

    }

    getHashRate(){

        if(!this._difficultySum || !this._totalTime){
            throw new Error('Need difficulty and block time to calculate hashrate');
        }

        return (this._difficultySum / this._totalTime);

    }

}