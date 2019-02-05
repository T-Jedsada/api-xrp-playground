const path = require('path');
require('dotenv').config({
    path: path.join(__dirname, '../.env.xrp.local')
});

const index = 0

const wallet = {
    symbol: 'xrp',
    address: process.env.ADDRESS,
    secret: process.env.SECRET,
    destinationTag: hash(`20scoops-${index}`)
}

function hash(str) {
    var hash = 5381,
        i = str.length;
    while (i) {
        hash = (hash * 33) ^ str.charCodeAt(--i);
    }
    return hash >>> 0;
}

console.log(`user: ${JSON.stringify(wallet, null, 2)}`)