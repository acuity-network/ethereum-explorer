
import React from 'react';
import {Link} from 'react-router-dom';

export default class MultiTransactionDisplay extends React.Component{

    constructor(props){

        super(props);

        // Reverse order of transactions
        const transactions = this.props.transactions.reverse();

        this.state = {
            transactions : this.props.transactions
        }

    }

    render(){


        return(

            <div className="multi-transaction-display col-md-8 col-md-offset-2">

                <h2>Latest Transactions Information</h2>

                <div className="table-responsive">

                    <table className="table table-striped">

                        <thead>
                        <tr>
                            <th>Number</th>
                            <th>Difficulty</th>
                            <th>Gas Limit</th>
                            <th>Gas Used</th>
                            <th>Uncles</th>
                            <th>Transactions</th>
                        </tr>
                        </thead>

                        <tbody>

                        </tbody>

                    </table>

                </div>

            </div>

        )
    }

}