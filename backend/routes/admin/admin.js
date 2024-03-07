const express = require('express');
const {Web3} = require('web3');
const contractABI = require('../../../build/contracts/BGV_sol_BGV.json');

const web3 = new Web3('http://127.0.0.1:7545');
const router = express.Router();

router.post('/addUniversity', async (req, res) => {
    const contractAddress = "0x5D2C44338E58185d8a154d7889eB58Ab674BF4E0";
    const contract = new web3.eth.Contract(contractABI, contractAddress);
    const gasPrice = await web3.eth.getGasPrice();

    try {
        const { name, universityAddress, licenseNumber, approvedByGov } = req.body;
        const receipt = await contract.methods.addUniversity(name, universityAddress, licenseNumber, approvedByGov).send({
            from: '0x6310bB959aB21f37B926CFdBeea5eA34478e78A8',
            gas: '0x28000', // 40,000 gas
            gasPrice: '0x3B9ACA00',
        });

        console.log(receipt);
        res.json(receipt);
    } catch (error) {
        // Check if the error is due to a reverted transaction
        if (error.receipt && error.receipt.status === false) {
            res.status(400).json({  error});
        } else {
            res.status(500).json({ error: 'Internal server error', error });
        }
    }
});

module.exports = router;
