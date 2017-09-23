
const config = {

    // localhost url for use with Webpack
    base_url : 'http://localhost:8080',

    // Geth / Parity must be run with rpc-cors set to '*' in order to allow the web3 api via AJAX.
    // Also reset the dapps port if you want to run webpack-dev-server
    // geth --config link.toml --datadir ~/.link-geth --rpc --rpccorsdomain '*' --rpcapi eth,net,web3,personal

};

module.exports = config;