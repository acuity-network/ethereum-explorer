import React from 'react';

export default class TransactionDisplay extends React.Component {

    constructor(props) {

        super(props);

        console.log(this.props.transaction);

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
                                <a href className="transaction-from-to-value">{this.props.transaction.from}</a>
                            </td>
                        </tr>

                        <tr>
                            <td colSpan="2" className="text-center">
                                <label className="transaction-from-to-label">to</label>
                                <a href className="transaction-from-to-value">{this.props.transaction.to}</a>
                            </td>
                        </tr>

                        <tr>
                            <td><label>Block number</label></td>
                            <td>{this.props.transaction.blockNumber}</td>
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