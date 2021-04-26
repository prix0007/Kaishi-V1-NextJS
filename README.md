### Kasihi V1

- It is a smart contract build on top of Ethereum Blockchain to Simulate crowd Funding Campaign
- Anyone can create a campaign by setting up a minimum contribution required to get approver status in a campaign
- Campaign Manager can withdraw eth from the smart contract when a majority of approvers have given consensus
- Manager have to finalize the request txn after a majority has been reached


## Deployment Status
- This is currently Deployed on : [Go to deployement](https://kaishi.vercel.app)
- You can view the smart Contract factory on Rinkeby testnet: Address - [0x547F2777219dC09F2eD8640ddf6104cA7fAF05F1](https://rinkeby.etherscan.io/address/0x547F2777219dC09F2eD8640ddf6104cA7fAF05F1)
- Contracts are deployed on Rinkeby Testnet


## Usage Frontend
- Git clone this repository in you local machine
- Run `yarn install` or `npm install` from root project folder
- Goto [http://localhost:3000](https://localhost:3000) to see the running project

## Test and Deploy Smart Contract
- To Compile Smart Contracts 
  - Run `node ethereum/compile.js`
  - After successful compilaion you can see a `ethereum/build` directory containing contract details
- To Deploy Smart Contracts 
  - Make a `.env` file in root folder of project and add keys `WALLET_MNEUMONICS` and `INFURA_KEY`.
  - To deploy run `node ethereum/deloy.js`
- To test smart contracts
  - Run `npm run test`
  - Test are written in "mocha" with "ganache-cli" for testing smart contracts