
import React from 'react';

import {Bar, defaults as chartDefaults} from 'react-chartjs-2';

// Ethereum Explorer home page - displays system stats

export default class Home extends React.Component {

    constructor(props) {

        super(props);

        this._link = this.props.linkClient;

        // Remove grid and labels on charts
        this.chartOptions = {
            legend: {display: false},
            scales: {
                xAxes: [{
                    gridLines: {
                        display:false
                    }
                }],
                yAxes: [{
                    display : false,
                    gridLines: {
                        display:false
                    }
                }]
            }
        };

        this.getStats();

    }

    // Build props object for the difficulty and block time bar charts
    getChartData(systemStats) {

        let difficultyData = [];

        systemStats.latestBlocks.forEach(
            (block) => {

                difficultyData.push(block.difficulty.toString(10));

            }
        );

        let difficultyChartData = {
            labels: Array.apply(null, Array(10)).map(String.prototype.valueOf,""),
            datasets: [
                {
                    label: 'Difficulty',
                    backgroundColor: '#557EBF',
                    borderColor: '#557EBF',
                    borderWidth: 1,
                    hoverBackgroundColor: '#9153C1',
                    hoverBorderColor: '#9153C1',
                    data: difficultyData
                }
            ]
        };

        // Just clone the chart options for now.
        let blockTimeChartData = JSON.parse(JSON.stringify(difficultyChartData));

        blockTimeChartData.datasets[0].label = 'Block time';

        // We only know the block times for the last 9 blocks, therefore there are only 9 labels.
        blockTimeChartData.labels = Array.apply(null, Array(9)).map(String.prototype.valueOf,"");
        blockTimeChartData.datasets[0].data = systemStats.blockTimes.blockTimes;

        return {
            difficultyChart : difficultyChartData,
            blockTimeChart : blockTimeChartData
        };

    }

    getStats() {

        let systemStats = {};

        try{

            systemStats = this._link.getSystemStats();

        }catch(err){

            alert('Sorry but there was an error with this request: ' + err.message);
            return;
        }

        const charts = this.getChartData(systemStats);

        if (!this.state || !this.state.systemStats) {
            this.state = {systemStats: systemStats, charts: charts};
            return;
        }

        this.setState({systemStats: systemStats, charts: charts});

    }

    componentDidMount() {

        // Get initial ten blocks
        this.getStats();

        // Watch the network for new blocks. Add the new block to the list of
        // latest blocks when it's created.
        this._link.watchNetwork(
            (blockHash)=>{

                // Get the new block
                let newBlock = this._link.getBlock(blockHash),
                    latestBlocks = this.state.systemStats.latestBlocks;

                // Only allow ten blocks in the list
                latestBlocks.shift();
                latestBlocks.push(newBlock);

                const systemStats = this._link.updateBlocks(latestBlocks),
                    charts = this.getChartData(systemStats);

                // Update the UI
                this.setState({systemStats: systemStats, charts: charts});

            },
            (error)=>{

                console.error(error.message);

            }
        );

    }

    render() {

        return (

            <div className="home-page content-page">

                <div className="col-md-3 col-sm-6 col-xs-12 stats-block">

                    <label>Status</label>
                    <span className="statValue">{this.state.systemStats.state}</span>

                </div>

                <div className="col-md-3 col-sm-6 col-xs-12 stats-block">

                    <label>Peers</label>
                    <span className="statValue">{this.state.systemStats.peerCount}</span>

                </div>

                <div className="col-md-3 col-sm-6 col-xs-12 stats-block">

                    <label>Latest Block</label>
                    <span
                        className="statValue">{this.state.systemStats.latestBlocks[this.state.systemStats.latestBlocks.length - 1].number}</span>

                </div>

                <div className="col-md-3 col-sm-6 col-xs-12 stats-block">

                    <label>Gas price</label>
                    <span className="statValue">{this.state.systemStats.gasPrice} Gwei</span>

                </div>

                <div className="col-md-3 col-sm-6 col-xs-12 stats-block">

                    <label>Ave. difficulty</label>
                    <span className="statValue">{this.state.systemStats.difficulty} MH</span>

                </div>

                <div className="col-md-3 col-sm-6 col-xs-12 stats-block">

                    <label>Hashrate</label>
                    <span className="statValue">{this.state.systemStats.hashRate} MH/s</span>

                </div>

                <div className="col-md-3 col-sm-6 col-xs-12 stats-block">

                    <label>Difficulty</label>

                    <Bar ref="difficultyChart" options={this.chartOptions} data={this.state.charts.difficultyChart}/>

                    <div className="clearfix"></div>

                </div>

                <div className="col-md-3 col-sm-6 col-xs-12 stats-block">

                    <label>Block time (s)</label>

                    <Bar ref="difficultyChart" options={this.chartOptions} data={this.state.charts.blockTimeChart}/>

                    <div className="clearfix"></div>

                </div>


                <div className="clearfix"></div>

            </div>

        )

    }

}