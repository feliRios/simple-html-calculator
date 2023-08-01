const calcBtn = [...document.getElementsByClassName("calc-key")];

const display = document.querySelector(".calc-result");

sessionStorage.setItem("pastValue", JSON.stringify("0"));

// Variable to show on the calc display
let displayContent = "0";

display.textContent = `${displayContent}`;

// Past-value-variable to show on the calc displau

const pastDisplayContent = document.querySelector(".past-calc-value");

let flag = 0;

calcBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    if (!isNaN(parseInt(btn.value))) {
      // Conditional that verifies if the clicked button is or is not
      // a number

      if (!(displayContent == "0")) {
        if (!(pastDisplayContent.textContent.slice(-1) === "=")) {
          displayContent += btn.value;
        } else {
          displayContent = btn.value;
          pastDisplayContent.textContent = "";
        }
      } else {
        displayContent = btn.value;
      }
    } else {
      switch (btn.value) {
        case "del":
          displayContent = "0";
          pastDisplayContent.textContent = "";
          break;

        case "sum":
          // Necessary operations to adding
          const pastValue = displayContent;
          sessionStorage.setItem("pastValue", JSON.stringify(pastValue));
          pastDisplayContent.textContent = `${pastValue} +`;
          displayContent = "0";
          flag = 1;
          break;

        case "res":
          // Necessary operations to substracting
          sessionStorage.setItem("pastValue", JSON.stringify(displayContent));
          pastDisplayContent.textContent = `${JSON.parse(
            sessionStorage.getItem("pastValue")
          )} -`;
          displayContent = "0";
          flag = 2;
          break;

        case "mul":
          // Necessary operations to multiplying
          sessionStorage.setItem("pastValue", JSON.stringify(displayContent));
          pastDisplayContent.textContent = `${JSON.parse(
            sessionStorage.getItem("pastValue")
          )} x`;
          displayContent = "0";
          flag = 3;
          break;

        case "div":
          // Necessary operations to dividing
          sessionStorage.setItem("pastValue", JSON.stringify(displayContent));
          pastDisplayContent.textContent = `${JSON.parse(
            sessionStorage.getItem("pastValue")
          )} /`;
          displayContent = "0";
          flag = 4;
          break;

        case "coma":
          // Necessary operations to separating with a comma
          displayContent += "."
          break;

        case "go":
          // Necessary operations to watch the result

          switch (flag) {
            case 1:
              // Addition
              let sum = suma(
                JSON.parse(sessionStorage.getItem("pastValue")),
                displayContent
              );
              sessionStorage.setItem(
                "pastValue",
                JSON.stringify(displayContent)
              );
              displayContent = sum;
              displayContent.toString();
              pastDisplayContent.textContent += ` ${JSON.parse(
                sessionStorage.getItem("pastValue")
              )} =`;
              flag = 0;
              break;

            case 2:
              // Substraction
              let res = resta(
                JSON.parse(sessionStorage.getItem("pastValue")),
                displayContent
              );
              sessionStorage.setItem(
                "pastValue",
                JSON.stringify(displayContent)
              );
              displayContent = res;
              displayContent.toString();
              pastDisplayContent.textContent += ` ${JSON.parse(
                sessionStorage.getItem("pastValue")
              )} =`;
              flag = 0;
              break;

            case 3:
              // Multiplication
              let mul = multiplicacion(
                JSON.parse(sessionStorage.getItem("pastValue")),
                displayContent
              );
              sessionStorage.setItem(
                "pastValue",
                JSON.stringify(displayContent)
              );
              displayContent = mul;
              displayContent.toString();
              pastDisplayContent.textContent += ` ${JSON.parse(
                sessionStorage.getItem("pastValue")
              )} =`;
              flag = 0;

            case 4:
              // Division
              let div = division(
                JSON.parse(sessionStorage.getItem("pastValue")),
                displayContent
              );
              sessionStorage.setItem(
                "pastValue",
                JSON.stringify(displayContent)
              );
              displayContent = div;
              displayContent.toString();
              pastDisplayContent.textContent += ` ${JSON.parse(
                sessionStorage.getItem("pastValue")
              )} =`;
              flag = 0;

            default:
              break;
          }

          break;

        default:
          break;
      }
    }

    display.textContent = `${displayContent}`;
  });
});


function suma(a, b) {
  return parseFloat(a) + parseFloat(b);
}

function resta(a, b) {
  return parseFloat(a) - parseFloat(b);
}

function multiplicacion(a, b) {
  return parseFloat(a) * parseFloat(b);
}

function division(a, b) {
  return parseFloat(a) / parseFloat(b);
}
