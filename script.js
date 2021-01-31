// DOM elements
const displayInput = document.querySelector(".user-input");
const digOpButtons = document.querySelectorAll(".digit, .operator");
const clearButton = document.querySelector("#clear");
const bkspButton = document.querySelector("#backspace");
const equalButton = document.querySelector("#equal");

// Global variables
let displayText = "0";

// Operation functions
function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}

function roundResult(result) {
  return Math.round(result * 1000) / 1000;
}

// Operation function call
function operate(operator, a, b) {
  a = Number(a);
  b = Number(b);

  switch (operator) {
    case "+":
      return add(a, b);
    case "-":
      return subtract(a, b);
    case "×":
      return multiply(a, b);
    case "÷":
      if (b === 0) return NaN;
      return divide(a, b);
    default:
      return null;
  }
}

// Writing user input in the screen
digOpButtons.forEach((button) => {
  button.addEventListener("click", () => {
    writeUserInput(button.textContent);
  });
});

function writeUserInput(userInput) {
  // Prevents writing zeros to the left
  if (
    displayText === "0" &&
    (userInput === "+" ||
      userInput === "-" ||
      userInput === "×" ||
      userInput === "÷" ||
      userInput === ".")
  ) {
    return;
  } else if (displayText === "0" && userInput != "0") {
    displayText = userInput;
    displayInput.textContent = displayText;
    return;
  }

  displayText += userInput;
  displayInput.textContent = displayText;
}

// Backspace
bkspButton.addEventListener("click", () => {
  backspace();
});

function backspace() {
  displayText = displayText.slice(0, -1);

  if (displayText.length === 0) {
    displayText = "0";
    displayInput.textContent = "0";
    return;
  }

  displayInput.textContent = displayText;
}

// Clear
clearButton.addEventListener("click", () => {
  clear();
});

function clear() {
  displayText = "0";
  displayInput.textContent = displayText;
}
