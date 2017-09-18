import React from 'react';

import BlockDisplay from '../components/BlockDisplay.jsx';
import MultiBlockDisplay from '../components/MultiBlockDisplay.jsx';

export default class Block extends React.Component {

    constructor(props) {

        super(props);

        this._link = this.props.linkClient;

        this.state = {
            showMulti : false
        }

    }

    componentDidMount() {

        // If a second parameter is supplied to the URL, we're looking for a specific block.
        // If not, show the last ten blocks.
        if (this.props.match.params && this.props.match.params.blockid) {

            const blockID = this.props.match.params.blockid;

            // Search query has been defined as part of the url. Do search.
            const block = this._link.getBlock(blockID);
            this.setState(
                {
                    blockID : blockID,
                    block: block,
                    showMulti : false
                }
            );

        } else {

            // Get last ten blocks
            const blocks = this._link.getBlocks();

            this.setState(
                {
                    blocks: blocks,
                    showMulti : true
                }
            );

            console.log(blocks);

        }

    }

    render() {

        if(!this.state.block && (!this.state.blocks || !this.state.blocks.length)){

            return <div className="alert alert-danger">There are no blocks to show</div>;

        }

        if (this.state.showMulti) {

            return <MultiBlockDisplay blocks={this.state.blocks}/>


        } else {

            return <BlockDisplay block={this.state.block}/>

        }

    }

}