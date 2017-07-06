
import React from 'react';

export default class Search extends React.Component{

    constructor(props){

        super(props);

        if (props.match.params && props.match.params.searchquery){

            console.log(props.match.params.searchquery);

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