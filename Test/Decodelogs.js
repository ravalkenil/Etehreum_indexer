
const ethers = require('ethers')
const {coverttoobject} =require("./argument")
const {getTopicInterface}=require("./Topicinterface")
const {convertBigIntsToNumbers} =require("./argument")
const { parsing_log,collection,mongodb } =require("../Provider/Provider")

function Decodeparselog(SeaportTxRes,Timezone){
    SeaportTxRes.logs.map(async (log)=>{
        await mongodb.connect();
        const Address=log.address
        const Txhash=log.transactionHash  
        collection.findOne({Address:Address},async function(arr,doc){
            if(doc){ 
                const Abi=doc.Abi;
                const Contractaddres=doc.Address
                const Contractname=doc.ContractName
                const interface= new ethers.Interface(Abi)
                const log1= await interface.parseLog(log)
                if(log1==null){
                    console.log("==================Log is null=====================");    
                }
                else{
                    try{
                        const args1=log1.args.toObject()
                        const  decoded=await coverttoobject(args1)  
                        const args=convertBigIntsToNumbers(decoded)
                        const data={Timezone:Timezone,Txhash:Txhash,Contractaddres:Contractaddres,Contractname:Contractname,fragment:log1.fragment,name:log1.name,signature:log1.signature,topic:log1.topic,args:args}
                        // console.log("This is Decode Log data",data);
                        parsing_log.insertOne(data)
                        console.log("==================Successfully inserted Parse log collection=====================");
                    }
                    catch(e){
                    }
                    
                }
                
            }
            else{

                let loginterface= await getTopicInterface(log.topics[0]).catch((e) => {})
                if(loginterface){
                    for(let i=0;i<=loginterface.length;i++){
                        try{
                            const parseLog=loginterface[i].parseLog(log)
                            // console.log(">>>>>>>>>>>>>>>>>>",parseLog);
                            if(parseLog){
                                const truelog= await coverttoobject(parseLog.args.toObject())
                                const args=convertBigIntsToNumbers(truelog)
                                const data={Timezone:Timezone,Txhash:Txhash,Contractaddres:Contractaddres,Contractname:Contractname,fragment:log.fragment,name:log.name,signature:log.signature,topic:log.topic,args:args}
                                parsing_log.insertOne(data)
                                console.log(">Successfully inserted Parse log collection=====================");    
                            }
                        }
                        catch{

                        }
                    }
                }
            }
        } )
    },) 
}

module.exports=Decodeparselog
