
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
                            <Link to="/demo">
                                <i className="fa fa-video-camera" aria-hidden="true"></i>
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