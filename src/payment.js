const path = require('path');
require('dotenv').config({
    path: path.join(__dirname, '../.env.xrp.local')
});
const RippledWsClient = require('rippled-ws-client')
const RippledWsClientSign = require('rippled-ws-client-sign')

const address = process.env.ADDRESS
const secretKey = process.env.SECRET

// input from user
const destinationTag = 4270152
const amount = 1 * 1000000

const transaction = {
    TransactionType: 'Payment',
    Account: address,
    Destination: 'rHS1aqsziLaButwkAg9MuXVWqm5Z1wsgS6',
    DestinationTag: destinationTag,
    Amount: amount,
    LastLedgerSequence: null,
    Fee: 12
}

function sendXRP() {
    new RippledWsClient('wss://s.altnet.rippletest.net').then((connection) => {
        new RippledWsClientSign(transaction, secretKey, connection).then((response) => {
            console.log('TransactionSuccess', response)
            connection.close()
        }).catch((err) => {
            console.log('SignError', err.details)
            connection.close()
        })
    }).catch((err) => {
        console.log('ConnectionError', err)
    })
}

sendXRP()