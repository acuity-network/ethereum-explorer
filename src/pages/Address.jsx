

import React from 'react';
import TransactionDisplay from '../components/TransactionDisplay.jsx';

export default class Address extends React.Component {

    constructor(props) {

        super(props);

        this._link = this.props.linkClient;

        this.state = {
            addressHash: null,
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
        this.props.history.push('/address/' + this.state.searchQuery);

    }

    componentDidMount() {

        if (!this.props.match.params || !this.props.match.params.addresshash) {

            // No address ID supplied. Just show the search input.
            return;

        }

        const addressHash = this.props.match.params.addressid;

        // Search query has been defined as part of the url. Do search.
        const address = this._link.getTransaction(addressHash);
        this.setState(
            {
                addressHash: addressHash,
                address: address
            }
        );

    }

    render() {

        if (!this.state.addressHash) {

            return <div className="address-search">

                <h3>Address search</h3>

                <div className="address-search-container col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2">

                    <form onSubmit={this.doSearch}>

                        <div className="form-group">

                            <input
                                onChange={this.handleInputChange}
                                value={this.state.searchQuery}
                                name="searchQuery"
                                type="text"
                                className="form-control"
                                placeholder="Address hash"/>

                        </div>

                        <div className="form-group">

                            <button type="submit" className="btn btn-primary pull-right">Submit</button>

                        </div>

                    </form>

                </div>

            </div>;

        }

        // TransactionID supplied - show address
        return <AddressDisplay address={this.state.address}/>

    }

}