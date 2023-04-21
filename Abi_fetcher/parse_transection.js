
const {convertBigIntsToNumbers,coverttoobject} =require("../Test/argument")
// await mongodb.connect();
const ethers = require('ethers')
const {MongoClient} = require('mongodb')
const mongodb = new MongoClient('mongodb://localhost:27017')
const EthereumIndexerDB = mongodb.db("ethereum-indexer");
const BlocksCollection = EthereumIndexerDB.collection("Transection_hash_contract");
const collectionabi=mongodb.db("ethereum-indexer").collection("Newabi")
const Decode_transection_db=mongodb.db("ethereum-indexer").collection("Decode_transection")

function Parselog_transection(Address,hash,SeaportTxRes,Timezone){
    collectionabi.findOne({Address:Address} ,async function(err, doc){
        if(doc){
            console.log("====================================Success");
            const  abi= await doc.Abi
            const Contractaddres=doc.Address
            const Contractname=doc.ContractName
            const interface= new ethers.Interface(abi)
            const parselog=interface.parseTransaction(SeaportTxRes)
            // console.log("hello",parselog);
            if(parselog!=null){
                try{
                    const args=parselog.args.toObject()
                    const decoded=coverttoobject(args)
                    // console.log("This is array of them",parselog.args);
                    const getargument=convertBigIntsToNumbers(decoded)
                    // console.log(getargument);
                    const data={Timezone:Timezone,Txhash:hash,Contractaddres:Contractaddres,Contractname:Contractname,arguments:getargument,fragment:parselog.fragment,name:parselog.name,selctor:parselog.selector,signature:parselog.signature,value:Number(parselog.value)}
                    console.log("This is Decode transection data",data);
                    await Decode_transection_db.insertOne(data)
                }
                catch(error){
                    console.log("This is transection error",error);
                }
            }
        }
        else{
            console.log("========false=============================");                           
        }
    })
}

module.exports=Parselog_transection