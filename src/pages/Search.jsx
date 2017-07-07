
import React from 'react';

export default class Search extends React.Component{

    constructor(props){

        super(props);

        this._linkClient = this.props.linkClient;

        if (props.match.params && props.match.params.searchquery){

            this.state = { query : props.match.params.searchquery };

            // Search query has been defined as part of the url. Do search.
            this.doSearch()
        }

    }

    doSearch(){

        try{

            const searchResults = this._linkClient.doSearch();

        }catch(err){

            alert('Sorry but there was an error: ' + err.message);

        }


    }

    render(){

        return(

            <div className="search-page content-page">

                This is the search page

            </div>

        )

    }

}