const { GENESIS_DATA } = require('./config');
const cryptoHash = require('./crypto-hash');

class Block {
	constructor({ timestamp, prevHash, hash, data, nonce, difficulty }) {
		this.timestamp = timestamp;
		this.prevHash = prevHash;
		this.hash = hash;
		this.data = data;
		this.nonce = nonce;
		this.difficulty = difficulty;
	}

	static genesis() {
		return new this(GENESIS_DATA);
	}

	static mineBlock({ prevBlock, data }) {
		let hash, timestamp;
		const prevHash = prevBlock.hash;
		const difficulty = prevBlock.difficulty;  
		let nonce = 0;
		let mineStartingTime = new Date().getTime();
		console.log(difficulty);
		// Increment nonce to reach target hash
		do{
			nonce++;
			timestamp = Date.now();
			hash = cryptoHash(timestamp, prevHash, data, nonce, difficulty)
			// console.log(hash);
		} while (hash.substring(0, difficulty) !== "0".repeat(difficulty));	
		let mineEndingTime = new Date().getTime();
		console.log('Mined block took time : ', mineEndingTime - mineStartingTime);

		return new this({
			timestamp,
			prevHash,
			data,
			hash,
			nonce,
			difficulty
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

module.exports = Block;
