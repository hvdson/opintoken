// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <0.7.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract RiteToken is ERC721 {
  uint storedData;

  constructor() public ERC721("RitualToken", "RITE") {}

  function set(uint x) public {
    storedData = x;
  }

  function get() public view returns (uint) {
    return storedData;
  }

}
