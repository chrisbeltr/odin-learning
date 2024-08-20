const convertToCelsius = function(degrees) {
  return Number.parseFloat(((degrees - 32) * (5/9)).toFixed(1));
};

const convertToFahrenheit = function(degrees) {
  return Number.parseFloat((degrees * (9/5) + 32).toFixed(1));
};

// Do not edit below this line
module.exports = {
  convertToCelsius,
  convertToFahrenheit
};
