
import React from 'react';
import {Link} from 'react-router-dom';

export default class Navleft extends React.Component{

    render(){

        return (

            <div className="nav-left">

                <nav>

                    <ul>
                        <li>
                            <Link to="/">
                                <i className="fa fa-line-chart" aria-hidden="true"></i>
                            </Link>
                        </li>
                        <li>
                            <Link to="/block">
                                <i className="fa fa-align-justify" aria-hidden="true"></i>
                            </Link>
                        </li>
                        <li>
                            <Link to="/account">
                                <i className="fa fa-address-card-o" aria-hidden="true"></i>
                            </Link>
                        </li>
                        <li>
                            <Link to="/transaction">
                                <i className="fa fa-exchange" aria-hidden="true"></i>
                            </Link>
                        </li>
                        <li>
                            <Link to="/search">
                                <i className="fa fa-search" aria-hidden="true"></i>
                            </Link>
                        </li>
                        <li>
                            <Link to="/">
                                <i className="fa fa-cog" aria-hidden="true"></i>
                            </Link>
                        </li>
                    </ul>

                </nav>

            </div>

        )

    }

}