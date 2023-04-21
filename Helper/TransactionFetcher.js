const { providerHTTP } = require("../Provider/Provider");

async function getCompleteTransaction(hash){
    try{
        if(hash==undefined){
            return Promise.reject("The hash is undefined")
        }
        const tx = await providerHTTP.getTransaction(hash)
        const res = await providerHTTP.getTransactionReceipt(hash)
        return Promise.resolve({...tx,...res})
    }catch(e){
        console.log("Error occured in getCompleteTransaction from TransactionFetcher.js")
        return Promise.reject(e)
    }
}

module.exports = {getCompleteTransaction}   