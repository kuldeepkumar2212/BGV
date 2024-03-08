## Install All the dependencies
- `npm i`

## Truffle compile
- `truffle compile`

## Hardhat compile
- `npx hardhat compile`

## Deploy the contract using HardHat on the port '8545' or '7545'(Ganache)
- `npx hardhat run deploy.js --network development`

## In another terminal run hardhat network
- `npx hardhat node`
### copy the contract address and sender address

# ------------RUNNING BACKEND---------------

## Open another terminal

## Open postMan or Insomnia

## Run the node file
- 'node server.js'

- config for 'adding university' by admin as 'http://localhost:3000/admin/addUniversity' in postman in POST method with 'raw' body values as -
    sample values -
   `{
    "name": "MIaT", 
    "universityAddress":"0x1F419CB964eDF6cCE1fF7ebF04c2ddBB335d035F" , 
    "licenseNumber":"abfss" ,
    "approvedByGov": true
}`
- Click on 'Send' and check the console and Ganache
- Watch the first terminal about the contract call and creation
