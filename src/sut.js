
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

function test_somePredicate_16ShouldBeFalse() {
    let result = sut.somePredicate(16)
    if (result) throw Error()
}

function test_somePredicate_8ShouldBeTrue() {
    let result = sut.somePredicate(8)
    if (!result) throw Error()
}

function test_additionOfNumbersAndStrings_numbers() {
    let result = sut.additionOfNumbersAndStrings("a", "b")
    if (result != "ab") throw Error()
    assert.equal(result, "ab")
}

function test_additionOfNumbersAndStrings_strings() {
    let result = sut.additionOfNumbersAndStrings(4, 5)
    if (result != 9) throw Error()
}

console.log("bc189ee8-5c09-4d30-9220-09a40ac35194")
