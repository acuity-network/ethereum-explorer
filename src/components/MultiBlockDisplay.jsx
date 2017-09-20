

import React from 'react';
import {Link} from 'react-router-dom';

export default class MultiBlockDisplay extends React.Component {

    constructor(props) {

        super(props);

        // Reverse order of blocks
        const blocks = this.props.blocks.reverse();

        this.state = {
            blocks: this.props.blocks
        }

    }

    render() {


        return (

            <div className="multi-block-display">

                <h3>Latest blocks information</h3>

                <div className="col-md-8 col-md-offset-2">

                    <div className="table-responsive">

                        <table className="table table-striped">

                            <thead>
                            <tr>
                                <th>Number</th>
                                <th>Difficulty</th>
                                <th>Gas Limit</th>
                                <th>Gas Used</th>
                                <th>Uncles</th>
                                <th>Transactions</th>
                            </tr>
                            </thead>

                            <tbody>
                            {
                                this.state.blocks.map((block, i) =>
                                    <tr key={i}>
                                        <td>

                                            <Link to={'/block/' + block.number}>
                                                {block.number}
                                            </Link>

                                        </td>
                                        <td>
                                            {block.difficulty.toString()}
                                        </td>
                                        <td>
                                            {block.gasLimit}
                                        </td>
                                        <td>
                                            {block.gasUsed}
                                        </td>
                                        <td>
                                            {block.uncles.length}
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

                </div>

            </div>

        )
    }

}