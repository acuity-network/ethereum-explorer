
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
                blockID : this.props.match.params.blockid
            };

            this._linkClient = this.props.linkClient;

            // Search query has been defined as part of the url. Do search.
            this.doSearch()
        }

    }

    // Get the information for an individual block
    getBlock(blockID){


    }

    // No blockID specified, show the last ten blocks
    getLastBlocks(){


    }

}