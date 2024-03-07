// Import necessary modules
const {ethers} = require('hardhat');

async function getBytecode() {
    // Compile the contract
    await run('compile');

    // Access the compiled artifacts
    const BGVContract = await ethers.getContractFactory('../contracts/BGV.json');
    const bytecode = BGVContract.bytecode;

    return bytecode;
}

module.exports = getBytecode
