const isEmpty = obj => {
    if (obj instanceof Array) {
        return obj.length === 0 ? true : false;
    }
    if (Object.keys(obj).length === 0) {
        return true;
    } else {
        return false;
    }
};
module.exports = isEmpty;
