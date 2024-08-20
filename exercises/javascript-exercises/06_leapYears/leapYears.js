const leapYears = function(year) {
    // type checking
    if (!Number.isInteger(year)) return "ERROR";

    if (year % 100 == 0) return year % 400 == 0;
    return year % 4 == 0;
};

// Do not edit below this line
module.exports = leapYears;
