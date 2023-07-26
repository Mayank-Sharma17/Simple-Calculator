const buttons = document.querySelectorAll(".button");

let result = "";
let display = document.querySelector("input");

// Function to handle overall functionality
const handleButtonClick = (buttonValue) => {
  if (buttonValue === "C") {
    result = "";
  } else if (buttonValue === "&lt;") {
    // remove the last char in the result string
    result = result.slice(0, -1);
  } else if (buttonValue === "()") {
    // logic for '(' & ')'
    if (
      result.indexOf("(") === -1 ||
      (result.indexOf("(") != -1 &&
        result.indexOf(")") != -1 &&
        result.lastIndexOf("(") < result.lastIndexOf(")"))
    ) {
      buttonValue = "(";
    } else if (
      (result.indexOf("(") != -1 && result.indexOf(")") === -1) ||
      (result.indexOf("(") != -1 &&
        result.indexOf(")") != -1 &&
        result.lastIndexOf("(") > result.lastIndexOf(")"))
    ) {
      buttonValue = ")";
    }
    result += buttonValue;
  } else if (buttonValue === "x") {
    result += "*";
  } else if (buttonValue === "=") {
    try {
      result = doCalculation(result);
    } catch (error) {
      result = "Invalid expression";
    }
  } else {
    result += buttonValue;
  }

  display.value = result;
};

function getPrecedence(operator) {
  if (operator === '+' || operator === '-') {
    return 1;
  } else if (operator === '*' || operator === '/' || operator === '%') {
    return 2;
  }
  return 0;
}

function applyOperator(operators, values) {
  const operator = operators.pop();
  const right = values.pop();
  const left = values.pop();

  switch (operator) {
    case '+':
      values.push(left + right);
      break;
    case '-':
      values.push(left - right);
      break;
    case '*':
      values.push(left * right);
      break;
    case '/':
      values.push(left / right);
      break;
    case '%':
      values.push(right / 100);
      break;
    default:
      throw new Error("Unknown operator: " + operator);
  }
}

function doCalculation(expression) {
  const numbers = expression.split(/[-+*/()%]/).map(parseFloat).filter(num => !isNaN(num));
  const operators = expression.replace(/[\d.]/g, "").split("");
  const operatorStack = [];
  const valueStack = [];

  valueStack.push(numbers.shift()); // shift() returns the 1st removed array element

  for (let i = 0; i < operators.length; i++) {
    const operator = operators[i];

    if (operator === '(') {
      operatorStack.push(operator);
    } else if (operator === ')') {
      while (operatorStack[operatorStack.length - 1] !== '(') {
        applyOperator(operatorStack, valueStack);
      }
      operatorStack.pop(); // Remove the remaining '('
    } else {
      while (
        operatorStack.length &&
        getPrecedence(operatorStack[operatorStack.length - 1]) >= getPrecedence(operator)
      ) {
        applyOperator(operatorStack, valueStack);
      }
      operatorStack.push(operator);
    }
    
    if (numbers.length > i) {
      valueStack.push(numbers[i]);
    }
  }

  while (operatorStack.length) {
    applyOperator(operatorStack, valueStack);
  }

  return valueStack[0];
}

// handle key press event
const handleKeyDown = (event) => {
  let key = event.key;
  let buttonValue = "";

  if (key === "Escape") {
    buttonValue = "C";
  } else if (key === "Backspace") {
    buttonValue = "&lt;";
  } else if (key === "b") {
    buttonValue = "()";
  } else if (key === "Enter") {
    buttonValue = "=";
  } else if (key === "*") {
    buttonValue = "x";
  } else if (key === "p") {
    buttonValue = "%";
  } else {
    buttonValue = key;
  }

  // Find the button element with matching innerHTML
  const matchedButton = Array.from(buttons).find(
    (button) => button.innerHTML === buttonValue
  );

  if (matchedButton) {
    matchedButton.classList.add("active");

    // Remove the active class after a short delay
    setTimeout(() => {
      matchedButton.classList.remove("active");
    }, 200);

    handleButtonClick(buttonValue);
  }
};

// Add click event listeners to the buttons
for (let button of buttons) {
  button.addEventListener("click", (e) => {
    let buttonValue = e.target.innerHTML;
    handleButtonClick(buttonValue);
  });
}

// Add keydown event listener to the document
document.addEventListener("keydown", handleKeyDown);
