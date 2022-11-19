
module.exports.somePredicate = function (number) {
    var stuff = number;
    if (stuff > 10) {
        stuff = stuff - 5;
    }
    return stuff < 10;
}

module.exports.additionOfNumbersAndStrings = function (a, b) {
    return a + b
}
