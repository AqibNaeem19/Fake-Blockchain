const Block = require('./block');
const cryptoHash = require('./crypto-hash');

class Blockchain{
  constructor(){
    this.chain = [Block.genesis()];
  }

  /*
    Add block function only takes data from the user and pull last 
    block from the chain array. mineBlock function in block.js 
    gets the timestamp and sends it to crypto-hash.js, which gives
    SHA-256 hash.
  */
  addBlock({ data }){
    const newBlock = Block.mineBlock({
      prevBlock: this.chain[ this.chain.length - 1 ],
      data,
    });
    this.chain.push(newBlock);
  }

  static isValidChain(chain){
    // Checks if the genesis block is same as the first block of blockchain.
    if(JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis())) return false;

    for( let i = 1; i < chain.length; i++){
      const { timestamp, prevHash, hash, data } = chain[i];

      // Check prevHash of block with the hash of block behind it.
      const realLastHash = chain[i - 1].hash;
      if( prevHash !== realLastHash) return false;

      // Compares the hash of block with newly calculated hash of that block.
      const validatedHash = cryptoHash(timestamp, prevHash, data);
      if( hash !== validatedHash) return false;

      return true;

    }
  }
}

const blockchain = new Blockchain();
blockchain.addBlock({ data: 'Block number 1'});
const result = Blockchain.isValidChain( blockchain.chain );
console.log('Chain validation : ', result);
// console.log(blockchain);

module.exports = Blockchain;