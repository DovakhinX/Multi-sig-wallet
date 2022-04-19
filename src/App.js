import React, { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Multisig from "./artifacts/contracts/Multisig.sol/Multisig.json";
import Token from "./artifacts/contracts/Token.sol/Token.json";
import { ethers } from "ethers";

function App() {
  let [add, setadd] = useState("");
  let [amt, setamt] = useState(0);
  let [id, setid] = useState("");
  let multiAdd = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  let tokenAdd = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
  ////////////////////////////////////////////////////////////

  async function submit() {
    if (typeof window.ethereum !== "undefined") {
      let provider = new ethers.providers.Web3Provider(window.ethereum);
      let signer = provider.getSigner();
      let token = new ethers.Contract(tokenAdd, Token.abi, signer);
      let multisig = new ethers.Contract(multiAdd, Multisig.abi, signer);
      let data = token.interface.encodeFunctionData("transfer", [add, amt]);
      let sub = await multisig.submitTransaction(tokenAdd, 0, data);
      await balance();
    }
  }
  async function approve() {
    if (typeof window.ethereum !== "undefined") {
      let provider = new ethers.providers.Web3Provider(window.ethereum);
      let signer = provider.getSigner();
      let multisig = new ethers.Contract(multiAdd, Multisig.abi, signer);
      let app = await multisig.confirmTransaction(id);
    }
  }
  async function revoke() {
    if (typeof window.ethereum !== "undefined") {
      let provider = new ethers.providers.Web3Provider(window.ethereum);
      let signer = provider.getSigner();
      let multisig = new ethers.Contract(multiAdd, Multisig.abi, signer);
      let rev = await multisig.revokeConfirmation(id);
    }
  }
  async function execute() {
    if (typeof window.ethereum !== "undefined") {
      let provider = new ethers.providers.Web3Provider(window.ethereum);
      let signer = provider.getSigner();
      let multisig = new ethers.Contract(multiAdd, Multisig.abi, signer);
      let app = await multisig.executeTransaction(id);
      await balance();
    }
  }
  async function getTrans() {
    if (typeof window.ethereum !== "undefined") {
      let provider = new ethers.providers.Web3Provider(window.ethereum);
      let signer = provider.getSigner();
      let multisig = new ethers.Contract(multiAdd, Multisig.abi, signer);
      let get = await multisig.getTransaction(id);
      console.log(get);
      await balance();
    }
  }

  async function balance() {
    if (typeof window.ethereum !== "undefined") {
      let provider = new ethers.providers.Web3Provider(window.ethereum);
      let signer = provider.getSigner();
      let token = new ethers.Contract(tokenAdd, Token.abi, signer);
      let bal = await token.balanceOf(multiAdd);
      let item = document.getElementById("bal");
      item.innerText = bal;
    }
  }

  ////////////////////////////////////////////////////////////
  return (
    <>
      <Navbar />
      <div className="app">
        <div className="balance">
          <h3>
            Account Balance : <span id="bal"></span>
          </h3>
        </div>

        <div className="submit">
          <h2>Submit Transaction</h2>
          <label>Address</label>
          <input type="text" onChange={(e) => setadd(e.target.value)}></input>
          <br />
          <label>Amount </label>
          <input type="text" onChange={(e) => setamt(e.target.value)}></input>
          <br />
          <button onClick={submit}>Submit</button>
        </div>

        <div className="approve">
          <h2>Approve Transaction</h2>
          <label>Transaction ID </label>
          <input type="text" onChange={(e) => setid(e.target.value)}></input>
          <br />
          <button onClick={approve}>Approve</button>
        </div>

        <div className="revoke">
          <h2>Revoke Transaction</h2>
          <label>Transaction ID </label>
          <input type="text" onChange={(e) => setid(e.target.value)}></input>
          <br />
          <button onClick={revoke}>Revoke</button>
        </div>

        <div className="execute">
          <h2>Execute Transaction</h2>
          <label>Transaction ID </label>
          <input type="text" onChange={(e) => setid(e.target.value)}></input>
          <br />
          <button onClick={execute}>Execute</button>
        </div>

        <div className="gettransaction">
          <h2>Get Transaction</h2>
          <label>Transaction ID </label>
          <input type="text" onChange={(e) => setid(e.target.value)}></input>
          <br />
          <button onClick={getTrans}>Get </button>
        </div>
      </div>
    </>
  );
}

export default App;
