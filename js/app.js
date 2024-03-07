// app.js

const express = require('express');
const { Web3 } = require('web3');
const fs = require('fs');
//const ipfsClient = require('ipfs-http-client');

const app = express();
const web3 = new Web3('http://localhost:7545'); // Connect to Ganache
//const ipfs = ipfsClient.create(); // Connect to IPFS

// Contract ABI and Address (replace with your actual ABI and address)
const contractABI = JSON.parse(fs.readFileSync('C:/Users/91988/Documents/BGV/build/contracts/BGV.json', 'utf8')); // Path to your ABI file
const contractAddress = '0x92326909a7a1e0659Da109C45ded8C07cA40F9e6';

// Initialize contract instance
const contract = new web3.eth.Contract(contractABI, contractAddress);

// Serve frontend files
app.use(express.static('public'));

// Middleware to parse JSON bodies
app.use(express.json());

// Route to add a student
app.post('/addStudent', async (req, res) => {
    const { name, address } = req.body;
    try {
        const accounts = await web3.eth.getAccounts();
        await contract.methods.addStudent(name, address).send({ from: accounts[0] });
        res.status(200).json({ message: 'Student added successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to add student' });
    }
});

// Route to add a document
app.post('/addDocument', async (req, res) => {
    const { studentAddress, documentName, hashValue } = req.body;
    try {
        const accounts = await web3.eth.getAccounts();
        await contract.methods.addDocumentToStudent(studentAddress, documentName, hashValue).send({ from: accounts[0] });
        res.status(200).json({ message: 'Document added successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to add document' });
    }
});

// Route to get documents for a student
app.get('/getDocuments/:studentAddress', async (req, res) => {
    const studentAddress = req.params.studentAddress;
    try {
        const result = await contract.methods.getDocumentDetails(studentAddress).call();
        res.status(200).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to get documents' });
    }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
