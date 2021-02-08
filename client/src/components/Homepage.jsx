import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "../App.css";

function Homepage() {
  let history = useHistory();

  const handleClick = (e) => {
    history.push("/web3")
    window.location.reload()
  }

  return (
    <div className="App">
      <h1>Yooo this the homepage sick right</h1>
      <button onClick={handleClick}>go to web3</button>
    </div>
  );
}

export default Homepage;

