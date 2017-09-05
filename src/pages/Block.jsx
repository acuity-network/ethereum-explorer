
import React from 'react';

export default class Block extends React.Component{

    constructor(props){

        super(props);

        this._link = this.props.linkClient;

        this.state = {
            blockID : null
        }

    }

    componentDidMount(){

        // If a second parameter is supplied to the URL, we're looking for a specific block.
        // If not, show the last ten blocks.
        if (this.props.match.params && this.props.match.params.blockid){

            this.state = {
                blockID : this.props.match.params.blockid,
                block : null
            };

            // Search query has been defined as part of the url. Do search.
            const block = this._link.getBlock(this.state.blockID);
            this.setState({ block : block });

        }else{

            console.log('Getting last blocks');

        }

    }

    render(){

        if(this.state.block){

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

        }else{

            return <div className="alert alert-info"> This is the list of blocks </div>;

        }

    }

}