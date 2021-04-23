const path = require('path');
const solc = require('solc');
const fs = require('fs-extra');
const { exit } = require('process');

const buildPath = path.resolve(__dirname, 'build');
fs.removeSync(buildPath);

const campaignPath = path.resolve(__dirname, 'contracts', 'Campaign.sol');
const source = fs.readFileSync(campaignPath, 'utf-8');

let complierInput = {
  language: 'Solidity',
  sources:
  {
      'Campaign.sol': 
      {
          content: source
      }
  },
  settings:
  {
      optimizer:
      {
          enabled: true
      },
      outputSelection:
      {
          '*':{
              '*':['*']
          }
      }
  }
};
console.log('Compiling Contract');
let compiledContract = JSON.parse(solc.compile(JSON.stringify(complierInput)));
console.log('Contract Compiled');

fs.ensureDirSync(buildPath);

for (let contractName in compiledContract.contracts['Campaign.sol']) {
  // console.log(contractName , compiledContract.contracts['Campaign.sol'][contractName]);      
  let contractContent = compiledContract.contracts['Campaign.sol'][contractName];
  fs.outputJSONSync(
    path.resolve(buildPath, `${contractName}.json`), 
    JSON.stringify(contractContent)
  );
}

exit(0);