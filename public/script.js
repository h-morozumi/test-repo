const form = document.getElementById('calc-form');
const inputA = document.getElementById('input-a');
const inputB = document.getElementById('input-b');
const operation = document.getElementById('operation');
const result = document.getElementById('result');

const operations = {
  add: (a, b) => a + b,
  subtract: (a, b) => a - b,
  multiply: (a, b) => a * b,
  divide: (a, b) => b === 0 ? NaN : a / b,
};

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const a = Number(inputA.value);
  const b = Number(inputB.value);
  const op = operation.value;

  if (!Number.isFinite(a) || !Number.isFinite(b)) {
    result.textContent = 'Please enter valid numbers.';
    return;
  }

  if (op === 'divide' && b === 0) {
    result.textContent = 'Division by zero is undefined.';
    return;
  }

  const calculation = operations[op];
  const output = calculation(a, b);
  result.textContent = `Result: ${output}`;
});
