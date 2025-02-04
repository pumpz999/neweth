// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract BlockchainIDM is Ownable {
    using Counters for Counters.Counter;
    
    struct Identity {
        uint256 id;
        address owner;
        string metadataURI;
        uint256 chainId; // 1 for ETH, 56 for BNB
        uint256 createdAt;
    }
    
    struct Template {
        uint256 id;
        string name;
        string description;
        string metadataTemplate;
        bool verified;
    }
    
    Counters.Counter private _identityCounter;
    Counters.Counter private _templateCounter;
    
    mapping(uint256 => Identity) public identities;
    mapping(uint256 => Template) public templates;
    mapping(address => uint256[]) public userIdentities;
    
    event IdentityCreated(uint256 indexed id, address indexed owner, uint256 chainId);
    event TemplateAdded(uint256 indexed id, string name, bool verified);
    
    constructor() {
        // Initialize with 100 verified templates
        _initializeTemplates();
    }
    
    function createIdentity(uint256 chainId, string memory metadataURI) external {
        require(chainId == 1 || chainId == 56, "Invalid chain ID");
        
        _identityCounter.increment();
        uint256 newId = _identityCounter.current();
        
        identities[newId] = Identity({
            id: newId,
            owner: msg.sender,
            metadataURI: metadataURI,
            chainId: chainId,
            createdAt: block.timestamp
        });
        
        userIdentities[msg.sender].push(newId);
        emit IdentityCreated(newId, msg.sender, chainId);
    }
    
    function getTemplate(uint256 templateId) external view returns (Template memory) {
        return templates[templateId];
    }
    
    function getAllTemplates() external view returns (Template[] memory) {
        Template[] memory allTemplates = new Template[](_templateCounter.current());
        for (uint256 i = 1; i <= _templateCounter.current(); i++) {
            allTemplates[i - 1] = templates[i];
        }
        return allTemplates;
    }
    
    function _initializeTemplates() private onlyOwner {
        // Add 100 verified templates
        for (uint256 i = 1; i <= 100; i++) {
            _templateCounter.increment();
            templates[i] = Template({
                id: i,
                name: string(abi.encodePacked("Verified Template #", Strings.toString(i))),
                description: string(abi.encodePacked("Pre-verified identity template for various use cases #", Strings.toString(i))),
                metadataTemplate: string(abi.encodePacked("ipfs://template-metadata/", Strings.toString(i))),
                verified: true
            });
            emit TemplateAdded(i, templates[i].name, true);
        }
    }
}
