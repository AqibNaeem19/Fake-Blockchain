const { GENESIS_DATA } = require('./config');
const cryptoHash = require('./crypto-hash');

class Block{
    constructor({timestamp, prevHash, hash, data}){
        this.timestamp = timestamp;
        this.prevHash = prevHash;
        this.hash = hash;
        this.data = data;
    }

    static genesis(){
        return new this( GENESIS_DATA );
    }

    static mineBlock({ prevBlock, data}){
        const timestamp = Date.now();
        const prevHash = prevBlock.hash;
        return new this({
            timestamp,
            prevHash,
            data,
            hash: cryptoHash(timestamp, prevHash, data)
        })
    }
}

const genesisBlock = Block.genesis();
console.log(genesisBlock)

const block1 = new Block({
    timestamp: '2/09/22', 
    prevHash: '0x1562dgs22', 
    hash: '0xvwte226e', 
    data: 'hello boyee'
});
console.log(' I am the block created ', block1);

const result = Block.mineBlock({prevBlock: block1, data: "block data 2", });
console.log('Newly mined block', result)

module.exports = Block;
