const Web3 = require('web3');
const web3 =new Web3("https://mainnet.infura.io/v3/f1f504479c2742638da463f12193e687")
const ethers = require('ethers')
const fs=require('fs')
const path = require('path')
const abiDecoder = require('abi-decoder');
const file = path.join(__dirname, '/ContractAddress/example.json');
const ERC20=require("../ABIs/ERC20/ERC20ABI.json")
const abi=require("../ABIs/ERC20usdt.json")
const iface= new ethers.utils.Interface(abi)
const Erc20abi= new ethers.utils.Interface(ERC20)
const {MongoClient} = require('mongodb')
const mongodb = new MongoClient('mongodb://localhost:27017')
const axios = require('axios');




const provider = new ethers.providers.JsonRpcProvider(
    "https://cloudflare-eth.com/"
  );
const text = fs.readFileSync(file, 'utf-8');
const h1=JSON.parse(text)

abiDecoder.addABI(ERC20);
async function live() {
    provider.on("block",async (blockNumber) => {
    let block = await provider.getBlock(blockNumber)
    // console.log(block);
    
    block.transactions.map(async (txHash)=>{
        const SeaportTxRes = await  provider.getTransactionReceipt(txHash)
        const name=SeaportTxRes.logs.map(async (log)=>{
            await mongodb.connect();
            console.log("connected database");
            const addres=log.address
            // console.log("this is contract address",log.address);
            // const data = web3.eth.abi.decodeParameters(
            //     ["uint256", "uint256", "address[]", "address", "uint256"],
            //     log.data
            // );
            // console.log("______________________________",data);
            const EthereumIndexerDB = mongodb.db("ethereum-indexer");
            const BlocksCollection = EthereumIndexerDB.collection("abi1");
            const apiKey=""
            const url=`https://api.etherscan.io/api?module=contract&action=getsourcecode&address=${addres}&apikey=${apiKey}`
            const collection = mongodb.db('ethereum-indexer').collection('abi1')
            collection.find().toArray(function(err, abi) {
            for(let i=0;i<=abi.length-1;i++){
                    console.log(abi[i].Address);
                    if(abi[i].Address == addres){
                        console.log("success");
                    }
                    else{
                        console.log("-------------enter-------------");
                        const getabi=async()=>{
                            const axiosabi= await axios.get(url)
                            const result=axiosabi.data.result
                            const Abi=result[0].ABI
                            console.log("------medium");
                            const Contractname=result[0].ContractName
                            var obj = {Address:addres,Abi:Abi,ContractName:Contractname};
                            BlocksCollection.insertOne(obj)
                        }
                        // setInterval(getabi, 6000);
                        getabi()
                        console.log("-------------Exit-------------");
                    }
                }
                }
                );
            
            console.log("______________");
        },)   
        // fs.appendFileSync('data.json',JSON.stringify(SeaportTxRes))
    })
});
}
live()