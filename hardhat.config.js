require("@nomiclabs/hardhat-waffle");

module.exports = {
  solidity: "0.8.17",
  networks: {
    development: {
      url: "http://127.0.0.1:7545",
      chainId: 1337 // Update chain ID to match your local network
    }
  }
};
