// Calculator class with constructor and functions
class Calculator {
  constructor(previousInputText, currentInputText) {
    this.previousInputText = previousInputText;
    this.currentInputText = currentInputText;
    this.clear();

    // Flag to determine if current input is a result
    this.isResult = false;
  }

  markAsResult() {
    this.isResult = true;
  }

  clear() {
    // Create the class variables
    this.currentInput = '';
    this.previousInput = '';
    this.operation = undefined;
    this.isResult = false;
  }

  delete() {
    // Prevents from deleting digits from results
    if (this.isResult) return;

    this.currentInput = this.currentInput.slice(0, -1);
  }

  appendNumber(number) {
    // Prevents user from appending numbers to results
    if (this.isResult) this.clear();
    // Prevents user from writing multiple dots
    if (number === '.' && this.currentInput.includes('.')) return;
    // In case there's no current input, just write the number
    if (this.currentInput === '') {
      this.currentInput = number;
      return;
    }

    this.currentInput += number;
  }

  appendOperator(operator) {
    // In case there's no input to operate, simply return
    if (this.currentInput === '') return;
    //In case there's a previous input, calculate the result
    if (this.previousInput !== '') this.calculate();

    this.operation = operator;
    this.previousInput = `${this.currentInput} ${this.operation}`;
    this.currentInput = '';
  }

  calculate() {
    let result = 0;
    const previousOperand = parseFloat(this.previousInput);
    const currentOperand = parseFloat(this.currentInput);

    // If there's no previous or current operands, just return
    if (isNaN(previousOperand) || isNaN(currentOperand)) return;

    switch (this.operation) {
      case '+':
        result = previousOperand + currentOperand;
        break;
      case '-':
        result = previousOperand - currentOperand;
        break;
      case '×':
        result = previousOperand * currentOperand;
        break;
      case '÷':
        result = previousOperand / currentOperand;
        break;
      default:
        return;
    }

    this.currentInput = result.toString();
    this.previousInput = '';
    this.operation = undefined;
  }

  updateDisplay() {
    this.currentInputText.textContent = this.currentInput;
    this.previousInputText.textContent = this.previousInput;
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
    calculator.appendNumber(button.textContent);
    calculator.updateDisplay();
  });
});

operatorButtons.forEach((button) => {
  button.addEventListener('click', () => {
    calculator.appendOperator(button.textContent);
    calculator.updateDisplay();
  });
});

allClearButton.addEventListener('click', () => {
  calculator.clear();
  calculator.updateDisplay();
});

clearButton.addEventListener('click', () => {
  calculator.delete();
  calculator.updateDisplay();
});

equalButton.addEventListener('click', () => {
  calculator.calculate();
  calculator.markAsResult();
  calculator.updateDisplay();
});
