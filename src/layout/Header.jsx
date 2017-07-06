import React from 'react';

export default class Header extends React.Component {

    constructor(props){

        super(props);

        this.handleInputChange = this.handleInputChange.bind(this);
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


    }

    render() {
        return (

            <header>

                <div className="header-block-left">
                    &nbsp;
                </div>

                <div className="header-block-right">

                    <span className="link-name">Link Blockchain Explorer</span>

                    <form className="item-search" onSubmit={this.doSearch}>

                        <input
                            onChange={this.handleInputChange}
                            value={this.state.searchQuery}
                            name="searchQuery"
                            type="text"
                            className="form-control"
                            placeholder="Search account / txn / block" />

                    </form>

                </div>

                <div className="clearfix"></div>

            </header>

        )


    }

}