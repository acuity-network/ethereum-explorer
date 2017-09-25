
import React from 'react';
import { withRouter } from 'react-router-dom';

import Navleft from './Navleft.jsx';

class Header extends React.Component {

    constructor(props){

        super(props);

        this.handleInputChange = this.handleInputChange.bind(this);
        this.doSearch = this.doSearch.bind(this);

        this.state = { searchQuery : '' };

    }

    handleInputChange(event) {

        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });

    }

    doSearch(ev){

        ev.preventDefault();

        this.props.linkClient.doSearch(this.state.searchQuery).then(
            (result)=>{

                if(result.block){

                    this.props.history.push('/block/' + this.state.searchQuery);
                    return;
                }

                if(result.account){

                    this.props.history.push('/account/' + this.state.searchQuery);
                    return;
                }

                if(result.transaction){

                    this.props.history.push('/transaction/' + this.state.searchQuery);
                    return;
                }

                // No result
                this.setState(
                    {
                        noresult : true,
                        searchQuery: ''
                    }
                );

                setTimeout(
                    ()=>{

                        this.setState(
                            {
                                noresult : false
                            }
                        )

                    },3000
                )

            },
            (error)=>{

                console.error(error);

            }
        )

    }

    render() {
        return (

            <header>

                <div className="header-block-left">
                    &nbsp;
                </div>

                <div className="header-block-right">

                    <h1 className="link-name">Ethereum block explorer</h1>

                    <div className="item-search">

                        <form onSubmit={this.doSearch}>

                            <input
                                onChange={this.handleInputChange}
                                value={this.state.searchQuery}
                                name="searchQuery"
                                type="text"
                                className="form-control"
                                placeholder="Search account / txn / block" />

                            <span onClick={()=>{ this.setState({searchQuery : ''}) }} className="cancel-search glyphicon glyphicon-remove-circle" aria-hidden="true"></span>

                            <span className={ this.state.noresult ? 'search-no-results alert alert-danger' : 'no-display' }>no result found</span>

                        </form>

                    </div>

                </div>

                <div className="clearfix"></div>

                <Navleft inline="1"></Navleft>

            </header>

        )


    }

}

export default withRouter(Header);