require("dotenv").config({ path: "../.env" });

const { MongoClient } = require("mongodb");
const mongodb = new MongoClient("mongodb://localhost:27017");
const Parselog_collection = mongodb.db("ethereum-indexer").collection("Parselog");
const Nft_store = mongodb.db("ethereum-indexer").collection("Nft_store");
const address = process.env.SEOPORT;
const address1 = process.env.SEOPORT1;
const address2 = process.env.SEOPORT2;
const address3 = process.env.SEOPORT3;
const addresses = [address, address3, address2, address1];
const array = [];


function Seoport(){

  Parselog_collection.find({ Contractaddres: { $in: addresses }}).toArray(async function (arr, log) {
      if (log && log.length) {
        for (let i = 0; i < log.length; i++) {
          const Txhash = log[i].Txhash;
          array.push(Txhash);
        }
      }

      function removeDuplicates(arr) {
        return arr.filter((item, index) => arr.indexOf(item) === index);
      }
      const txhash = removeDuplicates(array);
      txhash.map(async (txhash, i) => {
        console.log(txhash);
        Parselog_collection.find({ Txhash: txhash }).toArray(async function (
          arr,
          doc
        ) {
          doc.map(async(doc) => {
            if (doc.name == "OrderFulfilled") {
              console.log("This is contractname :", doc.Contractname);
              console.log("This is time :", doc.Timezone);
              console.log("this is token :", doc.args.offer[0].token);
              console.log("this is Identifire:", doc.args.offer[0].identifier);
              console.log("This is buyer :", doc.args.recipient);
              console.log("this is amount :",Number(doc.args.consideration[0].amount) );
              console.log("this is seller :",doc.args.consideration[0].recipient);
              let totalfess = 0;
              for (let i = 1; i < doc.args.consideration.length; i++) {
                totalfess += doc.args.consideration[i].amount;
              }
              console.log(":==", totalfess);
            //   console.log(currAddr);
              const Data = {
                contractname: doc.Contractname,
                Time: doc.Timezone,
                Token: doc.args.offer[0].token,
                Identifire: doc.args.offer[0].identifier,
                buyer: doc.args.recipient,
                Amount: Number(doc.args.consideration[0].amount),
                Seller: doc.args.consideration[0].recipient,
                TotalFess: totalfess,
              };
              await Nft_store.findOne(
                {
                  contractname: doc.Contractname,
                  Time: doc.Timezone,
                  Token: doc.args.offer[0].token,
                  Identifire: doc.args.offer[0].identifier,
                  buyer: doc.args.recipient,
                  Amount: Number(doc.args.consideration[0].amount),
                  Seller: doc.args.consideration[0].recipient,
                  TotalFess: totalfess,
                },
              async function (arr, doc) {
                  if (!doc) {
                    await Nft_store.insertOne(Data);
                    console.log("============successfully include nftstore database============");

                  } else {
                    console.log("Already included");
                  }
                }
              );

              console.log(
                "====================================================="
              );
            }
          });
        });
      });
    }
  );
}


module.exports=Seoport