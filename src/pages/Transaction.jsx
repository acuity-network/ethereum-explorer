

import React from 'react';
import TransactionDisplay from '../components/TransactionDisplay.jsx';

export default class Transaction extends React.Component {

    constructor(props) {

        super(props);

        this._link = this.props.mixClient;

        this.state = {
            loading : true,
            transactionID: null,
            searchQuery: ''
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.doSearch = this.doSearch.bind(this);

    }

    handleInputChange(event) {

        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });

    }

    doSearch(ev) {

        ev.preventDefault();
        this.props.history.push('/transaction/' + this.state.searchQuery);

    }

    componentDidMount() {

        if (!this.props.match.params || !this.props.match.params.transactionid) {

            // No transaction ID supplied. Just show the search input.
            this.setState(
                {
                    loading : false,
                    transaction: ''
                }
            );

            return;

        }

        const transactionID = this.props.match.params.transactionid;

        // Search query has been defined as part of the url. Do search.
        this._link.getTransaction(transactionID).then(
            (transaction)=>{

                this.setState(
                    {
                        loading : false,
                        transactionID: transactionID,
                        transaction: transaction
                    }
                );

            },
            (error)=>{

                this.setState(
                    {
                        loading : false,
                        alertMessage : 'invalid transaction'
                    }
                );

                setTimeout(
                    ()=>{

                        this.setState(
                            {
                                alertMessage : ''
                            }
                        );

                    }, 3000
                )

            }
        );


    }

    render() {

        if(this.state.loading){

            return <div className="alert alert-info">Please wait...</div>

        }

        if (!this.state.loading && !this.state.transactionID) {

            return <div className="transaction-search">

                <h3 className="content-heading">Transaction search</h3>

                <div className="transaction-search-container col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2">

                    <form onSubmit={this.doSearch}>

                        <div className="form-group">

                            <input
                                onChange={this.handleInputChange}
                                value={this.state.searchQuery}
                                name="searchQuery"
                                type="text"
                                className="form-control"
                                placeholder="Transaction hash"/>

                        </div>

                        <div className="form-group">

                            <button type="submit" className="btn btn-primary pull-right">Submit</button>

                        </div>

                    </form>

                    <div className="clearfix margin-bottom"></div>

                    <p className={ this.state.alertMessage ? 'alert alert-danger' : 'no-display'}>
                        Sorry but there was an error with this request: {this.state.alertMessage}
                    </p>

                </div>

            </div>;

        }

        // TransactionID supplied - show transaction
        if(this.state.transaction){

            return <TransactionDisplay transaction={this.state.transaction}/>

        }

        // Transaction not found
        return <div className="alert alert-danger">Transaction not found</div>

    }

}