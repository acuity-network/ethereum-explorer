import React from 'react';

export default class Header extends React.Component {

    render() {
        return (

            <header>

                <div className="header-block-left">
                    <i className="fa fa-bar-chart" aria-hidden="true"></i>
                </div>

                <div className="header-block-right">

                    <span className="link-name">Link Blockchain Explorer</span>

                </div>

                <div className="clearfix"></div>

            </header>

        )


    }

}