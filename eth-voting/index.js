const fs = require('fs')
const path = require('path')
const solc = require('solc')
const Web3 = require('web3')
const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
const code = fs.readFileSync(path.resolve(__dirname, './Voting.sol')).toString()
const compiledCode = solc.compile(code)
const abiDefinition = JSON.parse(compiledCode.contracts[':Voting'].interface)
const byteCode = compiledCode.contracts[':Voting'].bytecode

module.exports = function () {
    return web3.eth.getAccounts()
        .then((accounts) => {
            // 任何活动都需要有帐户，即使说你调一个不花钱的合约方法也是需要帐户的。这里默认取第一个账户
            const VotingContract = new web3.eth.Contract(abiDefinition, { data: byteCode, from: accounts[0], gas: 4700000 })
            return VotingContract.deploy({ arguments: [['Rama', 'Nick', 'Jose'].map(Web3.utils.asciiToHex)] })
                .send(function (error, transactionHash) {
                })
                .then(function (contractInstance) {
                    // deployedContract.options.address: instance with the new contract address
                    // const contractInstance = new web3.eth.Contract(abiDefinition, deployedContract.options.address);
                    // console.log(contractInstance, accounts[0], 111)
                    return { contractInstance, account: accounts[0] }
                });
        })
}