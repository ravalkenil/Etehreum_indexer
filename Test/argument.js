const { Long } = require('bson');

const convertBigIntsToNumbers=(decoded)=>{
  if (Array.isArray(decoded)) {
    return decoded.map((value) => convertBigIntsToNumbers(value));
  } else if (typeof decoded === "object" && decoded !== null) {
    for (let key in decoded) {
      decoded[key] = convertBigIntsToNumbers(decoded[key]);
    }
    return decoded;
  } else if (typeof decoded === "bigint") {
    return Long(decoded);
  } else {
    return decoded;
  }
}

const  coverttoobject=(args11)=> {
  if (Array.isArray(args11)){
    return args11.map((value) => coverttoobject(value.toObject({getters: true})));
  }
  else if (typeof args11 === "object" && args11 !== null) {
    for (let key in args11) {
      args11[key] = coverttoobject(args11[key]);
    }
    return args11;
  }
  else{
    return args11;
  }
}

module.exports = { convertBigIntsToNumbers, coverttoobject }






























// function convertBigIntsToNumbers(obj) {

// //     obj.forEach(element =>{
// //       if(Array.isArray(element)){
// //         convertBigIntsToNumbers(element)
// //       }
// //       else if(typeof element == 'bigint'){
// //          element=Long(element);
// //          console.log("============",element);
// //       }
// //       console.log(obj);
// //     })
    

//     for (const prop in obj) {
//       if (obj.hasOwnProperty(prop)) {
      
//         console.log("+++++++++", typeof obj[prop]);
        
//         if (typeof obj[prop] == "object") {
//           obj[prop] = convertBigIntsToNumbers(obj[prop]);
          
//         } 
//         else if(typeof obj[prop] == "bigint") {
//           obj[prop] =Number(obj[prop]);
//         }
//         // else if (Array.isArray(arg)){

//         // }
//       }
//     }
//     return obj;

//   }

  // convertBigIntsToNumbers(obj)
  // console.log(obj);



















// const { Long } = require('bson');

// const myDocument = {
//   someField: Long(0x1fffffffffffff),
// };
// console.log(myDocument);