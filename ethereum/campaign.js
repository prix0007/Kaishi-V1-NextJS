import web3 from './web3';
import Campaign from './build/Campaign.json';

const parsedCampaign = JSON.parse(Campaign);

const createInstance = (address) => {
  return new web3.eth.Contract(
    parsedCampaign.abi,
    address
  )
}

export default createInstance;