
const sut = require("../src/sut")

var assert = require('assert');
describe('somePredicate', function () {
  it('A', function () {
    assert.equal(sut.somePredicate(16), false)
  })
  it('B', function () {
    assert.equal(sut.somePredicate(8), true)
  })
})
