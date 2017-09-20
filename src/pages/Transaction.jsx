import React from 'react';

import TransactionDisplay from '../components/TransactionDisplay.jsx';

export default class Transaction extends React.Component {

    constructor(props) {

        super(props);

        this._link = this.props.linkClient;

        this.state = {
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
            return;

        }

        const transactionID = this.props.match.params.transactionid;

        // Search query has been defined as part of the url. Do search.
        const transaction = this._link.getTransaction(transactionID);
        this.setState(
            {
                transactionID: transactionID,
                transaction: transaction
            }
        );

    }

    render() {

        if (!this.state.transactionID) {

            return <div className="transaction-search">

                <h3>Transaction search</h3>

                <div className="search-container col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2">

                    <form onSubmit={this.doSearch}>

                        <div className="form-inline">

                            <input
                                onChange={this.handleInputChange}
                                value={this.state.searchQuery}
                                name="searchQuery"
                                type="text"
                                className="form-control"
                                placeholder="Transaction hash"/>

                            <button type="submit" className="btn btn-primary">Submit</button>

                        </div>

                    </form>

                </div>

            </div>;

        }

        return <TransactionDisplay transaction={this.state.transaction}/>

    }

}