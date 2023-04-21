
const Web3 = require('web3');
const web3 = new Web3('https://mainnet.infura.io/v3/f1f504479c2742638da463f12193e687');
const ethers = require('ethers')
const fs=require('fs')
const path = require('path')
const abiDecoder = require('abi-decoder');
const file = path.join(__dirname, '/ContractAddress/example.json');
const ERC20=require("../ABIs/ERC20/ERC20ABI.json")
// const {regEx}=require("./ContractAddress/all")
// const abi=require("./ABIs/Marketplace/SeaportABI.json")
const abi=require("../ABIs/ERC20usdt.json")
// const iface =new ethers.utils.Interface(abi)
const iface= new ethers.utils.Interface(abi)
const Erc20abi= new ethers.utils.Interface(ERC20)
// var iface = new ethers.Interface()
const provider = new ethers.providers.JsonRpcProvider(
    "https://cloudflare-eth.com/"
  );
  const text = fs.readFileSync(file, 'utf-8');
  const h1=JSON.parse(text)
//   console.log("this is ",h1[0]);

// const provider= new ethers.providers.JsonRpcProvider("0x00000000006CEE72100D161c57ADA5Bb2be1CA79")
// console.log(regEx);
abiDecoder.addABI(ERC20);
async function live() {
    provider.on("block",async (blockNumber) => {
    let block = await provider.getBlock(blockNumber)
    // console.log(block);
    
    block.transactions.map(async (txHash)=>{
        const SeaportTxRes = await  provider.getTransactionReceipt(txHash)
        // console.log(SeaportTxRes.logs);
        // const decodedLogs = abiDecoder.decodeLogs(SeaportTxRes.logs);
        // console.log(decodedLogs);
        // const SeaportTxRes = await provider.getTransactionReceipt('0x6279bfe91c5a6f5d8e2b590a8422c3b65edbb338496f2ab9ca39ac10486c6a6c')
        // console.log(SeaportTxRes.logs);
        // const functionSignature = SeaportTxRes.input.substring(0, 10); // Get the first 10 characters of the input data
        // const inputData = SeaportTxRes.input.substring(10); // Get the rest of the input data
        // const decodedData = web3.eth.abi.decodeParameters(['uint256', 'address'], inputData);
        // console.log(decodedData);
        SeaportTxRes.logs.map(async (log)=>{
          console.log("this is contract address",log.address);
          console.log(log.topics[0]);
          try{
            // for(let i=0;i<=h1.length;i++){
              if(log.address==h1[0]){
                console.log("success"); 
              }
              else{
                // console.log("________________",log);
                // const decodedTx = web3.eth.decodeTransaction(log.raw);
                // const hello=Erc20abi.parseLog(log)
                const abidecoder=abiDecoder.decodeLogs(log)
                console.log("this is ",abidecoder);
                // console.log(hello.name);

                // const parse=abiDecoder.simpleDecode(log.data);
                // console.log(parse);


                // const ab=web3.eth.abi.decodeLog([
                //     // Define the input types for the event you want to decode
                //     // For example, if the event has two parameters, one uint and one string:
                //     { type: 'uint256', name: 'myUint' },
                //     { type: 'string', name: 'myString' }
                //   ], log.data, log.topics.slice(1))

                // console.log("_________________________________",ab);
        
              // }
            }

          }
          catch(error){
            console.log(error);
          }
        })       
        fs.writeFileSync('data.json',JSON.stringify(SeaportTxRes))
    })
});
}
live()




// const stateManager = require('./state');

// stateManager.on('stateUpdate',(state)=>{
//       console.log('State updated:', state);
//     });
// stateManager.setState({ data: 'Hello World' });
// const dataModule = require('./state');
// var state_1 = require("./state");
// dataModule.setData({ data: 'some data' });
// (0, state_1.setData)({ data: 'some data' });
// stateManager.emit({ stateUpdate: 'Hello World' });
// stateManager.updateState({ stateUpdate: 'Hello World' });
// console.log(stateManager.getState());
// stateManager.on('stateUpdate',(state)=>{
//   console.log('State updated:', state);
// });
// stateManager.on('hello',(state)=>{
//     console.log('State updated:', state);
//   });
// stateManager.updateState({ stateUpdate: 'Hello World' });
// console.log(stateManager.getState());
// const state = stateManager.getState();
// console.log(state);

// const state=require("./state")

// const blockfethcher =require('./blockfetcher')
// const get=require("./new.js")