const RippleAPI = require('ripple-lib').RippleAPI;
const account1 = 'rKGvjqtaQWrqh7D6QEQH7b1fbfdbotCoBg'
const account2 = 'rHS1aqsziLaButwkAg9MuXVWqm5Z1wsgS6'

const api = new RippleAPI({
    server: 'wss://s.altnet.rippletest.net'
});

api.on('error', (errorCode, errorMessage) => {
    console.log(`error: ${errorCode}\t${errorMessage}`);
});

api.on('connected', () => {
    console.log('connected');
});

api.on('ledger', ledger => {
    // console.log(`ledger: ${JSON.stringify(ledger, null , 2)}`)
});

api.on('disconnected', (code) => {
    // code - [close code](https://developer.mozilla.org/en-US/docs/Web/API/CloseEvent) sent by the server
    // will be 1000 if this was normal closure
    console.log('disconnected, code:', code);
});

api.connection.on('transaction', (event) => {
    console.log(`transaction: ${JSON.stringify(event, null, 2)}`);
});

api.connect().then(() => {
    api.getServerInfo().then((info) => {
        const ledgers = info.completeLedgers.split('-');
        setupListener()
        api.getTransactions('rKGvjqtaQWrqh7D6QEQH7b1fbfdbotCoBg',
         {
            minLedgerVersion: Number(ledgers[0]),
            maxLedgerVersion: Number(ledgers[1])
         }
        ).then(transaction => {
            console.log(`histories: ${JSON.stringify(transaction, null, 2)}`)
        });
    })
}).catch(err => {
    console.log(`error: ${err}`)
    api.disconnect()
})

function setupListener() {
    api.request('subscribe', {
        accounts: [account1, account2]
    }).then(() => {
        console.log('Successfully subscribed')
    }).catch(error => {
        console.log(`error subscribe: ${JSON.stringify(error)}`)
    })
}