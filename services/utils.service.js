


function trimEmptyVals(obj) {
    for (let key in obj) {
        if (!obj[key]) delete obj[key]
    }
}



module.exports = {
    trimEmptyVals,
}