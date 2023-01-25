
// This is a SimpleLanguage example!

function calc(i, j) {
  if (i < 10) {
    i = i + 100;
  }
  if (j < 100) {
    j = j + 10;
  }
  return i < j;
}

function main() {
  // simplelanguage requires a main
}

function test_lineC() {
  result = calc(5, 99);  // b_i: true, b_j: true
  assertTrue(result);
}

function test_branchC() {
  result = calc(11, 111);  // b_i: false, b_j: false
  assertTrue(result);
}

function main() {
    // lol, nothing to do here
    println("5b2723bf-ebff-479d-a4ba-cccb0dbf93f4");
}
