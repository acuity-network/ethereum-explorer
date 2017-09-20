
import React from 'react';
import {Link} from 'react-router-dom';

export default class AddressDisplay extends React.Component {

    constructor(props) {

        super(props);

        console.log(this.props.address);

    }

    render() {

        return (
            <div className="address-display">

                <h3>Address Information</h3>

                <div className="col-md-6 col-md-offset-3">

                    <table className="table">

                        <tbody></tbody>

                    </table>

                </div>

            </div>
        )

    }

}