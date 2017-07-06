import React from 'react';
import {config} from '../config.js';
import LinkClient from '../lib/LinkClient';

import {Bar, defaults as chartDefaults} from 'react-chartjs-2';

// Ethereum Explorer home page - displays system stats

export default class Home extends React.Component {

    constructor(props) {

        super(props);
        this._link = new LinkClient(config.node_uri);

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

        const systemStats = this._link.getSystemStats(),
            charts = this.getChartData(systemStats);

        if (!this.state || !this.state.systemStats) {
            this.state = {systemStats: systemStats, charts: charts};
            return;
        }

        this.setState({systemStats: systemStats, charts: charts});

    }

    componentDidMount() {

        this.getStats();

        this._difficultyChart = this.refs.difficultyChart.chart_instance; // Get ref to difficulty chart

        // Poll the node for new data. TODO: This can be done with a callback.
        this.timer = setInterval(
            () => {

                this.getStats();

            }, 2000
        )

    }

    componentWillUnmount() {

        clearInterval(this.timer);

    }

    render() {

        return (

            <div className="home-page content-page">

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

                <div className="col-md-3 col-sm-6 col-xs-12 stats-chart">

                    <label>Difficulty (MH)</label>

                    <Bar ref="difficultyChart" options={this.chartOptions} data={this.state.charts.difficultyChart}/>

                    <div className="clearfix"></div>

                </div>

                <div className="col-md-3 col-sm-6 col-xs-12 stats-chart">

                    <label>Block time (s)</label>

                    <Bar ref="difficultyChart" options={this.chartOptions} data={this.state.charts.blockTimeChart}/>

                    <div className="clearfix"></div>

                </div>


                <div className="clearfix"></div>

            </div>

        )

    }

}