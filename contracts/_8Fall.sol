// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;


import '@openzeppelin/contracts/token/ERC721/ERC721.sol';
import '@openzeppelin/contracts/access/Ownable.sol';


contract _8Fall is ERC721, Ownable {
  uint256 public mintPrice;
  uint256 public totalSupply;
  uint256 public maxSupply;
  uint256 public maxPerWallet;
  bool public isPublicMintEnabled;
  string internal baseTokenUri;
  address payable public withdrawWallet;
  mapping(address => uint256) public walletMints;

  constructor() payable ERC721('8 Fall', '8F') {
    mintPrice = 0.001 ether;
    totalSupply = 0;
    maxSupply = 100;
    maxPerWallet = 5;
    withdrawWallet = payable(0x7Cac73c29B3091BfEA5E8191A11F21283679b482);  
  }

  function setIsPublicMintEnabled(bool isPublicMintEnabled_) external onlyOwner {
    isPublicMintEnabled = isPublicMintEnabled_;
  }

  function setBaseTokenUri(string calldata baseTokenUri_) external onlyOwner {
    baseTokenUri = baseTokenUri_;
  }

  function tokenUri(uint256 tokenId_) public view returns (string memory) {
    require(_exists(tokenId_), 'Token does not exist!');
    return string(abi.encodePacked(baseTokenUri, Strings.toString(tokenId_), ".json"));
  }

  function mint(uint256 quantity_) public payable {
    require(isPublicMintEnabled, 'Minting not enabled');
    require(msg.value == quantity_ * mintPrice, 'Wrong mint value');
    require(totalSupply + quantity_ <= maxSupply, 'Sold out');
    require(walletMints[msg.sender] + quantity_ <= maxPerWallet, 'Exceed max wallet');

    for (uint256 i = 0; i < quantity_; i++ ) {
      uint256 newTokenId = totalSupply + 1;
      totalSupply ++;
      _safeMint(msg.sender, newTokenId);
    }
  }

}