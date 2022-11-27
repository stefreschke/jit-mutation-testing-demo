
const sut = require("../src/sut")

var assert = require('assert');

describe('somePredicate', function () {
  it('16 -> false', function () {
    assert.equal(sut.somePredicate(16), false)
  })
  it('8 -> true', function () {
    assert.equal(sut.somePredicate(8), true)
  })
})

describe('additionOfNumbersAndStrings', function () {
  it('a + b = ab', function () {
    let result = sut.additionOfNumbersAndStrings("a", "b")
    assert.equal(result, "ab")
  })
  it('4 + 5 = 9', function () {
    let result = sut.additionOfNumbersAndStrings(4, 5)
    assert.equal(result, 9)
  })
})

describe('sumUpTo', function () {
  it('3 -> 1 + 2 + 3 = 6', function () {
    let result = sut.sumUpTo(3)
    assert.equal(result, 6)
  })
})
