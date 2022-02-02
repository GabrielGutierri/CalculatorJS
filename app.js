const buttons = document.querySelector('.buttons');
const input = document.querySelector('.calculator-input');
const calculator = document.querySelector('.container');

buttons.addEventListener('click', e => {
    e.preventDefault();
    if(e.target.matches('button')){
        const button = e.target;
        const action = button.dataset.action;
        const buttonContent = button.textContent;
        const displayNum = input.textContent;
        const previousButtonType = calculator.dataset.previousButtonType;
        console.log(previousButtonType);

        Array.from(button.parentNode.children).forEach(b => b.classList.remove('is-depressed'));
        
        if(!action){
            if(displayNum == "0" || previousButtonType == "operator" || previousButtonType == "calculate"){
                input.textContent = buttonContent;
            }
            else{
                input.textContent = displayNum + buttonContent;
            }
            console.log(input.textContent);
            calculator.dataset.previousButtonType = "number";
        }

        if(action == "decimal"){
            if(!displayNum.includes('.'))
                input.textContent = displayNum + ".";
            else if(previousButtonType == "operator" || previousButtonType == "calculate")
                input.textContent = "0.";
            calculator.dataset.previousButtonType = "decimal";
        }

        if(action == "add"|| action =="subtract" || action == "multiply" || action == "divide"){
            const firstValue = calculator.dataset.firstValue;
            const operator = calculator.dataset.operator;
            const secondValue = displayNum;

            if(firstValue && operator && previousButtonType != "operator" && previousButtonType !="calculate"){
                const calcValue = calculate(firstValue, operator, secondValue);
                input.textContent = calcValue;
                calculator.dataset.firstValue = calcValue;
            }
            else{
                calculator.dataset.firstValue = displayNum;
            }
            calculator.dataset.previousButtonType = "operator";
            calculator.dataset.operator = action;
        }
        
        if(action == "clear"){
            if(button.textContent == "AC"){
                calculator.dataset.firstValue = "";
                calculator.dataset.modValue = "";
                calculator.dataset.operator = "";
                calculator.dataset.previousButtonType = "";
            }else{
                button.textContent = "AC"
            }
            input.textContent = 0;
            calculator.dataset.previousButtonType = "clear";
        }
        if(action != "clear"){
            const clearButton = calculator.querySelector('[data-action="clear"]');
            clearButton.textContent = "CE";
        }

        if(action == "calculate"){
            let firstValue = calculator.dataset.firstValue;
            const operator = calculator.dataset.operator;
            let secondValue = displayNum;

            if(firstValue){
                if(previousButtonType == "calculate"){
                    firstValue = displayNum;
                    secondValue = calculator.dataset.modValue;
                }
                input.textContent = calculate(firstValue, operator, secondValue);
            }

            calculator.dataset.modValue = secondValue;
            calculator.dataset.previousButtonType = "calculate";
        }
    }
})

const calculate = (n1,operator,n2) => {
    let result = '';
    let value1 = parseFloat(n1);
    let value2 = parseFloat(n2);

    if (operator === 'add') {
        result = value1 + value2
      } else if (operator === 'subtract') {
        result = value1 - value2
      } else if (operator === 'multiply') {
        result = value1 * value2
      } else if (operator === 'divide') {
        result = value1 / value2
      }
      
      return result
}