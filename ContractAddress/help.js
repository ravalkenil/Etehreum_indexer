

const order =
{
//   addr: "",
//   amount: " ",
//   time: "",
//   isclaimed: "",
 'a': 1, 'b': 2, 'c': 3 
}
// const map = new Map();
// const a = order.map((log) => {
//   console.log(log)
// })
// console.log(a);

newObject = order.map(function (value, label) {
    console.log('fsdfs')
    return value * value;
});
console.log(newObject)