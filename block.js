const { GENESIS_DATA } = require('./config');

class Block{
    constructor({timestamp, prevHash, hash, data}){
        this.timestamp = timestamp;
        this.prevHash = prevHash;
        this.hash = hash;
        this.data = data;
    }
}

const block1 = new Block('2/09/22', '0x1562dgs22', '0xvwte226e', 'hello boyee');
console.log(' I am the block created ', block1);