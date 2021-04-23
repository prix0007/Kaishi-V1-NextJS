import web3 from './web3';

import CampaignFactory from './build/CampaignFactory.json';

const parsedCampaignFactory = JSON.parse(CampaignFactory);

const DEPLOYED_ADDRESS = "0x547F2777219dC09F2eD8640ddf6104cA7fAF05F1";

const instance = new web3.eth.Contract(
  parsedCampaignFactory.abi,
  DEPLOYED_ADDRESS
)

export default instance;