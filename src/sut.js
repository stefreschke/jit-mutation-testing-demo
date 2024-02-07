
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

// somePredicate

function test_somePredicate_16ShouldBeFalse() {
    let result = somePredicate(16)
    if (result) throw Error()
}

function test_somePredicate_8ShouldBeTrue() {
    let result = somePredicate(8)
    if (!result) throw Error()
}

// additionOfNumbersAndStrings

function test_additionOfNumbersAndStrings_numbers() {
    let result = additionOfNumbersAndStrings("a", "b")
    if (result != "ab") throw Error()
}

function test_additionOfNumbersAndStrings_strings() {
    let result = additionOfNumbersAndStrings(4, 5)
    if (result != 9) throw Error()
}

// supUpTo

function test_sumUpTo_ThreeReturnsSix() {
    let result = sumUpTo(3)
    if (result != 6) throw Error()
}

console.log("5b2723bf-ebff-479d-a4ba-cccb0dbf93f4")
