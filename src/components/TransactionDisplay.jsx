
import React from 'react';

export default class TransactionDisplay extends React.Component{

    constructor(props){

        super(props);

        console.log(this.props.transaction);

    }

    render(){

        return(
            <div className="transaction-display col-md-6 col-md-offset-3">

                <h2 className="text-center">Transaction Information</h2>

                <div className="transaction-from-to">

                    <div className="text-center">

                        <label className="transaction-from-to-label">from</label>
                        <a href className="transaction-from-to-value">{this.props.transaction.from}</a>

                    </div>

                    <div className="text-center">

                        <label className="transaction-from-to-label">to</label>
                        <a href className="transaction-from-to-value">{this.props.transaction.from}</a>

                    </div>

                </div>

                <table className="table">

                    <tbody>

                    <tr>
                        <td><label>Block number</label></td><td>{this.props.transaction.blockNumber}</td>
                    </tr>

                    <tr>
                        <td><label>Value</label></td><td>{this.props.transaction.value.toString()}</td>
                    </tr>

                    <tr>
                        <td><label>Gas price</label></td><td>{this.props.transaction.gasPrice.toString()}</td>
                    </tr>

                    <tr>
                        <td><label></label></td><td></td>
                    </tr>

                    <tr>
                        <td><label></label></td><td></td>
                    </tr>

                    <tr>
                        <td><label></label></td><td></td>
                    </tr>

                    <tr>
                        <td></td><td></td>
                    </tr>

                    </tbody>

                </table>

            </div>
        )

    }

}