
import React from 'react';

export default class CreateContractForm extends React.Component {

    constructor(props) {

        super(props);

        this.state = {
            abi : '',
            code : '',
            message : ''
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    handleSubmit(ev){

        ev.preventDefault();

        this.props.submitForm(this.state);
    }

    handleInputChange(event) {

        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });

    }

    render(){

        return(

            <form onSubmit={this.handleSubmit}>

                <div className="form-group">

                    <label>Contract ABI</label>

                    <textarea className="form-control" value={this.state.abi} name="abi" onChange={this.handleInputChange}></textarea>

                </div>

                <div className="form-group">

                    <label>Contract Bytecode</label>

                    <textarea className="form-control" value={this.state.code} name="code" onChange={this.handleInputChange}></textarea>

                </div>

                <div className="form-group">

                    <label>Contract message</label>

                    <input type="text" className="form-control" value={this.state.message} name="message" onChange={this.handleInputChange}></input>

                </div>

                <div className="form-group">

                    <button type="submit" className="btn btn-primary">Create contract</button>

                </div>

            </form>

        )

    }

}