
const ethers = require('ethers')
const {coverttoobject} =require("../Test/argument")
const {convertBigIntsToNumbers} =require("../Test/argument")
const {MongoClient,Decimal128} = require('mongodb')
const mongodb = new MongoClient('mongodb://localhost:27017')

function Decodeparselog(SeaportTxRes,Timezone){
    SeaportTxRes.logs.map(async (log)=>{
        await mongodb.connect();
        // console.log("connected database",log);
        const parsing_log=mongodb.db("ethereum-indexer").collection("Parselog")
        const collection=mongodb.db("ethereum-indexer").collection("Newabi")
        const BlocksCollection = mongodb.db("ethereum-indexer").collection("Transection_hash_contract");
        const Address=log.address
        const Txhash=log.transactionHash
        
        collection.findOne({Address:Address},async function(arr,doc){
            if(doc){
                const Abi=doc.Abi;
                const Contractaddres=doc.Address
                const Contractname=doc.ContractName
                const interface= new ethers.Interface(Abi)
                const log1= await interface.parseLog(log)

                // console.log("++++++++++=======", await log1);
                if(log1==null){
                    // const data={fragment:log1.fragment,name:log1.name,signature:log1.signature,topic:log1.topic,args:log1.args}
                    // parsing_log.insertOne(data)
                    console.log("==================Log is null=====================");    
                }
                else{
                    try{
                        const args1=log1.args.toObject()
                        console.log(log1);
                        const  decoded=await coverttoobject(args1)  
                        const args=convertBigIntsToNumbers(decoded)
                        const data={Timezone:Timezone,Txhash:Txhash,Contractaddres:Contractaddres,Contractname:Contractname,fragment:log1.fragment,name:log1.name,signature:log1.signature,topic:log1.topic,args:args}
                        console.log("This is Decode Log data",data);
                        parsing_log.insertOne(data)
                        console.log("==================Successfully inserted Parse log collection=====================");
                    }
                    catch(error){
                        console.log("this is error",error);
                    }
                    
                }
                
            }
            else{
                console.log("==========================inserted not match parse log address===============");
            }
        } )
        // const transectionhash=log.transactionHash
        
        // const obj={address:address,Thash:transectionhash}
        // BlocksCollection.insertOne(obj)
        // console.log("this is ",obj);
    },) 
}

module.exports=Decodeparselog
