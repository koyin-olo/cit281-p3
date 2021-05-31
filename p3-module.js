//returns true if the coin function parameter is a valid coin value (1, 5, 10, 25, 50, 100)
function validDenomination(coin) {
    validValue = [1,5,10,25,50,100];
    return validValue.indexOf(coin.denom) !== -1;
};


//returns the calculated value of a single coin object from the obj parameter
function valueFromCoinObject(obj) {
    const {denom = 0, count = 0} = obj;
    value = denom * count;
    return value;
};

//returns the final calculated value of all coins
function valueFromArray(arr) {
    return arr.reduce((accumulator, currentValue) => {return accumulator + valueFromCoinObject(currentValue)},0);
};

//calls and returns the result from valueFromArray
function coinCount(...coinage) {
    return valueFromArray(coinage);
};

console.log("{}", coinCount({denom: 5, count: 3}));
console.log("{}s", coinCount({denom: 5, count: 3},{denom: 10, count: 2}));
const coins = [{denom: 25, count: 2},{denom: 1, count: 7}];
console.log("...[{}]", coinCount(...coins));

module.exports = {coinCount, coins};