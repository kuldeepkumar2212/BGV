const {Web3} = require('web3'); // Import Web3

const express = require('express');
const fs = require('fs');
const contractABI = require('../contracts/BGV_sol_BGV.json');

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const web3 = new Web3('HTTP://127.0.0.1:7545'); // Create a new Web3 instance
    const contractByteCode = '0x' + fs.readFileSync('../contracts/BGV_sol_BGV.bin').toString();
    const contract = new web3.eth.Contract(contractABI);
    const gasPrice = await web3.eth.getGasPrice();
  
    const newContractInstance = await contract.deploy({
      data: contractByteCode
    }).send({
      from: '0x6310bB959aB21f37B926CFdBeea5eA34478e78A8', // Use one of the addresses provided by ganache-cli
      gas: 1400000 ,
      gasPrice: gasPrice // Adjust gasPrice as needed
    });
  
    console.log('Contract deployed at address: ' + newContractInstance.options.address);
    res.json({ address: newContractInstance.options.address });
  } catch (error) {
    console.error('Error deploying contract:', error);
    res.status(500).json({ error: 'Error deploying contract' });
  }
});

module.exports = router;
