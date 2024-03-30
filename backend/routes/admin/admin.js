const express = require('express');
const { Web3 } = require('web3');
const contractABI = require('../../../contracts/BGV_sol_BGV.json');

const web3 = new Web3('http://127.0.0.1:7545');
const router = express.Router();

router.post('/addUniversity', async (req, res) => {
    const contractAddress = "0xBEC6a6C99AF35E5902C4a6DEFf6DB0e42302981E";
    const contract = new web3.eth.Contract(contractABI, contractAddress);
    const gasPrice = await web3.eth.getGasPrice();

    try {
        const { name, universityAddress, licenseNumber, approvedByGov } = req.body;
        const receipt = await contract.methods.addUniversity(name, universityAddress, licenseNumber, approvedByGov).send({
            from: '0x5Ad37993A8b46938CB47636a7CD0686d0b98fe7a',
            gas: '0x28000', // 40,000 gas
            gasPrice: '0x3B9ACA00',
        });

        console.log(receipt);
        res.json(receipt);
    } catch (error) {
        // Check if the error is due to the UniversityAlreadyExists event
        if (error && error.events && error.events.UniversityAlreadyExists) {
            res.status(400).json({ err: 'University already exists', error });
        } else {
            res.status(500).json({ error: 'Internal server error', error });
        }
    }
});

module.exports = router;
