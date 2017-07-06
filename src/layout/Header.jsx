import React from 'react';

export default class Header extends React.Component {

    doSearch(ev){

        console.log(ev);
        ev.preventDefault();

        alert('hello');

        return false;
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

                        <input type="text" className="form-control" placeholder="Search account / txn / block" />

                    </form>

                </div>

                <div className="clearfix"></div>

            </header>

        )


    }

}