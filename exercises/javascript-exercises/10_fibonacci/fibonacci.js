const fibonacci = function(num) {
    num = Number.parseInt(num);
    if (!Number.isInteger(num) || num < 0) return "OOPS"
    if (num == 0) return 0;
    if (num == 1 || num == 2) return 1;
    return fibonacci(num - 1) + fibonacci(num - 2);
};

// Do not edit below this line
module.exports = fibonacci;
