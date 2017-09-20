
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

                <div className="table-responsive">

                    <table className="table">

                        <tbody></tbody>

                    </table>

                </div>


            </div>
        )

    }

}