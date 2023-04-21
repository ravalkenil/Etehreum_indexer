// const all=require(".")
const fs = require('fs');

const text = fs.readFileSync('DExaddress.txt', 'utf-8');
console.log(text);

let regEx=text.match(/\b(?!\d+\b)\w{42}\b/gi)   
console.log(regEx);

// let json=JSON.parse(regEx)

const json = JSON.stringify(regEx);

// for (const contractAddress of regEx) {
//       // Perform operation on the current contract address
//       const json = JSON.parse(contractAddress);
//     console.log(json);
//     }

fs.writeFileSync('example.json',json);

























// const contractAddresses = text.trim().split('\n'); 
// console.log(contractAddresses);     

// Iterate over the array of contract addresses and perform the desired operation on each one
// for (const contractAddress of contractAddresses) {
//   // Perform operation on the current contract address
//   console.log(contractAddress);
//   const json = JSON.parse(contractAddress);
// console.log(json);
// }

// Convert the object to a JSON string

// Write the JSON string to a new file
// fs.writeFileSync('example.json', json, 'utf-8');