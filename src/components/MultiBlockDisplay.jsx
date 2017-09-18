
import React from 'react';

export default class MultiBlockDisplay extends React.Component{

    constructor(props){

        super(props);

        this.state = {
            blocks : this.props.blocks
        }

    }

    componentDidMount(){

        this.setState({ blocks : this.props.blocks });

    }

    render(){

        return(

            <div className="multi-block-display col-md-6 col-md-offset-3">

                <h2>Latest Blocks Information</h2>

                <table className="table table-striped">

                    <thead>
                        <tr>
                            <th>Number</th>
                            <th>Transactions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            this.state.blocks.map((block, i)=>
                                <tr key={i}>
                                    <td>{block.number}</td>
                                    <td>{block.transactions.length}</td>
                                </tr>
                            )
                        }
                    </tbody>

                </table>

            </div>

        )

    }

}