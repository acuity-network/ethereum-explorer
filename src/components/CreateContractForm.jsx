
import React from 'react';

export default class CreateContractForm extends React.Component {

    constructor(props) {

        super(props);

        const contractData = {
            ABI: [{
                "constant": false,
                "inputs": [],
                "name": "kill",
                "outputs": [],
                "payable": false,
                "type": "function"
            }, {
                "constant": true,
                "inputs": [],
                "name": "greet",
                "outputs": [{"name": "", "type": "string"}],
                "payable": false,
                "type": "function"
            }, {"inputs": [{"name": "_greeting", "type": "string"}], "payable": false, "type": "constructor"}],
            byteCode: '0x6060604052341561000f57600080fd5b6040516103a83803806103a8833981016040528080518201919050505b5b336000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505b806001908051906020019061008492919061008c565b505b50610131565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106100cd57805160ff19168380011785556100fb565b828001600101855582156100fb579182015b828111156100fa5782518255916020019190600101906100df565b5b509050610108919061010c565b5090565b61012e91905b8082111561012a576000816000905550600101610112565b5090565b90565b610268806101406000396000f30060606040526000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806341c0e1b514610049578063cfae32171461005e575b600080fd5b341561005457600080fd5b61005c6100ed565b005b341561006957600080fd5b61007161017f565b6040518080602001828103825283818151815260200191508051906020019080838360005b838110156100b25780820151818401525b602081019050610096565b50505050905090810190601f1680156100df5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141561017c576000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16ff5b5b565b610187610228565b60018054600181600116156101000203166002900480601f01602080910402602001604051908101604052809291908181526020018280546001816001161561010002031660029004801561021d5780601f106101f25761010080835404028352916020019161021d565b820191906000526020600020905b81548152906001019060200180831161020057829003601f168201915b505050505090505b90565b6020604051908101604052806000815250905600a165627a7a723058203118a1e2a25424d0f92e49d5bedde9a3eb1e236e186bb89bcfc546d1bcb514730029'
        };

        this.state = {
            ABI : JSON.stringify(contractData.ABI),
            byteCode : contractData.byteCode,
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

                    <textarea className="form-control" value={this.state.ABI} name="ABI" onChange={this.handleInputChange}></textarea>

                </div>

                <div className="form-group">

                    <label>Contract Bytecode</label>

                    <textarea className="form-control" value={this.state.byteCode} name="byteCode" onChange={this.handleInputChange}></textarea>

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