
import React from 'react';

import BlockDisplay from '../components/BlockDisplay.jsx';

export default class Search extends React.Component{

    constructor(props){

        super(props);

        this.state = {
            query : null,
            block : null,
            transaction : null,
            balance : null
        };

    }

    componentDidMount() {

        if (this.props.match.params && this.props.match.params.searchquery){

            this.state = {
                query : this.props.match.params.searchquery,
                block : null,
                transaction : null,
                balance : null
            };

            this._linkClient = this.props.linkClient;

            // Search query has been defined as part of the url. Do search.
            this.doSearch()
        }

    }

    doSearch(){

        try{

            const searchResults = this._linkClient.doSearch(this.state.query);
            const state = Object.assign(this.state, searchResults);
            this.setState(state);

            console.log(state);

        }catch(err){

            alert('Sorry but there was an error with this request: ' + err.message);

        }


    }

    render(){

        if(this.state.block){

            return(<BlockDisplay block={this.state.block} />)

        }

        if(this.state.balance){

            return(

                <div className="search-page content-page">

                    <h2 className="balance-heading">Your balance:</h2>
                    <span className="balance-span">{this.state.balance} link</span>

                </div>

            )

        }

        return(

            <div className="search-page content-page">

                This is the search page

            </div>

        )

    }

}