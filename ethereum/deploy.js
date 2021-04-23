
const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
require('dotenv').config();

const compiledFactory = require('./build/CampaignFactory.json');
const parsedFactory = JSON.parse(compiledFactory);

const provider = new HDWalletProvider(
  process.env.WALLET_MNEUMONICS, // Your wallet mnuemonics here
  process.env.INFURA_KEY // Something like: 'https://rinkeby.infura.io/v3/YOUR_INFURA_API_KEY'
)


const web3 = new Web3(provider);

const deploy = async () => {
    // Get a list of all accounts
    const accounts = await web3.eth.getAccounts();
    console.log('Attempting to deploy using account - ', accounts[0]);

    const result = await new web3.eth.Contract(parsedFactory.abi).deploy({
      data: "0x" + parsedFactory.evm.bytecode.object
    }).send({
      from: accounts[0],
      gas: '1000000'
    })

    console.log('Contract deployed to ', result.options.address);
    console.log("Your can view deployed contract at - ", `https://rinkeby.etherscan.io/address/${result.options.address}`);
};

deploy();
