
import React from 'react';
import {Link} from 'react-router-dom';

export default class AccountDisplay extends React.Component {

    constructor(props) {

        super(props);

        this.state = {
            balance : 0
        };

        if(this.props.account){

            this.state.balance = Number(this.props.account.balance).toFixed(4);

        }


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
                            <td className="font-monospace">{this.props.account.hash}</td>
                        </tr>

                        <tr>
                            <td><label>Balance</label></td>
                            <td>{this.state.balance}</td>
                        </tr>

                        </tbody>

                    </table>

                </div>

            </div>
        )

    }

}