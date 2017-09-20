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

        if (!this.props.match.params || !this.props.match.params.transactionid) {

           // No transaction ID supplied. Just show the search input.
           this.setState({transactionID: null});
           return;

        }

        const transactionID = this.props.match.params.transactionid;

        // Search query has been defined as part of the url. Do search.
        const transaction = this._link.getTransaction(transactionID);
        this.setState(
            {
                transactionID : transactionID,
                transaction: transaction
            }
        );

    }

    render() {

        if(!this.state.transactionID){

            return <div className="transaction-search col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2">

                <h3>Transaction search</h3>

                <div className="form-group">

                    

                    <label>Transaction ID</label>
                    <input type="text" class="form-control" />
                    <button type="submit" class="btn btn-primary">Submit</button>



                </div>



            </div>;

        }

        return <TransactionDisplay transaction={this.state.transaction}/>

    }

}