const { ethers } = require("hardhat");

async function main() {
  const BGV = await ethers.getContractFactory("BGV"); // Replace "BGV" with your contract name
  const contract = await BGV.deploy();
  await contract.deployed();
  console.log("Contract deployed to:", contract.address);
}

main().then(() => process.exit(0)).catch(error => {
  console.error(error);
  process.exit(1);
});
