const operate = (operator, a, b) => {
    let answer;
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
    return answer;
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
