const Web3 = require('web3');
const web3 =new Web3("https://mainnet.infura.io/v3/f1f504479c2742638da463f12193e687")
const ethers = require('ethers')
const fs=require('fs')
const path = require('path')
const abiDecoder = require('abi-decoder');
const file = path.join(__dirname, '/ContractAddress/example.json');
const ERC20=require("../ABIs/ERC20/ERC20ABI.json")
const abi=require("../ABIs/ERC20usdt.json")
const iface= new ethers.Interface(abi)
const Erc20abi= new ethers.Interface(ERC20)
const {MongoClient} = require('mongodb')
const mongodb = new MongoClient('mongodb://localhost:27017')
const axios = require('axios');


const provider = new ethers.JsonRpcProvider(
    "https://cloudflare-eth.com/"
  );
async function live() {
        
        provider.on("block",async (blockNumber) => {
            let block = await provider.getBlock(blockNumber) 
            const EthereumIndexerDB = mongodb.db("ethereum-indexer");
            const BlocksCollection = EthereumIndexerDB.collection("Transection_hash_contract");
            block.transactions.map(async (txHash)=>{
                try{
                    await mongodb.connect();
                    // console.log("connected database");
                    const SeaportTxRes = await  provider.getTransactionReceipt(txHash)
                    const Address=SeaportTxRes.to
                    if(Address == undefined){
                        return console.log("return to get");
                    }
                    const Transectionhash=SeaportTxRes.transactionHash
                    console.log("this is logs contract address",SeaportTxRes.logs[0].address);
                    const obj={address:Address,Thash:Transectionhash}
                    console.log(obj);
                    BlocksCollection.insertOne(obj)
                
                // catch(error){
                //         console.log(error);
                // }
                
                // try{
                    // SeaportTxRes.logs.map(async (log)=>{
                    //     await mongodb.connect();
                    //     console.log("connected database");
                    //     const address=log.address
                    //     const transectionhash=log.transactionHash
                    //     const obj={address:address,Thash:transectionhash}
                    //     BlocksCollection.insertOne(obj)
                    //     console.log("this is ",obj);
                    // },)  
                }
                catch(error){
                        console.log(error);
                }
                 
               
            })
        });    
    
}
live()