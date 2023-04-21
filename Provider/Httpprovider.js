const ethers = require('ethers')


const ProviderHTTP = new ethers.JsonRpcProvider(
    "https://eth.llamarpc.com"
  );

module.exports = {ProviderHTTP}