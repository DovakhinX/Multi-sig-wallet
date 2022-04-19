const hre = require("hardhat");
const { ethers } = require("hardhat");
async function main() {
  const [owner1, , owner3, owner4, owner5, owner6] = await ethers.getSigners();
  const owners = [
    owner1.address,
    owner3.address,
    owner4.address,
    owner5.address,
    owner6.address,
  ];
  console.log(owners);
  const Multisig = await hre.ethers.getContractFactory("Multisig");
  const multisig = await Multisig.deploy(owners, 3);
  await multisig.deployed();
  console.log("Multisig deployed to:", multisig.address);

  const Token = await hre.ethers.getContractFactory("Token");
  const token = await Token.deploy();
  await token.deployed();
  console.log("Token deployed to:", token.address);
  const mint = await token.mint(multisig.address, 10000);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
