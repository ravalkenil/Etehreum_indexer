
const {convertBigIntsToNumbers,coverttoobject} =require("./argument")
// await mongodb.connect();
const ethers = require('ethers')
const { BlocksCollection ,collection ,Decode_transection_db}= require("../Provider/Provider")

function Parselog_transection(SeaportTxRes,Timezone){
    const Address=SeaportTxRes.to
    const hash=SeaportTxRes.hash
    collection.findOne({Address:Address} ,async function(err, doc){
        if(doc){    
            const Contractaddres=doc.Address
            const Contractname=doc.ContractName
            const  abi= await doc.Abi
            const interface= new ethers.Interface(abi)
            const parselog=interface.parseTransaction(SeaportTxRes)
            if(parselog!=null){
                try{
                    const args=parselog.args.toObject()
                    const decoded=coverttoobject(args)
                    const getargument=convertBigIntsToNumbers(decoded)
                    const data={Timezone:Timezone,Txhash:hash,Contractaddres:Contractaddres,Contractname:Contractname,arguments:getargument,fragment:parselog.fragment,name:parselog.name,selctor:parselog.selector,signature:parselog.signature,value:Number(parselog.value)}
                    // console.log("This is Decode transection data",data);
                    await Decode_transection_db.insertOne(data)
                    console.log("====================================stored transection Successfulluy ");
                }
                catch(e){
                }
            }
        }
        else{
            if(Address !== null){
                const obj={Address:Address,Txhash:hash,Timezone:Timezone}
                BlocksCollection.insertOne(obj)
            }                            
        }
    })
}

module.exports=Parselog_transection