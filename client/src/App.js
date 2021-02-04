import React, { useState, useEffect } from "react";
import { 
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom"

import Homepage from "./components/Homepage"
import Web3Entry from "./components/Web3Entry";
import RiteToken from "./contracts/RiteToken.json";
import getWeb3 from "./getWeb3";

import "./App.css";

function App() {
  return (
    <div>
      <Switch>
        <Route path="/web3">
          <Web3Entry />
        </Route>
        <Route path="/">
          <Homepage />
        </Route>
      </Switch>
    </div>
  );
}

export default App;