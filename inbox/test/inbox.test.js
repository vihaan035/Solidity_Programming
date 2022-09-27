const assert = require('assert');
const ganache = require('ganache-cli'); // cap W means that 'Web3' is a constructor function
const Web3 = require('web3');           // small w means that its an instance
const web3 = new Web3(ganache.provider()); 
const { interface, bytecode } = require('../compile')


let accounts;
let inbox;
let INITIAL_STRING = 'Hi there!'


beforeEach(async () => {
    // Get a list of all accounts
    accounts = await web3.eth.getAccounts();
    // console.log(accounts)
    

    // Use one of those accounts to
    // deploy the contract
    inbox = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({ data: bytecode, arguments: [INITIAL_STRING] })
        .send({ from: accounts[1], gas: '1000000' })
});

describe('Inbox', () => {                           // test
    it('deploys a contract', () => {
        assert.ok(inbox.options.address)
    });

    it('has a default message', async () => {
        const message = await inbox.methods.message().call();
        assert.equal(message, INITIAL_STRING)
    });

    it('can change the message', async () => {
        await inbox.methods.setMessage('heart attack').send({ from: accounts[1] });
        const message = await inbox.methods.message().call();
        assert.equal(message, 'heart attack');
    });
});
