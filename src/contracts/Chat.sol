// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Chat {
  struct Message {
    address sender;
    string content;
    uint256 timestamp;
    uint256 expiration;
  }

  mapping(uint256 => Message[]) public messages;
  address public admin;

  event MessageSent(uint256 indexed listingId, address indexed sender, string content);
  event MessageExpired(uint256 indexed listingId, uint256 index);

  modifier onlyAdmin() {
    require(msg.sender == admin, "Only admin");
    _;
  }

  constructor() {
    admin = msg.sender;
  }

  function sendMessage(uint256 listingId, string memory content, uint256 duration) external {
    messages[listingId].push(Message({
      sender: msg.sender,
      content: content,
      timestamp: block.timestamp,
      expiration: block.timestamp + duration
    }));
    
    emit MessageSent(listingId, msg.sender, content);
  }

  function getMessages(uint256 listingId) external view returns (Message[] memory) {
    return messages[listingId];
  }

  function cleanExpiredMessages(uint256 listingId) external {
    uint256 i = 0;
    while (i < messages[listingId].length) {
      if (block.timestamp >= messages[listingId][i].expiration) {
        emit MessageExpired(listingId, i);
        messages[listingId][i] = messages[listingId][messages[listingId].length - 1];
        messages[listingId].pop();
      } else {
        i++;
      }
    }
  }

  function setAdmin(address newAdmin) external onlyAdmin {
    admin = newAdmin;
  }
}
