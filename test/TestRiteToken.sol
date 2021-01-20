pragma solidity >=0.4.21 <0.7.0;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/RiteToken.sol";

contract TestRiteToken {

  function testItStoresAValue() public {
    RiteToken riteToken = RiteToken(DeployedAddresses.RiteToken());

    riteToken.set(89);

    uint expected = 89;

    Assert.equal(riteToken.get(), expected, "It should store the value 89.");
  }

}
