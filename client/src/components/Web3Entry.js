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
      console.log('Contract loaded!')
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
    return (
      <div>
        Loading Web3, accounts, and contract...
      </div>
    );
  }

  return (
    <div className="App">
      <Link to="/">
        <button className="app-button">
          Homepage
        </button>
      </Link>
      <h1>Ritual Token</h1>


      <button onClick={runExample} className="app-button">
        example send 
      </button>
      
      <div className="container">
        <div className="cell cell-1">1.</div>
        <div className="cell cell-2">2.</div>
        <div className="cell cell-3">3.</div>
        <div className="cell cell-4">4.</div>
        <div className="cell cell-5">5.</div>
        <div className="cell cell-6">6.</div>
        <div className="cell cell-7">7.</div>
        <div className="cell cell-8">8.</div>
        <div className="cell cell-9">9.</div>
      </div>
    </div>
  );
}

export default Web3Entry;