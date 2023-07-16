let result = "";
let display = document.querySelector("input");

const buttons = document.querySelectorAll(".button");

// Function to handle overall functionality
const handleButtonClick = (buttonValue) => {
  if (buttonValue === "C") {
    result = "";
  } else if (buttonValue === "&lt;") {
    result = result.slice(0, -1); // remove the last char in the result string
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
    buttonValue = "*";
    let currentResult = display.value;

    result = currentResult + buttonValue;
  } else if (buttonValue === ".") {
    if (display.value.includes(".")) {
      // if '.' already present in result string
      return;
    } else {
      result += buttonValue;
    }
  } else if (buttonValue === "=") {
    try {
      result = math.evaluate(result);
    } catch (error) {
      result = "Invalid expression";
    }
  } else {
    result += buttonValue;
  }

  display.value = result;
};

// Add click event listeners to the buttons
for (let button of buttons) {
  button.addEventListener("click", (e) => {
    let buttonValue = e.target.innerHTML;
    handleButtonClick(buttonValue);
  });
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

// Add keydown event listener to the document
document.addEventListener("keydown", handleKeyDown);
