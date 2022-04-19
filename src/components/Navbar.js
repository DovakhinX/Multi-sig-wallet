import React from "react";
import "./Navbar.css";
import { ethers } from "ethers";


function Navbar() {
  async function connect() {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const accounts = await provider.send("eth_requestAccounts", []);
      const account = accounts[0];
      document.getElementById("acc").textContent = account;
     
    }
  }

  return (
    <div className="navbar">
      <h2>Multi-sig Wallet</h2>
      <h4>
        Account:<span id="acc"></span>
      </h4>
      <button className="button-50" role="button" onClick={connect}>
        CONNECT WALLET
      </button>
    </div>
  );
}

export default Navbar;
