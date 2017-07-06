
import React from 'react';

export default class Search extends React.Component{

    constructor(props){

        super(props);

        if (this.props.params && this.props.params.searchquery){

            console.log(this.props.params.searchquery);

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