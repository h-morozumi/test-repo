const display = document.getElementById('display');
const keyPanel = document.querySelector('.keys');

let currentValue = '0';
let storedValue = null;
let pendingOperator = null;
let awaitingNextValue = false;

const updateDisplay = () => {
  display.textContent = currentValue;
};

const resetCalculator = () => {
  currentValue = '0';
  storedValue = null;
  pendingOperator = null;
  awaitingNextValue = false;
  updateDisplay();
};

const formatResult = (value) => {
  if (value === 'Error') {
    return value;
  }

  if (!Number.isFinite(value)) {
    return 'Error';
  }

  const stringValue = value.toString();
  if (stringValue.length <= 12) {
    return stringValue;
  }

  return value.toPrecision(10).replace(/\.0+$/, '').replace(/0+$/, '');
};

const performCalculation = (first, second, operator) => {
  switch (operator) {
    case 'add':
      return first + second;
    case 'subtract':
      return first - second;
    case 'multiply':
      return first * second;
    case 'divide':
      return second === 0 ? 'Error' : first / second;
    default:
      return second;
  }
};

const applyOperator = (operator) => {
  if (currentValue === 'Error') {
    return;
  }

  if (pendingOperator && !awaitingNextValue) {
    const result = performCalculation(Number(storedValue), Number(currentValue), pendingOperator);
    if (result === 'Error') {
      currentValue = 'Error';
      storedValue = null;
      pendingOperator = null;
      awaitingNextValue = true;
      updateDisplay();
      return;
    }

    currentValue = formatResult(result);
    storedValue = currentValue;
  } else {
    storedValue = currentValue;
  }

  pendingOperator = operator;
  awaitingNextValue = true;
  updateDisplay();
};

const evaluate = () => {
  if (pendingOperator === null || awaitingNextValue || currentValue === 'Error') {
    return;
  }

  const result = performCalculation(Number(storedValue), Number(currentValue), pendingOperator);
  if (result === 'Error') {
    currentValue = 'Error';
    storedValue = null;
    pendingOperator = null;
    awaitingNextValue = true;
    updateDisplay();
    return;
  }

  currentValue = formatResult(result);
  storedValue = null;
  pendingOperator = null;
  awaitingNextValue = true;
  updateDisplay();
};

const inputDigit = (digit) => {
  if (awaitingNextValue || currentValue === 'Error') {
    currentValue = digit;
    awaitingNextValue = false;
    updateDisplay();
    return;
  }

  currentValue = currentValue === '0' ? digit : currentValue + digit;
  updateDisplay();
};

keyPanel.addEventListener('click', (event) => {
  const button = event.target.closest('button');
  if (!button) {
    return;
  }

  const { action, operator, value } = button.dataset;

  if (!action && value) {
    inputDigit(value);
    return;
  }

  if (action === 'operator' && operator) {
    applyOperator(operator);
    return;
  }

  if (action === 'equals') {
    evaluate();
    return;
  }

  if (action === 'clear') {
    resetCalculator();
  }
});

updateDisplay();
