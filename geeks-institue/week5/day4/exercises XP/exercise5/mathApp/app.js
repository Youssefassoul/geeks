const _ = require("lodash");
const { add, multiply } = require("./math.js");

const numbers = [1, 2, 3, 4, 5];
const sum = _.sum(numbers);
const product = multiply(4, 6);
const total = add(sum, product);

console.log("sum:", sum);           // 15
console.log("product:", product);   // 24
console.log("total:", total);       // 39