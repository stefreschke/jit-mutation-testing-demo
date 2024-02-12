
const somePredicate = function (number) {
    var stuff = number
    if (stuff > 10) {
        stuff = stuff - 5
    }
    return stuff < 10
}

const additionOfNumbersAndStrings = function (a, b) {
    return a + b
}

const sumUpTo = function (a) {
    var result = 0
    for (var i = 1; i <= a; i++) {
        result = result + i
    }
    return result
}


module.exports.somePredicate = somePredicate
module.exports.additionOfNumbersAndStrings = additionOfNumbersAndStrings
module.exports.sumUpTo = sumUpTo
