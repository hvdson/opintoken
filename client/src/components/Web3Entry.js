import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"
import RiteToken from "../contracts/RiteToken.json";
import getWeb3 from "../getWeb3";
import "../App.css";

function Web3Entry() {
  // --------------------------------------------- 
  // setstate for the associated parts
  // --------------------------------------------- 
  async function tryCatchInitWeb3Procedure(proc) {
    try {
      let [data, identity] = await proc();
      if (identity === "web3") {
        setWeb3(data)
      } else if (identity === "accounts") {
        setAccounts(data)
      } else {
        setContract(data)
      }
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts or contract Check console for details.`,
      );
      console.error(error);
    }
  }

  // --------------------------------------------- 
  // initialize & modularize every dependency
  //  - functions should be executed procedurally starting from initWeb3
  // --------------------------------------------- 
  async function initWeb3() {
    const loadWeb3 = await getWeb3();
    return [loadWeb3, "web3"];
  }

  // everything below depends on web3 being initialized
  async function initAccounts() {
    const loadAccounts = await web3.eth.getAccounts();
    return [loadAccounts, "accounts"];
  }

  async function initContract() {
    const loadNetworkId = await web3.eth.net.getId();
    const deployedNetwork = RiteToken.networks[loadNetworkId];
    const instance = new web3.eth.Contract(
      RiteToken.abi,
      deployedNetwork && deployedNetwork.address,
    );
    return [instance, "contract"]
  }

  // ------------------------------------------
  // run all functions in each useEffect
  // ------------------------------------------
  // execute and initialize web3 componentDidMount

  let [web3, setWeb3] = useState(null)
  useEffect(() => {
    (async () => {
      await tryCatchInitWeb3Procedure(initWeb3);
    })()
  }, [])

  let [accounts, setAccounts] = useState(null)
  useEffect(() => {
    if (web3) {
      (async () => {
        await tryCatchInitWeb3Procedure(initAccounts);
      })()
    }
  }, [web3])

  let [contract, setContract] = useState(null)
  useEffect(() => {
    if (accounts) {
      (async () => {
        await tryCatchInitWeb3Procedure(initContract);
      })()
    }
  }, [accounts])

  useEffect(() => {
    if (contract) {
      runExample()
    }
  }, [contract])
 
  let [storageValue, setStorageValue] = useState(0)
  const runExample = async () => {
    // Stores a given value, 5 by default.
    await contract.methods.set(5).send({ from: accounts[0] });
    // Get the value from the contract to prove it worked.
    const response = await contract.methods.get().call();
    setStorageValue(response)
  }

  if (!web3) {
    console.log(web3)
    return (
      <div>
        Loading Web3, accounts, and contract...
        <button onClick={handleReload}>click to reload</button>
      </div>
    );
  }

  function handleReload() {
    console.log('hi')
    tryCatchInitWeb3Procedure(initWeb3);
  }

  return (
    <div className="App">
      <button>
        <Link to="/">Homepage</Link>
      </button>
      <button>
        Start Web3
      </button>
      
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

export default Web3Entry;