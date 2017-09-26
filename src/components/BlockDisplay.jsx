import React from 'react';
import {Link} from 'react-router-dom';

class TransactionsList extends React.Component {

    constructor(props) {

        super(props);

        // The web3 getBlock api is not reliably returning populated blocks.
        this.transactions = this.props.transactions.map(
            (transaction)=>{

                if(typeof transaction === 'string'){
                    return transaction;
                }

                return transaction.hash;

            }
        )


    }

    render() {

        if(!this.props.transactions || !this.props.transactions.length){
            return null;
        }

        return (

            <div className="transactions-list row">

                <div className=" col-md-8 col-md-offset-2 table-responsive">

                    <h4>Transaction list</h4>

                    <table className="table">

                        <tbody>

                        {
                            this.transactions.map(
                                (transaction, i) =>
                                    <tr key={i}>
                                        <td className="text-center">
                                            <Link to={ '/transaction/' + transaction}>
                                                <span className="font-monospace">{transaction}</span>
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

                <h3 className="content-heading">Block Information</h3>

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
                                    <span className="block-display-value font-monospace">{this.props.block.hash}</span>
                                </td>
                            </tr>

                            <tr>
                                <td>
                                    <label>parent hash</label>
                                </td>
                                <td>

                                    <Link to={'/block/' + this.props.block.parentHash}>
                                        <span className="block-display-value font-monospace">{this.props.block.parentHash}</span>
                                    </Link>

                                </td>
                            </tr>

                            <tr>
                                <td>
                                    <label>nonce</label>
                                </td>
                                <td>
                                    <span className="block-display-value font-monospace">{this.props.block.nonce}</span>
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
                                        <span className="block-display-value font-monospace">{this.props.block.miner}</span>
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

                { (this.props.block.transactions.length > 0) &&
                <TransactionsList transactions={this.props.block.transactions}/> }

            </div>
        )

    }

}