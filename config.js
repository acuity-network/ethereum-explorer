
const config = {

    // localhost url for use with Webpack
    base_url : 'http://localhost:8080',

    // Geth / Parity must be run with rpc-cors set to '*' in order to allow the web3 api via AJAX.
    // Also reset the dapps port if you want to run webpack-dev-server
    // geth --config link.toml --datadir ~/.link-geth --rpc --rpccorsdomain '*' --rpcapi eth,net,web3,personal
    // geth --datadir ~/.smooth-geth --nodiscover  --mine --etherbase 392aecc24aab21d043a307d795e9903949c15052

    // Blockchain node
    node_uri : 'http://localhost:8645'

};

module.exports = config;