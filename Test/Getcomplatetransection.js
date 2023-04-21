
const { ProviderHTTP } = require("../Provider/Httpprovider");
// const txHash="0x8741c5afa179ea02f3cfe0eca178874e827ad708bdf8fb25a79b39533161fe90"
async function  getCompleteTransaction(txHash){ 
    if(txHash==null||txHash==undefined){
        return Promise.reject("Transaction is null or undefined")
    }
    const tx = await ProviderHTTP.getTransaction(txHash).catch((e)=>{
        console.log("ERROR IN GetCompleteTransaction.js while Fetching Transaction")
        console.log(e) 
        return Promise.reject("ERROR IN GetCompleteTransaction.js while Fetching Transaction")
    })
    const txres = await ProviderHTTP.getTransactionReceipt(txHash).catch((e)=>{
        console.log("ERROR IN GetCompleteTransaction.js while Fetching Transaction Receipt")
        console.log(e)
        return Promise.reject("ERROR IN GetCompleteTransaction.js while Fetching Transaction Receipt")
    })
    // console.log(txres)
    return Promise.resolve({...tx.toJSON(),...txres.toJSON()})
}
// getCompleteTransaction()
module.exports = {getCompleteTransaction}