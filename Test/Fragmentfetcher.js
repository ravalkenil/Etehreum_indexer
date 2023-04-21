const { Interface, ethers } = require("ethers");
const {collection,FragmentsSpiderDatabase }=require("../Provider/Provider")

async function main(){


    const allAbisCursor = await collection.find()
    const allAbis = await allAbisCursor.toArray()
    const allEventFragment = allAbis.map((abi)=>{
        const interface = new Interface(JSON.parse(abi.Abi))
        // console.log(interface);
        const eventFragments = interface.fragments.filter((fragment)=>{
            // console.log("=======",fragment);
            
            const isEventFragment = ethers.EventFragment.isFragment(fragment)
            if(isEventFragment){
                return true
            }else{
                return false
            }
        }).map((e)=>{return [e,abi.ContractName]})
        return eventFragments
    })

    const topicAndEvent = allEventFragment.map((contractEvents)=>{
        return contractEvents.map(([eventFragment,name])=>{
            console.log(ethers.id(eventFragment.format("sighash")), name)
            FragmentsSpiderDatabase.insertOne({topic:ethers.id(eventFragment.format("sighash")), event:eventFragment,ContractName:name})
            
        })
    })
    console.log(topicAndEvent)
}

main()

