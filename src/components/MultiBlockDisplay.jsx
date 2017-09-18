
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
            <div className="block-display col-md-6 col-md-offset-3">

                <h2>Block Information</h2>

                <div className="table-responsive">

                    <table className="table">

                        <tbody>

                        <tr>
                            <td>
                                <label>number</label>
                            </td>
                            <td>
                                <span className="block-display-value">{this.state.block.number}</span>
                            </td>
                        </tr>

                        <tr>
                            <td>
                                <label>gas limit</label>
                            </td>
                            <td>
                                <span className="block-display-value">{this.state.block.gasLimit}</span>
                            </td>
                        </tr>

                        <tr>
                            <td>
                                <label>gas used</label>
                            </td>
                            <td>
                                <span className="block-display-value">{this.state.block.gasUsed}</span>
                            </td>
                        </tr>

                        <tr>
                            <td>
                                <label>difficulty</label>
                            </td>
                            <td>
                                <span className="block-display-value">{this.state.block.difficulty.toString(10)}</span>
                            </td>
                        </tr>

                        <tr>
                            <td>
                                <label>transactions</label>
                            </td>
                            <td>
                                <span className="block-display-value">{this.state.block.transactions.length}</span>
                            </td>
                        </tr>

                        <tr>
                            <td>
                                <label>uncles</label>
                            </td>
                            <td>
                                <span className="block-display-value">{this.state.block.uncles.length}</span>
                            </td>
                        </tr>

                        </tbody>

                    </table>

                </div>


            </div>
        )

    }

}