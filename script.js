window.onload = function () {

    class Block {

        constructor() {

            this.index = 0
            this.previousHash = ""
            this.hash = ""
            this.nonce = 0
            this.transactions = []

        }

        get key() {
            return JSON.stringify(this.transactions) + this.index + this.previousHash + this.nonce
        }

        addTransaction(transaction) {
            this.transactions.push(transaction)
        }
    }

    class Blockchain {

        constructor(genesisBlock) {

            this.blocks = []
            this.addBlock(genesisBlock)
        }

        addBlock(block) {

            if (this.blocks.length == 0) {
                block.previousHash = "0000000000000000"
                block.hash = this.generateHash(block)
            }

            this.blocks.push(block)
        }

        getNextBlock(transactions) {

            let block = new Block()

            transactions.forEach(function (transaction) {
                block.addTransaction(transaction)
            })

            let previousBlock = this.getPreviousBlock()
            block.index = this.blocks.length
            block.previousHash = previousBlock.hash
            block.hash = this.generateHash(block)
            return block
        }

        generateHash(block) {

            let hash = sha256(block.key)

            while (!hash.startsWith("0000")) {
                block.nonce += 1
                hash = sha256(block.key)
                console.log(hash)
            }

            return hash

        }

        getPreviousBlock() {
            return this.blocks[this.blocks.length - 1]
        }

    }

    class Transaction {

        constructor(from, to, amount) {
            this.from = from
            this.to = to
            this.amount = amount
        }

    }

    // create genesis block
    let genesisBlock = new Block()
    let blockchain = new Blockchain(genesisBlock)

    // create a transaction
    let transaction = new Transaction('Mary', 'John', 100)
    let block = blockchain.getNextBlock([transaction])
    blockchain.addBlock(block)

    let anotherTransaction = new Transaction("Azam", "Jerry", 10)
    let block1 = blockchain.getNextBlock([anotherTransaction, transaction])
    blockchain.addBlock(block1)

    console.log(blockchain)

};