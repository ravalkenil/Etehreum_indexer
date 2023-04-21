const fs = require('fs');
const Web3 =require("web3")
const axios = require('axios');
const { request } = require('http');
const { MongoClient } = require("mongodb");
const mongodb = new MongoClient("mongodb://localhost:27017");


const address="0xdAC17F958D2ee523a2206206994597C13D831ec7";
const address1="0xE592427A0AEce92De3Edee1F18E0157C05861564";
const address2="0xEfF92A263d31888d860bD50809A8D171709b7b1c";

const apiKey="SE3DDP8B6I99S34ZMXJHRC9MCI83HMQGZ9"
const url=`https://api.etherscan.io/api?module=contract&action=getsourcecode&address=${address}&apikey=${apiKey}`
// const url1=`https://api.etherscan.io/api?module=contract&action=getabi&address=${address}&apikey=${apiKey}`
// const url2=`https://api.etherscan.io/api?module=contract&action=getabi&address=${address}&apikey=${apiKey}`
// const url3=`https://api.etherscan.io/api?module=contract&action=getabi&address=${address}&apikey=${apiKey}`
// const url4=`https://api.etherscan.io/api?module=contract&action=getabi&address=${address}&apikey=${apiKey}`
// const url5=`https://api.etherscan.io/api?module=contract&action=getabi&address=${address}&apikey=${apiKey}`
// // // const url = `${alchemyBaseUrl}?module=contract&action=getabi&address=${address}`;

// setTimeout(()=>{
const getabi=async ()=>{
  await mongodb.connect();
  console.log("connected to mongodb");
  const EthereumIndexerDB = mongodb.db("ethereum-indexer");
  const BlocksCollection = EthereumIndexerDB.collection("abi1");

    const res=await axios.get(url)
    // console.log(res);
    const result=res.data.result
    console.log(result);
    const Abi=result[0].ABI
    console.log(Abi);
    const Contractname=result[0].ContractName
    console.log(Contractname);
    // var obj = {[ address ] :abi};
    var obj = {Address:address,Abi:Abi,ContractName:Contractname};
    // var obj = {Address:address};
    // JSON.stringify(abi)
    BlocksCollection.insertOne(obj)
    console.log("inserted");
    // var obj1=[]
    // var obj = {[ address ] :abi};
    // obj1.push(obj) 
    // obj[ address ] = abi;   
    // fs.appendFileSync('abifethcher.json',JSON.stringify(obj1));

}
// getabi()
// },10000)

setInterval(getabi,6000);




// const Web3 = require('web3');
// const web3 =new Web3("https://mainnet.infura.io/v3/f1f504479c2742638da463f12193e687")
// const ethers = require('ethers')
// const fs=require('fs')
// const path = require('path')
// const abiDecoder = require('abi-decoder');
// const file = path.join(__dirname, '/ContractAddress/example.json');
// const ERC20=require("./ABIs/ERC20/ERC20ABI.json")
// const abi=require("./ABIs/ERC20usdt.json")
// const iface= new ethers.utils.Interface(abi)
// const Erc20abi= new ethers.utils.Interface(ERC20)
// const {MongoClient} = require('mongodb')
// const mongodb = new MongoClient('mongodb://localhost:27017')
// const axios = require('axios');




// const provider = new ethers.providers.JsonRpcProvider(
//     "https://cloudflare-eth.com/"
//   );
// const text = fs.readFileSync(file, 'utf-8');
// const h1=JSON.parse(text)

// abiDecoder.addABI(ERC20);
// async function live() {
//     provider.on("block",async (blockNumber) => {
//     let block = await provider.getBlock(blockNumber)
//     // console.log(block);
    
//     block.transactions.map(async (txHash)=>{
        
//         const gettransection=async()=>{
//           try{
            
//             const get=async()=>{
//               const SeaportTxRes = await  provider.getTransactionReceipt(txHash)
//               console.log(SeaportTxRes.logs[0].address);
//               console.log("__________________");
//             }
//             setInterval(get,5000)
//           }
//           catch{

//           }
          
//         }
//         setInterval(gettransection,5000)
        
        // const name=SeaportTxRes.logs.map(
        //    newone=async (log)=>{
        //     await mongodb.connect();
        //     console.log("connected database");
        //     const addres=log.address
          
        //     const EthereumIndexerDB = mongodb.db("ethereum-indexer");
        //     const BlocksCollection = EthereumIndexerDB.collection("abi1");
        //     const apiKey=""
        //     const url=`https://api.etherscan.io/api?module=contract&action=getsourcecode&address=${addres}&apikey=${apiKey}`
        //     const collection = mongodb.db('ethereum-indexer').collection('abi1')
        //     const getabi=async()=>{
        //                       const axiosabi= await axios.get(url)
        //                       const result=axiosabi.data.result
        //                       const Abi=result[0].ABI
        //                       console.log("------medium");
        //                       const Contractname=result[0].ContractName
        //                       var obj = {Address:addres,Abi:Abi,ContractName:Contractname};
        //                       BlocksCollection.insertOne(obj)
        //                   }
        //                   setInterval(getabi, 6000);
            
        //     console.log("______________");
        // },)   
        // fs.appendFileSync('data.json',JSON.stringify(SeaportTxRes))
//     })
// });
// }
// live()




// setTimeout(() => {
//   clearInterval(intervalId);
//   console.log('The interval has been stopped.');
// },);

// const getabi=async ()=>{
//     const res=await axios.get(url)
//     console.log(res);
//     const abi=res.data.result
//     console.log(abi);
// }
// getabi()

// const  step1=async(callback)=>{
//   console.log('Running step 1...');
//       const res=await axios.get(url)
//       console.log(res);
//       const abi=res.data.result
//       console.log(abi);
//   // Perform some work
//   callback();
// }

// const  step2=async(callback)=>{
//   console.log('Running step 2...');
//   // Perform some work
//   const res=await axios.get(url1)
//       console.log(res);
//       const abi=res.data.result
//       console.log(abi);
//   callback();
// }

// const step3=async(callback)=>{
//   console.log('Running step 3...');
//   // Perform some work
//   const res=await axios.get(url2)
//       console.log(res);
//       const abi=res.data.result
//       console.log(abi);
//   callback();
// }

// // Chain the functions together using callbacks
// step1(() => {
//   step2(() => {
//     step3(() => {
//       console.log('All steps complete!');
//     });
//   });
// });

// const { createAlchemyWeb3 } = require("@alch/alchemy-web3");

// const alchemyApiKey = "HzIKgUuVhFD_KF8gF0X1-RCKN9lKtyrW";
// const alchemyWeb3 = createAlchemyWeb3(`https://eth-mainnet.alchemyapi.io/v2/${alchemyApiKey}`);

// async function main() {
// const contractAddress = "0xdAC17F958D2ee523a2206206994597C13D831ec7";
// const contractAbi = await alchemyWeb3.a(contractAddress);

// console.log(contractAbi);
// }
// main()

// const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
// const web3 = createAlchemyWeb3("https://eth-mainnet.alchemyapi.io/v2/HzIKgUuVhFD_KF8gF0X1-RCKN9lKtyrW");

// const contractAddress = "0xdAC17F958D2ee523a2206206994597C13D831ec7"; // replace with the contract address you want to get the ABI for

// web3.eth.getAbi(contractAddress).then((abi) => {
//   console.log(JSON.stringify(abi, null, 2)); // print the ABI as a formatted JSON object
// }).catch((err) => {
//   console.log(`Error getting ABI: ${err}`);
// });




// const axios = require('axios');

// const apiKey = 'HzIKgUuVhFD_KF8gF0X1-RCKN9lKtyrW';
// const contractAddress = '0xdAC17F958D2ee523a2206206994597C13D831ec7';

// const url = `https://eth-mainnet.alchemyapi.io/v2/${apiKey}?module=contract&action=getabi&address=${contractAddress}`;

// axios.get(url)
//   .then(response => {
//     console.log(response.data.message);
//   })
//   .catch(error => {
//     console.error(error);
//   });

// const Web3 = require('web3');
// const ABIDecoder = require('abi-decoder');
// const AlchemyWeb3 = require('@alch/alchemy-web3');

// const contractAddress = '0xdAC17F958D2ee523a2206206994597C13D831ec7'; // Replace with the contract address you're interested in
// const alchemyApiKey = 'HzIKgUuVhFD_KF8gF0X1-RCKN9lKtyrW'; // Replace with your Alchemy API key

// // const web3 = new AlchemyWeb3(`https://eth-mainnet.alchemyapi.io/v2/${alchemyApiKey}`);
// const web3 = new Web3(`https://eth-mainnet.alchemyapi.io/v2/${alchemyApiKey}`);


// async function getContractABI() {
//     const contractInstance = new web3.eth.Contract([], contractAddress);
//     // console.log(contractInstance);
//     const contractCode = await web3.eth.getCode(contractAddress);
//     // const contractAbi = web3.eth.abi.decodeContractAbi(contractCode);
//     // return contractAbi;
//     // console.log(contractCode);
//     // console.log(JSON.stringify(contractCode));
//     // console.log(JSON.parse(JSON.stringify(contractCode)));
//     // ABIDecoder.addABI(JSON.parse(JSON.stringify(contractCode)));
//     // const contractABI = ABIDecoder.getABI();
//     // console.log(contractABI);
//     const bytecodeJSON = JSON.parse("");
//     const contractABI = JSON.parse(bytecodeJSON.metadata).output.abi;
//     return contractABI;

//     // console.log(contractCode);
//     // const contractInterface = web3.eth.contract(JSON.parse(contractCode).abi);
//     // // console.log(contractInterface);
//     // const contractAbi = contractInterface.abi;
//     // return contractAbi;
// }

// (async () => {
//   const abi = await getContractABI();
// //   console.log(abi);
// })();
// const Web3 = require('web3');
// const simulateExecution = require('@alch/alchemy-web3');
// const provider = ('https://eth-mainnet.alchemyapi.io/v2/HzIKgUuVhFD_KF8gF0X1-RCKN9lKtyrW');
// const web3 = new Web3(provider);

// const contractAddress = '0xdAC17F958D2ee523a2206206994597C13D831ec7'; // replace with the address of your contract
// const abi =  web3.eth.getAbi(contractAddress);
// console.log(abi);



// const axios = require('axios');
// const { ethers } = require('ethers');

// const alchemyApiKey = 'HzIKgUuVhFD_KF8gF0X1-RCKN9lKtyrW';
// const contractAddress = '0xdAC17F958D2ee523a2206206994597C13D831ec7';

// // Retrieve the bytecode of the contract
// const getCodeUrl = `https://eth-mainnet.alchemyapi.io/v2/${alchemyApiKey}`;
// const getCodeParams = {
//   jsonrpc: '2.0',
//   method: 'eth_getCode',
//   params: [contractAddress, 'latest'],
//   id: 1,
// };
// axios.post(getCodeUrl, getCodeParams)
//   .then((response) => {
//     const bytecode = response.data.result.slice(2);
//     // Parse the bytecode to extract the ABI
//     console.log(bytecode);
//     const abi = ethers.utils.defaultAbiCoder.decode(['bytes'], `0x${bytecode}`)[0];
//     console.log('ABI:', abi);
//   })
//   .catch((error) => {
//     console.error(error);
//   });




// const { ethers } = require("ethers");

// const contractAddress = "0xdAC17F958D2ee523a2206206994597C13D831ec7"; // address of deployed contract
// const provider = new ethers.providers.JsonRpcProvider("https://mainnet.infura.io/v3/f1f504479c2742638da463f12193e687");

// const contract = new ethers.Contract(contractAddress, [], provider);
// const abi = contract.interface.abi;

// console.log(abi);


// const Web3 = require("web3");
// const AbiDecoder = require('abi-decoder');

// const contractAddress = "0xdAC17F958D2ee523a2206206994597C13D831ec7"; // address of deployed contract
// const provider = new Web3.providers.HttpProvider("https://mainnet.infura.io/v3/f1f504479c2742638da463f12193e687");
// const hello=(async()=>{
//   const web3 = new Web3(provider);
//   const abi = await web3.eth.getCode(contractAddress);
//   console.log(JSON.parse(abi));
//   AbiDecoder.decodeLogs(JSON.parse(abi));
//   console.log('Contract ABI:', AbiDecoder.decodeParameter());
  
//   // console.log(abi);
// })
// hello()



// const Web3 = require('web3');

// // Create a new instance of Web3 with your preferred provider
// const web3 = new Web3('https://mainnet.infura.io/v3/f1f504479c2742638da463f12193e687');

// // Replace `txHash` with the transaction hash you want to get the data for
// const txHash = '0x123456789abcdef123456789abcdef123456789abcdef123456789abcdef1234';

// web3.eth.getTransaction(txHash)
//   .then(transaction => {
//     const inputData = transaction.input;
//     console.log('Input Data:', inputData);
//   })
//   .catch(error => {
//     console.error('Error getting transaction data:', error);
//   });







// const axios = require('axios');

// const ALCHEMY_API_KEY = 'HzIKgUuVhFD_KF8gF0X1-RCKN9lKtyrW'; // Replace with your Alchemy API key
// const CONTRACT_ADDRESS = '0x4Fabb145d64652a948d72533023f6E7A623C7C53'; // Replace with the contract address you want to get the ABI for

// async function getContractABI(contractAddress) {
//   try {

//     const alchemyResponse = await axios.get(`https://eth-mainnet.alchemyapi.io/v2/api?module=contract&action=getabi&address=${CONTRACT_ADDRESS}&apikey=${ALCHEMY_API_KEY}`)
//     const { result: alchemyResult } = alchemyResponse;
//     console.log(alchemyResponse);
//     const hello=alchemyResult.slice(2)
//     const alchemyABI = JSON.parse(hello); // Remove "0x60806..." prefix

//     return { alchemyABI };
//   } catch (error) {
//     console.error(error);
//   }
// }

// getContractABI(CONTRACT_ADDRESS)
//   .then(({ alchemyABI }) => {
//     console.log(`Alchemy ABI of contract ${CONTRACT_ADDRESS}:`, alchemyABI);
//   });





// const { createAlchemyWeb3 } = require("@alch/alchemy-web3");

// const alchemyKey = "wss://eth-mainnet.g.alchemy.com/v2/HzIKgUuVhFD_KF8gF0X1-RCKN9lKtyrW";
// const contractAddress = "  "; // the address of the contract you want to get ABI for

// const web3 = createAlchemyWeb3(alchemyKey);

// const getAbi = async () => {
//   try {
//     const contractAbi = await web3.(contractAddress);
//     console.log("Contract ABI:", contractAbi);
//   } catch (error) {
//     console.log("Error:", error);
//   }
// };

// getAbi();





// const Web3 = require('web3');
// const axios = require('axios');

// const projectId = 'f1f504479c2742638da463f12193e687'; // Replace with your Infura project ID
// const contractAddress = '0xdAC17F958D2ee523a2206206994597C13D831ec7'; // Replace with the contract address you're interested in

// const web3 = new Web3(new Web3.providers.HttpProvider(`https://mainnet.infura.io/v3/${projectId}`));

// async function getContractABI() {
//   const response = await axios.get(`https://api.etherscan.io/api?module=contract&action=getabi&address=${contractAddress}&apikey=`);
//   const abi = response.data.result;

//   return abi;
// }

// (async () => {
//   const abi = await getContractABI();
//   console.log(abi);
// })();





// const axios = require('axios');

// const apiUrl = 'https://api.etherscan.io/api';
// // const apiUrl = 'https://eth-mainnet.g.alchemy.com/v2/';

// const contractAddress = '0xdAC17F958D2ee523a2206206994597C13D831ec7'; // Replace with the contract address you're interested in
// const apiKey = ''; // Replace with your Etherscan API key
// // const apiKey = 'HzIKgUuVhFD_KF8gF0X1-RCKN9lKtyrW'; // Replace with your Etherscan API key


// axios.get(apiUrl, {
//   params: {
//     module: 'contract',
//     action: 'getabi',
//     address: contractAddress,
//     apikey: apiKey
//   }
// }).then(response => {
//   const abi = response.data.result;
//   console.log(abi);
// }).catch(error => {
//   console.error(error);
// }); 