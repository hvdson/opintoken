const RiteToken = artifacts.require("./RiteToken.sol");

contract("rite token", accounts => {
  it("...should store the value 89.", async () => {
    const riteTokenInstance = await RiteToken.deployed();

    // Set value of 89
    await riteTokenInstance.set(89, { from: accounts[0] });

    // Get stored value
    const storedData = await riteTokenInstance.get.call();

    assert.equal(storedData, 89, "The value 89 was not stored.");
  });
});
