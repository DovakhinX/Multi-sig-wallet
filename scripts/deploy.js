
const hre = require("hardhat");

async function main() {
 
  const Multisig = await hre.ethers.getContractFactory("Multisig");
  const multisig = await Multisig.deploy(['0x8626f6940e2eb28930efb4cef49b2d1f2c9c1199','0xdd2fd4581271e230360230f9337d5c0430bf44c0','0xbda5747bfd65f08deb54cb465eb87d40e51b197e','0x2546bcd3c84621e976d8185a91a922ae77ecec30','0xcd3b766ccdd6ae721141f452c550ca635964ce71'],3);

  await multisig.deployed();

  console.log("Multisig deployed to:", multisig.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
