import React from 'react';
import AccountDisplay from '../components/AccountDisplay.jsx';

export default class Account extends React.Component {

    constructor(props) {

        super(props);

        this._link = this.props.linkClient;

        this.state = {
            loading : true,
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
                        loading : false,
                        account: {
                            hash: accountHash,
                            balance: balance
                        }
                    }
                );

            },
            (error)=>{

                this.setState(
                    {
                        loading : false,
                        alertMessage : error.message
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

        if (!this.state.loading && !this.state.account.hash) {

            return <div className="account-search">

                <h3 className="content-heading">Account search</h3>

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

                    <div className="clearfix margin-bottom"></div>

                    <p className={ this.state.alertMessage ? 'alert alert-danger' : 'no-display'}>
                        Sorry but there was an error with this request: {this.state.alertMessage}
                    </p>

                </div>

            </div>;

        }

        // Show Account balance
        if(!this.state.loading && this.state.account){

            return <AccountDisplay account={this.state.account}/>

        }

    }

}