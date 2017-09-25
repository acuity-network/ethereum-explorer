
import React from 'react';
import {Link} from 'react-router-dom';

export default class TransactionDisplay extends React.Component {

    constructor(props) {

        super(props);

        console.log(this.props);

    }

    render() {

        return (
            <div className="transaction-display">

                <h3>Transaction Information</h3>

                <div className="col-md-6 col-md-offset-3">

                    <table className="table">

                        <tbody>

                        <tr>
                            <td colSpan="2" className="text-center">
                                <label className="transaction-from-to-label">from</label>
                                <Link to={'/account/' + this.props.transaction.from}>
                                    <span className="font-monospace">{this.props.transaction.from}</span>
                                </Link>
                            </td>
                        </tr>

                        <tr>
                            <td colSpan="2" className="text-center">
                                <label className="transaction-from-to-label">to</label>
                                <Link to={'/account/' + this.props.transaction.to}>
                                    <span className="font-monospace">{this.props.transaction.to}</span>
                                </Link>
                            </td>
                        </tr>

                        <tr>
                            <td><label>Block number</label></td>
                            <td>
                                <Link to={'/block/' + this.props.transaction.blockNumber}>{this.props.transaction.blockNumber}</Link>
                            </td>
                        </tr>

                        <tr>
                            <td><label>Value</label></td>
                            <td>{this.props.transaction.value.toString(10)}</td>
                        </tr>

                        <tr>
                            <td><label>Gas price</label></td>
                            <td>{this.props.transaction.gasPrice.toString(10)}</td>
                        </tr>

                        </tbody>

                    </table>

                </div>

            </div>
        )

    }

}