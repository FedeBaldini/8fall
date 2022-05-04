const hre = require("hardhat");

async function main() {
  const _8Fall = await hre.ethers.getContractFactory("_8Fall");
  const _8fall = await _8Fall.deploy();

  await _8fall.deployed();

  console.log("8Fall deployed to:", _8fall.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
