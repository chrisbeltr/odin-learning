const add = (a, b) => a + b;

const subtract = (a, b) => a - b;

const sum = array => array.reduce((total, num) => total + num, 0);

const multiply = array => array.reduce((total, num) => total * num, 1);

const power = (a, b) => Math.pow(a, b);

const factorial = a => {
  let total = 1;
  if (a > 0) total = a * factorial(a - 1);
  return total;
}

// Do not edit below this line
module.exports = {
  add,
  subtract,
  sum,
  multiply,
  power,
  factorial
};
