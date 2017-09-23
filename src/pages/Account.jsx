import React from 'react';
import AccountDisplay from '../components/AccountDisplay.jsx';

export default class Account extends React.Component {

    constructor(props) {

        super(props);

        this._link = this.props.linkClient;

        this.state = {
            searchQuery: '',
            account: {
                hash : null,
                balance : 0
            }
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
        this.props.history.push('/account/' + this.state.searchQuery);

    }

    componentDidMount() {

        if (!this.props.match.params || !this.props.match.params.accounthash) {

            // No account ID supplied. Just show the search input.
            return;

        }

        const accountHash = this.props.match.params.accounthash;

        this._link.getAccountBalance(accountHash).then(
            (balance)=>{

                this.setState(
                    {
                        account: {
                            hash: accountHash,
                            balance: balance
                        }
                    }
                );

            }
        );


    }

    render() {

        if (!this.state.account.hash) {

            return <div className="account-search">

                <h3>Account search</h3>

                <div className="account-search-container col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2">

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

        // Show Account balance
        return <AccountDisplay account={this.state.account}/>

    }

}