const crypto = require('crypto');

const cryptoHash = (...inputs) => {
	const hash = crypto.createHash('sha256');
	/* 
		Takes all the block fields, sort them, combine them into single entity
		and compute its hash using sha256. Return the hash in hex form  
	*/
	hash.update(inputs.sort().join(''));
	return hash.digest('hex');
}

const myHash = cryptoHash('world', 'hello');

module.exports = cryptoHash;
console.log('this is the hash', myHash);