import React from 'react';

import {Bar, defaults as chartDefaults} from 'react-chartjs-2';

import BigNumberDisplay from '../components/BigNumberDisplay.jsx';

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
                        display: false
                    }
                }],
                yAxes: [{
                    display: false,
                    gridLines: {
                        display: false
                    }
                }]
            }
        };

        this.state = {};

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
            labels: Array.apply(null, Array(10)).map(String.prototype.valueOf, ""),
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
        blockTimeChartData.labels = Array.apply(null, Array(9)).map(String.prototype.valueOf, "");
        blockTimeChartData.datasets[0].data = systemStats.blockTimes.blockTimes;

        return {
            difficultyChart: difficultyChartData,
            blockTimeChart: blockTimeChartData
        };

    }

    getStats() {

        let systemStats = {},
            charts = {};

        return new Promise(
            (resolve, reject) => {

                this._link.getSystemStats().then(
                    (stats) => {

                        systemStats = stats;
                        charts = this.getChartData(systemStats);
                        this.setState({systemStats: systemStats, charts: charts});
                        resolve();

                    },
                    (error) => {

                        reject(error);

                    }
                );

            }
        );

    }

    watchNetwork() {

        // Watch the network for new blocks. Add the new block to the list of
        // latest blocks when it's created and update the stats + UI.
        this.watchFilter = this._link.watchNetwork(
            (blockHash) => {

                this._link.getBlock(blockHash).then(
                    (newBlock) => {

                        let latestBlocks = this.state.systemStats.latestBlocks;

                        // Only allow ten blocks in the list
                        latestBlocks.shift();
                        latestBlocks.push(newBlock);

                        return latestBlocks;

                    }
                ).catch(
                    (error) => {

                        alert(error.message);

                    }
                ).then(
                    (latestBlocks) => {

                        this._link.updateBlocks(latestBlocks).then(
                            (stats) => {

                                // Update the stats
                                const charts = this.getChartData(stats);

                                // Update the UI
                                this.setState({systemStats: stats, charts: charts});

                            }
                        )

                    }
                )
            },
            (error) => {

                console.error(error.message);

            }
        );

    };

    componentDidMount() {

        const that = this;

        // Get initial ten blocks
        this.getStats().then(
            () => {

                this.watchNetwork();

            }
        )

    }

    componentWillUnmount(){

        // Stop watch when the page is changed.
        this.watchFilter.stopWatching();

    }

    render() {

        if (!this.state.systemStats) {

            return <div className="home-page content-page">
                <div className="alert alert-info">Please wait...</div>
            </div>

        }

        return (

            <div ref="homeRef" className="home-page content-page">

                <h3 className="content-heading">Network stats</h3>

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
                    <span className="statValue">{ Number(this.state.systemStats.gasPrice).toFixed(2) } Gwei</span>

                </div>

                <div className="col-md-3 col-sm-6 col-xs-12 stats-block">

                    <label>Ave. difficulty</label>
                    <span className="statValue">
                        <BigNumberDisplay number={this.state.systemStats.difficulty} unit="H" />
                    </span>

                </div>

                <div className="col-md-3 col-sm-6 col-xs-12 stats-block">

                    <label>Hashrate</label>
                    <span className="statValue">
                        <BigNumberDisplay number={this.state.systemStats.hashRate} unit="H/s" />
                    </span>

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