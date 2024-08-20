const reverseString = function(string) {
    let r = "";
    for (let i = 0; i < string.length; i++) {
        r += string[string.length - 1 - i];
    }
    return r;
};

// Do not edit below this line
module.exports = reverseString;
