
import React from 'react';

import {Bar, defaults as chartDefaults} from 'react-chartjs-2';

// Ethereum Explorer home page - displays system stats

export default class Demo extends React.Component {

    constructor(props) {

        super(props);

        this._link = this.props.linkClient;



    }



    componentDidMount() {


    }


    render() {

        return (

            <div className="home-page content-page">
                This is the demo page
            </div>

        )

    }

}