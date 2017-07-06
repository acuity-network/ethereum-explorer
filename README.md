# Ethereum Explorer

Ethereum explorer is an easy to use, decentralised (serverless) client for Ethereum based
block chains. Please feel free to use, abuse, fork and contribute!

Ethereum explorer is ideal for those learning about Ethereum block chains and developers
in particular who may be looking for examples of interacting with ethereum block chains via
the [Ethereum web3 api](https://github.com/ethereum/wiki/wiki/JavaScript-API).

#### Features

- Real time block chain statistics
- Account / transaction / block lookup
- More coming soon!

#### Installation

- `git clone git@github.com:link-blockchain/ethereum-explorer.git`
- `npm install`
- `npm start` will launch webpack in dev mode, you can browse to the project at localhost:8080

#### Usage

You will need the ability to make remote procedure calls (RPCs) to a block chain node: specifically you will
need a node which allows CORS access to your client.

We actively encourage people to [create and run their own Link block chain node](http://docs.link-blockchain.org/en/latest/configuration.html) which
can easily be installed on a laptop and configured to allow localhost client access.

Having your own node is very useful for development; you can also, at the time of writing, still mine Link with a laptop CPU!

Once you have a node up and running, modify the node_uri field in config.js with your node's IP and port.

- Running npm start will launch webpack's dev server on port 8080 which will conflict with the
default dapp port if your node is run with Parity (Geth has fewer config issues in my experience).

#### Contributing and forking

Contributors are more than welcome, please just submit a pull request.

Ethereum Explorer is released under the Apache license, feel free to re-use as you will!
