import React from 'react';
import {Link} from 'react-router-dom';

class TransactionsList extends React.Component {

    constructor(props) {

        super(props);

        console.log(this.props.transactions);

    }

    render() {

        return (

            <div className="transactions-list row">

                <h4>Transaction list</h4>

                <div className=" col-md-8 col-md-offset-2 table-responsive">

                    <table className="table">

                        <tbody>

                        {
                            this.props.transactions.map(
                                (transaction, i) =>
                                    <tr key={i}>
                                        <td>
                                            <Link to={ '/transaction/' + transaction}>
                                                {transaction}
                                            </Link>
                                        </td>
                                    </tr>
                            )
                        }

                        </tbody>

                    </table>

                </div>

            </div>

        )

    }

}

export default class BlockDisplay extends React.Component {

    constructor(props) {

        super(props);

        this.state = {
            block: this.props.block
        }

    }

    render() {

        return (

            <div className="block-display">

                <h3>Block Information</h3>

                <div className="row">

                    <div className="col-md-8 col-md-offset-2 table-responsive">

                        <table className="table">

                            <tbody>

                            <tr>
                                <td>
                                    <label>number</label>
                                </td>
                                <td>
                                    <span className="block-display-value">{this.state.block.number}</span>
                                </td>
                            </tr>

                            <tr>
                                <td>
                                    <label>hash</label>
                                </td>
                                <td>
                                    <span className="block-display-value">{this.state.block.hash}</span>
                                </td>
                            </tr>

                            <tr>
                                <td>
                                    <label>parent hash</label>
                                </td>
                                <td>

                                    <Link to={'/block/' + this.state.block.parentHash}>
                                        <span className="block-display-value">{this.state.block.parentHash}</span>
                                    </Link>

                                </td>
                            </tr>

                            <tr>
                                <td>
                                    <label>gas limit</label>
                                </td>
                                <td>
                                    <span className="block-display-value">{this.state.block.gasLimit}</span>
                                </td>
                            </tr>

                            <tr>
                                <td>
                                    <label>gas used</label>
                                </td>
                                <td>
                                    <span className="block-display-value">{this.state.block.gasUsed}</span>
                                </td>
                            </tr>

                            <tr>
                                <td>
                                    <label>miner</label>
                                </td>
                                <td>
                                    <span className="block-display-value">{this.state.block.miner}</span>
                                </td>
                            </tr>

                            <tr>
                                <td>
                                    <label>difficulty</label>
                                </td>
                                <td>
                                    <span
                                        className="block-display-value">{this.state.block.difficulty.toString(10)}</span>
                                </td>
                            </tr>

                            <tr>
                                <td>
                                    <label>transactions</label>
                                </td>
                                <td>
                                    <span className="block-display-value">{this.state.block.transactions.length}</span>
                                </td>
                            </tr>

                            <tr>
                                <td>
                                    <label>uncles</label>
                                </td>
                                <td>
                                    <span className="block-display-value">{this.state.block.uncles.length}</span>
                                </td>
                            </tr>

                            </tbody>

                        </table>

                    </div>

                </div>

                { this.state.block.transactions.length &&
                <TransactionsList transactions={this.state.block.transactions}/> }


            </div>
        )

    }

}