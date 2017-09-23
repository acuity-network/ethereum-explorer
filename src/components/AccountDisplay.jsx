
import React from 'react';
import {Link} from 'react-router-dom';

export default class AccountDisplay extends React.Component {

    constructor(props) {

        super(props);

    }

    render() {

        return (
            <div className="address-display">

                <h3>Account Information</h3>

                <div className="col-md-6 col-md-offset-3">

                    <table className="table">

                        <tbody>

                        <tr>
                            <td><label>Address</label></td>
                            <td>{this.props.account.hash}</td>
                        </tr>

                        <tr>
                            <td><label>Balance</label></td>
                            <td>{this.props.account.balance}</td>
                        </tr>

                        </tbody>

                    </table>

                </div>

            </div>
        )

    }

}