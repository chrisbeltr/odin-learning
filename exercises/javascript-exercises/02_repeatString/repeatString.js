const repeatString = function(string, num) {
    if (num < 0) return "ERROR";
    let r = "";
    for (let i = 0; i < num; i++) {
        r += string;
    }
    return r;
};

// Do not edit below this line
module.exports = repeatString;
