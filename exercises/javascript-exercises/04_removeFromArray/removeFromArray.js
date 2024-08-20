const removeFromArray = function(array, ...elements) {
    let r = Array.from(array);
    for (let i = 0; i < elements.length; i++) {
        let index = r.findIndex((x) => x === elements[i]);
        while (index != -1) {
            r.splice(index, 1);
            index = r.findIndex((x) => x === elements[i]);
        }
    }
    return r;
};

// Do not edit below this line
module.exports = removeFromArray;
