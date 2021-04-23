import Web3 from 'web3';

let web3;

if(typeof window !== 'undefined' && (typeof window.ethereum !== 'undefined' || typeof window.web3 !== 'undefined')){
  if (window.ethereum) {
    web3 = new Web3(window.ethereum);
    try {
      window.ethereum.enable().then(function() {
        // User has allowed account access to DApp...
        console.log('Allowed');
      });
    } catch (e) {
      // User has denied account access to DApp...
      console.log('rejected')
    }
  }
  // Legacy DApp Browsers
  else if (window.web3) {
    web3 = new Web3(web3.currentProvider);
  }
  // Non-DApp Browsers
  else {
    alert("You have to install MetaMask !");
  }
  // window.ethereum.enable();
  // console.log(" typoe of = ", typeof web3);
  // if (typeof web3 != "undefined") {
  //   this.web3Provider = web3.currentProvider;
  //   window.ethereum.enable();
  // } else {
  //   this.web3Provider = new Web3.providers.HttpProvider(
  //     "https://rinkeby.infura.io/v3/bf567dab1a2d408398fedddef254c344"
  //   );
  //   window.ethereum.enable();
  // }
} else {
  // We are on server
  const provider = new Web3.providers.HttpProvider(
        "https://rinkeby.infura.io/v3/bf567dab1a2d408398fedddef254c344"
      );
  web3 = new Web3(provider);
}


export default web3;