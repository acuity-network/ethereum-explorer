
import React from 'react';

export default class TransactionDisplay extends React.Component{

    constructor(props){

        super(props);

        console.log(this.props.transaction);

        this.state = {
            transaction : this.props.transaction
        }

    }

    render(){

        return(
            <div className="transaction-display col-md-6 col-md-offset-3">

                <h2>Transaction Information</h2>

                <div className="table-responsive">

                    <table className="table">

                        <tbody></tbody>

                    </table>

                </div>


            </div>
        )

    }

}