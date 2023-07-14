let result = "";
let display = document.querySelector("input");

const buttons = document.querySelectorAll(".button");

for (let button of buttons) {
  button.addEventListener("click", (e) => {
    // adding event listeners for each button

    let buttonValue = e.target.innerHTML;

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
    } else if (buttonValue === "%") {
      result = result / 100;
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
  });
}