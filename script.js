const add = (a, b) => a + b;

const subtract = (a, b) => a - b;

const multiply = function(arr) {
    let total = arr.reduce((total, currentValue) =>{
        return total *= currentValue;
    });
 return total;
};

const power = function(a,b) {
    let i = 2;
    let product = a;
    while(b >= i){
        product *= a;
        ++i;
    }
    return product;

};

const factorial = function(a) {
    let product = a;
    while(a > 1){
        product *= a - 1;
        --a;
    }

    if (product === 0) return 1;

 return product;


};
