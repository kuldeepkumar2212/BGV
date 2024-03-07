const express = require('express');
const { Web3 } = require('web3');
const contractABI = require('../../../contracts/BGV_sol_BGV.json');

const web3 = new Web3('http://127.0.0.1:7545');
const router = express.Router();

router.post('/addUniversity', async (req, res) => {
    const contractAddress = "0x079658C95DC884F057F236fc997cb457b674Ac35";
    const contract = new web3.eth.Contract(contractABI, contractAddress);
    const gasPrice = await web3.eth.getGasPrice();

    try {
        const { name, universityAddress, licenseNumber, approvedByGov } = req.body;
        const receipt = await contract.methods.addUniversity(name, universityAddress, licenseNumber, approvedByGov).send({
            from: '0x1F419CB964eDF6cCE1fF7ebF04c2ddBB335d035F',
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
