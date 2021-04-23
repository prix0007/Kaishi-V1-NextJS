// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract CampaignFactory {
    address[] public deployedCampaigns;
    
    function createCampaign(uint minimum) public {
        address newCampaign = address(new Campaign(minimum, msg.sender));
        deployedCampaigns.push(newCampaign);
    }
    
    function getDeployedCampaigns() public view returns (address[] memory) {
        return deployedCampaigns;
    }
}

contract Campaign {
    
    struct Request {
        string description;
        uint value;
        address recipient;
        bool completed;
        uint approvalsCount;
        mapping(address => bool) approvals;
    }
    
    uint public minimumContribution;
    address public manager;
    mapping(address => bool) public approvers;
    uint public approversCount;
    
    uint public numRequests;
    mapping (uint => Request) public requests;
    
    modifier restricted() {
        require(manager == msg.sender);
        _;
    }
    
    constructor(uint minimum, address _creator) {
        manager = _creator;
        minimumContribution = minimum;
        numRequests = 0;
        approversCount = 0;
    }
    
    function contribute() public payable {
        
        // Amount in Wei atleast requried to enter 
        require(msg.value >= minimumContribution);
        
        approvers[msg.sender] = true; 
        approversCount++;
    }
    
    function createRequest(
        string memory _description,
        uint _value,
        address _recipient
    ) public restricted {
        
        Request storage newRequest = requests[numRequests++];
        
        newRequest.description = _description;
        newRequest.value = _value;
        newRequest.recipient = _recipient;
        newRequest.completed = false;
        newRequest.approvalsCount = 0;

    }
    
    function approveRequests(uint index) public {
        
        Request storage req = requests[index];
        
        require(approvers[msg.sender]);
        require(!req.approvals[msg.sender]);
        
        req.approvals[msg.sender] = true;
        req.approvalsCount++;
        
    }
    
    function finalizeRequest(uint index) public restricted {
        Request storage req = requests[index];
        
        require(!req.completed);
        require(req.approvalsCount > (approversCount / 2));
        
        payable(req.recipient).transfer(req.value);
        req.completed = true;
    }

    function getSummary() public view returns (
      uint, uint, uint, uint, address
    ) {
      return (
        minimumContribution,
        address(this).balance,
        numRequests,
        approversCount,
        manager
      );
    }

    function getRequestsCount() public view returns (uint){
      return numRequests;
    }
    
}