function hash(str) {
    var hash = 5381,
        i = str.length;
    while (i) {
        hash = (hash * 33) ^ str.charCodeAt(--i);
    }
    return hash >>> 0;
}

const index = 0
const wallet = {
    symbol: 'xrp',
    address: 'rKGvjqtaQWrqh7D6QEQH7b1fbfdbotCoBg',
    secret: 'snEveys1Kx7XGvZAGsvzvE8ug9fPK',
    destinationTag: hash(`20scoops-${index}`)
}

const RippledWsClient = require('rippled-ws-client')
const RippledWsClientSign = require('rippled-ws-client-sign')

const transaction = {
    TransactionType: 'Payment',
    Account: wallet.address,
    Destination: 'rHS1aqsziLaButwkAg9MuXVWqm5Z1wsgS6',
    DestinationTag: wallet.destinationTag,
    Amount: 1 * 1000000,
    LastLedgerSequence: null,
    Fee: 12
}

function sendXRP() {
    new RippledWsClient('wss://s.altnet.rippletest.net').then((connection) => {
        new RippledWsClientSign(transaction, wallet.secret, connection).then((response) => {
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