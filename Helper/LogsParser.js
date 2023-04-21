function mergeEventAndLogs(array1, array2, index = 0, result = []) {
  if (index === array1.length) {
    return result;
  }
  if (Array.isArray(array1[index].components)) {
    let subArray = [];
    for (let i = 0; i < array1[index].components.length; i++) {
      subArray.push({name: array1[index].components[i].name,value: array2[index][0][i]});
    }
    result.push({name:array1[index].name,value:subArray});
  } else {
    result.push({ name: array1[index].name, value: array2[index] });
  }
  return mergeEventAndLogs(array1, array2, index + 1, result);
}

module.exports = { mergeEventAndLogs };
