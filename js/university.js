window.addEventListener('load', async () => {
    // Check if MetaMask is installed
    if (typeof window.ethereum !== 'undefined') {
        window.web3 = new Web3(window.ethereum);
        await window.ethereum.enable(); // Request account access
    } else {
        console.log('MetaMask is not installed');
    }

    // Load the ABI from the JSON file
    const response = await fetch('build/contracts/BGV.json');
    const contractAbi = await response.json();

    const contractAddress = '0x92326909a7a1e0659Da109C45ded8C07cA40F9e6'; // Replace with your contract address
    const contractInstance = new web3.eth.Contract(contractAbi, contractAddress);

    document.getElementById('addStudentForm').addEventListener('submit', async (event) => {
        event.preventDefault();

        const name = document.getElementById('name').value;
        const address = document.getElementById('address').value;

        try {
            const accounts = await web3.eth.getAccounts();
            const addedBy = accounts[0]; // Using the first account for simplicity, you might want to change this

            await contractInstance.methods.addStudent(name, address).send({from: addedBy});

            alert('Student added successfully');
            document.getElementById('addStudentForm').reset();
        } catch (error) {
            console.error('Error adding student:', error);
            alert('Error adding student. Please check the console for details.');
        }
    });
});
