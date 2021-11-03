let currentNumber;
let previousNumber;
let previousOperator;
let isAnswer = false;

const summary = document.querySelector('#summary-screen');
const display = document.querySelector('#screen');
const numbers = document.querySelectorAll('[data-number]');
const operators = document.querySelectorAll('[data-operator]');
const decimalPoint = document.querySelector('#decimal');
const toggleNegative = document.querySelector('#toggle-negative');
const clear = document.querySelector('#clear');
const backspace = document.querySelector('#backspace');
const equals = document.querySelector('#equals');

document.addEventListener('keydown', (event) => keyboardSupport(event.key));
equals.addEventListener('click', equalsFunc);
backspace.addEventListener('click', doBackspace);
clear.addEventListener('click', clearDisplay);
toggleNegative.addEventListener('click', toggleNegativeSign);
decimalPoint.addEventListener('click', appendDecimal);

numbers.forEach((number) => {
    number.addEventListener('click', () => {
    appendNumber(number.name);
    });
});

operators.forEach((operator) => {
    operator.addEventListener('click', () => {
    setOperation(operator.name);
    });
});



function doBackspace(){
    display.textContent = display.textContent.slice(0, -1);
    isAnswer = false;
};

function clearDisplay(){
    display.textContent = '';
    summary.textContent = '';
};

function toggleNegativeSign(){
    let str = display.textContent;
    if (display.textContent[0] === '-'){
        display.textContent = str.substring(1);
        return;
    }
    display.textContent = '-' + str;
    // let split = display.textContent.split(/-/gi);
    // if (split.length < 2){
    //     display.textContent = '-' + split[0];
    //     return;
    // }
    // display.textContent = split[1];

};

function appendDecimal() {
    //Checks that there aren't too many decimals
    if (isAnswer) {
        display.textContent = '';
        isAnswer = false;
        };
    let str = display.textContent;
    (str.includes('.')) ? null : display.textContent = str + '.';

};

function appendNumber(number){
    //removes starting zero
    if (display.textContent === '0') clearDisplay();

    //removes previous answer if showing on screen
    if (isAnswer) display.textContent = '';
    isAnswer = false;

    display.textContent += number;

};

function setOperation(operator){


    if (isAnswer && summary.textContent){
        let summaryStr = summary.textContent;
        summary.textContent = summaryStr.slice(0, -1) + operator;
        return;
    };


    currentNumber = display.textContent;

    //Does nothing if display is blank
    if (currentNumber === '' || currentNumber === '.') return;

    //clears display and puts first part of equation on summary screen
    if (summary.textContent === ''){
        summary.textContent = currentNumber + ' ' + operator;
        display.textContent = '';
        return;
        };

    parseScreens();

    operate(previousOperator, previousNumber, currentNumber);
    summary.textContent += ' ' + operator;

};

function equalsFunc() {
    if (summary.textContent === '' ||
        display.textContent === ''||
        isAnswer) return;

    currentNumber = display.textContent;
    parseScreens();
    operate(previousOperator, previousNumber, currentNumber);
    summary.textContent = '';



};

function parseScreens(){
    //splits summary display with spaces to get previous number and operator
    let summaryArr = summary.textContent.split(' ');
    previousNumber = summaryArr[0];
    previousOperator = summaryArr[1];
}

function keyboardSupport(key){
    if (key >= 0 && key <= 9) appendNumber(key);

    let possibleOperators = ['*','!','+','/','-','^'];

    if (possibleOperators.includes(key)) setOperation(key);



    switch (key){

        case ('Enter' || '='):
            equalsFunc();
            return;

        case '.':
            appendDecimal();
            return;

        case 'Backspace':
            doBackspace();
            return;

        case ('Escape' || 'Delete'):
            clearDisplay();
            return;
    };







    // switch (key){
    //     case 'Enter':
    //         key = '=';
    //         break;

    //     case 'Backspace':
    //         key = 'BS';
    //         break;

    //     case 'c':
    //         key = 'C';
    //         break;

    //     case 'Delete':
    //         key = 'C';
    // };

    // let possibleButtons = ['1','2','3','4','5','6','7','8','9','0',
    // '*','!','+','.','/','-','^','=','C','BS'];

    // //does nothing if key pressed isn't part of calculator
    // while (!(possibleButtons.includes(key))) return;




}

function add (a, b){
return a + b;
};

function subtract (a, b){
    return a - b;
};

function multiply(a,b){
    return a * b;
};

function divide(a,b) {
    //divide by zero snarky answer
    if (b === 0) return "Really?";
    return a / b;
    };

function power(a,b) {
    let i = 2;
    let product = a;
    while(b >= i){
        product *= a;
        ++i;
    }
    return product;

};

function factorial(a){
    let product = a;
    while(a > 1){
        product *= a - 1;
        --a;
    }

    if (product === 0) return 1;

 return product;
};

function operate (operator, a, b){
    //does the math logic
    let answer;
    a = +a;
    b = +b;
    switch (operator){
        case '+':
            answer = add(a,b);
            break;

        case '-':
            answer = subtract(a,b);
            break;

        case '*':
            answer = multiply(a,b);
            break;

        case '/':
            answer = divide(a,b);
            break;

        case '^':
            answer = power(a,b);
            break;

        case '!':
            answer = factorial(a);
            break;


    };

    if (answer.toString().length >= 12) {
        return display.textContent = answer.toPrecision(12);
        };
    display.textContent = answer;
    summary.textContent = answer;
    isAnswer = true;
};

