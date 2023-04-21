var fs = require('fs');
const ethers = require('ethers')
const { MongoClient } = require('mongodb')
const mongodb = new MongoClient('mongodb://localhost:27017')
const axios = require('axios');
const provider = new ethers.JsonRpcProvider(
    "https://eth.llamarpc.com"
  );
const Parselog_transection=require("../Test/Dcodetransection")
const convertBigIntsToNumbers=require("../Test/argument")
const {getCompleteTransaction}=require("../Test/Getcomplatetransection")


const live= async()=> {

    try {

        await mongodb.connect();
        console.log("connected to mongodb")
        const collection = mongodb.db('ethereum-indexer').collection('abi1')
        const EthereumIndexerDB = mongodb.db("ethereum-indexer");
        const BlocksCollection = EthereumIndexerDB.collection("abi1");
        const apiKey="SE3DDP8B6I99S34ZMXJHRC9MCI83HMQGZ9"
        const apiKey1="8S23NNBVC32BVZK4ZGK8DICU9RVERQ3ERB"
        const collectionabi = mongodb.db('ethereum-indexer').collection('Newabi')
        const Decode_transection_db=mongodb.db("ethereum-indexer").collection("Decode_transection")


        collection.find().toArray(function(err, abi) {
                let i=0
                const loop=async()=>{
                        if( i<abi.length){
                            
                                await mongodb.connect();
                                console.log(abi[0].Address);
                                console.log(i);
                                // console.log(abi[i].Address);
                                const contractaddress=abi[i].Address;
                                console.log(contractaddress);
                                const transactionhash=abi[i].Txhash
                                console.log("this is main",contractaddress);
                                const result = await collectionabi.find({}).toArray();
                                collectionabi.findOne({Address:contractaddress},async function(err, doc){
                                    if(!doc){
                                        console.log("hello");
                                        const url=`https://api.etherscan.io/api?module=contract&action=getsourcecode&address=${contractaddress}&apikey=${apiKey}`
                                        const axiosabi= await axios.get(url)
                                        // console.log(axiosabi);
                                        const result=axiosabi.data.result
                                        console.log(result);
                                        const Abi=result[0].ABI
                                        const implimantion=result[0].Implementation
                                        if (implimantion==''){
                                            if (Abi == undefined){
                                                return console.log("============Please Use another api=================");;
                                            }
                                            if(Abi !=="Contract source code not verified" && Abi!== undefined){
                                                const Contractname=result[0].ContractName
                                                
                                                var obj = {Address:contractaddress,Abi:Abi,ContractName:Contractname};
                                                collectionabi.insertOne(obj)
                                                console.log("inserted successfully");
                                                // const SeaportTxRes = await getCompleteTransaction(transactionhash)
                                                // console.log(SeaportTxRes);
                                                // const Address=SeaportTxRes.to
    
                                                // collectionabi.findOne({Address:Address} ,async function(err, doc){
                                                //     if(doc){
                                                //         console.log("====================================Success");
                                                //         // console.log(doc.abi);
                                                //         // console.log(doc);
                                                //         // console.log(doc.address);
                                                //         // console.log(doc.Abi);
                                                //         // console.log(doc);
                                                //         const  abi= await doc.Abi
                                                //         // console.log(abi);
                                                //         const interface= new ethers.Interface(abi)
                                                //         const parselog=interface.parseTransaction(SeaportTxRes)
                                                //         // console.log("hello",parselog);
                                                //         console.log("this is",parselog);
                                                //         if(parselog!=null){
                                                //             try{
                                                //                 const obj=parselog.args.toObject()
                                                //                 // console.log(obj);
                                                //                 const getargument=convertBigIntsToNumbers(obj)
                                                //                 console.log(getargument);
                                                //                 const data={arguments:getargument,fragment:parselog.fragment,name:parselog.name,selctor:parselog.selector,signature:parselog.signature,value:Number(parselog.value)}
                                                //                 // const obj={transactions:parselog}
                                                //                 // console.log(data);
                                                //                 await Decode_transection_db.insertOne(data)
                                                //             }
                                                //             catch(error){
                                                //                 console.log(error);
                                                //             }
                                                //         }
                                                //     }
                                                //     // else
                                                // })
                                                // collection.remove({Address:contractaddress})
                                                i++
                                                setTimeout(loop,200);
                                            }
                                            else{
                                                // collection.remove({Address:contractaddress})
                                                i++
                                                setTimeout(loop,200);
                                            }
                                        }
                                        else{
                                            
                                            const url=`https://api.etherscan.io/api?module=contract&action=getsourcecode&address=${implimantion}&apikey=${apiKey1}`
                                            const axiosabi= await axios.get(url)
                                            const result1=axiosabi.data.result
                                            console.log(result1);
                                            const Abi1=result1[0].ABI
                                            if (Abi1 == undefined){
                                                return console.log("============Please Use another api=================");;
                                            }
                                            if(Abi1 !=="Contract source code not verified" && Abi!== undefined){

                                                const Contractname=result1[0].ContractName
                                                
                                                var obj = {Address:contractaddress,Abi:Abi1,ContractName:Contractname};
                                                collectionabi.insertOne(obj)
                                                console.log("inserted successfully");
                                                i++
                                                setTimeout(loop,200);
                                            }
                                            else{
                                                // collection.remove({Address:contractaddress})
                                                i++
                                                setTimeout(loop,200);
                                            }


                                            

                                        }
                                        
                                    }
                                    else{
                                        console.log("This contract address is match");
                                        // collection.remove({Address:contractaddress})
                                        i++
                                        setTimeout(loop);
                                    }
                                }
                            );
                        }
                }
                loop()
        });

    }
    catch(error){
        console.log("this is ",error);
    }
}
live() 