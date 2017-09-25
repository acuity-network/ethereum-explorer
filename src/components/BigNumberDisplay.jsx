import React from 'react';


// Correctly display large numbers
export default class BigNumberDisplay extends React.Component {

    constructor(props) {

        super(props);
        console.log(props);

        this.state = {
            suffix : '',
            number : 0
        }

    }

    componentDidMount(){

        const number = this.props.number;

        let suffix = '',
            divisor = 0;

        if( (number / 1000) > 1 ){

            suffix = 'K';
            divisor = 1000

        }

        if( (number / 1000000) > 1 ){

            suffix = 'M';
            divisor = 1000000;

        }

        if( (number / 1000000000) > 1 ){

            suffix = 'G';
            divisor = 1000000000;

        }

        if( (number / 1000000000000) > 1 ){

            suffix = 'T';
            divisor = 1000000000000;

        }

        this.setState({suffix : suffix, number : (this.props.number / divisor).toFixed(2) });

    }

    render() {

        return <span className="big-number-display">{ this.state.number } {this.state.suffix}{this.props.unit}</span>

    }

}
