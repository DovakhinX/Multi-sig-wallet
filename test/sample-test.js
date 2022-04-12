const { expect } = require("chai");
const { ethers } = require("hardhat");

describe('Multi-Test',function(){
    it("get all owners",async function (){
      const signers = await ethers.getSigners();
      let Retro =await ethers.getContractFactory('Retro');
      let retro=await Retro.connect(signers[19]).deploy("Retro","RTO");
      await retro.deployed();
console.log(retro.address);
let supply=await retro.totalSupply();
console.log(supply);



     

      let  Multisig = await ethers.getContractFactory('Multisig');
     let  multisig=await Multisig.deploy(['0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266','0x70997970c51812dc3a010c7d01b50e0d17dc79c8','0x3c44cdddb6a900fa2b585dd299e03d12fa4293bc','0x90f79bf6eb2c4f870365e785982e1f101e93b906','0x15d34aaf54267db7d7c367839aaf71a00a2c6a65'],3);
     await multisig.deployed();
console.log(multisig.address);

let transfer=await retro.transfer("0x5FbDB2315678afecb367f032d93F642f64180aa3",100);

 let txnown=await multisig.getOwners();
     console.log(txnown);

     
     const data = retro.interface.encodeFunctionData( 'transferFrom(address,address,uint256)',["0x5FbDB2315678afecb367f032d93F642f64180aa3","0x9965507d1a55bcc2695c58ba16fb37d819b0a4dc",50]);
     console.log(data);

    let submit=await multisig.submitTransaction('0x9965507d1a55bcc2695c58ba16fb37d819b0a4dc',50,data,{from:signers[0].address} )
     
    let list= await multisig.getTransactionCount();
    console.log(list);

 

  let approve1=await multisig.confirmTransaction(0);
  let approve2=await multisig.connect(signers[1]).confirmTransaction(0);
  let approve3=await multisig.connect(signers[2]).confirmTransaction(0);
  let approve4=await multisig.connect(signers[3]).confirmTransaction(0);



  let get=await multisig.getTransaction('0');
  console.log(get);
       

 let execute=await multisig.executeTransaction(0);

  

    })
})
