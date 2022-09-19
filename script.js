const operatorButtons = document.querySelectorAll('[data-operator]');
const numberbuttons = document.querySelectorAll('[data-num]');

const displayArea = document.querySelector('.display');
const allClearButton = document.querySelector('[data-all-clear]');
const deleteButton = document.querySelector('[data-del]');
const equalsButton = document.querySelector('[data-equals]');

const calculator = {
    firstOperand: null,
    otherOperand: null,
    waitingForOperator: true,
    operator: null,

    appendNumber: function(num) {
        if(displayArea.textContent === '0'){
            displayArea.textContent = num;
            console.log('1');
        }
        else if(this.firstOperand !== null && this.waitingForOperator === true){
            displayArea.textContent += num;
            console.log('2');
           
        } else if(this.otherOperand !== null && this.waitingForOperator === false) {
            displayArea.textContent += num;
            console.log('3');
        } else {
            displayArea.textContent = num;
            console.log('4');
        }
        
    },

    displayResult: function(result){
        displayArea.textContent = result;
        this.firstOperand = displayArea.textContent;
        this.otherOperand = null;
        this.waitingForOperator = true;
    },

    operate: function() {
        let result;
        const firstOperand = parseFloat(this.firstOperand);
        const otherOperand = parseFloat(this.otherOperand);
        const operator = calculator.operator;
        if(operator === '+'){
            result = firstOperand + otherOperand;
        } else if(operator === '-'){
            result = firstOperand - otherOperand;
        }
        else if(operator === 'X'){
            result = firstOperand * otherOperand;
        }
        else if(operator === '%'){
            result = firstOperand % otherOperand;
        }
        else if(operator === '÷'){
            result = firstOperand / otherOperand; 
        }
        this.displayResult(result);
    }, 

    allClear: function() {
        this.firstOperand = null;
        this.otherOperand = null;
        this.waitingForOperator = true;
        displayArea.textContent = '0';
    }
}

operatorButtons.forEach((button) => {
    button.addEventListener('click', e => {   
        if(calculator.firstOperand !== null){
            calculator.operator = e.target.textContent;
            calculator.waitingForOperator = false;
        }
    });
});

numberbuttons.forEach((button) => {
    button.addEventListener('click', e => {
        //first branch of if statement stores textArea text content to firstOperand when waitingForOperator is equal to true
        if(calculator.waitingForOperator){
            //handles decimals for firstOperand and stores decimal point to firstOperand
            if(e.target.textContent === '.' && calculator.firstOperand !== null) {
                if(calculator.firstOperand.includes('.')){
                    return;
                }
                calculator.appendNumber(e.target.textContent);
                calculator.firstOperand = displayArea.textContent;
                return;
            }
            //handles number appending and stores displayArea.textContent to firstOperand;
            calculator.appendNumber(e.target.textContent);
            calculator.firstOperand = displayArea.textContent;
            //second branch stores textArea to otherOperand when waiting for operator is equal to false
        } else {
            //handles decimals for otherOperand and stores decimal point to otherOperand
            if(e.target.textContent === '.' && calculator.otherOperand !== null) {
                if(calculator.otherOperand.includes('.')){
                    return;
                }
                calculator.appendNumber(e.target.textContent);
                calculator.otherOperand = displayArea.textContent;
                return;
            }
            //handles number appending and stores displayArea.textContent to otherOperand
            calculator.appendNumber(e.target.textContent);
            calculator.otherOperand = displayArea.textContent;
        }
    });
});

allClearButton.addEventListener('click', e => {
    calculator.allClear(); 
});

deleteButton.addEventListener('click', e => {
    displayArea.textContent = displayArea.textContent.slice(0, -1);
    if(calculator.waitingForOperator){
        calculator.firstOperand = displayArea.textContent;
    } else {
        calculator.otherOperand = displayArea.textContent;
    }
});

equalsButton.addEventListener('click', e => {
    calculator.waitingForOperator = false;
    if(calculator.firstOperand !== null && calculator.otherOperand !== null){
        calculator.operate(); 
    }
});

//grows button on click
[operatorButtons, numberbuttons].forEach((list) => {
    list.forEach((button) => {
        button.addEventListener('click', e => {
            growThenShrink(e.target);
        });
    });
});

[allClearButton, deleteButton, equalsButton].forEach((list) => {
    list.addEventListener('click', e => {
        growThenShrink(e.target);
    });
});

function growThenShrink(button){
    button.classList.add('scale');
    setTimeout(removeScale, 100);
    function removeScale() {
        button.classList.remove('scale');
    }
}