// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract TokenMarketplace {
  struct Listing {
    address seller;
    address tokenAddress;
    uint256 amount;
    uint256 price;
    bool isActive;
  }

  struct NFTListing {
    address seller;
    address nftAddress;
    uint256 tokenId;
    uint256 price;
    bool isActive;
  }

  struct P2PTrade {
    address initiator;
    address counterparty;
    address tokenAddress;
    uint256 amount;
    uint256 price;
    bool initiatorApproved;
    bool counterpartyApproved;
    bool isActive;
  }

  struct FeeSettings {
    uint256 ethTokenFee;
    uint256 ethNFTFee;
    uint256 bnbTokenFee;
    uint256 bnbNFTFee;
    uint256 p2pFee;
  }

  uint256 public listingCount;
  uint256 public nftListingCount;
  uint256 public p2pTradeCount;
  mapping(uint256 => Listing) public tokenListings;
  mapping(uint256 => NFTListing) public nftListings;
  mapping(uint256 => P2PTrade) public p2pTrades;
  FeeSettings public fees;
  address public admin;

  event TokenListed(uint256 indexed listingId, address indexed seller, address tokenAddress, uint256 amount, uint256 price);
  event NFTSold(uint256 indexed listingId, address indexed buyer, uint256 price);
  event TokenSold(uint256 indexed listingId, address indexed buyer, uint256 price);
  event P2PTradeCreated(uint256 indexed tradeId, address indexed initiator, address tokenAddress, uint256 amount, uint256 price);
  event P2PTradeCompleted(uint256 indexed tradeId);
  event FeesUpdated(uint256 ethTokenFee, uint256 ethNFTFee, uint256 bnbTokenFee, uint256 bnbNFTFee, uint256 p2pFee);

  modifier onlyAdmin() {
    require(msg.sender == admin, "Only admin");
    _;
  }

  constructor() {
    admin = msg.sender;
    fees = FeeSettings({
      ethTokenFee: 100, // 1%
      ethNFTFee: 200, // 2%
      bnbTokenFee: 100, // 1%
      bnbNFTFee: 200, // 2%
      p2pFee: 150 // 1.5%
    });
  }

  function updateFees(uint256 ethTokenFee, uint256 ethNFTFee, uint256 bnbTokenFee, uint256 bnbNFTFee, uint256 p2pFee) external onlyAdmin {
    fees = FeeSettings({
      ethTokenFee: ethTokenFee,
      ethNFTFee: ethNFTFee,
      bnbTokenFee: bnbTokenFee,
      bnbNFTFee: bnbNFTFee,
      p2pFee: p2pFee
    });
    emit FeesUpdated(ethTokenFee, ethNFTFee, bnbTokenFee, bnbNFTFee, p2pFee);
  }

  function createP2PTrade(address tokenAddress, uint256 amount, uint256 price, address counterparty) external {
    require(amount > 0, "Amount must be greater than 0");
    require(price > 0, "Price must be greater than 0");
    require(counterparty != address(0), "Invalid counterparty");

    IERC20(tokenAddress).transferFrom(msg.sender, address(this), amount);

    p2pTradeCount++;
    p2pTrades[p2pTradeCount] = P2PTrade({
      initiator: msg.sender,
      counterparty: counterparty,
      tokenAddress: tokenAddress,
      amount: amount,
      price: price,
      initiatorApproved: false,
      counterpartyApproved: false,
      isActive: true
    });

    emit P2PTradeCreated(p2pTradeCount, msg.sender, tokenAddress, amount, price);
  }

  function approveP2PTrade(uint256 tradeId) external payable {
    P2PTrade storage trade = p2pTrades[tradeId];
    require(trade.isActive, "Trade is not active");
    require(msg.sender == trade.initiator || msg.sender == trade.counterparty, "Not authorized");

    if (msg.sender == trade.initiator) {
      trade.initiatorApproved = true;
    } else {
      require(msg.value >= trade.price, "Insufficient payment");
      trade.counterpartyApproved = true;
    }

    if (trade.initiatorApproved && trade.counterpartyApproved) {
      uint256 fee = (trade.price * fees.p2pFee) / 10000;
      uint256 sellerAmount = trade.price - fee;

      trade.isActive = false;
      payable(trade.initiator).transfer(sellerAmount);
      IERC20(trade.tokenAddress).transfer(trade.counterparty, trade.amount);

      emit P2PTradeCompleted(tradeId);
    }
  }

  // ... rest of existing functions ...
}
