const operate = (operator, a, b) => {
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
};

const add = (a, b) => a + b;

const subtract = (a, b) => a - b;

const multiply = (a,b) => a * b;

const divide = (a,b) => {
    //divide by zero snarky answer
    if (b === 0) return "Really?";
    return a / b;
    };

const power = (a,b) => {
    let i = 2;
    let product = a;
    while(b >= i){
        product *= a;
        ++i;
    }
    return product;

};

const factorial = (a) => {
    let product = a;
    while(a > 1){
        product *= a - 1;
        --a;
    }

    if (product === 0) return 1;

 return product;
};

const updateDisplay = (input) => {
    switch (input){
        case 'C':
            //clears the screen
            display.textContent = '0';
            summary.textContent = '';
            return;


        case 'BS':
            //removes last character on screen
            display.textContent = display.textContent.slice(0, -1);
            return;

        case '+/-':
            toggleNegativeSign();
            return;

        case '.':
            //makes sure there's not too many decimals already
            while(checkForDecimal()) return;
            break;


        };

    //removes starting zero from display
    if (display.textContent === '0') display.textContent = '';

    //adds to display as long as equals isn't pressed
    if (input !== '='){
    display.textContent += input;
        };

    //splits display into three parts, first number, operator, last number
    let splitOnOperator = parseDisplay();

    if (splitOnOperator.length === 1) return;

    let firstNumber = splitOnOperator[0],
        operator = splitOnOperator[1],
        secondNumber = splitOnOperator[2];


    if (input === '='){
        //if equals is pressed, operates what's on the display
        summary.textContent = display.textContent;
        operate(operator, firstNumber, secondNumber);
    };

    if (splitOnOperator.length === 5){
        //if second operator is pressed, operates what's on the display first and appends second operator
        summary.textContent = display.textContent;
        console.log(summary.textContent);
        operate(operator, firstNumber, secondNumber);
        display.textContent += input;
    };


};

const parseDisplay = () => {
    //splits what's on the display on every possible operator and returns split string array
    let operatorRegex = /([\+\-*\/\^!])/gi;
    let splitDisplay = display.textContent.split(operatorRegex);

    return splitDisplay;



};

function checkForDecimal() {
    //Checks that there aren't too many decimals
    let isDecimalOnScreen = false;

    let decimalRegex = /\./gi;
    let decText = display.textContent.split(decimalRegex);
    let splitText = parseDisplay(); //gets the current display split by operator


    //Allows one decimal number if there's no operator and two if there is
    if ((decText.length === 2 && splitText.length < 3) ||
        (decText.length > 2 && splitText.length >= 3)) {
        isDecimalOnScreen = true;
        };


    return isDecimalOnScreen;
}

function toggleNegativeSign(){
    let split = display.textContent.split(/-/gi);
    if (split.length < 2){
        display.textContent = '-' + split[0];
        return;
    }
    display.textContent = split[1];

};

function keyboardSupport(key){
    switch (key){
        case 'Enter':
            key = '=';
            break;

        case 'Backspace':
            key = 'BS';
            break;

        case 'c':
            key = 'C';
            break;

        case 'Delete':
            key = 'C';
    };

    let possibleButtons = ['1','2','3','4','5','6','7','8','9','0',
    '*','!','+','.','/','-','^','=','C','BS'];

    //does nothing if key pressed isn't part of calculator
    while (!(possibleButtons.includes(key))) return;

    updateDisplay(key);

}

const summary = document.querySelector('#summary-screen');

const display = document.querySelector('#screen');

const buttons = document.querySelectorAll('#calc-ctn button');

//updates display when buttons are pressed
buttons.forEach((button) => {
    button.addEventListener('click', () => {
        updateDisplay(button.name);
    });
});

//updates display when keyboard buttons are pressed
document.addEventListener('keydown', (event) => keyboardSupport(event.key));
