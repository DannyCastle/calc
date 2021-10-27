const operate = (operator, a, b) => {
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
    display.textContent = answer;
};

const add = (a, b) => a + b;

const subtract = (a, b) => a - b;

const multiply = (a,b) => a * b;

const divide = (a,b) => a / b;

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
    if (input === 'C') {
        display.textContent = '0';
        return;
        };
    if (input === 'BS') {
        display.textContent = display.textContent.slice(0, -1);
        return;
    };

    if (display.textContent === '0') display.textContent = '';

    display.textContent += input;
};

const parseDisplay = () => {
    let operatorRegex = /([\+\-*\/\^!])/gi;
    let splitDisplay = display.textContent.split(operatorRegex);

    operate(splitDisplay[1], splitDisplay[0], splitDisplay[2]);



};


const display = document.querySelector('#screen');

const buttons = document.querySelectorAll('#calc-ctn button');

buttons.forEach((button) => {
    button.addEventListener('click', () => {
        if (button.name === '=') {
            parseDisplay();
            return;
            };
        updateDisplay(button.name);
    });
});

