const {MongoClient} = require('mongodb')
require("dotenv").config();

const DB_URL = process.env.DB_URL
console.log(DB_URL);
const mongodb = new MongoClient(DB_URL)
const parsing_log=mongodb.db("ethereum-indexer").collection("Parselog")
const collection=mongodb.db("ethereum-indexer").collection("Newabi")
const BlocksCollection = mongodb.db("ethereum-indexer").collection("Transection_hash_contract");
const Decode_transection_db=mongodb.db("ethereum-indexer").collection("Decode_transection")
const FragmentsSpiderDatabase=mongodb.db("ethereum-indexer").collection("FragmentsSpiderDatabase")
const Nft_store=mongodb.db("ethereum-indexer").collection("Nft_store")



module.exports = {mongodb,parsing_log,collection,BlocksCollection,Decode_transection_db,FragmentsSpiderDatabase,Nft_store}
