
// This is a JavaScript example!

function calc(i, j) {
    if (i < 10) {
        i = i + 100;
    }
    if (j < 100) {
        j = j + 10;
    }
    return i < j;
}

console.log("test discovery requires non empty main");

function test_lineC() {
    if (!calc(5, 99)) {  // b_i: true, b_j: true
        throw Error();
    }
}

function test_branchC() {
    if (!calc(11, 111)) {  // b_i: false, b_j: false
        throw Error();
    }
}

console.log("5b2723bf-ebff-479d-a4ba-cccb0dbf93f4")
