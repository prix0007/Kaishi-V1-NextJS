const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');

const web3 = new Web3(ganache.provider());
const compiledFactory = require('../ethereum/build/CampaignFactory.json');
const compiledCampaign = require('../ethereum/build/Campaign.json');

const parsedFactory = JSON.parse(compiledFactory);
const parsedCampaign = JSON.parse(compiledCampaign);

let accounts, factory, campaignAddress, campaign;

beforeEach(async () => {
  accounts = await web3.eth.getAccounts();

  // Use one of those accounts to deploy the contract
  factory = await new web3.eth.Contract(parsedFactory.abi).deploy({
    data: "0x" + parsedFactory.evm.bytecode.object
  }).send({
    from: accounts[0],
    gas: '1000000'
  })

  await factory.methods.createCampaign(web3.utils.toWei('0.01', 'ether')).send({
    from: accounts[0],
    gas: '1000000'
  });

  [campaignAddress] = await factory.methods.getDeployedCampaigns().call();

  campaign = await new web3.eth.Contract(
    parsedCampaign.abi,
    campaignAddress
  );

})

describe('Campaigns', () => {
  it('deploys a factory and a campaign', () => {
    assert.ok(factory.options.address);
    assert.ok(campaign.options.address);
  });

  it('marks caller as the campaign manager', async () => {
    const testManagerAddress = await campaign.methods.manager().call();
    assert.strictEqual(accounts[0], testManagerAddress);
  });

  it('allows people to contribute money and marks them as approvers', async () => {
    await campaign.methods.contribute().send({
      value: web3.utils.toWei('0.1','ether'),
      from: accounts[1]
    });

    const isContributor = await campaign.methods.approvers(accounts[1]).call();

    assert(isContributor);
  });

  it('requries people to contribute more than minimum amount else revert txn', async () => {
    try {
      await campaign.methods.contribute().send({
        from: accounts[1],
        value: '100'
      })
    } catch (e) {
      assert(e);
    }
  })

  it('allows a manager to make a payment request', async () => {
    await campaign.methods.createRequest(
        'Buy Batteries',
        '10',
        accounts[2]
      ).send({
        from: accounts[0],
        gas: '1000000'
      });
    
    const request = await campaign.methods.requests(0).call();
    assert.strictEqual('Buy Batteries', request.description);
  })

  it('processes requests', async () => {

    let previousBalance = await web3.eth.getBalance(accounts[2]);
    previousBalance = web3.utils.fromWei(previousBalance, 'ether');
    previousBalance = parseFloat(previousBalance);
    
    await campaign.methods.contribute().send({
        from: accounts[0],
        value: web3.utils.toWei('10', 'ether')
      });

    await campaign.methods.createRequest(
        'A',
        web3.utils.toWei('5', 'ether'),
        accounts[2]
      ).send({
        from: accounts[0],
        gas: '1000000'
      });

    await campaign.methods.approveRequests(0).send({
        from: accounts[0],
        gas: '1000000'
      })
    
    await campaign.methods.finalizeRequest(0).send({
        from: accounts[0],
        gas: '1000000'
      })

    let balance = await web3.eth.getBalance(accounts[2]);
    balance = web3.utils.fromWei(balance, 'ether');
    balance = parseFloat(balance);
    // Since transaction causes gas burn so balance will be slightly less than 105
    // ganache-cli initializes all accounts with 100 ethers
    assert(balance > previousBalance + 4);

  })

})