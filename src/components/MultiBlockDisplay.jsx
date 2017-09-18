
import React from 'react';

export default class MultiBlockDisplay extends React.Component{

    constructor(props){

        super(props);

        this.state = {
            blocks : this.props.blocks
        }

    }

    render(){


        return(

            <div className="multi-block-display col-md-8 col-md-offset-2">

                <h2>Latest Blocks Information</h2>

                <table className="table table-striped">

                    <thead>
                    <tr>
                        <th>Number</th>
                        <th>Difficulty</th>
                        <th>Transactions</th>
                    </tr>
                    </thead>

                    <tbody>
                    {
                        this.state.blocks.map((block, i)=>
                            <tr key={i}>
                                <td>
                                    <a href={'block/' + block.number}>
                                        {block.number}
                                    </a>
                                </td>
                                <td>
                                    {block.difficulty.toString()}
                                </td>
                                <td>
                                    {block.transactions.length}
                                </td>
                            </tr>
                        )
                    }
                    </tbody>

                </table>

            </div>

        )
    }

}