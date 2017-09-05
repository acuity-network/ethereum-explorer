
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

            return <div className="alert alert-info"> This is the block </div>;

        }else{

            return <div className="alert alert-info"> This is the list of blocks </div>;

        }

    }

}