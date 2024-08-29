let displayText = document.querySelector(".display-text");

let buttons = document.querySelectorAll(".buttons div");

// calculator button handler
let calculatorTotal = 0;
let displayNumber = "0";
let previousFunction = "+";
let replace = true;
function reset() {
  calculatorTotal = 0;
  displayText.textContent = displayNumber;
  previousFunction = "+";
  replace = true;
}

function updateDisplay() {
  if (displayNumber.length > 14) {
    displayNumber = Number.parseFloat(displayNumber).toExponential(10);
  }
  displayText.textContent = displayNumber.toString();
}

function buttonClick(event) {
  let operation = event.target.textContent;

  if (Number.isInteger(Number.parseInt(operation))) {
    if (replace) {
      displayNumber = `${operation}`;
      replace = false;
    } else displayNumber += operation;
    displayText.textContent = displayNumber;
    return;
  }

  if (operation == "AC") {
    displayNumber = "0";
    reset();
    return;
  }

  if (operation == "%") {
    if (displayNumber == "80085") {
      displayNumber = "haha funi";
      reset();
      return;
    }
    displayNumber = `${Number.parseFloat(displayNumber) / 100}`;
    updateDisplay();
    return;
  }

  if (operation == "⋅") {
    if (replace) {
      displayNumber = "0";
      replace = false;
    } else if (displayNumber.includes(".")) return;
    displayNumber += ".";
    displayText.textContent = displayNumber;
    return;
  }

  if (operation == "+/-") {
    displayNumber = displayNumber.toString();
    if (displayNumber.includes("-")) displayNumber = displayNumber.substring(1);
    else displayNumber = "-" + displayNumber;
    displayText.textContent = displayNumber;
    return;
  }

  if (!replace) {
    switch (previousFunction) {
      case "+":
        calculatorTotal += Number.parseFloat(displayNumber);
        displayNumber = calculatorTotal.toString();
        updateDisplay();
        break;
      case "-":
        calculatorTotal -= Number.parseFloat(displayNumber);
        displayNumber = calculatorTotal.toString();
        updateDisplay();
        break;
      case "×":
        if (!replace) calculatorTotal *= displayNumber;
        else calculatorTotal = displayNumber;
        displayNumber = calculatorTotal.toString();
        updateDisplay();
        break;
      case "÷":
        if (displayNumber == 0) {
          displayNumber = "ERR: DIV BY 0";
          reset();
          return;
        }
        if (!replace) calculatorTotal /= displayNumber;
        else calculatorTotal = displayNumber;
        displayNumber = calculatorTotal.toString();
        updateDisplay();
        break;
      default:
        return;
    }
  } else {
    calculatorTotal = Number.parseFloat(displayNumber);
    displayNumber = calculatorTotal.toString();
    updateDisplay();
  }

  previousFunction = operation;
  replace = true;

  if (operation == "=") {
    reset();
    updateDisplay();
    return;
  }
}

buttons.forEach((element) => {
  element.addEventListener("click", buttonClick);
});
