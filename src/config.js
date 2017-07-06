
const config = {

    // Geth / Parity must be run with rpc-cors set to '*' in order to allow the web3 api via AJAX.
    // Also reset the dapps port if you want to run webpack-dev-server
    // parity --chain link.json --port 30313 --dapps-port 8000  --jsonrpc-port 8645 --geth --jsonrpc-cors '*'
    node_uri : 'http://localhost:8645'

};

export {config};