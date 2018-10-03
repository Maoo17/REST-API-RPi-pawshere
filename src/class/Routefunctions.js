class Routefunctions {
    constructor() {

    }

    checkForKey(keyinput, match) {
        var keyThere = false;
        if (keyinput === match) {
            keyThere = true;
        }
        return keyThere;
    }
    formatGpsToJson(gps) {
        var array = gps.split(",");
        var result = '[{"y":"' + array[0] + '","x":"' + array[1] + '"}]';

        return JSON.parse(result);
    }

    mapToJson(dict) {
        var obj = {"data": dict};
        return JSON.stringify(obj, null, 2);
    }

    test() {
        console.log("wokring");
    }
};
module.exports = Routefunctions;
