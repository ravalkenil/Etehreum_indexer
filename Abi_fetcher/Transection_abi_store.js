var fs = require('fs');
const ethers = require('ethers')
const { MongoClient } = require('mongodb')
const mongodb = new MongoClient('mongodb://localhost:27017')
const axios = require('axios');
const provider = new ethers.JsonRpcProvider(
    "https://eth.llamarpc.com"
  );
// const Parselog_transection=require("./Test/Dcodetransection")
const {convertBigIntsToNumbers}=require("../Test/argument")
const {coverttoobject} =require("../Test/argument")
const {getCompleteTransaction}=require("../Test/Getcomplatetransection")
const Parselog_transection=require("./parse_transection")
const Decodeparselog=require("./parse_log")


const live= async()=> {

    try {

        await mongodb.connect();
        console.log("connected to mongodb")
        const collection = mongodb.db('ethereum-indexer').collection('Transection_hash_contract')
        const EthereumIndexerDB = mongodb.db("ethereum-indexer");
        const BlocksCollection = EthereumIndexerDB.collection("Newabi");
        const apiKey="SE3DDP8B6I99S34ZMXJHRC9MCI83HMQGZ9"
        const apiKey1="8S23NNBVC32BVZK4ZGK8DICU9RVERQ3ERB"
        const collectionabi = mongodb.db('ethereum-indexer').collection('Newabi')
        const Decode_transection_db=mongodb.db("ethereum-indexer").collection("Decode_transection")


        collection.find().toArray(function(err, abi) {
                let i=0
                const loop=async()=>{
                        if( i<abi.length){
                            
                                await mongodb.connect();
                                console.log(abi[i].Address);
                                const contractaddress=abi[i].Address;
                                console.log(contractaddress);
                                const transactionhash=abi[i].Txhash
                                const Timezone=abi[i].Timezone
                                console.log("this is main",contractaddress);
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
                                                BlocksCollection.insertOne(obj)
                                                console.log("inserted successfully");
                                                const SeaportTxRes = await getCompleteTransaction(transactionhash)
                                                console.log(SeaportTxRes);
                                                const Address=SeaportTxRes.to
                                                const hash=SeaportTxRes.hash
                                                Parselog_transection(Address,hash,SeaportTxRes,Timezone)
                                                Decodeparselog(SeaportTxRes,Timezone)
    
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
                                                collection.remove({Address:contractaddress})
                                                i++
                                                setTimeout(loop,200);
                                            }
                                            else{
                                                collection.remove({Address:contractaddress})
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
                                                const SeaportTxRes = await getCompleteTransaction(transactionhash)
                                                console.log(SeaportTxRes);
                                                const Address=SeaportTxRes.to
                                                const hash=SeaportTxRes.hash
                                                Parselog_transection(Address,hash,SeaportTxRes)
                                                Decodeparselog(SeaportTxRes)
                                                
                                                // collectionabi.findOne({Address:Address} ,async function(err, doc){
                                                //     if(doc){
                                                //         console.log("====================================Success")
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
                                                collection.remove({Address:contractaddress})
                                                i++
                                                setTimeout(loop,200);
                                            }
                                            else{
                                                collection.remove({Address:contractaddress})
                                                i++
                                                setTimeout(loop,200);
                                            }

                                        }
                                        
                                    }
                                    else{
                                        console.log("This contract address is match");
                                        collection.remove({Address:contractaddress})
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


// collectionabi.find().toArray(async function (err,address){
                            //     // console.log("this is ",address[0].Address);
                            //     // j=0
                            //     // if(j<address.length){
                            //     for(let j=0;j<=address.length-1;j++){
                            //         if(address[j].Address !== contractaddress ){
                            //                 console.log("this address not match");

                            //                 const url=`https://api.etherscan.io/api?module=contract&action=getsourcecode&address=${contractaddress}&apikey=${apiKey}`
                            //                 const axiosabi= await axios.get(url)
                            //                 // console.log(axiosabi);
                            //                 const result=axiosabi.data.result
                            //                 // console.log(result);
                            //                 const Abi=result[0].ABI
                            //                 if(Abi !=="Contract source code not verified"){
                            //                     const Contractname=result[0].ContractName
                            //                     var obj = {Address:contractaddress,Abi:Abi,ContractName:Contractname};
                            //                     BlocksCollection.insertOne(obj)
                            //                     console.log("inserted successfully");
                            //                     i++
                            //                     setTimeout(loop,6000);
                            //                 }
                            //                 else{
                            //                     i++
                            //                     setTimeout(loop,6000);
                            //                 }
                            //             break;
                            //         }
                            //         else {
                            //                 console.log("csdc");
                            //         }
                                    
                            //     }



                            //     // for(let j=0;j<=address.length-1;j++){
                            //     //     if(address[j].Address == contractaddress){
                            //     //         console.log("match______________________________");
                            //     //     }
                            //     //     else{
                            //     //         console.log("not match");
                            //     //     }
                            //     // }
                            // })





// function delayedLoop() {
//     const items = [1, 2, 3, 4, 5];
//     let i = 0;
//     function loop(){
//         if (i<=items.length-1){
//                 console.log(items[i]);
//                 i++
//                 setTimeout(loop, 1000);
//         }
//     }
//     loop()


    // function loop() {
    //   if (i < items.length) {
    //     console.log(items[i]);
    //     i++;
    //     setTimeout(loop, 1000); // 1000 milliseconds = 1 second
    //   }
    // }
    // loop();
//   }
  
//   delayedLoop();