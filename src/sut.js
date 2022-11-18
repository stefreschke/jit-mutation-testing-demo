
module.exports.somePredicate = function (number) {
    var stuff = number;
    if (stuff > 10) {
        stuff = stuff - 5;
    }
    return stuff < 10;
}
