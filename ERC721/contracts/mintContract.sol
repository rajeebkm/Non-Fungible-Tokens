// SPDX-License-Identifier: MIT
pragma solidity ^0.8.12;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract mintContract is ERC721URIStorage,Ownable{

using Counters for Counters.Counter;
Counters.Counter private tokenId;

constructor() ERC721("MyNFT721","NFT721"){

}
function mintNFT(string memory tokenURI) public onlyOwner returns (uint256){
  tokenId.increment();
  uint256 newId = tokenId.current();
  _mint(msg.sender, newId);
  _setTokenURI(newId, tokenURI);
  return newId;

}

}