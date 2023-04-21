const ethers = require('ethers')
const {getCompleteTransaction}=require("./Test/Getcomplatetransection")
const Parselog_transection=require("./Test/Dcodetransection")
const Decodeparselog=require("./Test/Decodelogs");
const moment = require('moment');
const Seoport=require("./Nft_fetcher/Seaport")

// Jsonrpc provider

    // const provider = new ethers.JsonRpcProvider("https://mainnet.infura.io/v3/f1f504479c2742638da463f12193e687");

// websoket provider

const provider = new ethers.WebSocketProvider("wss://mainnet.infura.io/ws/v3/f1f504479c2742638da463f12193e687");


async function live() {

        provider.on("block",async (blockNumber) => {
            let block = await provider.getBlock(blockNumber) 
            console.log(block.transactions.length );
            const Timezone=moment.unix(block.timestamp).toString()
            i=0;
            await block.transactions.forEach(async (txHash)=>{
                try{
                    const SeaportTxRes = await getCompleteTransaction(txHash)
                    Parselog_transection(SeaportTxRes,Timezone)
                    Decodeparselog(SeaportTxRes,Timezone)                   
                }
                catch(e){
                }
            })
            await Seoport()
        });    
}

live()

