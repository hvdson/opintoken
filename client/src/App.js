import React, { useState, useEffect } from "react";
import SimpleStorageContract from "./contracts/SimpleStorage.json";
import getWeb3 from "./getWeb3";

import "./App.css";

// storageValue: 0, web3: null, accounts: null, contract: null 

function App() {
  let [storageValue, setStorageValue] = useState(0)
  let [web3, setWeb3] = useState(null)
  let [accounts, setAccounts] = useState(null)
  let [contract, setContract] = useState(null)
  let [loaded, setLoaded] = useState(false);
  
  const runExample = async () => {
    // Stores a given value, 5 by default.
    await contract.methods.set(5).send({ from: accounts[0] });

    // Get the value from the contract to prove it worked.
    const response = await contract.methods.get().call();

    // Update state with the result.
    setStorageValue(response);
  };


  useEffect(() =>  {
    const web3Loader = async () => {
      try {
        // Get network provider and web3 instance.
        const loadWeb3 = await getWeb3();

        // Use web3 to get the user's accounts.
        const loadAccounts = await loadWeb3.eth.getAccounts();
        // Get the contract instance.
        const loadNetworkId = await loadWeb3.eth.net.getId();
        const deployedNetwork = SimpleStorageContract.networks[loadNetworkId];
        const instance = new loadWeb3.eth.Contract(
          SimpleStorageContract.abi,
          deployedNetwork && deployedNetwork.address,
        );

        // Set web3, accounts, and contract to the state, and then proceed with an
        // example of interacting with the contract's methods.
        // this.setState({ web3, accounts, contract: instance });
        setWeb3(loadWeb3)
        setAccounts(loadAccounts)
        setContract(instance)
          
        // console.log(web3, accounts, instance)
      } catch (error) {
        // Catch any errors for any of the above operations.
        alert(
          `Failed to load web3, accounts, or contract. Check console for details.`,
        );
        console.error(error);
      }
    }
    web3Loader().then(()=> {
      setLoaded(true)
    })
  }, [contract])

  useEffect(() => {
    if (loaded) {
      runExample();
    }
  }, [loaded])

  if (!web3) {
    return <div>Loading Web3, accounts, and contract...</div>;
  }
  return (
    <div className="App">
      <h1>Good to Go!</h1>
      <p>Your Truffle Box is installed and ready.</p>
      <h2>Smart Contract Example</h2>
      <p>
        If your contracts compiled and migrated successfully, below will show
        a stored value of 5 (by default).
      </p>
      <p>
        Try changing the value stored on <strong>line 40</strong> of App.js.
      </p>
      <div>The stored value is: {storageValue}</div>
    </div>
  );
}

export default App;
