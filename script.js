// Calculator class with constructor and functions
class Calculator {
  constructor(previousInputText, currentInputText) {
    this.previousInputText = previousInputText;
    this.currentInputText = currentInputText;
    this.clear();
  }

  clear() {
    // Create the class variables
    this.currentInput = '';
    this.previousInput = '';
    this.operation = undefined;
  }

  delete() {}

  append(number) {
    if (number === '.' && this.currentInput.includes('.')) return;
    if (this.currentInput === '') {
      this.currentInput = number;
      return;
    }

    this.currentInput = this.currentInput + number;
  }

  getOperation(operation) {}

  calculate() {}

  updateDisplay() {
    this.currentInputText.textContent = this.currentInput;
  }
}

// DOM variables
const previousInputText = document.querySelector('.previous-input');
const currentInputText = document.querySelector('.current-input');
const numberButtons = document.querySelectorAll('[data-number]');
const operatorButtons = document.querySelectorAll('[data-operator]');
const allClearButton = document.querySelector('[data-all-clear]');
const clearButton = document.querySelector('[data-clear]');
const equalButton = document.querySelector('[data-equal]');

// Calculator object creation
const calculator = new Calculator(previousInputText, currentInputText);

// Event listeners
numberButtons.forEach((button) => {
  button.addEventListener('click', () => {
    calculator.append(button.textContent);
    calculator.updateDisplay();
  });
});
