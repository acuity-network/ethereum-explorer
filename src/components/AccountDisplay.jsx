
import React from 'react';
import {Link} from 'react-router-dom';

export default class AccountDisplay extends React.Component {

    constructor(props) {

        super(props);

        console.log(this.props.account);

    }

    render() {

        return (
            <div className="address-display">

                <h3>Account Balance</h3>

                <div className="col-md-6 col-md-offset-3">

                    <div className="form-group">

                        <label>{this.props.account.hash}</label>


                        <label>{this.props.account.balance}</label>

                    </div>

                </div>

            </div>
        )

    }

}