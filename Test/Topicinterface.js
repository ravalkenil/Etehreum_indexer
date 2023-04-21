const { Interface, ethers } = require("ethers");
const {FragmentsSpiderDatabase}=require("../Provider/Provider")


async function getTopicInterface(topic){
    const dtcursor = FragmentsSpiderDatabase.find({topic:topic})
    const dt = await dtcursor.toArray()
    if(dt.length!=0){
        const interfaces = dt.map((e)=>{
            const eventFrag = ethers.EventFragment.from(e.event)
            const interface = new Interface([eventFrag.format('full')])
            return interface
        })
        return Promise.resolve(interfaces)
    }else{
        return Promise.reject(null)
    }
}

module.exports = { getTopicInterface }