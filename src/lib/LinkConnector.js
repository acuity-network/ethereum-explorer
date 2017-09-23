
// LinkConnector - A library to connect to an Ethereum based block chain.
// Currently the connection is to a node specified by IP - connection methods will be added in the future
// hence the abstract base class.

const web3 = require('web3');

// Abstract base class to allow for different connection methods
class LinkConnectorBase{

    constructor() {

        if (new.target === 'LinkConnectorBase') {
            throw new TypeError("Cannot construct Abstract instances directly");
        }

        if (this.connect === 'undefined') {
            throw new TypeError("Connect method must be implemented");
        }

    }
}

export default class LinkHTTPConnector extends LinkConnectorBase{

    constructor(){
        super();
    }

    static connect(nodeURI){

        try{

            return new Web3(new Web3.providers.HttpProvider(nodeURI));

        }catch(err){

            console.error(err.message);
            return null;

        }

    }

}
