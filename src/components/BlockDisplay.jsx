import React from 'react';
import {Link} from 'react-router-dom';

class TransactionsList extends React.Component {

    constructor(props) {

        super(props);

    }

    render() {

        return (

            <div className="transactions-list row">

                <div className=" col-md-8 col-md-offset-2 table-responsive">

                    <h4>Transaction list</h4>

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
                                    <span className="block-display-value">{this.props.block.number}</span>
                                </td>
                            </tr>

                            <tr>
                                <td>
                                    <label>hash</label>
                                </td>
                                <td>
                                    <span className="block-display-value">{this.props.block.hash}</span>
                                </td>
                            </tr>

                            <tr>
                                <td>
                                    <label>parent hash</label>
                                </td>
                                <td>

                                    <Link to={'/block/' + this.props.block.parentHash}>
                                        <span className="block-display-value">{this.props.block.parentHash}</span>
                                    </Link>

                                </td>
                            </tr>

                            <tr>
                                <td>
                                    <label>gas limit</label>
                                </td>
                                <td>
                                    <span className="block-display-value">{this.props.block.gasLimit}</span>
                                </td>
                            </tr>

                            <tr>
                                <td>
                                    <label>gas used</label>
                                </td>
                                <td>
                                    <span className="block-display-value">{this.props.block.gasUsed}</span>
                                </td>
                            </tr>

                            <tr>
                                <td>
                                    <label>miner</label>
                                </td>
                                <td>
                                    <Link to={'/account/' + this.props.block.miner}>
                                        <span className="block-display-value">{this.props.block.miner}</span>
                                    </Link>
                                </td>
                            </tr>

                            <tr>
                                <td>
                                    <label>difficulty</label>
                                </td>
                                <td>
                                    <span
                                        className="block-display-value">{this.props.block.difficulty.toString(10)}</span>
                                </td>
                            </tr>

                            <tr>
                                <td>
                                    <label>transactions</label>
                                </td>
                                <td>
                                    <span className="block-display-value">{this.props.block.transactions.length}</span>
                                </td>
                            </tr>

                            <tr>
                                <td>
                                    <label>uncles</label>
                                </td>
                                <td>
                                    <span className="block-display-value">{this.props.block.uncles.length}</span>
                                </td>
                            </tr>

                            </tbody>

                        </table>

                    </div>

                </div>

                { this.props.block.transactions.length &&
                <TransactionsList transactions={this.props.block.transactions}/> }

            </div>
        )

    }

}