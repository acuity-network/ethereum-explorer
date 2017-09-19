import React from 'react';

import TransactionDisplay from '../components/TransactionDisplay.jsx';
import MultiTransactionDisplay from '../components/MultiTransactionDisplay.jsx';

export default class Transaction extends React.Component {

    constructor(props) {

        super(props);

        this._link = this.props.linkClient;

        this.state = {
            showMulti : false
        }

    }

    componentDidMount() {

        // If a second parameter is supplied to the URL, we're looking for a specific transaction.
        // If not, show the last ten transactions.
        if (this.props.match.params && this.props.match.params.transactionid) {

            const transactionID = this.props.match.params.transactionid;

            // Search query has been defined as part of the url. Do search.
            const transaction = this._link.getTransaction(transactionID);
            this.setState(
                {
                    transactionID : transactionID,
                    transaction: transaction,
                    showMulti : false
                }
            );

        } else {

            // Get last ten transactions
            const transactions = this._link.getTransactions();

            this.setState(
                {
                    transactions: transactions,
                    showMulti : true
                }
            );

        }

    }

    render() {

        if(!this.state.transaction && !(this.state.transactions && this.state.transactions.length)){

            return <div className="alert alert-danger">There are no transactions to show</div>;

        }

        if (this.state.showMulti) {

            return <MultiTransactionDisplay transactions={this.state.transactions}/>


        } else {

            return <TransactionDisplay transaction={this.state.transaction}/>

        }

    }

}