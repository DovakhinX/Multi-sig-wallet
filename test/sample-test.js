const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Multisig", function () {
 

  it("", async () => {
    const [, owner1, owner2, owner3, owner4, owner5,owner6,owner7,owner8,owner9,owner10,tokensReceiver] =
      await ethers.getSigners();

    const wantNumConfirmationsRequired = 5;
    const wantOwners = [
      
      owner1.address,
      owner2.address,
      owner3.address,
      owner4.address,
      owner5.address,
      owner6.address,
      owner7.address,
      owner8.address,
      owner9.address,
      owner10.address,
      

    ];

    const MultisigFactory = await ethers.getContractFactory("Multisig");
    const multisigInstance = await MultisigFactory.deploy(
      wantOwners,
      wantNumConfirmationsRequired
    );

    const gotOwners = await multisigInstance.getOwners();
    expect(gotOwners.length).to.equal(wantOwners.length);
    expect(gotOwners).to.have.members(wantOwners);
    console.log("List of owners", gotOwners);

    const gotNumConfirmationsRequired =
      await multisigInstance.numConfirmationsRequired();
    expect(gotNumConfirmationsRequired).to.equal(wantNumConfirmationsRequired);

    const TokenFactory = await ethers.getContractFactory("AlexToken");
    const Token = await TokenFactory.deploy();

    const wantMultisigBalance = 1000;
    await Token.mint(multisigInstance.address, wantMultisigBalance);
    const walletbal = await Token.balanceOf(multisigInstance.address);
    expect(walletbal).to.equal(
      wantMultisigBalance
    );
    console.log("Multi sig balance", parseInt(walletbal))

    const multisigSendTokenAmount = 500;
    const calldata = Token.interface.encodeFunctionData("transfer", [
      tokensReceiver.address,
      multisigSendTokenAmount,
    ]);

    await multisigInstance
      .connect(owner1)
      .submitTransaction(Token.address, 0, calldata);
    let [, , , executed, numConfirmations] =
      await multisigInstance.getTransaction(0);
    expect(executed).to.equal(false);
    expect(numConfirmations.toNumber()).to.equal(0);

    await multisigInstance.connect(owner3).confirmTransaction(0);
    await multisigInstance.connect(owner4).confirmTransaction(0);
    await multisigInstance.connect(owner5).confirmTransaction(0);
    await multisigInstance.connect(owner6).confirmTransaction(0);
    await multisigInstance.connect(owner7).confirmTransaction(0);



    [, , , executed, numConfirmations] = await multisigInstance.getTransaction(
      0
    );
    expect(executed).to.equal(false);
    expect(numConfirmations.toNumber()).to.equal(5);
    

    await multisigInstance.connect(owner5).executeTransaction(0);
    [, , , executed, numConfirmations] = await multisigInstance.getTransaction(
      0
    );
    expect(executed).to.equal(true);
    expect(numConfirmations.toNumber()).to.equal(5);
    console.log("First transaction executed", await multisigInstance.getTransaction(0));

    expect(await Token.balanceOf(multisigInstance.address)).to.equal(
      wantMultisigBalance - multisigSendTokenAmount
    );
    console.log("Multi sig balance", parseInt(await Token.balanceOf(multisigInstance.address)))
    expect(await Token.balanceOf(tokensReceiver.address)).to.equal(
      multisigSendTokenAmount
    );
    console.log("Receiver balance",tokensReceiver.address, parseInt(await Token.balanceOf(tokensReceiver.address)))

  });
});
