
// This is a JavaScript example!

const min = function (a, b) {
    if (a <= b) {
        return a
    } else {
        return b
    }
}

function test_A() {
    let result = min(16, 10)
    if (result != 10) throw Error()
}

function test_B() {
    let result = min(7, 7)
    if (result != 7) throw Error()
}

//function test_C() {
//    let result = min(10, 16)
//    if (result != 10) throw Error()
//}

console.log("5b2723bf-ebff-479d-a4ba-cccb0dbf93f4")
