const array = ['A', 'B', 'Aa', 'C', 'Cb', 'Ca'];

const orderArray = deepCopy(array).sort();
console.log(orderArray); // [ 'A', 'Aa', 'B', 'C', 'Ca', 'Cb' ]

const reverseArray = deepCopy(array).reverse();
console.log(reverseArray); // [ 'Ca', 'Cb', 'C', 'Aa', 'B', 'A' ]

function deepCopy(source) {
  const result = [];
  for (let i = 0; i < source.length; i ++) {
    result[i] = source[i];
  }
  return result;
}