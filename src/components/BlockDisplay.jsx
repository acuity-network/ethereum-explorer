
import React from 'react';
import {Link} from 'react-router-dom';

export default class BlockDisplay extends React.Component{

    constructor(props){

        super(props);

        this.state = {
            block : this.props.block
        }

    }

    render(){

        return(
            <div className="block-display col-md-8 col-md-offset-2">

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
                                <label>hash</label>
                            </td>
                            <td>
                                <span className="block-display-value">{this.state.block.hash}</span>
                            </td>
                        </tr>

                        <tr>
                            <td>
                                <label>parent hash</label>
                            </td>
                            <td>

                                <Link to={'/block/' + this.state.block.parentHash}>
                                    <span className="block-display-value">{this.state.block.parentHash}</span>
                                </Link>

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
                                <label>miner</label>
                            </td>
                            <td>
                                <span className="block-display-value">{this.state.block.miner}</span>
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